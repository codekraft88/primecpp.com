import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/admin/stats - Fetch admin dashboard statistics
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
  
  // Fetch all stats in parallel
  const [
    totalUsersResult,
    activeUsersResult,
    blockedUsersResult,
    archivedUsersResult,
    totalRequestsResult,
    newRequestsResult,
    pendingOffersResult,
    activeOrdersResult,
    completedOrdersResult,
    openInvoicesResult,
    recentUsersResult,
    recentAuditLogsResult,
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "blocked"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "archived"),
    supabase.from("requests").select("*", { count: "exact", head: true }),
    supabase.from("requests").select("*", { count: "exact", head: true }).eq("status", "submitted"),
    supabase.from("offers").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders").select("*", { count: "exact", head: true }).in("status", ["in_progress", "pending"]),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("invoices").select("*", { count: "exact", head: true }).in("status", ["pending", "overdue"]),
    supabase.from("profiles").select("id, email, full_name, created_at, status").order("created_at", { ascending: false }).limit(5),
    supabase.from("admin_audit_logs").select("*").order("created_at", { ascending: false }).limit(10),
  ])
  
  // Calculate monthly revenue
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  
  const { data: monthlyInvoices } = await supabase
    .from("invoices")
    .select("total_amount")
    .eq("status", "paid")
    .gte("paid_at", startOfMonth.toISOString())
    
  const monthlyRevenue = monthlyInvoices?.reduce((sum, inv) => sum + (inv.total_amount || 0), 0) || 0
  
  return NextResponse.json({
    users: {
      total: totalUsersResult.count || 0,
      active: activeUsersResult.count || 0,
      blocked: blockedUsersResult.count || 0,
      archived: archivedUsersResult.count || 0,
    },
    requests: {
      total: totalRequestsResult.count || 0,
      new: newRequestsResult.count || 0,
    },
    offers: {
      pending: pendingOffersResult.count || 0,
    },
    orders: {
      active: activeOrdersResult.count || 0,
      completed: completedOrdersResult.count || 0,
    },
    invoices: {
      open: openInvoicesResult.count || 0,
    },
    revenue: {
      monthly: monthlyRevenue,
    },
    recentUsers: recentUsersResult.data || [],
    recentAuditLogs: recentAuditLogsResult.data || [],
  })
}
