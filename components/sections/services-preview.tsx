"use client"

import Link from "next/link"
import { ArrowRight, Palette, Code, Camera, Megaphone, BookOpen, Search, Rocket } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ServicePreview {
  icon: LucideIcon
  title: string
  description: string
  href: string
  variant: "blue" | "cyan" | "indigo"
}

const services: ServicePreview[] = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Benefit from the many years of experience of our employees in your industry!",
    href: "#services",
    variant: "blue",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "We create your project professionally and efficiently.",
    href: "#services",
    variant: "cyan",
  },
  {
    icon: Camera,
    title: "Production",
    description: "We don't want to change your idea, but rather expand it with skills that we can make possible.",
    href: "#services",
    variant: "indigo",
  },
]

const moreServices = [
  {
    icon: Megaphone,
    title: "Marketing & Kommunikation",
    description: "Strategische Kommunikation für die richtige Zielgruppe",
  },
  {
    icon: BookOpen,
    title: "Publishing",
    description: "Strukturierte Aufbereitung und Veröffentlichung von Inhalten",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Nachhaltige Suchmaschinenoptimierung für langfristige Sichtbarkeit",
  },
]

function ServiceCard({ service, index }: { service: ServicePreview; index: number }) {
  const variants = {
    blue: "glass-blue hover:shadow-[0_25px_70px_rgba(35,128,238,0.25)]",
    cyan: "glass-cyan hover:shadow-[0_25px_70px_rgba(56,189,248,0.25)]",
    indigo: "glass-indigo hover:shadow-[0_25px_70px_rgba(99,102,241,0.25)]",
  }

  const iconBg = {
    blue: "bg-primary/15 text-primary",
    cyan: "bg-brand-cyan/20 text-cyan-600",
    indigo: "bg-brand-indigo/15 text-brand-indigo",
  }

  const accentColor = {
    blue: "from-primary to-brand-light",
    cyan: "from-cyan-400 to-cyan-500",
    indigo: "from-indigo-400 to-indigo-500",
  }

  return (
    <Link
      href={service.href}
      className={`group relative flex flex-col p-8 rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 ${variants[service.variant]} animate-scale-in opacity-0`}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${accentColor[service.variant]} opacity-20 blur-xl`} />
      </div>
      
      {/* Decorative icon background */}
      <div className="absolute top-6 right-6 opacity-5 transition-all duration-500 group-hover:opacity-10 group-hover:scale-110">
        <service.icon className="w-28 h-28" />
      </div>
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${iconBg[service.variant]}`}>
        <service.icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-6" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed flex-1">
        {service.description}
      </p>
      
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground/60 group-hover:text-primary transition-all duration-300">
        Mehr erfahren
        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </Link>
  )
}

export function ServicesPreviewSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 right-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-0 left-[5%] w-[350px] h-[350px] rounded-full bg-brand-cyan/8 blur-[80px] animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 glass rounded-full mb-8 animate-scale-in">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Unsere Leistungen</span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 text-balance animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Digitale Lösungen aus einer Hand
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Von der Konzeption über Design und Entwicklung bis zur kontinuierlichen 
            Optimierung begleiten wir Sie durch alle Phasen.
          </p>
        </div>

        {/* Main service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* More services - smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-14">
          {moreServices.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 glass rounded-2xl hover-lift cursor-default animate-fade-in opacity-0"
              style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom offer CTA */}
        <div className="text-center animate-fade-in opacity-0" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
          <p className="text-muted-foreground">
            Are you looking for a customized offer for your project?{" "}
            <Link href="#contact" className="text-primary font-semibold hover:underline underline-offset-4 transition-all duration-300 hover:text-primary/80">
              Click here
            </Link>{" "}
            to contact us!
          </p>
        </div>
      </div>
    </section>
  )
}
