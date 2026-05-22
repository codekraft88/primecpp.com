"use client"

import { Layers, Users, CreditCard, Shield, Lock, ArrowRight, Database, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"

const featureCards = [
  {
    icon: Layers,
    title: "Plattformstrategie",
    description: "Konzeption digitaler Geschäftsmodelle, Nutzerflüsse, Monetarisierungslogik und technischer Plattformstrukturen – von der Idee bis zur skalierbaren Umsetzung.",
    points: [
      "Digitale Produktstrategie",
      "Nutzerrollen und Zugriffslogik",
      "Monetarisierungsmodelle",
      "Skalierbare Plattformarchitektur",
    ],
  },
  {
    icon: Users,
    title: "Mitglieder- und Login-Systeme",
    description: "Entwicklung geschützter Bereiche mit Nutzerkonten, Profilen, Berechtigungen, Dashboards und einfachen Verwaltungsfunktionen.",
    points: [
      "Kunden- und Nutzerkonten",
      "Geschützte Inhalte",
      "Profil- und Dashboard-Strukturen",
      "Rollen- und Zugriffskonzepte",
    ],
  },
  {
    icon: CreditCard,
    title: "Subscription & Payment Flows",
    description: "Strukturierung von Abo-Modellen, Zahlungsprozessen und wiederkehrenden digitalen Leistungen, vorbereitet für spätere Zahlungsanbieter wie Stripe oder Rechnungssysteme.",
    points: [
      "Abo-Modelle",
      "Zahlungslogik",
      "Rechnungsübersicht",
      "Upgrade- und Paketstrukturen",
    ],
  },
]

const caseFocusPoints = [
  "Plattformkonzeption",
  "UX/UI für Nutzerprofile und Interaktionen",
  "Mitglieder- und Login-Bereich",
  "Abo- und Zahlungslogik",
  "Content- und Community-Struktur",
  "Performance- und Conversion-Optimierung",
  "Laufende technische und strategische Weiterentwicklung",
]

export function PlatformAssetsSection() {
  const scrollToContact = (preselect?: boolean) => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
      if (preselect) {
        setTimeout(() => {
          const serviceSelect = document.querySelector('[name="service"]') as HTMLButtonElement
          if (serviceSelect) {
            serviceSelect.click()
          }
        }, 800)
      }
    }
  }

  return (
    <section id="platform-assets" className="py-28 lg:py-36 relative overflow-hidden bg-blue-modern noise-overlay">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0055aa]/30 via-transparent to-[#00aaff]/20" />
      
      {/* Large glowing orbs */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] blue-glow-orb animate-float-slow" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] blue-glow-orb animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] blue-glow-orb animate-float-slow" style={{ animationDelay: '2s' }} />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern" />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-sm">
            <Database className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Strategic Assets</span>
            <span className="ml-1 px-2 py-0.5 bg-[#ffea00] rounded text-xs font-semibold text-gray-900">By us</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-balance animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Eigene Plattformprojekte & digitale Assets
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-4 animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            prime CPP entwickelt und betreut neben Kundenprojekten auch eigene digitale Plattformen. 
            Der Fokus liegt auf skalierbaren Webprojekten mit Nutzerkonten, geschützten Bereichen, 
            Content-Strukturen, Zahlungsprozessen und wiederkehrenden Umsatzmodellen.
          </p>
          
          <p className="text-base text-white/60 max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Diese Projekte verbinden technisches Produktdenken mit digitalem Marketing, Content-Strategie, 
            UX-Design und laufender Optimierung. Das daraus entstehende Know-how fliesst direkt in 
            Kundenprojekte ein – insbesondere bei Plattformen, Mitgliederbereichen, Creator-Modellen, 
            Subscription Commerce und digitalen Geschäftsmodellen mit wiederkehrenden Umsätzen.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featureCards.map((card, index) => (
            <div
              key={card.title}
              className="group relative p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 hover:border-white/25 transition-all duration-500 animate-scale-in opacity-0"
              style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                <card.icon className="w-7 h-7 text-white group-hover:text-[#007be4] transition-colors" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
              
              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">{card.description}</p>
              
              {/* Bullet Points */}
              <ul className="space-y-2.5">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-white/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Case Study Card */}
        <div className="relative p-6 md:p-8 lg:p-12 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-sm animate-scale-in opacity-0 overflow-hidden" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-[100px] rounded-tr-3xl" />
          
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Side */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Private Platform Project</span>
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
                Subscription-Based Social Discovery Platform
              </h3>
              
              <p className="text-white/65 leading-relaxed mb-8">
                prime CPP betreut eine eigene digitale Plattform im Bereich Social Discovery, 
                Creator Economy und Community Interaction. Das Projekt kombiniert Nutzerprofile, 
                geschützte Inhalte, digitale Interaktionen, Zahlungsprozesse und plattformbasierte 
                Monetarisierung.
              </p>
              
              {/* Focus Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseFocusPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-sm text-white/75">
                    <Workflow className="w-4 h-4 text-white/60 shrink-0" />
                    <span className="break-words">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Side - CTAs */}
            <div className="flex flex-col justify-center">
              <div className="p-6 md:p-8 rounded-2xl bg-white/10 border border-white/15">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Vertrauliche Informationen</h4>
                    <p className="text-sm text-white/60">
                      Weitere Informationen zu ausgewählten Plattformprojekten werden ausschliesslich 
                      auf Anfrage und im vertraulichen Rahmen bereitgestellt.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => scrollToContact(true)}
                    className="w-full bg-white hover:bg-white/90 text-[#007be4] font-semibold rounded-full py-6 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    Vertrauliche Projektinformationen anfragen
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    onClick={() => scrollToContact()}
                    className="w-full bg-white/15 border border-white/30 text-white hover:bg-white/25 hover:border-white/50 rounded-full py-6 text-base transition-all duration-300"
                  >
                    Strategisches Gespräch vereinbaren
                  </Button>
                </div>
                
                <p className="text-xs text-white/50 text-center mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Lock className="w-3 h-3 shrink-0" />
                  <span>Aus Diskretions- und Wettbewerbsgründen werden bestimmte Plattformprojekte nicht öffentlich verlinkt.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
