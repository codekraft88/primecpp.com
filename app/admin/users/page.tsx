"use client"

import { useState } from "react"
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Building2,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  UserPlus
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const users = [
  {
    id: "USR-001",
    name: "Max Mustermann",
    email: "max@example.com",
    phone: "+41 79 123 45 67",
    company: "Mustermann AG",
    status: "active",
    role: "client",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-10",
    totalOrders: 5,
    totalSpent: 12500
  },
  {
    id: "USR-002",
    name: "Anna Schmidt",
    email: "anna@company.ch",
    phone: "+41 79 234 56 78",
    company: "Schmidt GmbH",
    status: "active",
    role: "client",
    createdAt: "2024-02-20",
    lastLogin: "2024-03-09",
    totalOrders: 3,
    totalSpent: 8900
  },
  {
    id: "USR-003",
    name: "Peter Weber",
    email: "peter@weber.ch",
    phone: "+41 79 345 67 89",
    company: "Weber Solutions",
    status: "pending",
    role: "client",
    createdAt: "2024-03-01",
    lastLogin: null,
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: "USR-004",
    name: "Lisa Müller",
    email: "lisa@startup.io",
    phone: "+41 79 456 78 90",
    company: "Startup IO",
    status: "inactive",
    role: "client",
    createdAt: "2023-11-10",
    lastLogin: "2024-01-05",
    totalOrders: 2,
    totalSpent: 4500
  },
]

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktiv", variant: "default" },
  pending: { label: "Ausstehend", variant: "secondary" },
  inactive: { label: "Inaktiv", variant: "outline" },
  blocked: { label: "Gesperrt", variant: "destructive" },
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Benutzerverwaltung</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie alle registrierten Benutzer</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Benutzer einladen
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Gesamt</p>
          <p className="text-2xl font-bold text-foreground mt-1">{users.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Aktiv</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {users.filter(u => u.status === "active").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Ausstehend</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {users.filter(u => u.status === "pending").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Inaktiv</p>
          <p className="text-2xl font-bold text-muted-foreground mt-1">
            {users.filter(u => u.status === "inactive").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Name, E-Mail oder Firma..."
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
            <SelectItem value="active">Aktiv</SelectItem>
            <SelectItem value="pending">Ausstehend</SelectItem>
            <SelectItem value="inactive">Inaktiv</SelectItem>
            <SelectItem value="blocked">Gesperrt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Benutzer</TableHead>
              <TableHead>Firma</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bestellungen</TableHead>
              <TableHead>Umsatz</TableHead>
              <TableHead>Registriert</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{user.company}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusConfig[user.status].variant}>
                    {statusConfig[user.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{user.totalOrders}</TableCell>
                <TableCell>CHF {user.totalSpent.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(user.createdAt).toLocaleDateString('de-CH')}
                  </div>
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
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        E-Mail senden
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "active" ? (
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Deaktivieren
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Aktivieren
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
