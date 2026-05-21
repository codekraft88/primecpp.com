import Link from "next/link"
import { ArrowRight, FileText, Plus, Download, Eye, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const seoTexts = [
  {
    id: "SEO-001",
    title: "Landingpage Hauptprodukt",
    wordCount: 1250,
    keywords: ["Produktname", "Hauptkeyword", "Nebenkeyword"],
    status: "completed",
    deliveredDate: "3. Mai 2026",
    order: "ORD-001",
  },
  {
    id: "SEO-002",
    title: "Produktseite Premium-Linie",
    wordCount: 980,
    keywords: ["Premium", "Qualität", "Schweiz"],
    status: "completed",
    deliveredDate: "5. Mai 2026",
    order: "ORD-001",
  },
  {
    id: "SEO-003",
    title: "Blog: 10 Tipps für Anfänger",
    wordCount: 1500,
    keywords: ["Tipps", "Anfänger", "Guide"],
    status: "in-progress",
    order: "ORD-007",
  },
]

export default function SeoTextsPage() {
  const completedTexts = seoTexts.filter(t => t.status === "completed")
  const inProgressTexts = seoTexts.filter(t => t.status === "in-progress")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">SEO Texte</h1>
          <p className="text-muted-foreground mt-1">
            Alle Ihre bestellten SEO-Texte an einem Ort
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2]">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Neue Texte bestellen
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#007be4]/10">
                <FileText className="h-6 w-6 text-[#007be4]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{seoTexts.length}</p>
                <p className="text-sm text-muted-foreground">Gesamt Texte</p>
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
                <p className="text-2xl font-bold">{completedTexts.length}</p>
                <p className="text-sm text-muted-foreground">Geliefert</p>
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
                <p className="text-2xl font-bold">{inProgressTexts.length}</p>
                <p className="text-sm text-muted-foreground">In Bearbeitung</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* In Progress */}
      {inProgressTexts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">In Bearbeitung</h2>
          <div className="grid gap-4">
            {inProgressTexts.map((text) => (
              <Card key={text.id} className="border-amber-500/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/10">
                        <Clock className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{text.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Auftrag: {text.order}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {text.keywords.map((kw, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/orders/${text.order}`}>
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

      {/* Completed Texts */}
      {completedTexts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Gelieferte Texte</h2>
          <div className="grid gap-4">
            {completedTexts.map((text) => (
              <Card key={text.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-emerald-500/10">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{text.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {text.wordCount} Wörter • Geliefert am {text.deliveredDate}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {text.keywords.map((kw, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{kw}</Badge>
                          ))}
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
                        Download
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
      {seoTexts.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Noch keine SEO-Texte</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              Bestellen Sie Ihre ersten SEO-optimierten Texte für bessere Rankings.
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
    </div>
  )
}
