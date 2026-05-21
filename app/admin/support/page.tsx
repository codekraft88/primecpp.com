"use client"

import { useState } from "react"
import { 
  Search, 
  MoreHorizontal,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
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
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/toast-provider"

const tickets = [
  {
    id: "TKT-2026-010",
    subject: "Frage zur UGC-Lieferung",
    client: "Muster AG",
    clientEmail: "max@muster.ch",
    priority: "normal",
    status: "open",
    createdAt: "5. Mai 2026",
    lastUpdate: "5. Mai 2026",
    relatedOrder: "ORD-2026-003",
  },
  {
    id: "TKT-2026-009",
    subject: "Rechnung unklar",
    client: "Tech Solutions AG",
    clientEmail: "info@techsolutions.ch",
    priority: "high",
    status: "open",
    createdAt: "4. Mai 2026",
    lastUpdate: "4. Mai 2026",
    relatedOrder: null,
  },
  {
    id: "TKT-2026-008",
    subject: "Frage zum monatlichen Report",
    client: "Muster AG",
    clientEmail: "max@muster.ch",
    priority: "normal",
    status: "answered",
    createdAt: "25. April 2026",
    lastUpdate: "26. April 2026",
    relatedOrder: "ORD-2026-001",
  },
  {
    id: "TKT-2026-007",
    subject: "Keyword-Anpassung anfragen",
    client: "Digital GmbH",
    clientEmail: "kontakt@digital.ch",
    priority: "low",
    status: "closed",
    createdAt: "15. Marz 2026",
    lastUpdate: "17. Marz 2026",
    relatedOrder: "ORD-2026-002",
  },
]

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; icon: typeof Clock }> = {
  open: { label: "Offen", bgColor: "bg-amber-50", textColor: "text-amber-700", icon: Clock },
  answered: { label: "Beantwortet", bgColor: "bg-blue-50", textColor: "text-blue-700", icon: MessageSquare },
  closed: { label: "Geschlossen", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: CheckCircle },
}

const priorityConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  low: { label: "Niedrig", bgColor: "bg-gray-100", textColor: "text-gray-600" },
  normal: { label: "Normal", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  high: { label: "Hoch", bgColor: "bg-rose-50", textColor: "text-rose-700" },
}

export default function AdminSupportPage() {
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openTickets = tickets.filter(t => t.status === "open").length

  const handleReply = (ticketId: string) => {
    showToast(`Antwort-Editor fur ${ticketId} wird geoffnet...`, "info")
  }

  const handleClose = (ticketId: string) => {
    showToast(`Ticket ${ticketId} wurde geschlossen.`, "success")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support-Tickets</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie Kundenanfragen und Support-Tickets</p>
        </div>
        {openTickets > 0 && (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 h-8 px-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            {openTickets} offene Tickets
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Gesamt</p>
            <p className="text-2xl font-bold mt-1">{tickets.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Offen</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{openTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Beantwortet</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{tickets.filter(t => t.status === "answered").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Geschlossen</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">{tickets.filter(t => t.status === "closed").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Betreff oder Kunde..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="open">Offen</SelectItem>
            <SelectItem value="answered">Beantwortet</SelectItem>
            <SelectItem value="closed">Geschlossen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead className="hidden md:table-cell">Prioritat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Letzte Aktualisierung</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const status = statusConfig[ticket.status]
                const priority = priorityConfig[ticket.priority]
                const StatusIcon = status.icon
                return (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${status.bgColor}`}>
                          <StatusIcon className={`h-4 w-4 ${status.textColor}`} />
                        </div>
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.id}
                            {ticket.relatedOrder && ` - ${ticket.relatedOrder}`}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{ticket.client}</p>
                          <p className="text-xs text-muted-foreground">{ticket.clientEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className={`${priority.bgColor} ${priority.textColor} border-0`}>
                        {priority.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${status.bgColor} ${status.textColor} border-0`}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {ticket.lastUpdate}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Details anzeigen
                          </DropdownMenuItem>
                          {ticket.status !== "closed" && (
                            <>
                              <DropdownMenuItem onClick={() => handleReply(ticket.id)}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Antworten
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleClose(ticket.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Schliessen
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
