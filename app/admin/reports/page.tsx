"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Plus,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  FileText,
  BarChart3,
  Video,
  Globe,
  Users,
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

const reports = [
  {
    id: "RPT-001",
    title: "SEO Monatsreport April 2026",
    type: "seo-report",
    typeLabel: "SEO Report",
    client: "Muster AG",
    order: "ORD-2026-001",
    status: "published",
    createdAt: "28. April 2026",
    visibility: "client",
  },
  {
    id: "RPT-002",
    title: "Page Audit Report - primecpp.ch",
    type: "page-audit",
    typeLabel: "Page Audit",
    client: "Muster AG",
    order: "ORD-2026-002",
    status: "published",
    createdAt: "29. April 2026",
    visibility: "client",
  },
  {
    id: "RPT-003",
    title: "Backlink Dokumentation Q1",
    type: "backlinks",
    typeLabel: "Backlinks",
    client: "Tech Solutions AG",
    order: "ORD-2026-005",
    status: "published",
    createdAt: "5. April 2026",
    visibility: "client",
  },
  {
    id: "RPT-004",
    title: "UGC Video Delivery - Summer Collection",
    type: "ugc",
    typeLabel: "UGC Video",
    client: "Muster AG",
    order: "ORD-2026-003",
    status: "draft",
    createdAt: "25. April 2026",
    visibility: "internal",
  },
]

const typeIcons: Record<string, typeof FileText> = {
  "seo-report": BarChart3,
  "page-audit": FileText,
  "backlinks": Globe,
  "ugc": Video,
}

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  draft: { label: "Entwurf", bgColor: "bg-gray-100", textColor: "text-gray-600" },
  published: { label: "Veroffentlicht", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
}

export default function AdminReportsPage() {
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.client.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePublish = (reportId: string) => {
    showToast(`Report ${reportId} wurde veroffentlicht.`, "success")
  }

  const handleDelete = (reportId: string) => {
    showToast(`Report ${reportId} wurde geloscht.`, "info")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Verwalten und veroffentlichen Sie Reports fur Kunden</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="h-4 w-4 mr-2" />
          Report hochladen
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Gesamt Reports</p>
            <p className="text-2xl font-bold mt-1">{reports.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Veroffentlicht</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{reports.filter(r => r.status === "published").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Entwurfe</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{reports.filter(r => r.status === "draft").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Kunden</p>
            <p className="text-2xl font-bold mt-1">{new Set(reports.map(r => r.client)).size}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Suche nach Report oder Kunde..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Status</SelectItem>
            <SelectItem value="published">Veroffentlicht</SelectItem>
            <SelectItem value="draft">Entwurf</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead className="hidden md:table-cell">Typ</TableHead>
                <TableHead className="hidden md:table-cell">Auftrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Sichtbarkeit</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => {
                const status = statusConfig[report.status]
                const TypeIcon = typeIcons[report.type] || FileText
                return (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-xs text-muted-foreground">{report.id} - {report.createdAt}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {report.client}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{report.typeLabel}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {report.order}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${status.bgColor} ${status.textColor} border-0`}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className={report.visibility === "client" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}>
                        {report.visibility === "client" ? "Fur Kunden sichtbar" : "Intern"}
                      </Badge>
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
                            Vorschau
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Herunterladen
                          </DropdownMenuItem>
                          {report.status === "draft" && (
                            <DropdownMenuItem onClick={() => handlePublish(report.id)}>
                              <Upload className="h-4 w-4 mr-2" />
                              Veroffentlichen
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(report.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Loschen
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
