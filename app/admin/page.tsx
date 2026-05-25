"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  FileQuestion,
  FileCheck,
  CreditCard,
  Briefcase,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Clock,
  Users,
  CheckCircle,
  Loader2,
  UserPlus,
  Shield,
  UserX,
  Archive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdminStats {
  users: {
    total: number
    active: number
    blocked: number
    archived: number
  }
  requests: {
    total: number
    new: number
  }
  offers: {
    pending: number
  }
  orders: {
    active: number
    completed: number
  }
  invoices: {
    open: number
  }
  revenue: {
    monthly: number
  }
  recentUsers: Array<{
    id: string
    email: string
    full_name: string | null
    created_at: string
    status: string
  }>
  recentAuditLogs: Array<{
    id: string
    action: string
    admin_email: string
    created_at: string
    entity_type: string
  }>
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `vor ${diffMins} Min.`
    if (diffHours < 24) return `vor ${diffHours} Std.`
    if (diffDays < 7) return `vor ${diffDays} Tagen`
    return date.toLocaleDateString("de-CH")
  }

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      user_blocked: "Benutzer gesperrt",
      user_reactivated: "Benutzer aktiviert",
      user_archived: "Benutzer archiviert",
      user_deleted: "Benutzer gelöscht",
      user_updated: "Benutzer aktualisiert",
      order_status_changed: "Auftragsstatus geändert",
    }
    return labels[action] || action
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Übersicht aller Anfragen, Angebote und Aufträge
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/users">
              <Users className="h-4 w-4 mr-2" />
              Benutzer
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/admin/requests">
              Neue Anfragen
              {stats && stats.requests.new > 0 && (
                <Badge className="ml-2 bg-white/20">{stats.requests.new}</Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{stats?.users.total || 0}</p>
            <p className="text-sm text-muted-foreground">Registrierte Benutzer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats?.users.active || 0}</p>
            <p className="text-sm text-muted-foreground">Aktive Benutzer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <UserX className="h-5 w-5 text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-rose-600">{stats?.users.blocked || 0}</p>
            <p className="text-sm text-muted-foreground">Gesperrte Benutzer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Archive className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-muted-foreground">{stats?.users.archived || 0}</p>
            <p className="text-sm text-muted-foreground">Archivierte Benutzer</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Link href="/admin/requests">
          <Card className="hover:border-rose-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <FileQuestion className="h-5 w-5 text-muted-foreground" />
                {stats && stats.requests.new > 0 && (
                  <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20">
                    {stats.requests.new}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats?.requests.new || 0}</p>
              <p className="text-sm text-muted-foreground">Neue Anfragen</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/offers">
          <Card className="hover:border-amber-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <FileCheck className="h-5 w-5 text-muted-foreground" />
                {stats && stats.offers.pending > 0 && (
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                    {stats.offers.pending}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats?.offers.pending || 0}</p>
              <p className="text-sm text-muted-foreground">Angebote offen</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/invoices">
          <Card className="hover:border-blue-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                {stats && stats.invoices.open > 0 && (
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                    {stats.invoices.open}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stats?.invoices.open || 0}</p>
              <p className="text-sm text-muted-foreground">Offene Rechnungen</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/orders">
          <Card className="hover:border-emerald-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Aktiv
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stats?.orders.active || 0}</p>
              <p className="text-sm text-muted-foreground">Aktive Aufträge</p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{formatCurrency(stats?.revenue.monthly || 0)}</p>
            <p className="text-sm text-muted-foreground">Monatsumsatz</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{stats?.orders.completed || 0}</p>
            <p className="text-sm text-muted-foreground">Abgeschlossen</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <FileQuestion className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{stats?.requests.total || 0}</p>
            <p className="text-sm text-muted-foreground">Anfragen gesamt</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Neue Registrierungen</CardTitle>
                <CardDescription>Zuletzt registrierte Benutzer</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/users">
                  Alle anzeigen
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentUsers && stats.recentUsers.length > 0 ? (
                stats.recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === "active" ? "bg-emerald-500" : 
                        user.status === "blocked" ? "bg-rose-500" : "bg-gray-400"
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{user.full_name || "Kein Name"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{formatDate(user.created_at)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Noch keine Registrierungen</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Admin Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Admin-Aktivitäten</CardTitle>
                <CardDescription>Letzte Admin-Aktionen</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/settings">
                  Audit Log
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentAuditLogs && stats.recentAuditLogs.length > 0 ? (
                stats.recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-rose-500" />
                      <div>
                        <p className="font-medium text-sm">{getActionLabel(log.action)}</p>
                        <p className="text-xs text-muted-foreground">{log.admin_email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(log.created_at)}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Noch keine Admin-Aktionen</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/requests">
                <FileQuestion className="h-5 w-5" />
                <span className="text-sm">Anfragen prüfen</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/offers/new">
                <FileCheck className="h-5 w-5" />
                <span className="text-sm">Angebot erstellen</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/reports/new">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Report hochladen</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/admin/users">
                <Users className="h-5 w-5" />
                <span className="text-sm">Benutzer verwalten</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
