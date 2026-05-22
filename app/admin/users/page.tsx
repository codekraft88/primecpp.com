"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Calendar,
  Building2,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Loader2,
  UserX,
  Archive,
  RotateCcw,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/toast-provider"

interface User {
  id: string
  full_name: string | null
  email: string
  phone: string | null
  company: string | null
  status: string
  role: string
  created_at: string
  last_sign_in_at: string | null
  total_orders: number
  total_spent: number
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktiv", variant: "default" },
  blocked: { label: "Gesperrt", variant: "destructive" },
  archived: { label: "Archiviert", variant: "outline" },
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    type: "block" | "unblock" | "archive" | null
    user: User | null
  }>({ open: false, type: null, user: null })
  const [isProcessing, setIsProcessing] = useState(false)
  const { showToast } = useToast()

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.company?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (userId: string, newStatus: string) => {
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        await fetchUsers()
        const actionLabels: Record<string, string> = {
          blocked: "gesperrt",
          active: "aktiviert",
          archived: "archiviert",
        }
        showToast(`Benutzer wurde ${actionLabels[newStatus]}.`, "success")
      } else {
        showToast("Aktion fehlgeschlagen.", "error")
      }
    } catch {
      showToast("Aktion fehlgeschlagen.", "error")
    } finally {
      setIsProcessing(false)
      setConfirmDialog({ open: false, type: null, user: null })
    }
  }

  const openConfirmDialog = (type: "block" | "unblock" | "archive", user: User) => {
    setConfirmDialog({ open: true, type, user })
  }

  const getConfirmDialogContent = () => {
    if (!confirmDialog.user) return { title: "", description: "" }
    
    const userName = confirmDialog.user.full_name || confirmDialog.user.email
    
    switch (confirmDialog.type) {
      case "block":
        return {
          title: "Benutzer sperren",
          description: `Möchten Sie "${userName}" wirklich sperren? Der Benutzer kann sich nicht mehr anmelden und hat keinen Zugriff auf das Dashboard.`,
        }
      case "unblock":
        return {
          title: "Benutzer aktivieren",
          description: `Möchten Sie "${userName}" wieder aktivieren? Der Benutzer erhält wieder vollen Zugriff.`,
        }
      case "archive":
        return {
          title: "Benutzer archivieren",
          description: `Möchten Sie "${userName}" archivieren? Der Benutzer wird als gelöscht markiert und kann sich nicht mehr anmelden.`,
        }
      default:
        return { title: "", description: "" }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const dialogContent = getConfirmDialogContent()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Benutzerverwaltung</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie alle registrierten Benutzer</p>
        </div>
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
          <p className="text-sm text-muted-foreground">Gesperrt</p>
          <p className="text-2xl font-bold text-rose-600 mt-1">
            {users.filter(u => u.status === "blocked").length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Archiviert</p>
          <p className="text-2xl font-bold text-muted-foreground mt-1">
            {users.filter(u => u.status === "archived").length}
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
            <SelectItem value="blocked">Gesperrt</SelectItem>
            <SelectItem value="archived">Archiviert</SelectItem>
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
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Keine Benutzer gefunden
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {(user.full_name || user.email).split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.full_name || "Kein Name"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.company ? (
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{user.company}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[user.status]?.variant || "outline"}>
                      {statusConfig[user.status]?.label || user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.total_orders}</TableCell>
                  <TableCell>CHF {user.total_spent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.created_at).toLocaleDateString('de-CH')}
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
                        {user.status === "active" && (
                          <DropdownMenuItem 
                            className="text-rose-600"
                            onClick={() => openConfirmDialog("block", user)}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Sperren
                          </DropdownMenuItem>
                        )}
                        {user.status === "blocked" && (
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => openConfirmDialog("unblock", user)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Aktivieren
                          </DropdownMenuItem>
                        )}
                        {user.status !== "archived" && (
                          <DropdownMenuItem 
                            className="text-muted-foreground"
                            onClick={() => openConfirmDialog("archive", user)}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            Archivieren
                          </DropdownMenuItem>
                        )}
                        {user.status === "archived" && (
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => openConfirmDialog("unblock", user)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Wiederherstellen
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => !open && setConfirmDialog({ open: false, type: null, user: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialog({ open: false, type: null, user: null })}
              disabled={isProcessing}
            >
              Abbrechen
            </Button>
            <Button 
              variant={confirmDialog.type === "unblock" ? "default" : "destructive"}
              onClick={() => {
                if (!confirmDialog.user) return
                const newStatus = confirmDialog.type === "unblock" ? "active" : 
                                 confirmDialog.type === "block" ? "blocked" : "archived"
                handleStatusChange(confirmDialog.user.id, newStatus)
              }}
              disabled={isProcessing}
            >
              {isProcessing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {confirmDialog.type === "block" && "Sperren"}
              {confirmDialog.type === "unblock" && "Aktivieren"}
              {confirmDialog.type === "archive" && "Archivieren"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
