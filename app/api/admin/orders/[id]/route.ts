import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Helper to verify admin access
async function verifyAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single()
    
  if (!profile || profile.role !== "superadmin") return null
  
  return { user, profile }
}

// PATCH /api/admin/orders/[id] - Update order status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  
  const admin = await verifyAdmin(supabase)
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  const body = await request.json()
  const { status, notes, progress } = body
  
  // Fetch current order
  const { data: currentOrder } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single()
    
  if (!currentOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }
  
  // Build update object
  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (status !== undefined) {
    updateData.status = status
    if (status === "completed") {
      updateData.completed_at = new Date().toISOString()
    }
  }
  if (notes !== undefined) updateData.notes = notes
  if (progress !== undefined) updateData.progress = progress
  
  // Update order
  const { data: updatedOrder, error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Log the action
  await supabase.from("admin_audit_logs").insert({
    admin_id: admin.user.id,
    admin_email: admin.profile.email,
    action: "order_status_changed",
    entity_type: "order",
    entity_id: id,
    affected_user_id: currentOrder.user_id,
    previous_value: { status: currentOrder.status, progress: currentOrder.progress },
    new_value: { status: updatedOrder.status, progress: updatedOrder.progress },
  })
  
  return NextResponse.json(updatedOrder)
}
