"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Filter,
  Clock,
  Shield,
  User,
  FileText,
  Loader2,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AuditLog {
  id: string
  created_at: string
  admin_id: string
  admin_email: string
  action: string
  entity_type: string
  entity_id: string | null
  affected_user_id: string | null
  previous_value: Record<string, unknown> | null
  new_value: Record<string, unknown> | null
  metadata: Record<string, unknown> | null
}

const actionConfig: Record<string, { label: string; color: string }> = {
  user_blocked: { label: "Benutzer gesperrt", color: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  user_reactivated: { label: "Benutzer aktiviert", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  user_archived: { label: "Benutzer archiviert", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
  user_deleted: { label: "Benutzer gelöscht", color: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  user_updated: { label: "Benutzer aktualisiert", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  order_status_changed: { label: "Auftragsstatus geändert", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  order_archived: { label: "Auftrag archiviert", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
  settings_changed: { label: "Einstellungen geändert", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  const fetchLogs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/audit-logs")
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.admin_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (actionConfig[log.action]?.label || log.action).toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    return matchesSearch && matchesAction
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "user":
        return <User className="h-4 w-4" />
      case "order":
        return <FileText className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-muted-foreground mt-1">Protokoll aller Admin-Aktionen</p>
        </div>
        <Button variant="outline" onClick={fetchLogs} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Aktualisieren
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Gesamt Aktionen</p>
          <p className="text-2xl font-bold text-foreground mt-1">{logs.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Heute</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {logs.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Diese Woche</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {logs.filter(l => {
              const logDate = new Date(l.created_at)
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return logDate >= weekAgo
            }).length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Benutzeraktionen</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {logs.filter(l => l.entity_type === "user").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Admin oder Aktion..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Aktion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Aktionen</SelectItem>
            <SelectItem value="user_blocked">Benutzer gesperrt</SelectItem>
            <SelectItem value="user_reactivated">Benutzer aktiviert</SelectItem>
            <SelectItem value="user_archived">Benutzer archiviert</SelectItem>
            <SelectItem value="user_updated">Benutzer aktualisiert</SelectItem>
            <SelectItem value="order_status_changed">Auftragsstatus geändert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zeitpunkt</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Aktion</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {logs.length === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="h-8 w-8 opacity-50" />
                      <p>Noch keine Admin-Aktionen protokolliert</p>
                    </div>
                  ) : (
                    "Keine Einträge gefunden"
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {formatDate(log.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-rose-600" />
                      </div>
                      <span className="text-sm">{log.admin_email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={actionConfig[log.action]?.color || "bg-gray-500/10 text-gray-600"}>
                      {actionConfig[log.action]?.label || log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getEntityIcon(log.entity_type)}
                      <span className="capitalize">{log.entity_type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {log.previous_value && log.new_value ? (
                        <span>
                          {JSON.stringify(log.previous_value).substring(0, 30)}... → {JSON.stringify(log.new_value).substring(0, 30)}...
                        </span>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
