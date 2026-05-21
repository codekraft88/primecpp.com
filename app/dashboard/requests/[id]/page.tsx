"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, FileText, Calendar, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "In Bearbeitung", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  reviewed: { label: "Geprüft", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: FileText },
  "offer-created": { label: "Angebot erstellt", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle },
  declined: { label: "Abgelehnt", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: AlertCircle },
}

const mockRequests: Record<string, {
  id: string
  title: string
  category: string
  date: string
  status: string
  description: string
  details: { label: string; value: string }[]
  attachments?: string[]
}> = {
  "REQ-001": {
    id: "REQ-001",
    title: "SEO-Texte für Produktseiten",
    category: "SEO Texte",
    date: "28. April 2026",
    status: "pending",
    description: "Wir benötigen optimierte SEO-Texte für unsere 5 Hauptproduktseiten. Die Texte sollen jeweils ca. 800-1000 Wörter umfassen und auf die jeweiligen Produktkeywords optimiert sein.",
    details: [
      { label: "Anzahl Texte", value: "5 Stück" },
      { label: "Wortanzahl pro Text", value: "800-1000 Wörter" },
      { label: "Zielsprache", value: "Deutsch (CH)" },
      { label: "Keywords", value: "Werden noch geliefert" },
    ],
  },
  "REQ-002": {
    id: "REQ-002",
    title: "Backlink-Aufbau Kampagne",
    category: "Backlinks",
    date: "25. April 2026",
    status: "offer-created",
    description: "Wir möchten unsere Domain Authority verbessern und suchen hochwertige Backlinks aus relevanten Schweizer Quellen.",
    details: [
      { label: "Anzahl Backlinks", value: "10-15 Links" },
      { label: "Domain Authority Ziel", value: "DA 30+" },
      { label: "Branche", value: "Finanzdienstleistungen" },
      { label: "Region", value: "Schweiz / DACH" },
    ],
  },
  "REQ-003": {
    id: "REQ-003",
    title: "Page Audit für Relaunch",
    category: "Page Audit",
    date: "20. April 2026",
    status: "reviewed",
    description: "Vor unserem Website-Relaunch benötigen wir ein umfassendes Audit der aktuellen Website, um Verbesserungspotenziale zu identifizieren.",
    details: [
      { label: "Anzahl URLs", value: "Ca. 50 Seiten" },
      { label: "Fokus", value: "SEO & Performance" },
      { label: "Zeitrahmen", value: "Innerhalb 2 Wochen" },
      { label: "Konkurrenzanalyse", value: "Ja, 3 Wettbewerber" },
    ],
  },
}

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const request = mockRequests[id]

  if (!request) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/dashboard/requests">
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Anfragen
          </Link>
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Anfrage nicht gefunden</h2>
              <p className="text-muted-foreground mt-2">Die angeforderte Anfrage existiert nicht.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const status = statusConfig[request.status]
  const StatusIcon = status.icon

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="gap-2 -ml-2">
        <Link href="/dashboard/requests">
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Anfragen
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline">{request.category}</Badge>
            <Badge variant="outline" className={status.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{request.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Erstellt am {request.date}</span>
            <span className="text-gray-300">|</span>
            <span>{request.id}</span>
          </div>
        </div>
        {request.status === "offer-created" && (
          <Button asChild className="bg-[#007be4] hover:bg-[#0066c2]">
            <Link href="/dashboard/offers">
              Angebot ansehen
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Beschreibung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{request.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anfrage-Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {request.details.map((detail, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <dt className="text-sm text-muted-foreground">{detail.label}</dt>
                    <dd className="font-medium mt-1">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status-Verlauf</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#007be4] mt-2" />
                  <div>
                    <p className="text-sm font-medium">Anfrage eingereicht</p>
                    <p className="text-xs text-muted-foreground">{request.date}</p>
                  </div>
                </div>
                {request.status !== "pending" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#007be4] mt-2" />
                    <div>
                      <p className="text-sm font-medium">In Bearbeitung</p>
                      <p className="text-xs text-muted-foreground">Wird geprüft</p>
                    </div>
                  </div>
                )}
                {request.status === "offer-created" && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium">Angebot erstellt</p>
                      <p className="text-xs text-muted-foreground">Bereit zur Prüfung</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hilfe benötigt?</CardTitle>
              <CardDescription>Unser Team ist für Sie da</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Support kontaktieren
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
