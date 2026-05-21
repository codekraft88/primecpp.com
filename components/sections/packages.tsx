"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Package {
  name: string
  price: string
  period?: string
  minTerm?: string
  idealFor: string
  description: string
  included: string[]
  notIncluded?: string[]
  cta: string
  popular?: boolean
  directBook?: boolean
}

const seoPackages: Package[] = [
  {
    name: "SEO Starter",
    price: "ab CHF 590",
    period: "/ Monat",
    minTerm: "3 Monate",
    idealFor: "Kleine Unternehmen, lokale Dienstleister, neue Websites",
    description: "Grundlage für bessere Suchsichtbarkeit schaffen",
    included: [
      "Basis-SEO-Analyse der Website",
      "Technischer Kurzcheck",
      "Keyword-Recherche (bis 5 Themen)",
      "Optimierung von bis zu 5 Seiten",
      "Meta-Titles & Descriptions",
      "Google Search Console Setup",
      "Monatlicher Kurzbericht",
    ],
    notIncluded: ["Laufende Content-Erstellung", "Backlink-Aufbau"],
    cta: "SEO Starter anfragen",
    directBook: true,
  },
  {
    name: "SEO Growth",
    price: "ab CHF 1.190",
    period: "/ Monat",
    minTerm: "6 Monate",
    idealFor: "Unternehmen, die aktiv Sichtbarkeit steigern wollen",
    description: "Technische Optimierung, Content und strategische Entwicklung",
    included: [
      "Detailliertes SEO-Audit",
      "Keyword-Strategie",
      "Konkurrenzanalyse",
      "Bis zu 10 Seiten/Monat optimieren",
      "2 SEO-Landingpages/Monat",
      "Interne Verlinkung verbessern",
      "Monatlicher Strategy Call (30 Min.)",
    ],
    notIncluded: ["Externe Mediabudgets", "Bezahlte Werbung"],
    cta: "SEO Growth anfragen",
    popular: true,
  },
  {
    name: "SEO Premium",
    price: "ab CHF 2.490",
    period: "/ Monat",
    minTerm: "6-12 Monate",
    idealFor: "Etablierte Unternehmen, Online-Shops, mehrsprachige Websites",
    description: "SEO professionell als zentralen Wachstumskanal nutzen",
    included: [
      "Komplette SEO-Strategie",
      "Technisches SEO-Audit",
      "Keyword-Cluster & Content-Architektur",
      "Key Pages & Landingpages optimieren",
      "Conversion-fokussierte Optimierung",
      "Monatlicher Strategy Call",
      "Detailliertes Reporting mit Aktionsplan",
    ],
    notIncluded: ["Grosse Programmierarbeiten", "Werbebudget"],
    cta: "SEO Premium anfragen",
  },
]

const contentPackages: Package[] = [
  {
    name: "Content Starter",
    price: "ab CHF 490",
    period: "einmalig",
    idealFor: "Neue Websites, einzelne Landingpages",
    description: "Klare, professionelle Inhalte für eine Seite",
    included: [
      "Content-Struktur für 1 Seite",
      "Text für Homepage/Landingpage",
      "Ton, Lesbarkeit & Klarheit optimieren",
      "Basis-SEO-Keyword-Integration",
      "Meta-Title & Description",
      "1 Revisionsrunde",
    ],
    cta: "Content Starter anfragen",
    directBook: true,
  },
  {
    name: "Content Growth",
    price: "ab CHF 990",
    period: "/ Monat",
    minTerm: "3 Monate",
    idealFor: "Unternehmen mit regelmässigem Content-Bedarf",
    description: "Regelmässige, relevante Inhalte für Website und SEO",
    included: [
      "Monatliche Themenrecherche",
      "Redaktionsplan",
      "2 SEO-Texte/Blogartikel pro Monat",
      "Keyword-Integration",
      "Strukturierte Überschriften",
      "Meta-Titles & Descriptions",
      "1 Revisionsrunde pro Text",
    ],
    notIncluded: ["Vor-Ort-Interviews", "Video-Produktion"],
    cta: "Content Growth anfragen",
    popular: true,
  },
  {
    name: "Content Premium",
    price: "ab CHF 1.990",
    period: "/ Monat",
    minTerm: "6 Monate",
    idealFor: "Strategischer Content für Sichtbarkeit und Leads",
    description: "Strategie, Website-Copy, SEO-Content und Conversion-Texte",
    included: [
      "Content-Strategie",
      "Themen- & Keyword-Planung",
      "Monatlicher Redaktionsplan",
      "4 SEO-Texte/Landingpages pro Monat",
      "Website-Content optimieren",
      "Conversion-fokussierte Texte",
      "Content-Review & Reporting",
    ],
    cta: "Content Premium anfragen",
  },
]

const backlinkPackages: Package[] = [
  {
    name: "Backlink Check",
    price: "ab CHF 490",
    period: "einmalig",
    idealFor: "Analyse des aktuellen Backlink-Profils",
    description: "Stärken, Schwächen und Risiken des Linkprofils verstehen",
    included: [
      "Analyse bestehender Backlinks",
      "Bewertung der Link-Qualität",
      "Identifikation schädlicher Links",
      "Konkurrenzvergleich",
      "Empfehlungen für Linkquellen",
      "Kompakter Ergebnisbericht",
    ],
    cta: "Backlink Check anfragen",
    directBook: true,
  },
  {
    name: "Backlink Basic",
    price: "ab CHF 790",
    period: "/ Monat",
    minTerm: "3 Monate",
    idealFor: "Kleine und lokale Unternehmen",
    description: "Natürlicher Aufbau relevanter Referenzen und Erwähnungen",
    included: [
      "Recherche relevanter Link-Möglichkeiten",
      "Lokale & branchenbezogene Einträge",
      "Review bestehender Unternehmensprofile",
      "Partner- & Plattform-Empfehlungen",
      "Monatliche Dokumentation",
      "Qualitätskontrolle platzierter Links",
    ],
    notIncluded: ["Bezahlte Platzierungen", "Garantierte Publikationen"],
    cta: "Backlink Basic anfragen",
    popular: true,
  },
  {
    name: "Backlink Authority",
    price: "ab CHF 1.490",
    period: "/ Monat",
    minTerm: "6 Monate",
    idealFor: "Strategischer Autoritätsaufbau",
    description: "Analyse, Recherche, Outreach-Vorbereitung und Dokumentation",
    included: [
      "Backlink-Strategie",
      "Konkurrenzanalyse",
      "Thematisch relevante Quellen recherchieren",
      "Outreach-Vorbereitung",
      "Content-Ideen für linkbare Assets",
      "Monatliche Dokumentation",
      "Qualitätsbewertung erreichter Links",
    ],
    notIncluded: ["Externe Publikationsgebühren", "Ranking-Garantien"],
    cta: "Backlink Authority anfragen",
  },
  {
    name: "Digital PR & Linkbuilding",
    price: "ab CHF 2.900",
    period: "/ Monat",
    minTerm: "6-12 Monate",
    idealFor: "High-Quality Linkbuilding mit Content und PR",
    description: "Strategisches Linkbuilding kombiniert mit Content und PR",
    included: [
      "Strategische Linkbuilding-Planung",
      "Themenrecherche für linkbare Inhalte",
      "Outreach-Listen & Pitch-Texte",
      "Koordination mit Content-Produktion",
      "Media- & Branchenportale prüfen",
      "Monatliches Reporting",
      "Strategy Call",
    ],
    notIncluded: ["Externe Mediakosten", "Krisen-PR"],
    cta: "Premium Linkbuilding anfragen",
  },
]

const websitePackages: Package[] = [
  {
    name: "Website Starter",
    price: "ab CHF 1.900",
    period: "einmalig",
    idealFor: "Selbständige, kleine Unternehmen, lokale Dienstleister",
    description: "Schlanke, professionelle Website für schnelle Online-Präsenz",
    included: [
      "Homepage",
      "Bis zu 3 Unterseiten",
      "Responsive Design",
      "Kontaktformular",
      "Basis-SEO",
      "Integration bestehender Inhalte",
      "1 Revisionsrunde",
    ],
    notIncluded: ["Custom Web-Apps", "Kundenlogin", "Mehrsprachigkeit"],
    cta: "Website Starter anfragen",
    directBook: true,
  },
  {
    name: "Website Business",
    price: "ab CHF 4.900",
    period: "einmalig",
    idealFor: "Unternehmen mit professionellem Web-Auftritt",
    description: "Professionelle Unternehmenswebsite mit individuelem Design",
    included: [
      "Individuelles Webdesign",
      "Bis zu 8 Seiten",
      "UX-Struktur & Seitenarchitektur",
      "Responsive Implementierung",
      "Kontakt-/Anfrageformulare",
      "Basis-SEO & Performance",
      "2 Revisionsrunden",
    ],
    cta: "Website Business anfragen",
    popular: true,
  },
  {
    name: "Website Premium",
    price: "ab CHF 8.900",
    period: "einmalig",
    idealFor: "Höhere Anforderungen an Design, Content und Skalierbarkeit",
    description: "Umfassende, skalierbare und strategisch strukturierte Website",
    included: [
      "Individuelles Website-Konzept",
      "UX/UI Design",
      "Bis zu 15 Seiten",
      "SEO-orientierte Seitenstruktur",
      "Content-Aufbereitung",
      "Performance-Optimierung",
      "Erweiterbare Komponenten",
      "Launch-Support",
    ],
    cta: "Website Premium anfragen",
  },
]

const legacyPackages: Package[] = [
  {
    name: "Silver",
    price: "ab CHF 10",
    period: "/ Monat",
    idealFor: "Einfache Basis-Unterstützung",
    description: "Grundlegende Services für kleine Anforderungen",
    included: [
      "Kleinanzeigen",
      "Link in Foren",
      "Basis-SEO-Referenzierung",
      "Unterstützung per E-Mail",
    ],
    cta: "Silver anfragen",
    directBook: true,
  },
  {
    name: "Gold",
    price: "ab CHF 25",
    period: "/ Monat",
    idealFor: "Erweiterte Unterstützung mit Telefon-Support",
    description: "Mehr Services und telefonische Erreichbarkeit",
    included: [
      "Kleinanzeigen",
      "Link in Foren",
      "Basis-SEO-Referenzierung",
      "Unterstützung 5/7 Tage telefonisch",
    ],
    cta: "Gold anfragen",
    directBook: true,
  },
  {
    name: "Platin",
    price: "ab CHF 45",
    period: "/ Monat",
    idealFor: "Premium-Support mit maximaler Verfügbarkeit",
    description: "Umfassende Services mit 24/7 Erreichbarkeit",
    included: [
      "Kleinanzeigen für 1 Monat",
      "Link in Foren (2x pro Woche)",
      "Premium-SEO-Referenzierung",
      "Unterstützung 24/7",
    ],
    cta: "Platin anfragen",
    directBook: true,
  },
]

function PackageCard({ pkg, variant = "default", index = 0 }: { pkg: Package; variant?: "default" | "legacy"; index?: number }) {
  const isLegacy = variant === "legacy"
  
  return (
    <div
      className={cn(
        "relative flex flex-col p-6 lg:p-8 rounded-3xl transition-all duration-500 hover-lift animate-scale-in opacity-0",
        pkg.popular
          ? "glass-blue shadow-xl hover:shadow-[0_25px_70px_rgba(35,128,238,0.25)]"
          : "glass hover:shadow-xl",
        isLegacy && "glass-subtle"
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {pkg.popular && (
        <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground shadow-lg shadow-primary/30 rounded-full px-4 animate-pulse-glow">
          Empfohlen
        </Badge>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
          {pkg.period && (
            <span className="text-muted-foreground text-sm">{pkg.period}</span>
          )}
        </div>
        {pkg.minTerm && (
          <p className="text-xs text-muted-foreground">Mindestlaufzeit: {pkg.minTerm}</p>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{pkg.idealFor}</p>
      <p className="text-foreground text-sm leading-relaxed mb-6">{pkg.description}</p>
      
      <ul className="space-y-3 mb-6 flex-1">
        {pkg.included.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
      
      {pkg.notIncluded && pkg.notIncluded.length > 0 && (
        <div className="mb-6 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
            <Info className="h-3 w-3" />
            Nicht enthalten:
          </p>
          <p className="text-xs text-muted-foreground">
            {pkg.notIncluded.join(", ")}
          </p>
        </div>
      )}
      
      <Button
        asChild
        className={cn(
          "w-full",
          pkg.popular
            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
            : "bg-foreground hover:bg-foreground/90 text-background"
        )}
      >
        <Link href={pkg.directBook ? "/checkout" : "#contact"}>
          {pkg.cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      
      {pkg.directBook && (
        <p className="text-xs text-center text-muted-foreground mt-3">
          Direkt buchbar
        </p>
      )}
    </div>
  )
}

export function PackagesSection() {
  const [activeTab, setActiveTab] = useState("seo")

  return (
    <section id="packages" className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-primary/8 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-brand-cyan/8 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-brand-indigo/5 blur-[80px] animate-float-slow" style={{ animationDelay: '4s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full mb-6">
            <span className="text-sm font-medium text-foreground">Pricing Plans</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Transparente Preise für jedes Budget
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Von einzelnen Leistungen bis zu umfassenden Paketen – 
            wählen Sie das Angebot, das zu Ihren Zielen passt.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="inline-flex flex-wrap justify-center gap-2 p-2 glass rounded-full mb-14 h-auto">
            <TabsTrigger
              value="seo"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-full transition-all duration-300"
            >
              SEO
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-full transition-all duration-300"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="backlinks"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-full transition-all duration-300"
            >
              Backlinks
            </TabsTrigger>
            <TabsTrigger
              value="websites"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-full transition-all duration-300"
            >
              Websites
            </TabsTrigger>
            <TabsTrigger
              value="legacy"
              className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-full transition-all duration-300"
            >
              Bestehende Pläne
            </TabsTrigger>
          </TabsList>

<TabsContent value="seo" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {seoPackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>
          </TabsContent>

<TabsContent value="content" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {contentPackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backlinks" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {backlinkPackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="websites" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {websitePackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legacy" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {legacyPackages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} variant="legacy" index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backlinks" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {backlinkPackages.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="websites" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {websitePackages.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legacy" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">
                  Diese Pläne sind bestehende Legacy-Angebote. Für neue Projekte empfehlen wir 
                  unsere aktuellen professionellen Pakete.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {legacyPackages.map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} variant="legacy" />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Pricing Note */}
        <div className="mt-16 p-8 glass rounded-3xl max-w-4xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <div className="flex items-start gap-5">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/10">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Hinweis zu den Preisen</h4>
              <p className="text-muted-foreground leading-relaxed">
                Alle Preise sind Richtwerte in CHF. Der genaue Aufwand hängt von der aktuellen Situation, 
                Website-Grösse, Konkurrenz, Sprachen, Content-Bedarf und technischen Anforderungen ab. 
                Nach einer kurzen Analyse erstellt prime CPP ein passendes Angebot. 
                Monatliche Pakete können individuell kombiniert werden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
