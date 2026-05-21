"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, FileText, Receipt, BarChart3, MessageCircle, Package, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "offer" | "invoice" | "report" | "order" | "ticket" | "general"
  title: string
  message: string
  link: string
  created_at: string
  read: boolean
}

const typeConfig = {
  offer: { icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
  invoice: { icon: Receipt, color: "text-orange-500", bg: "bg-orange-50" },
  report: { icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-50" },
  order: { icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
  ticket: { icon: MessageCircle, color: "text-pink-500", bg: "bg-pink-50" },
  general: { icon: Bell, color: "text-gray-500", bg: "bg-gray-50" },
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Gerade eben"
  if (diffInSeconds < 3600) return `vor ${Math.floor(diffInSeconds / 60)} Min.`
  if (diffInSeconds < 86400) return `vor ${Math.floor(diffInSeconds / 3600)} Std.`
  if (diffInSeconds < 604800) return `vor ${Math.floor(diffInSeconds / 86400)} Tagen`
  return date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" })
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const fetchNotifications = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setIsLoading(false)
        return
      }

      // Fetch recent activity that generates notifications
      const [offersRes, invoicesRes, reportsRes, ordersRes] = await Promise.all([
        // Pending offers (need review)
        supabase
          .from("offers")
          .select("id, title, created_at")
          .eq("user_id", user.id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(3),
        // Unpaid invoices
        supabase
          .from("invoices")
          .select("id, invoice_number, created_at")
          .eq("user_id", user.id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(3),
        // New reports (unread)
        supabase
          .from("reports")
          .select("id, title, created_at, status")
          .eq("user_id", user.id)
          .eq("status", "new")
          .order("created_at", { ascending: false })
          .limit(3),
        // Active orders with updates
        supabase
          .from("orders")
          .select("id, service_name, status, updated_at")
          .eq("user_id", user.id)
          .in("status", ["in_progress", "completed"])
          .order("updated_at", { ascending: false })
          .limit(3),
      ])

      const notificationList: Notification[] = []

      // Add offer notifications
      offersRes.data?.forEach((offer) => {
        notificationList.push({
          id: `offer-${offer.id}`,
          type: "offer",
          title: "Neues Angebot",
          message: offer.title || "Ein Angebot wartet auf Ihre Freigabe",
          link: `/dashboard/offers/${offer.id}`,
          created_at: offer.created_at,
          read: false,
        })
      })

      // Add invoice notifications
      invoicesRes.data?.forEach((invoice) => {
        notificationList.push({
          id: `invoice-${invoice.id}`,
          type: "invoice",
          title: "Offene Rechnung",
          message: `Rechnung ${invoice.invoice_number} ist fallig`,
          link: "/dashboard/invoices",
          created_at: invoice.created_at,
          read: false,
        })
      })

      // Add report notifications
      reportsRes.data?.forEach((report) => {
        notificationList.push({
          id: `report-${report.id}`,
          type: "report",
          title: "Neuer Report",
          message: report.title || "Ein neuer Report ist verfugbar",
          link: "/dashboard/reports",
          created_at: report.created_at,
          read: false,
        })
      })

      // Add order status notifications (completed orders)
      ordersRes.data?.forEach((order) => {
        if (order.status === "completed") {
          notificationList.push({
            id: `order-${order.id}`,
            type: "order",
            title: "Auftrag abgeschlossen",
            message: `${order.service_name} wurde abgeschlossen`,
            link: "/dashboard/orders",
            created_at: order.updated_at,
            read: false,
          })
        }
      })

      // Sort by date, newest first
      notificationList.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )

      setNotifications(notificationList.slice(0, 8))
      setIsLoading(false)
    }

    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-[#007be4] text-white text-[10px] font-bold rounded-full px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[380px] p-0 rounded-2xl shadow-xl border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Benachrichtigungen</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-[#007be4] hover:text-[#0066c2] font-medium"
            >
              Alle als gelesen markieren
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-[#007be4] rounded-full animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900">Keine Benachrichtigungen</p>
              <p className="text-xs text-gray-500 mt-1">Sie sind auf dem neuesten Stand</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type]
                const Icon = config.icon

                return (
                  <Link
                    key={notification.id}
                    href={notification.link}
                    onClick={() => {
                      markAsRead(notification.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors",
                      !notification.read && "bg-blue-50/50"
                    )}
                  >
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
                      <Icon className={cn("h-4 w-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn(
                          "text-sm",
                          !notification.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"
                        )}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-[#007be4] shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatRelativeTime(notification.created_at)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-gray-100 p-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-sm text-[#007be4] hover:text-[#0066c2] font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Alle anzeigen
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
