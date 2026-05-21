import Link from "next/link"
import { ArrowRight, Link2, Plus, ExternalLink, TrendingUp, Clock, CheckCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const backlinks = [
  {
    id: "BL-001",
    domain: "finanz-news.ch",
    url: "https://finanz-news.ch/artikel/beste-finanztools-2026",
    da: 45,
    type: "Gastbeitrag",
    status: "live",
    placedDate: "25. April 2026",
    order: "ORD-003",
  },
  {
    id: "BL-002",
    domain: "business-magazin.ch",
    url: "https://business-magazin.ch/finanzen/digitale-loesungen",
    da: 52,
    type: "Erwähnung",
    status: "live",
    placedDate: "28. April 2026",
    order: "ORD-003",
  },
  {
    id: "BL-003",
    domain: "startup-schweiz.ch",
    url: "https://startup-schweiz.ch/tools-fuer-gruender",
    da: 38,
    type: "Ressourcenliste",
    status: "live",
    placedDate: "30. April 2026",
    order: "ORD-003",
  },
  {
    id: "BL-004",
    domain: "tech-blog.ch",
    url: "https://tech-blog.ch/review/finanz-software",
    da: 41,
    type: "Review",
    status: "pending",
    order: "ORD-003",
  },
]

export default function BacklinksPage() {
  const liveLinks = backlinks.filter(l => l.status === "live")
  const pendingLinks = backlinks.filter(l => l.status === "pending")
  const avgDA = Math.round(liveLinks.reduce((sum, l) => sum + l.da, 0) / liveLinks.length)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Backlinks</h1>
          <p className="text-muted-foreground mt-1">
            Übersicht aller platzierten Backlinks für Ihre Domain
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2]">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Neue Backlinks bestellen
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#007be4]/10">
                <Link2 className="h-6 w-6 text-[#007be4]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{backlinks.length}</p>
                <p className="text-sm text-muted-foreground">Gesamt Links</p>
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
                <p className="text-2xl font-bold">{liveLinks.length}</p>
                <p className="text-sm text-muted-foreground">Live Links</p>
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
                <p className="text-2xl font-bold">{pendingLinks.length}</p>
                <p className="text-sm text-muted-foreground">In Bearbeitung</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgDA || 0}</p>
                <p className="text-sm text-muted-foreground">Avg. DA</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Links */}
      {pendingLinks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">In Bearbeitung</h2>
          <div className="grid gap-4">
            {pendingLinks.map((link) => (
              <Card key={link.id} className="border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/10">
                        <Clock className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{link.domain}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {link.type} • Auftrag: {link.order}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">DA {link.da}</Badge>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                            Ausstehend
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/orders/${link.order}`}>
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

      {/* Live Links */}
      {liveLinks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Live Backlinks</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {liveLinks.map((link) => (
                  <div key={link.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{link.domain}</h3>
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#007be4] hover:text-[#0066c2]">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {link.type} • Platziert am {link.placedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">Domain Authority</p>
                        <div className="flex items-center gap-2">
                          <Progress value={link.da} className="w-20 h-2" />
                          <span className="text-sm font-bold text-[#007be4]">{link.da}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="p-2 rounded-full bg-[#007be4]/10 h-fit">
              <Shield className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="font-medium">Qualitätsgarantie</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Alle Backlinks werden manuell geprüft und stammen von vertrauenswürdigen Domains. 
                Wir garantieren eine Mindest-Domain-Authority und natürliche Linkprofile.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
