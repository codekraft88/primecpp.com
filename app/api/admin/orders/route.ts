import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/admin/orders - Fetch all orders (admin only)
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
  
  // Fetch all orders with user info
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        company
      )
    `)
    .order("created_at", { ascending: false })
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(orders)
}
