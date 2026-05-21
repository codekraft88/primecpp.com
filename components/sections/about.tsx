"use client"

import { CheckCircle2, Users } from "lucide-react"

const highlights = [
  "Grafische Perfektion und schriftliche Prägnanz",
  "Beratung in Web, Grafik, Marketing und Kommunikation",
  "Von der Konzeption bis zur Realisierung",
  "Struktur und Sichtbarkeit für Ihr Projekt",
  "Zusammenarbeit mit professionellen Partnern",
]

export function AboutSection() {
  return (
    <section id="about" className="py-28 lg:py-36 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 glass rounded-full mb-8 animate-scale-in">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Über uns</span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-8 text-balance leading-tight animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              Kompetenz und Erfahrung für Ihren digitalen Erfolg
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <p>
                Grafische Perfektion, schriftliche Prägnanz und vollständige Ästhetik – 
                das sind die Schlüsselworte, die jeder digitalen Plattform ein professionelles 
                Erscheinungsbild verleihen.
              </p>
              <p>
                prime CPP berät Sie kompetent und umfassend in den Bereichen Web, Grafik, 
                Marketing und Kommunikation. Jeder einzelne Schritt wird berücksichtigt: 
                Von der Konzeption und dem Design bis zur Realisierung des Projekts begleiten 
                wir Sie bis zur vollständigen Lösung.
              </p>
              <p>
                prime CPP entwickelt nicht nur Kundenprojekte, sondern betreut auch eigene digitale 
                Plattformen. Dadurch entsteht praxisnahes Know-how in den Bereichen Nutzerverwaltung, 
                digitale Zahlungslogik, Subscription-Modelle, Content-Strukturen und skalierbare Webprodukte.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              {highlights.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 group animate-slide-in-right opacity-0"
                  style={{ animationDelay: `${300 + index * 80}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground group-hover:text-primary transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="relative animate-scale-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="glass rounded-3xl p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 glass-blue rounded-2xl hover-lift">
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">235+</div>
                  <div className="text-sm text-muted-foreground">Abgeschlossene Projekte</div>
                </div>
                <div className="text-center p-6 glass-cyan rounded-2xl hover-lift">
                  <div className="text-4xl lg:text-5xl font-bold text-cyan-600 mb-2">107+</div>
                  <div className="text-sm text-muted-foreground">Zufriedene Kunden</div>
                </div>
                <div className="col-span-2 text-center p-6 glass-indigo rounded-2xl hover-lift">
                  <div className="text-4xl lg:text-5xl font-bold text-brand-indigo mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Fokus auf Qualität und Ergebnis</div>
                </div>
              </div>
              <div className="mt-8 p-6 glass-subtle rounded-2xl">
                <p className="text-center text-foreground leading-relaxed">
                  Mit ausgewählten professionellen Partnern bietet prime CPP ganzheitliche 
                  Lösungen für digitale Kommunikation und Content-Produktion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
