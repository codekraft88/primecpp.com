"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Palette, Code, Film, Megaphone, BookOpen, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface Service {
  id: string
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  cta: string
}

const services: Service[] = [
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX Design",
    description: "Klare, intuitive und visuell verfeinerte digitale Interfaces für Websites, Plattformen und digitale Produkte.",
    features: [
      "User Interface Design",
      "User Experience Struktur",
      "Wireframes und Prototypen",
      "Visuelle Design-Systeme",
      "Mobile-First Layouts",
    ],
    cta: "UI/UX Design anfragen",
  },
  {
    id: "web-dev",
    icon: Code,
    title: "Web Development",
    description: "Moderne, responsive und skalierbare Websites, die starkes Design mit einer zuverlässigen technischen Grundlage verbinden.",
    features: [
      "Website-Entwicklung",
      "Responsive Implementierung",
      "CMS oder Headless CMS Setup",
      "Landing Pages",
      "Technische Optimierung",
    ],
    cta: "Web Development anfragen",
  },
  {
    id: "production",
    icon: Film,
    title: "Production",
    description: "Professionelle Produktion von digitalen Inhalten, Visuals, Text und Kommunikationsmaterialien für Web, Marketing und Publishing.",
    features: [
      "Textproduktion",
      "Bild- und Visualaufbereitung",
      "Digitale Kampagnen-Assets",
      "Markenkommunikations-Materialien",
      "Content-Koordination",
    ],
    cta: "Production anfragen",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing & Kommunikation",
    description: "Strategische Kommunikation und Marketing-Unterstützung für Unternehmen, die ihre Botschaft schärfen und die richtige Zielgruppe erreichen wollen.",
    features: [
      "Kommunikationsstrategie",
      "Kampagnenkonzepte",
      "Marken-Messaging",
      "Marketing-Materialien",
      "Beratung und Koordination",
    ],
    cta: "Marketing-Support anfragen",
  },
  {
    id: "publishing",
    icon: BookOpen,
    title: "Publishing",
    description: "Strukturierte Aufbereitung und Veröffentlichung von Inhalten über Websites, Plattformen und digitale Kanäle.",
    features: [
      "Website-Content-Publishing",
      "Content-Formatierung",
      "Redaktionelle Koordination",
      "Digital Asset Vorbereitung",
      "Publishing-Workflows",
    ],
    cta: "Publishing anfragen",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO",
    description: "Nachhaltige Suchmaschinenoptimierung mit Fokus auf technische Qualität, Content-Relevanz und langfristige Sichtbarkeit.",
    features: [
      "SEO-Audits",
      "Keyword-Recherche",
      "On-Page-Optimierung",
      "Content-Optimierung",
      "Reporting und Empfehlungen",
    ],
    cta: "SEO anfragen",
  },
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState<string>(services[0].id)

  const currentService = services.find((s) => s.id === activeService) || services[0]

  return (
    <section id="services" className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-primary/8 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full bg-brand-cyan/10 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full mb-6">
            <span className="text-sm font-medium text-foreground">Leistungen im Detail</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Was wir für Sie tun können
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Wir bieten ein umfassendes Spektrum an digitalen Dienstleistungen, 
            um Ihr Unternehmen online erfolgreich zu positionieren.
          </p>
        </div>

        {/* Service Navigation - Desktop */}
        <div className="hidden lg:flex justify-center gap-2 mb-14">
          <div className="inline-flex gap-2 p-2 glass rounded-full">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300",
                  activeService === service.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                <service.icon className="h-4 w-4" />
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Service Detail - Desktop */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-2 gap-12 items-center glass rounded-3xl p-10 lg:p-14 animate-fade-in">
            <div>
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-light text-white mb-8 shadow-xl shadow-primary/25 transition-transform duration-500 hover:scale-110">
                <currentService.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-5">
                {currentService.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {currentService.description}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1">
                <Link href="#contact">
                  {currentService.cta}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="glass-blue rounded-3xl p-8">
              <h4 className="font-semibold text-foreground mb-6 text-lg">Leistungen im Überblick:</h4>
              <ul className="space-y-5">
                {currentService.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-primary/15">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Service Cards - Mobile */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="p-6 glass rounded-3xl hover-lift animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-light text-white mb-5 shadow-lg shadow-primary/20">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="sm" className="w-full rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
                <Link href="#contact">
                  {service.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
