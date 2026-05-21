"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Calendar, FileText, Download, MessageSquare, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  "in-progress": { label: "In Bearbeitung", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Play },
  "review": { label: "Review", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  "completed": { label: "Abgeschlossen", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle },
  "paused": { label: "Pausiert", color: "bg-gray-500/10 text-gray-600 border-gray-500/20", icon: Pause },
}

const mockOrders: Record<string, {
  id: string
  title: string
  category: string
  startDate: string
  dueDate: string
  status: string
  progress: number
  description: string
  deliverables: { name: string; status: string; date?: string }[]
  team: { name: string; role: string }[]
  updates: { date: string; message: string; type: string }[]
}> = {
  "ORD-001": {
    id: "ORD-001",
    title: "SEO-Texte Produktseiten",
    category: "SEO Texte",
    startDate: "1. Mai 2026",
    dueDate: "15. Mai 2026",
    status: "in-progress",
    progress: 60,
    description: "Erstellung von 5 SEO-optimierten Produktbeschreibungen für die Hauptproduktseiten.",
    deliverables: [
      { name: "Text 1: Hauptprodukt", status: "completed", date: "3. Mai 2026" },
      { name: "Text 2: Premium-Linie", status: "completed", date: "5. Mai 2026" },
      { name: "Text 3: Starter-Paket", status: "completed", date: "7. Mai 2026" },
      { name: "Text 4: Enterprise", status: "in-progress" },
      { name: "Text 5: Add-Ons", status: "pending" },
    ],
    team: [
      { name: "Anna Schmidt", role: "Content Managerin" },
      { name: "Luca Weber", role: "SEO Spezialist" },
    ],
    updates: [
      { date: "7. Mai 2026", message: "Text 3 wurde fertiggestellt und zur Prüfung freigegeben.", type: "progress" },
      { date: "5. Mai 2026", message: "Text 2 abgeschlossen. Keywords wurden optimiert.", type: "progress" },
      { date: "1. Mai 2026", message: "Projekt gestartet. Keyword-Recherche abgeschlossen.", type: "start" },
    ],
  },
  "ORD-003": {
    id: "ORD-003",
    title: "Backlink-Aufbau Q2",
    category: "Backlinks",
    startDate: "15. April 2026",
    dueDate: "30. Juni 2026",
    status: "in-progress",
    progress: 35,
    description: "Aufbau von 15 hochwertigen Backlinks aus relevanten Schweizer Quellen zur Steigerung der Domain Authority.",
    deliverables: [
      { name: "5 Backlinks - Finanzportale", status: "completed", date: "25. April 2026" },
      { name: "5 Backlinks - Branchenblogs", status: "in-progress" },
      { name: "5 Backlinks - Newsportale", status: "pending" },
    ],
    team: [
      { name: "Marco Bernasconi", role: "Link Builder" },
      { name: "Sara Meier", role: "Outreach Managerin" },
    ],
    updates: [
      { date: "2. Mai 2026", message: "Erste Kontakte zu Newsportalen hergestellt.", type: "progress" },
      { date: "25. April 2026", message: "5 Finanzportal-Links erfolgreich platziert.", type: "milestone" },
      { date: "15. April 2026", message: "Projekt gestartet. Zielliste erstellt.", type: "start" },
    ],
  },
  "ORD-005": {
    id: "ORD-005",
    title: "UGC Video Kampagne",
    category: "UGC Videos",
    startDate: "20. April 2026",
    dueDate: "20. Mai 2026",
    status: "review",
    progress: 85,
    description: "Produktion von 3 authentischen UGC-Videos für Social Media Marketing.",
    deliverables: [
      { name: "Video 1: Produktunboxing", status: "completed", date: "28. April 2026" },
      { name: "Video 2: Anwendungsdemo", status: "completed", date: "5. Mai 2026" },
      { name: "Video 3: Testimonial", status: "review" },
    ],
    team: [
      { name: "Julia Keller", role: "Video Producerin" },
      { name: "Tim Hofer", role: "Content Creator" },
    ],
    updates: [
      { date: "8. Mai 2026", message: "Video 3 fertig - wartet auf Kundenfeedback.", type: "review" },
      { date: "5. Mai 2026", message: "Anwendungsdemo abgenommen.", type: "milestone" },
      { date: "28. April 2026", message: "Erstes Video fertiggestellt.", type: "milestone" },
    ],
  },
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = mockOrders[id]

  if (!order) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/dashboard/orders">
            <ArrowLeft className="h-4 w-4" />
            Zurück zu Aufträgen
          </Link>
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Auftrag nicht gefunden</h2>
              <p className="text-muted-foreground mt-2">Der angeforderte Auftrag existiert nicht.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const status = statusConfig[order.status]
  const StatusIcon = status.icon

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="gap-2 -ml-2">
        <Link href="/dashboard/orders">
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Aufträgen
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline">{order.category}</Badge>
            <Badge variant="outline" className={status.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {status.label}
            </Badge>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{order.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{order.startDate} - {order.dueDate}</span>
            <span className="text-gray-300">|</span>
            <span>{order.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Downloads
          </Button>
          <Button className="gap-2 bg-[#007be4] hover:bg-[#0066c2]">
            <MessageSquare className="h-4 w-4" />
            Feedback geben
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="border-[#007be4]/20 bg-[#007be4]/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Gesamtfortschritt</span>
            <span className="text-2xl font-bold text-[#007be4]">{order.progress}%</span>
          </div>
          <Progress value={order.progress} className="h-3" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Beschreibung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{order.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lieferobjekte</CardTitle>
              <CardDescription>Status der einzelnen Deliverables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.deliverables.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.status === "completed" && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                      {item.status === "in-progress" && <Clock className="h-5 w-5 text-blue-500" />}
                      {item.status === "pending" && <div className="h-5 w-5 rounded-full border-2 border-gray-300" />}
                      {item.status === "review" && <Clock className="h-5 w-5 text-amber-500" />}
                      <span className={item.status === "completed" ? "line-through text-muted-foreground" : "font-medium"}>
                        {item.name}
                      </span>
                    </div>
                    {item.date && (
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projekt-Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.updates.map((update, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-3 h-3 rounded-full bg-[#007be4] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-sm">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ihr Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007be4] to-[#00a8ff] flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Zeitrahmen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Start</span>
                  <span className="text-sm font-medium">{order.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Deadline</span>
                  <span className="text-sm font-medium">{order.dueDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dokumente</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Alle Downloads
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
