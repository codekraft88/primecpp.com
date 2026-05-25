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

// Helper to log admin action
async function logAdminAction(
  supabase: Awaited<ReturnType<typeof createClient>>,
  adminId: string,
  adminEmail: string,
  action: string,
  entityType: string,
  entityId: string | null,
  affectedUserId: string | null,
  previousValue: unknown,
  newValue: unknown
) {
  await supabase.from("admin_audit_logs").insert({
    admin_id: adminId,
    admin_email: adminEmail,
    action,
    entity_type: entityType,
    entity_id: entityId,
    affected_user_id: affectedUserId,
    previous_value: previousValue as never,
    new_value: newValue as never,
  })
}

// PATCH /api/admin/users/[id] - Update user status (block/unblock/archive)
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
  const { status, full_name, company, phone } = body
  
  // Fetch current profile
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
    
  if (!currentProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  
  // Build update object
  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (status !== undefined) updateData.status = status
  if (full_name !== undefined) updateData.full_name = full_name
  if (company !== undefined) updateData.company = company
  if (phone !== undefined) updateData.phone = phone
  
  // Update profile
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Log the action
  let action = "user_updated"
  if (status === "blocked") action = "user_blocked"
  else if (status === "active" && currentProfile.status === "blocked") action = "user_reactivated"
  else if (status === "archived") action = "user_archived"
  
  await logAdminAction(
    supabase,
    admin.user.id,
    admin.profile.email,
    action,
    "user",
    id,
    id,
    { status: currentProfile.status, full_name: currentProfile.full_name },
    { status: updatedProfile.status, full_name: updatedProfile.full_name }
  )
  
  return NextResponse.json(updatedProfile)
}

// DELETE /api/admin/users/[id] - Archive user (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  
  const admin = await verifyAdmin(supabase)
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  
  // Fetch current profile
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
    
  if (!currentProfile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  
  // Soft delete - set status to archived
  const { error } = await supabase
    .from("profiles")
    .update({ status: "archived", updated_at: new Date().toISOString() })
    .eq("id", id)
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  // Log the action
  await logAdminAction(
    supabase,
    admin.user.id,
    admin.profile.email,
    "user_deleted",
    "user",
    id,
    id,
    { status: currentProfile.status },
    { status: "archived" }
  )
  
  return NextResponse.json({ success: true })
}
