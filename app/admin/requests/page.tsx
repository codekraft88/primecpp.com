import Link from "next/link"
import {
  ArrowRight,
  FileSearch,
  FileText,
  Link2,
  Video,
  Clock,
  Eye,
  User,
  Calendar,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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

const statusConfig: Record<string, { label: string; color: string }> = {
  "new": { label: "Neu", color: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  "in-review": { label: "In Prüfung", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  "question-sent": { label: "Rückfrage gesendet", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  "offer-created": { label: "Angebot erstellt", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  "declined": { label: "Abgelehnt", color: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
}

const categoryIcons: Record<string, React.ElementType> = {
  "page-audit": FileSearch,
  "seo-texts": FileText,
  "backlinks": Link2,
  "ugc-videos": Video,
}

const requests = [
  {
    id: "REQ-010",
    title: "Page Audit für techsolutions.ch",
    client: "Tech Solutions AG",
    clientEmail: "info@techsolutions.ch",
    category: "page-audit",
    categoryLabel: "Page Audit",
    submittedDate: "Heute, 14:32",
    status: "new",
  },
  {
    id: "REQ-009",
    title: "UGC Video für Produktlaunch",
    client: "Muster AG",
    clientEmail: "max@muster.ch",
    category: "ugc-videos",
    categoryLabel: "UGC Videos",
    submittedDate: "Heute, 10:15",
    status: "new",
  },
  {
    id: "REQ-008",
    title: "SEO Text für Landingpage Zürich",
    client: "Digital GmbH",
    clientEmail: "kontakt@digital.ch",
    category: "seo-texts",
    categoryLabel: "SEO Texte",
    submittedDate: "Gestern, 16:45",
    status: "in-review",
  },
  {
    id: "REQ-007",
    title: "Backlink Check bestehende Website",
    client: "Startup Inc.",
    clientEmail: "hello@startup.ch",
    category: "backlinks",
    categoryLabel: "Backlinks",
    submittedDate: "28. April 2026",
    status: "question-sent",
  },
  {
    id: "REQ-006",
    title: "SEO Content Strategie",
    client: "Muster AG",
    clientEmail: "max@muster.ch",
    category: "seo-texts",
    categoryLabel: "SEO Content",
    submittedDate: "27. April 2026",
    status: "offer-created",
  },
]

export default function AdminRequestsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Neue Anfragen</h1>
          <p className="text-muted-foreground mt-1">
            Prüfen und bearbeiten Sie eingegangene Kundenanfragen
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Suchen nach Kunde, Anfrage..." className="pl-10" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="new">Neu</SelectItem>
                <SelectItem value="in-review">In Prüfung</SelectItem>
                <SelectItem value="question-sent">Rückfrage gesendet</SelectItem>
                <SelectItem value="offer-created">Angebot erstellt</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                <SelectItem value="page-audit">Page Audit</SelectItem>
                <SelectItem value="seo-texts">SEO Texte</SelectItem>
                <SelectItem value="backlinks">Backlinks</SelectItem>
                <SelectItem value="ugc-videos">UGC Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Gesamt</p>
            <p className="text-2xl font-bold mt-1">{requests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Neu</p>
            <p className="text-2xl font-bold mt-1 text-rose-600">{requests.filter(r => r.status === "new").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">In Prüfung</p>
            <p className="text-2xl font-bold mt-1">{requests.filter(r => r.status === "in-review").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Rückfrage</p>
            <p className="text-2xl font-bold mt-1">{requests.filter(r => r.status === "question-sent").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Angebot erstellt</p>
            <p className="text-2xl font-bold mt-1">{requests.filter(r => r.status === "offer-created").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Anfragen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anfrage</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead className="hidden md:table-cell">Kategorie</TableHead>
                <TableHead className="hidden md:table-cell">Eingereicht</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const status = statusConfig[request.status]
                const CategoryIcon = categoryIcons[request.category] || FileText
                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-xs text-muted-foreground">{request.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{request.client}</p>
                          <p className="text-xs text-muted-foreground">{request.clientEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{request.categoryLabel}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {request.submittedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/requests/${request.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Prüfen
                        </Link>
                      </Button>
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
