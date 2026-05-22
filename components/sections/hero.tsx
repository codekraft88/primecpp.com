"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustItems = [
  { title: "Strategische Beratung", description: "Fundierte Analysen und klare Empfehlungen" },
  { title: "Professionelle Produktion", description: "Hochwertige Inhalte und technische Umsetzung" },
  { title: "SEO & Content Expertise", description: "Nachhaltige Sichtbarkeit und relevante Inhalte" },
  { title: "Zuverlässige Betreuung", description: "Kontinuierliche Optimierung und Support" },
]

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated floating blobs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] animate-float-slow" />
      <div className="absolute top-[40%] -left-20 w-[400px] h-[400px] rounded-full bg-brand-cyan/15 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] rounded-full bg-brand-indigo/10 blur-[60px] animate-float-slow" style={{ animationDelay: '4s' }} />
      
      {/* Morphing blob */}
      <div className="absolute top-1/3 left-[15%] w-48 h-48 bg-gradient-to-br from-primary/20 to-brand-cyan/20 animate-blob opacity-60" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(35,128,238,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(35,128,238,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="container relative mx-auto px-4 lg:px-8 pt-32 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating badge with shimmer */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 glass rounded-full mb-12 shadow-xl animate-scale-in overflow-hidden relative">
            <div className="absolute inset-0 animate-shimmer" />
            <Sparkles className="w-4 h-4 text-primary relative z-10" />
            <span className="text-sm font-medium text-foreground relative z-10">Swiss quality. Digital excellence.</span>
          </div>
          
          {/* Main headline with staggered animation */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground mb-8 text-balance leading-[1.05]">
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>Content.</span>{" "}
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>Production.</span>{" "}
            <span className="inline-block relative animate-slide-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand-light to-primary animate-gradient">Publishing.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/40" />
              </svg>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed text-pretty animate-fade-in opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            prime CPP entwickelt digitale Inhalte, Websites, Kommunikationslösungen und Marketingstrukturen 
            für Unternehmen, die sich professionell präsentieren und nachhaltig wachsen wollen.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Button asChild size="lg" className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base shadow-xl shadow-primary/25 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1">
              <Link href="#contact">
                Projekt anfragen
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto glass border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-full px-8 py-6 text-base transition-all duration-300 hover:-translate-y-1">
              <Link href="#packages">
                Pakete ansehen
              </Link>
            </Button>
          </div>
          
          {/* Trust items - glass cards with staggered animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="group p-6 glass rounded-2xl hover-lift cursor-default animate-scale-in opacity-0"
                style={{ animationDelay: `${700 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="h-1.5 w-10 bg-gradient-to-r from-primary to-brand-light rounded-full mb-4 transition-all duration-500 group-hover:w-16 group-hover:shadow-lg group-hover:shadow-primary/30" />
                <h3 className="font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
          <span className="text-xs text-muted-foreground font-medium tracking-wide">Mehr erfahren</span>
          <div className="w-7 h-11 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 glass-subtle">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
