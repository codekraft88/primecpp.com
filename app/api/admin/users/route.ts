import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/admin/users - Fetch all users (admin only)
export async function GET() {
  const supabase = await createClient()
  
  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()
    
  if (!adminProfile || adminProfile.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  // Fetch all profiles with their data
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Get order counts and total spent for each user
  const usersWithStats = await Promise.all(
    profiles.map(async (profile) => {
      const { count: orderCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("user_id", profile.id)
        
      const { data: invoices } = await supabase
        .from("invoices")
        .select("total_amount")
        .eq("user_id", profile.id)
        .eq("status", "paid")
        
      const totalSpent = invoices?.reduce((sum, inv) => sum + (inv.total_amount || 0), 0) || 0
      
      return {
        ...profile,
        total_orders: orderCount || 0,
        total_spent: totalSpent,
      }
    })
  )
  
  return NextResponse.json(usersWithStats)
}
