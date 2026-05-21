"use client"

import { useState } from "react"
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
  TrendingUp
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const orders = [
  {
    id: "ORD-2024-001",
    offerId: "OFF-2024-002",
    client: "Anna Schmidt",
    company: "Schmidt GmbH",
    service: "Website Redesign",
    amount: 8900,
    status: "in_progress",
    progress: 65,
    startDate: "2024-03-06",
    deadline: "2024-04-15",
  },
  {
    id: "ORD-2024-002",
    offerId: "OFF-2024-001",
    client: "Max Mustermann",
    company: "Mustermann AG",
    service: "SEO Optimierung",
    amount: 2500,
    status: "pending",
    progress: 0,
    startDate: "2024-03-12",
    deadline: "2024-04-30",
  },
  {
    id: "ORD-2024-003",
    offerId: "OFF-2023-045",
    client: "Peter Weber",
    company: "Weber Solutions",
    service: "Content Marketing Paket",
    amount: 4500,
    status: "completed",
    progress: 100,
    startDate: "2024-01-15",
    deadline: "2024-02-28",
  },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline"; icon: typeof Clock }> = {
  pending: { label: "Ausstehend", variant: "secondary", icon: Clock },
  in_progress: { label: "In Bearbeitung", variant: "outline", icon: PlayCircle },
  completed: { label: "Abgeschlossen", variant: "default", icon: CheckCircle },
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)
  const completedRevenue = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.amount, 0)

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
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon
              const isOverdue = new Date(order.deadline) < new Date() && order.status !== "completed"
              
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline">
                        {order.id}
                      </Link>
                      <p className="text-sm text-muted-foreground">Angebot: {order.offerId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.client}</p>
                      <p className="text-sm text-muted-foreground">{order.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>
                    <div className="space-y-2 w-32">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant={statusConfig[order.status].variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">{order.progress}%</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">CHF {order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={isOverdue ? "text-destructive font-medium" : ""}>
                      {new Date(order.deadline).toLocaleDateString('de-CH')}
                    </span>
                    {isOverdue && <p className="text-xs text-destructive">Überfällig</p>}
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
