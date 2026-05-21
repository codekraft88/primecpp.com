"use client"

import { Search, Calendar, Cog, Upload, TrendingUp, Headphones, BarChart3, Workflow } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    icon: Search,
    title: "Analyse",
    description: "Wir klären die aktuelle Situation, Ziele, Zielgruppen, Stärken, Schwächen und das digitale Potenzial des Projekts.",
  },
  {
    icon: Calendar,
    title: "Zeitplanung",
    description: "Wir definieren realistische Zeitrahmen, Meilensteine und Verantwortlichkeiten für effiziente Umsetzung.",
  },
  {
    icon: Cog,
    title: "Production",
    description: "Wir erstellen Inhalte, Design-Assets, Texte, Websites, Visuals mit Fokus auf Qualität und Konsistenz.",
  },
  {
    icon: Upload,
    title: "Publishing",
    description: "Wir bereiten Inhalte für die Veröffentlichung über die richtigen Kanäle vor.",
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description: "Wir unterstützen Kampagnen und Sichtbarkeitsmassnahmen für die richtige Zielgruppe.",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Wir bieten laufenden Support, Updates und Optimierung nach dem Go-Live.",
  },
  {
    icon: BarChart3,
    title: "SEO",
    description: "Wir verbessern technische Struktur, Content-Relevanz und Suchsichtbarkeit.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-28 lg:py-36 bg-blue-mesh text-white relative overflow-hidden">
      {/* Modern gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0088ff]/20 via-transparent to-[#0055cc]/20" />
      
      {/* Animated glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] blue-glow-orb animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] blue-glow-orb animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blue-glow-orb opacity-50" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 bg-white/10 border border-white/20 backdrop-blur-sm animate-scale-in">
            <Workflow className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Unser Prozess</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Strukturiert zum Erfolg
          </h2>
          <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto text-pretty animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Erfolgreiche Projekte basieren immer auf sorgfältiger Planung. 
            Wir begleiten Sie durch folgende Schritte:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="group relative p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:border-white/25 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] animate-scale-in opacity-0"
              style={{ animationDelay: `${300 + index * 80}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/15 border border-white/20 transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:shadow-lg">
                  <step.icon className="h-6 w-6 text-white transition-all duration-300 group-hover:text-[#007be4] group-hover:scale-110" />
                </div>
                <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Schritt {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
