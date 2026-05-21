"use client"

import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Die Zusammenarbeit mit prime CPP war von Anfang an professionell und zielführend. Unsere neue Website hat die Besucherzahlen verdoppelt und die Anfragen um 60% gesteigert.",
    author: "Thomas Müller",
    role: "Geschäftsführer",
    company: "Müller Consulting AG",
  },
  {
    quote: "Endlich ein Partner, der SEO realistisch erklärt und messbare Ergebnisse liefert. Nach 6 Monaten sind wir für alle relevanten Keywords auf Seite 1.",
    author: "Sandra Weber",
    role: "Marketing Leiterin",
    company: "Weber & Partner GmbH",
  },
  {
    quote: "Die Content-Strategie von prime CPP hat unsere Markenwahrnehmung komplett verändert. Professionell, strukturiert und immer termingerecht.",
    author: "Michael Brunner",
    role: "Inhaber",
    company: "Brunner Immobilien",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute top-1/4 -right-40 w-80 h-80 rounded-full bg-primary/8 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 rounded-full bg-brand-cyan/10 blur-[80px] animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full mb-6">
            <span className="text-sm font-medium text-foreground">Kundenstimmen</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Erfolgreiche Projekte sprechen für sich. Hier teilen einige unserer 
            Kunden ihre Erfahrungen mit prime CPP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 glass rounded-3xl hover-lift animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/15" />
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-brand-cyan rounded-full mb-6" />
              <p className="text-foreground leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-brand-light flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-bold text-sm">
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
