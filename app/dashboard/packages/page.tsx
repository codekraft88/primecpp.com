import Link from "next/link"
import { Check, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const currentPackage = {
  name: "SEO Growth",
  price: "CHF 1.190",
  period: "/ Monat",
  status: "Aktiv",
  startDate: "1. Dezember 2025",
  nextBilling: "1. Juni 2026",
  features: [
    "Detailliertes SEO-Audit",
    "Keyword-Strategie",
    "Konkurrenzanalyse",
    "Bis zu 10 Seiten/Monat optimieren",
    "2 SEO-Landingpages/Monat",
    "Monatlicher Strategy Call (30 Min.)",
  ],
}

const availableUpgrades = [
  {
    name: "SEO Premium",
    price: "CHF 2.490",
    period: "/ Monat",
    description: "SEO professionell als zentralen Wachstumskanal nutzen",
    features: [
      "Komplette SEO-Strategie",
      "Technisches SEO-Audit",
      "Keyword-Cluster & Content-Architektur",
      "Key Pages & Landingpages optimieren",
      "Conversion-fokussierte Optimierung",
      "Detailliertes Reporting mit Aktionsplan",
    ],
    recommended: true,
  },
  {
    name: "Content Growth",
    price: "CHF 990",
    period: "/ Monat",
    description: "Regelmässige, relevante Inhalte für Website und SEO",
    features: [
      "Monatliche Themenrecherche",
      "Redaktionsplan",
      "2 SEO-Texte/Blogartikel pro Monat",
      "Keyword-Integration",
      "Strukturierte Überschriften",
    ],
    recommended: false,
  },
  {
    name: "Backlink Basic",
    price: "CHF 790",
    period: "/ Monat",
    description: "Natürlicher Aufbau relevanter Referenzen",
    features: [
      "Recherche relevanter Link-Möglichkeiten",
      "Lokale & branchenbezogene Einträge",
      "Review bestehender Unternehmensprofile",
      "Monatliche Dokumentation",
    ],
    recommended: false,
  },
]

export default function PackagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Meine Pakete</h1>
        <p className="text-muted-foreground mt-1">
          Verwalten Sie Ihre aktiven Pakete und entdecken Sie Upgrade-Möglichkeiten.
        </p>
      </div>

      {/* Current Package */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">Aktuelles Paket</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Ihr derzeit aktives Paket
              </p>
            </div>
            <Badge className="bg-primary text-primary-foreground">
              {currentPackage.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {currentPackage.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-primary">{currentPackage.price}</span>
                <span className="text-muted-foreground">{currentPackage.period}</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Startdatum:</span> {currentPackage.startDate}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Nächste Abrechnung:</span> {currentPackage.nextBilling}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Enthaltene Leistungen:</h4>
              <ul className="space-y-2">
                {currentPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Upgrades */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">Verfügbare Erweiterungen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableUpgrades.map((upgrade) => (
            <Card
              key={upgrade.name}
              className={upgrade.recommended ? "border-primary shadow-lg" : ""}
            >
              {upgrade.recommended && (
                <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-t-xl">
                  <Star className="h-4 w-4" />
                  Empfohlen
                </div>
              )}
              <CardHeader>
                <CardTitle>{upgrade.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{upgrade.price}</span>
                  <span className="text-muted-foreground text-sm">{upgrade.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{upgrade.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {upgrade.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={
                    upgrade.recommended
                      ? "w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "w-full"
                  }
                  variant={upgrade.recommended ? "default" : "outline"}
                >
                  <Link href="/dashboard/support">
                    Paket anfragen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Need Help */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Brauchen Sie ein individuelles Paket?</h3>
            <p className="text-sm text-muted-foreground">
              Wir erstellen gerne ein massgeschneidertes Angebot für Ihre spezifischen Anforderungen.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/support">
              Kontakt aufnehmen
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
