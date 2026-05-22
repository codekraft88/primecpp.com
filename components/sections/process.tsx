"use client"

import { Search, Calendar, Cog, Upload, TrendingUp, Headphones, BarChart3, Workflow, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { StackingCards, StackingCardContent } from "@/components/ui/stacking-cards"

interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
  details: string[]
  accentColor: string
  bgGradient: string
}

const processSteps: ProcessStep[] = [
  {
    icon: Search,
    title: "Analyse",
    description: "Wir klären die aktuelle Situation, Ziele, Zielgruppen, Stärken, Schwächen und das digitale Potenzial des Projekts.",
    details: [
      "Ist-Analyse & Benchmark",
      "Zielgruppen-Definition", 
      "Wettbewerbsanalyse",
      "Potenzial-Ermittlung"
    ],
    accentColor: "#007be4",
    bgGradient: "linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 50%, #dceeff 100%)"
  },
  {
    icon: Calendar,
    title: "Zeitplanung",
    description: "Wir definieren realistische Zeitrahmen, Meilensteine und Verantwortlichkeiten für effiziente Umsetzung.",
    details: [
      "Meilenstein-Definition",
      "Ressourcenplanung",
      "Verantwortlichkeiten",
      "Deadlines & Puffer"
    ],
    accentColor: "#0066c2",
    bgGradient: "linear-gradient(135deg, #f5f9ff 0%, #eef4ff 50%, #e8f0ff 100%)"
  },
  {
    icon: Cog,
    title: "Production",
    description: "Wir erstellen Inhalte, Design-Assets, Texte, Websites, Visuals mit Fokus auf Qualität und Konsistenz.",
    details: [
      "Content-Erstellung",
      "Design & Branding",
      "Technische Umsetzung",
      "Qualitätskontrolle"
    ],
    accentColor: "#0055a8",
    bgGradient: "linear-gradient(135deg, #f8faff 0%, #f2f6ff 50%, #ecf2ff 100%)"
  },
  {
    icon: Upload,
    title: "Publishing",
    description: "Wir bereiten Inhalte für die Veröffentlichung über die richtigen Kanäle vor.",
    details: [
      "Kanal-Strategie",
      "Content-Optimierung",
      "Timing & Frequenz",
      "Cross-Platform Sync"
    ],
    accentColor: "#004490",
    bgGradient: "linear-gradient(135deg, #fafbff 0%, #f4f7ff 50%, #eff3ff 100%)"
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description: "Wir unterstützen Kampagnen und Sichtbarkeitsmassnahmen für die richtige Zielgruppe.",
    details: [
      "Kampagnen-Setup",
      "Targeting & Audiences",
      "Budget-Optimierung",
      "Performance-Tracking"
    ],
    accentColor: "#003377",
    bgGradient: "linear-gradient(135deg, #fcfcff 0%, #f7f9ff 50%, #f2f5ff 100%)"
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Wir bieten laufenden Support, Updates und Optimierung nach dem Go-Live.",
    details: [
      "Monitoring & Alerts",
      "Regelmässige Updates",
      "Performance-Checks",
      "Direkter Kontakt"
    ],
    accentColor: "#002255",
    bgGradient: "linear-gradient(135deg, #fefeff 0%, #f9faff 50%, #f5f7ff 100%)"
  },
  {
    icon: BarChart3,
    title: "SEO & Optimierung",
    description: "Wir verbessern technische Struktur, Content-Relevanz und Suchsichtbarkeit kontinuierlich.",
    details: [
      "Technisches SEO",
      "Content-Optimierung",
      "Link-Building",
      "Analytics & Reporting"
    ],
    accentColor: "#001a44",
    bgGradient: "linear-gradient(135deg, #ffffff 0%, #fbfcff 50%, #f8faff 100%)"
  },
]

export function ProcessSection() {
  const stackingCards = processSteps.map((step, index) => ({
    id: step.title,
    backgroundColor: "white",
    content: (
      <StackingCardContent className="min-h-[400px] md:min-h-[450px]">
        <div 
          className="absolute inset-0 opacity-60"
          style={{ background: step.bgGradient }}
        />
        <div className="relative z-10">
          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl transition-all duration-500 shadow-lg"
              style={{ 
                backgroundColor: step.accentColor,
                boxShadow: `0 8px 32px ${step.accentColor}40`
              }}
            >
              <step.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
            </div>
            <div>
              <span 
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: step.accentColor }}
              >
                Schritt {index + 1} von {processSteps.length}
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1">
                {step.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
            {step.description}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {step.details.map((detail, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-gray-200"
              >
                <div 
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: step.accentColor }}
                />
                <span className="text-sm md:text-base font-medium text-gray-700">
                  {detail}
                </span>
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${((index + 1) / processSteps.length) * 100}%`,
                  backgroundColor: step.accentColor
                }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-500">
              {Math.round(((index + 1) / processSteps.length) * 100)}%
            </span>
          </div>
        </div>
      </StackingCardContent>
    ),
  }))

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,123,228,0.08) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 bg-[#007be4]/10 border border-[#007be4]/20 animate-scale-in">
            <Workflow className="w-4 h-4 text-[#007be4]" />
            <span className="text-sm font-medium text-[#007be4]">Unser Prozess</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 text-balance animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Strukturiert zum Erfolg
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto text-pretty animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Erfolgreiche Projekte basieren immer auf sorgfältiger Planung. 
            Scrollen Sie durch unsere bewährten Schritte.
          </p>
          
          {/* Scroll hint */}
          <div className="mt-8 flex flex-col items-center gap-2 animate-bounce-slow">
            <span className="text-sm text-gray-400 font-medium">Scrollen zum Entdecken</span>
            <ArrowRight className="w-5 h-5 text-[#007be4] rotate-90" />
          </div>
        </div>

        {/* Stacking Cards */}
        <div className="max-w-4xl mx-auto">
          <StackingCards 
            cards={stackingCards}
            cardClassName="border border-gray-200/80"
          />
        </div>
      </div>
    </section>
  )
}
