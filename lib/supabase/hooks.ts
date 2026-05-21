"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import type { 
  Profile, 
  Request, 
  Offer, 
  Order, 
  Invoice, 
  Report, 
  SupportTicket,
  DashboardStats 
} from "@/lib/supabase/types"

// Create a singleton supabase client for client-side hooks
const getSupabase = () => createClient()

// SWR fetcher for Supabase
async function supabaseFetcher<T>(
  key: string,
  query: () => Promise<{ data: T | null; error: Error | null }>
): Promise<T> {
  const { data, error } = await query()
  if (error) throw error
  if (!data) throw new Error("No data returned")
  return data
}

// Hook for current user profile
export function useProfile() {
  return useSWR<Profile | null>("profile", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
    
    if (error) throw error
    return data
  })
}

// Hook for dashboard stats
export function useDashboardStats() {
  return useSWR<DashboardStats>("dashboard-stats", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const [requests, offers, orders, invoices, reports] = await Promise.all([
      supabase.from("requests").select("id", { count: "exact" }).eq("user_id", user.id).in("status", ["pending", "in_review"]),
      supabase.from("offers").select("id", { count: "exact" }).eq("user_id", user.id).eq("status", "pending"),
      supabase.from("orders").select("id", { count: "exact" }).eq("user_id", user.id).in("status", ["pending", "in_progress", "review"]),
      supabase.from("invoices").select("id", { count: "exact" }).eq("user_id", user.id).in("status", ["open", "overdue"]),
      supabase.from("reports").select("id", { count: "exact" }).eq("user_id", user.id).eq("status", "new"),
    ])

    return {
      openRequests: requests.count || 0,
      pendingOffers: offers.count || 0,
      activeOrders: orders.count || 0,
      openInvoices: invoices.count || 0,
      newReports: reports.count || 0,
    }
  })
}

// Hook for user requests
export function useRequests() {
  return useSWR<Request[]>("requests", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  })
}

// Hook for user offers
export function useOffers() {
  return useSWR<Offer[]>("offers", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  })
}

// Hook for user orders
export function useOrders() {
  return useSWR<Order[]>("orders", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  })
}

// Hook for user invoices
export function useInvoices() {
  return useSWR<Invoice[]>("invoices", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  })
}

// Hook for user reports
export function useReports() {
  return useSWR<Report[]>("reports", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  })
}

// Hook for user support tickets
export function useSupportTickets() {
  return useSWR<SupportTicket[]>("support-tickets", async () => {
    const supabase = getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("support_tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  })
}

// Hook for recent activity
export function useRecentActivity(limit = 10) {
  return useSWR<Array<{ id: string; type: string; title: string; description: string; time: string; status: string }>>(
    `recent-activity-${limit}`,
    async () => {
      const supabase = getSupabase()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Fetch recent items from multiple tables and combine
      const [requests, offers, orders, invoices, reports] = await Promise.all([
        supabase.from("requests").select("id, service_name, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("offers").select("id, title, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("orders").select("id, service_name, status, progress, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("invoices").select("id, invoice_number, status, total_amount, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        supabase.from("reports").select("id, title, status, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
      ])

      const activities: Array<{ id: string; type: string; title: string; description: string; time: string; status: string; date: Date }> = []

      // Map requests
      requests.data?.forEach(r => {
        activities.push({
          id: r.id,
          type: "request",
          title: r.service_name,
          description: `Anfrage ${r.status === 'pending' ? 'eingereicht' : r.status}`,
          time: formatTimeAgo(new Date(r.created_at)),
          status: r.status,
          date: new Date(r.created_at)
        })
      })

      // Map offers
      offers.data?.forEach(o => {
        activities.push({
          id: o.id,
          type: "offer",
          title: o.title,
          description: `Angebot ${o.status === 'pending' ? 'erhalten' : o.status}`,
          time: formatTimeAgo(new Date(o.created_at)),
          status: o.status,
          date: new Date(o.created_at)
        })
      })

      // Map orders
      orders.data?.forEach(o => {
        activities.push({
          id: o.id,
          type: "order",
          title: o.service_name,
          description: `${o.progress}% abgeschlossen`,
          time: formatTimeAgo(new Date(o.created_at)),
          status: o.status,
          date: new Date(o.created_at)
        })
      })

      // Map invoices
      invoices.data?.forEach(i => {
        activities.push({
          id: i.id,
          type: "invoice",
          title: `Rechnung ${i.invoice_number}`,
          description: `CHF ${i.total_amount.toLocaleString('de-CH')}`,
          time: formatTimeAgo(new Date(i.created_at)),
          status: i.status,
          date: new Date(i.created_at)
        })
      })

      // Map reports
      reports.data?.forEach(r => {
        activities.push({
          id: r.id,
          type: "report",
          title: r.title,
          description: r.status === 'new' ? 'Neuer Report' : 'Report',
          time: formatTimeAgo(new Date(r.created_at)),
          status: r.status,
          date: new Date(r.created_at)
        })
      })

      // Sort by date and limit
      return activities
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, limit)
        .map(({ date, ...rest }) => rest)
    }
  )
}

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `vor ${diffMins} Minuten`
  if (diffHours < 24) return `vor ${diffHours} Stunden`
  if (diffDays === 1) return 'vor 1 Tag'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  return date.toLocaleDateString('de-CH')
}
