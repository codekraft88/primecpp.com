"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Clock,
  PlayCircle,
  CheckCircle,
  Package,
  TrendingUp,
  Loader2,
  Edit,
  XCircle,
  Archive,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/toast-provider"

interface Order {
  id: string
  order_number: string | null
  service_name: string | null
  amount: number | null
  status: string
  progress: number | null
  start_date: string | null
  expected_completion: string | null
  created_at: string
  user_id: string
  profiles: {
    full_name: string | null
    email: string
    company: string | null
  } | null
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive"; icon: typeof Clock }> = {
  pending: { label: "Ausstehend", variant: "secondary", icon: Clock },
  in_progress: { label: "In Bearbeitung", variant: "outline", icon: PlayCircle },
  completed: { label: "Abgeschlossen", variant: "default", icon: CheckCircle },
  cancelled: { label: "Storniert", variant: "destructive", icon: XCircle },
  archived: { label: "Archiviert", variant: "outline", icon: Archive },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [statusDialog, setStatusDialog] = useState<{
    open: boolean
    order: Order | null
    newStatus: string
  }>({ open: false, order: null, newStatus: "" })
  const [isProcessing, setIsProcessing] = useState(false)
  const { showToast } = useToast()

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.order_number || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.profiles?.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.profiles?.company || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async () => {
    if (!statusDialog.order) return
    
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/orders/${statusDialog.order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusDialog.newStatus }),
      })

      if (response.ok) {
        await fetchOrders()
        showToast("Auftragsstatus wurde aktualisiert.", "success")
      } else {
        showToast("Statusänderung fehlgeschlagen.", "error")
      }
    } catch {
      showToast("Statusänderung fehlgeschlagen.", "error")
    } finally {
      setIsProcessing(false)
      setStatusDialog({ open: false, order: null, newStatus: "" })
    }
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0)
  const completedRevenue = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + (o.amount || 0), 0)

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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Aufträge</h1>
        <p className="text-muted-foreground mt-1">Verwalten und verfolgen Sie alle aktiven Aufträge</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Package className="h-4 w-4" />
            <span className="text-sm">Gesamt</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{orders.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Gesamtumsatz</span>
          </div>
          <p className="text-2xl font-bold text-foreground">CHF {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <PlayCircle className="h-4 w-4" />
            <span className="text-sm">In Bearbeitung</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {orders.filter(o => o.status === "in_progress").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Abgeschlossen</span>
          </div>
          <p className="text-2xl font-bold text-green-600">CHF {completedRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Auftragsnummer, Kunde oder Firma..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="pending">Ausstehend</SelectItem>
            <SelectItem value="in_progress">In Bearbeitung</SelectItem>
            <SelectItem value="completed">Abgeschlossen</SelectItem>
            <SelectItem value="cancelled">Storniert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Auftrag</TableHead>
              <TableHead>Kunde</TableHead>
              <TableHead>Dienstleistung</TableHead>
              <TableHead>Fortschritt</TableHead>
              <TableHead>Betrag</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {orders.length === 0 ? "Noch keine Aufträge vorhanden" : "Keine Aufträge gefunden"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status]?.icon || Clock
                const isOverdue = order.expected_completion && 
                  new Date(order.expected_completion) < new Date() && 
                  order.status !== "completed"
                
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-primary">
                          {order.order_number || order.id.substring(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("de-CH")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.profiles?.full_name || "Unbekannt"}</p>
                        <p className="text-sm text-muted-foreground">{order.profiles?.company || order.profiles?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.service_name || "-"}</TableCell>
                    <TableCell>
                      <div className="space-y-2 w-32">
                        <div className="flex items-center justify-between text-sm">
                          <Badge variant={statusConfig[order.status]?.variant || "outline"} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[order.status]?.label || order.status}
                          </Badge>
                        </div>
                        <Progress value={order.progress || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground text-right">{order.progress || 0}%</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {order.amount ? `CHF ${order.amount.toLocaleString()}` : "-"}
                    </TableCell>
                    <TableCell>
                      {order.expected_completion ? (
                        <>
                          <span className={isOverdue ? "text-destructive font-medium" : ""}>
                            {new Date(order.expected_completion).toLocaleDateString('de-CH')}
                          </span>
                          {isOverdue && <p className="text-xs text-destructive">Überfällig</p>}
                        </>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/orders/${order.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Details anzeigen
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {order.status === "pending" && (
                            <DropdownMenuItem onClick={() => setStatusDialog({ open: true, order, newStatus: "in_progress" })}>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Starten
                            </DropdownMenuItem>
                          )}
                          {order.status === "in_progress" && (
                            <DropdownMenuItem onClick={() => setStatusDialog({ open: true, order, newStatus: "completed" })}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Abschliessen
                            </DropdownMenuItem>
                          )}
                          {order.status !== "cancelled" && order.status !== "completed" && (
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => setStatusDialog({ open: true, order, newStatus: "cancelled" })}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Stornieren
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Status Change Dialog */}
      <Dialog open={statusDialog.open} onOpenChange={(open) => !open && setStatusDialog({ open: false, order: null, newStatus: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {statusDialog.newStatus === "in_progress" && "Auftrag starten"}
              {statusDialog.newStatus === "completed" && "Auftrag abschliessen"}
              {statusDialog.newStatus === "cancelled" && "Auftrag stornieren"}
            </DialogTitle>
            <DialogDescription>
              {statusDialog.newStatus === "in_progress" && "Möchten Sie diesen Auftrag starten? Der Kunde wird benachrichtigt."}
              {statusDialog.newStatus === "completed" && "Möchten Sie diesen Auftrag als abgeschlossen markieren?"}
              {statusDialog.newStatus === "cancelled" && "Möchten Sie diesen Auftrag wirklich stornieren? Diese Aktion kann nicht rückgängig gemacht werden."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setStatusDialog({ open: false, order: null, newStatus: "" })}
              disabled={isProcessing}
            >
              Abbrechen
            </Button>
            <Button 
              variant={statusDialog.newStatus === "cancelled" ? "destructive" : "default"}
              onClick={handleStatusChange}
              disabled={isProcessing}
            >
              {isProcessing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {statusDialog.newStatus === "in_progress" && "Starten"}
              {statusDialog.newStatus === "completed" && "Abschliessen"}
              {statusDialog.newStatus === "cancelled" && "Stornieren"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
