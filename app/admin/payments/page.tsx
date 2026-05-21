"use client"

import { useState } from "react"
import { 
  Search, 
  MoreHorizontal,
  Eye,
  Check,
  Clock,
  AlertCircle,
  CreditCard,
  Building,
  RefreshCw,
  Download,
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

const payments = [
  {
    id: "PAY-2026-001",
    client: "Muster AG",
    amount: 1190,
    method: "Kreditkarte",
    methodType: "card",
    status: "completed",
    invoice: "INV-2026-004",
    date: "1. Mai 2026",
  },
  {
    id: "PAY-2026-002",
    client: "Tech Solutions AG",
    amount: 790,
    method: "Rechnung",
    methodType: "invoice",
    status: "pending",
    invoice: "INV-2026-005",
    date: "3. Mai 2026",
  },
  {
    id: "PAY-2026-003",
    client: "Digital GmbH",
    amount: 490,
    method: "Bankuberweisung",
    methodType: "bank",
    status: "completed",
    invoice: "INV-2026-003",
    date: "28. April 2026",
  },
  {
    id: "PAY-2026-004",
    client: "Muster AG",
    amount: 1190,
    method: "Kreditkarte",
    methodType: "card",
    status: "completed",
    invoice: "INV-2026-002",
    date: "1. April 2026",
  },
  {
    id: "PAY-2026-005",
    client: "Startup Inc.",
    amount: 490,
    method: "Rechnung",
    methodType: "invoice",
    status: "failed",
    invoice: "INV-2026-001",
    date: "15. Marz 2026",
  },
]

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; icon: typeof Check }> = {
  completed: { label: "Erfolgreich", bgColor: "bg-emerald-50", textColor: "text-emerald-700", icon: Check },
  pending: { label: "Ausstehend", bgColor: "bg-amber-50", textColor: "text-amber-700", icon: Clock },
  failed: { label: "Fehlgeschlagen", bgColor: "bg-red-50", textColor: "text-red-700", icon: AlertCircle },
  refunded: { label: "Ruckerstattet", bgColor: "bg-purple-50", textColor: "text-purple-700", icon: RefreshCw },
}

const methodIcons: Record<string, typeof CreditCard> = {
  card: CreditCard,
  invoice: Building,
  bank: Building,
}

export default function AdminPaymentsPage() {
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAmount = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const handleMarkReceived = (paymentId: string) => {
    showToast(`Zahlung ${paymentId} wurde als erhalten markiert.`, "success")
  }

  const handleDownload = (paymentId: string) => {
    showToast(`Beleg fur ${paymentId} wird heruntergeladen...`, "info")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Zahlungen</h1>
        <p className="text-muted-foreground mt-1">Ubersicht aller Zahlungseingange und -status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Gesamt erhalten</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">CHF {totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Ausstehend</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">CHF {pendingAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Transaktionen</p>
            <p className="text-2xl font-bold mt-1">{payments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Fehlgeschlagen</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{payments.filter(p => p.status === "failed").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Kunde oder Zahlungs-ID..."
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
            <SelectItem value="completed">Erfolgreich</SelectItem>
            <SelectItem value="pending">Ausstehend</SelectItem>
            <SelectItem value="failed">Fehlgeschlagen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zahlung</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead className="hidden md:table-cell">Methode</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Rechnung</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const status = statusConfig[payment.status]
                const StatusIcon = status.icon
                const MethodIcon = methodIcons[payment.methodType] || CreditCard
                return (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.id}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{payment.client}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <MethodIcon className="h-4 w-4 text-muted-foreground" />
                        {payment.method}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      CHF {payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${status.bgColor} ${status.textColor} border-0 gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {payment.invoice}
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
                          <DropdownMenuItem onClick={() => handleDownload(payment.id)}>
                            <Download className="h-4 w-4 mr-2" />
                            Beleg herunterladen
                          </DropdownMenuItem>
                          {payment.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleMarkReceived(payment.id)}>
                                <Check className="h-4 w-4 mr-2" />
                                Als erhalten markieren
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
