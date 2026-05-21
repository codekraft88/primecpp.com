"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  Copy,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Plus
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

// Mock data
const offers = [
  {
    id: "OFF-2024-001",
    requestId: "REQ-2024-001",
    client: "Max Mustermann",
    company: "Mustermann AG",
    service: "SEO Optimierung",
    amount: 2500,
    status: "pending",
    createdAt: "2024-03-08",
    validUntil: "2024-03-22",
  },
  {
    id: "OFF-2024-002",
    requestId: "REQ-2024-002",
    client: "Anna Schmidt",
    company: "Schmidt GmbH",
    service: "Website Redesign",
    amount: 8900,
    status: "accepted",
    createdAt: "2024-03-05",
    validUntil: "2024-03-19",
  },
  {
    id: "OFF-2024-003",
    requestId: "REQ-2024-003",
    client: "Peter Weber",
    company: "Weber Solutions",
    service: "Content Marketing",
    amount: 1500,
    status: "declined",
    createdAt: "2024-03-01",
    validUntil: "2024-03-15",
  },
  {
    id: "OFF-2024-004",
    requestId: "REQ-2024-004",
    client: "Lisa Müller",
    company: "Startup IO",
    service: "Logo Design",
    amount: 950,
    status: "draft",
    createdAt: "2024-03-10",
    validUntil: null,
  },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof Clock }> = {
  draft: { label: "Entwurf", variant: "outline", icon: FileText },
  pending: { label: "Ausstehend", variant: "secondary", icon: Clock },
  accepted: { label: "Angenommen", variant: "default", icon: CheckCircle },
  declined: { label: "Abgelehnt", variant: "destructive", icon: XCircle },
}

export default function AdminOffersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || offer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalValue = offers.reduce((sum, o) => sum + o.amount, 0)
  const acceptedValue = offers.filter(o => o.status === "accepted").reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Angebote</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie alle erstellten Angebote</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Neues Angebot
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Gesamt</p>
          <p className="text-2xl font-bold text-foreground mt-1">{offers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Gesamtwert</p>
          <p className="text-2xl font-bold text-foreground mt-1">CHF {totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Angenommen</p>
          <p className="text-2xl font-bold text-green-600 mt-1">CHF {acceptedValue.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Ausstehend</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {offers.filter(o => o.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Angebotsnummer, Kunde oder Firma..."
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
            <SelectItem value="draft">Entwurf</SelectItem>
            <SelectItem value="pending">Ausstehend</SelectItem>
            <SelectItem value="accepted">Angenommen</SelectItem>
            <SelectItem value="declined">Abgelehnt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Angebot</TableHead>
              <TableHead>Kunde</TableHead>
              <TableHead>Dienstleistung</TableHead>
              <TableHead>Betrag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gültig bis</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.map((offer) => {
              const StatusIcon = statusConfig[offer.status].icon
              return (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div>
                      <Link href={`/admin/offers/${offer.id}`} className="font-medium text-primary hover:underline">
                        {offer.id}
                      </Link>
                      <p className="text-sm text-muted-foreground">Anfrage: {offer.requestId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{offer.client}</p>
                      <p className="text-sm text-muted-foreground">{offer.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>{offer.service}</TableCell>
                  <TableCell className="font-semibold">CHF {offer.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[offer.status].variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[offer.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {offer.validUntil ? (
                      <span className="text-sm">
                        {new Date(offer.validUntil).toLocaleDateString('de-CH')}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
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
                          <Link href={`/admin/offers/${offer.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Anzeigen
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Bearbeiten
                        </DropdownMenuItem>
                        {offer.status === "draft" && (
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Senden
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplizieren
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Löschen
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
