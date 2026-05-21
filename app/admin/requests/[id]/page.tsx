"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  Calendar,
  Globe,
  FileText,
  MessageSquare,
  FileCheck,
  X,
  Clock,
  Send,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock request data
const request = {
  id: "REQ-010",
  title: "Page Audit für techsolutions.ch",
  status: "new",
  submittedDate: "Heute, 14:32",
  client: {
    name: "Tech Solutions AG",
    email: "info@techsolutions.ch",
    company: "Tech Solutions AG",
  },
  service: "Page Audit",
  details: {
    websiteUrl: "https://techsolutions.ch",
    goal: "Analyse der technischen Performance und SEO-Struktur der Website. Wir möchten verstehen, warum die Seite in den Rankings nicht gut performt.",
    pageCount: "5-10 Seiten",
    focus: ["SEO", "Technik", "Content"],
    searchConsoleAccess: "Ja",
    additionalNotes: "Bitte besonders auf die Ladezeiten achten. Wir haben das Gefühl, dass die Seite langsam ist.",
  },
  internalNotes: [],
}

const statusOptions = [
  { value: "new", label: "Neu" },
  { value: "in-review", label: "In Prüfung" },
  { value: "question-sent", label: "Rückfrage gesendet" },
  { value: "offer-created", label: "Angebot erstellt" },
  { value: "declined", label: "Abgelehnt" },
]

export default function AdminRequestDetailPage() {
  const [status, setStatus] = useState(request.status)
  const [internalNote, setInternalNote] = useState("")
  const [clientQuestion, setClientQuestion] = useState("")

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/requests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">Page Audit</Badge>
            <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/20">
              Neu
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{request.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/offers/new?request=${request.id}`}>
              <FileCheck className="h-4 w-4 mr-2" />
              Angebot erstellen
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle>Anfrage-Details</CardTitle>
              <CardDescription>Eingereicht am {request.submittedDate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Website-URL</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={request.details.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {request.details.websiteUrl}
                    </a>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Anzahl Seiten</Label>
                  <p className="mt-1 font-medium">{request.details.pageCount}</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-muted-foreground">Ziel der Analyse</Label>
                <p className="mt-1">{request.details.goal}</p>
              </div>

              <div>
                <Label className="text-muted-foreground">Gewünschter Fokus</Label>
                <div className="flex gap-2 mt-2">
                  {request.details.focus.map((f) => (
                    <Badge key={f} variant="secondary">{f}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Search Console Zugang</Label>
                  <p className="mt-1 font-medium">{request.details.searchConsoleAccess}</p>
                </div>
              </div>

              {request.details.additionalNotes && (
                <div className="p-4 bg-muted/50 rounded-xl">
                  <Label className="text-muted-foreground">Zusätzliche Hinweise vom Kunden</Label>
                  <p className="mt-1">{request.details.additionalNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Send Question to Client */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Rückfrage an Kunden
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Nachricht an {request.client.name}</Label>
                <Textarea
                  id="question"
                  placeholder="Schreiben Sie eine Rückfrage an den Kunden..."
                  value={clientQuestion}
                  onChange={(e) => setClientQuestion(e.target.value)}
                  rows={4}
                />
              </div>
              <Button disabled={!clientQuestion.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Rückfrage senden
              </Button>
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Interne Notizen
              </CardTitle>
              <CardDescription>Nur für Admins sichtbar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {request.internalNotes.length === 0 && (
                <p className="text-sm text-muted-foreground">Noch keine internen Notizen.</p>
              )}
              <div className="space-y-2">
                <Textarea
                  placeholder="Interne Notiz hinzufügen..."
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  rows={3}
                />
              </div>
              <Button variant="outline" disabled={!internalNote.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Notiz hinzufügen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle>Kundeninformationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{request.client.name}</p>
                  <p className="text-sm text-muted-foreground">{request.client.company}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${request.client.email}`} className="text-primary hover:underline">
                    {request.client.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{request.client.company}</span>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/admin/clients/1`}>
                  Kundenprofil ansehen
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status ändern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Status speichern
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={`/admin/offers/new?request=${request.id}`}>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Angebot erstellen
                </Link>
              </Button>
              <Button variant="outline" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                <X className="h-4 w-4 mr-2" />
                Anfrage ablehnen
              </Button>
            </CardContent>
          </Card>

          {/* Timeline Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Verlauf</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="text-sm font-medium">Anfrage eingereicht</p>
                    <p className="text-xs text-muted-foreground">{request.submittedDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
