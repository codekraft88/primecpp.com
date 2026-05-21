import Link from "next/link"
import { ArrowRight, FileSearch, Plus, Download, Eye, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const audits = [
  {
    id: "AUD-001",
    title: "Homepage Performance Audit",
    type: "Performance",
    urls: 1,
    score: 85,
    status: "completed",
    deliveredDate: "15. April 2026",
    issues: { critical: 0, warnings: 3, passed: 42 },
    order: "ORD-002",
  },
  {
    id: "AUD-002",
    title: "Vollständiges SEO Audit",
    type: "SEO",
    urls: 25,
    score: 72,
    status: "completed",
    deliveredDate: "20. April 2026",
    issues: { critical: 2, warnings: 8, passed: 35 },
    order: "ORD-004",
  },
  {
    id: "AUD-003",
    title: "Mobile Usability Check",
    type: "Usability",
    urls: 10,
    status: "in-progress",
    order: "ORD-006",
  },
]

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-red-500"
  const bgColor = score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"
  
  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-gray-200"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={`${(score / 100) * 176} 176`}
          className={color}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${color}`}>{score}</span>
      </div>
    </div>
  )
}

export default function AuditsPage() {
  const completedAudits = audits.filter(a => a.status === "completed")
  const inProgressAudits = audits.filter(a => a.status === "in-progress")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Page Audits</h1>
          <p className="text-muted-foreground mt-1">
            Detaillierte Analysen Ihrer Webseiten
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2]">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Neues Audit bestellen
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#007be4]/10">
                <FileSearch className="h-6 w-6 text-[#007be4]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{audits.length}</p>
                <p className="text-sm text-muted-foreground">Gesamt Audits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedAudits.length}</p>
                <p className="text-sm text-muted-foreground">Abgeschlossen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressAudits.length}</p>
                <p className="text-sm text-muted-foreground">In Bearbeitung</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* In Progress */}
      {inProgressAudits.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">In Bearbeitung</h2>
          <div className="grid gap-4">
            {inProgressAudits.map((audit) => (
              <Card key={audit.id} className="border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/10">
                        <Clock className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{audit.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {audit.type} • {audit.urls} URL{audit.urls > 1 ? "s" : ""} • Auftrag: {audit.order}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/orders/${audit.order}`}>
                        Auftrag ansehen
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Audits */}
      {completedAudits.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Abgeschlossene Audits</h2>
          <div className="grid gap-4">
            {completedAudits.map((audit) => (
              <Card key={audit.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <ScoreCircle score={audit.score!} />
                      <div>
                        <h3 className="font-semibold">{audit.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {audit.type} • {audit.urls} URL{audit.urls > 1 ? "s" : ""} • Geliefert am {audit.deliveredDate}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          {audit.issues!.critical > 0 && (
                            <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                              {audit.issues!.critical} Kritisch
                            </Badge>
                          )}
                          {audit.issues!.warnings > 0 && (
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                              {audit.issues!.warnings} Warnungen
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            {audit.issues!.passed} Bestanden
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Ansehen
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {audits.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <FileSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Noch keine Audits</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              Bestellen Sie ein Page Audit, um Verbesserungspotenziale zu identifizieren.
            </p>
            <Button asChild className="mt-6 bg-[#007be4] hover:bg-[#0066c2]">
              <Link href="/dashboard/new-order">
                <Plus className="mr-2 h-4 w-4" />
                Jetzt bestellen
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="p-2 rounded-full bg-[#007be4]/10 h-fit">
              <TrendingUp className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="font-medium">Was beinhaltet ein Audit?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Unsere Audits analysieren Performance, SEO, Accessibility und Usability Ihrer Webseiten. 
                Sie erhalten einen detaillierten Report mit priorisierten Handlungsempfehlungen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
