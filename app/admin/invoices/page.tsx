"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Receipt,
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
const invoices = [
  {
    id: "INV-2024-001",
    orderId: "ORD-2024-001",
    client: "Anna Schmidt",
    company: "Schmidt GmbH",
    amount: 8900,
    status: "paid",
    issuedAt: "2024-03-01",
    dueDate: "2024-03-31",
    paidAt: "2024-03-15",
  },
  {
    id: "INV-2024-002",
    orderId: "ORD-2024-002",
    client: "Max Mustermann",
    company: "Mustermann AG",
    amount: 2500,
    status: "pending",
    issuedAt: "2024-03-10",
    dueDate: "2024-04-09",
    paidAt: null,
  },
  {
    id: "INV-2024-003",
    orderId: "ORD-2024-003",
    client: "Peter Weber",
    company: "Weber Solutions",
    amount: 4500,
    status: "overdue",
    issuedAt: "2024-02-01",
    dueDate: "2024-03-01",
    paidAt: null,
  },
  {
    id: "INV-2024-004",
    orderId: "ORD-2024-004",
    client: "Lisa Müller",
    company: "Startup IO",
    amount: 1200,
    status: "draft",
    issuedAt: null,
    dueDate: null,
    paidAt: null,
  },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof Clock }> = {
  draft: { label: "Entwurf", variant: "outline", icon: Receipt },
  pending: { label: "Ausstehend", variant: "secondary", icon: Clock },
  paid: { label: "Bezahlt", variant: "default", icon: CheckCircle },
  overdue: { label: "Überfällig", variant: "destructive", icon: AlertCircle },
}

export default function AdminInvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0)
  const paidAmount = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === "pending").reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter(i => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rechnungen</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie alle Rechnungen</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Neue Rechnung
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Gesamtbetrag</p>
          <p className="text-2xl font-bold text-foreground mt-1">CHF {totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Bezahlt</p>
          <p className="text-2xl font-bold text-green-600 mt-1">CHF {paidAmount.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Ausstehend</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">CHF {pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Überfällig</p>
          <p className="text-2xl font-bold text-destructive mt-1">CHF {overdueAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Rechnungsnummer, Kunde oder Firma..."
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
            <SelectItem value="paid">Bezahlt</SelectItem>
            <SelectItem value="overdue">Überfällig</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rechnung</TableHead>
              <TableHead>Kunde</TableHead>
              <TableHead>Betrag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fällig am</TableHead>
              <TableHead>Bezahlt am</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => {
              const StatusIcon = statusConfig[invoice.status].icon
              return (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div>
                      <Link href={`/admin/invoices/${invoice.id}`} className="font-medium text-primary hover:underline">
                        {invoice.id}
                      </Link>
                      <p className="text-sm text-muted-foreground">Auftrag: {invoice.orderId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.client}</p>
                      <p className="text-sm text-muted-foreground">{invoice.company}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">CHF {invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[invoice.status].variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[invoice.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {invoice.dueDate ? (
                      <span className={invoice.status === "overdue" ? "text-destructive font-medium" : ""}>
                        {new Date(invoice.dueDate).toLocaleDateString('de-CH')}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {invoice.paidAt ? (
                      <span className="text-green-600">
                        {new Date(invoice.paidAt).toLocaleDateString('de-CH')}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Anzeigen
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          PDF herunterladen
                        </DropdownMenuItem>
                        {invoice.status === "draft" && (
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Senden
                          </DropdownMenuItem>
                        )}
                        {invoice.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Als bezahlt markieren
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
      </div>
    </div>
  )
}
