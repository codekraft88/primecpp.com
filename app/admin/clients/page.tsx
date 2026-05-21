"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  User,
  Building,
  Calendar,
  Briefcase,
  CreditCard,
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
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/toast-provider"

const clients = [
  {
    id: "CLT-001",
    name: "Max Muster",
    email: "max@muster.ch",
    company: "Muster AG",
    status: "active",
    activeOrders: 2,
    totalRevenue: 8450,
    createdAt: "Dezember 2025",
    lastActivity: "Heute",
  },
  {
    id: "CLT-002",
    name: "Anna Schmidt",
    email: "anna@techsolutions.ch",
    company: "Tech Solutions AG",
    status: "active",
    activeOrders: 1,
    totalRevenue: 3200,
    createdAt: "Januar 2026",
    lastActivity: "Gestern",
  },
  {
    id: "CLT-003",
    name: "Peter Weber",
    email: "kontakt@digital.ch",
    company: "Digital GmbH",
    status: "active",
    activeOrders: 1,
    totalRevenue: 2100,
    createdAt: "Februar 2026",
    lastActivity: "vor 3 Tagen",
  },
  {
    id: "CLT-004",
    name: "Lisa Muller",
    email: "hello@startup.ch",
    company: "Startup Inc.",
    status: "pending",
    activeOrders: 0,
    totalRevenue: 0,
    createdAt: "April 2026",
    lastActivity: "vor 1 Woche",
  },
]

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  active: { label: "Aktiv", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  pending: { label: "Ausstehend", bgColor: "bg-amber-50", textColor: "text-amber-700" },
  inactive: { label: "Inaktiv", bgColor: "bg-gray-100", textColor: "text-gray-600" },
}

export default function AdminClientsPage() {
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalRevenue = clients.reduce((sum, c) => sum + c.totalRevenue, 0)
  const activeClients = clients.filter(c => c.status === "active").length

  const handleSendEmail = (email: string) => {
    showToast(`E-Mail an ${email} wird geoffnet...`, "info")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kunden</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie alle Kundenkonten</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Neuer Kunde
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold">{clients.length}</p>
            <p className="text-sm text-muted-foreground">Gesamt Kunden</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{activeClients}</p>
            <p className="text-sm text-muted-foreground">Aktive Kunden</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold">CHF {totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Gesamtumsatz</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold">{clients.filter(c => c.status === "pending").length}</p>
            <p className="text-sm text-muted-foreground">Ausstehend</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Name, Firma oder E-Mail..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kunde</TableHead>
                <TableHead>Unternehmen</TableHead>
                <TableHead className="hidden md:table-cell">Aktive Auftrage</TableHead>
                <TableHead className="hidden md:table-cell">Umsatz</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Letzte Aktivitat</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => {
                const status = statusConfig[client.status]
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-semibold text-muted-foreground">
                            {client.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {client.company}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.activeOrders > 0 ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {client.activeOrders} aktiv
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-semibold">
                      CHF {client.totalRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${status.bgColor} ${status.textColor} border-0`}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {client.lastActivity}
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
                            Profil anzeigen
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendEmail(client.email)}>
                            <Mail className="h-4 w-4 mr-2" />
                            E-Mail senden
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Briefcase className="h-4 w-4 mr-2" />
                            Auftrage anzeigen
                          </DropdownMenuItem>
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
