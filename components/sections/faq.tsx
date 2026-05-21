"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Kann prime CPP Google-Rankings garantieren?",
    answer: "Nein. Seriöse SEO kann keine festen Rankings garantieren. Das Ziel ist es, die technische Grundlage, Content-Qualität, Relevanz und langfristige Sichtbarkeit zu verbessern. Wir arbeiten nachhaltig und transparent, um messbare Verbesserungen zu erzielen.",
  },
  {
    question: "Wie lange dauert SEO?",
    answer: "Erste Verbesserungen können oft nach einigen Wochen sichtbar werden, aber nachhaltige SEO erfordert in der Regel mehrere Monate. Deshalb haben die meisten SEO-Pakete eine Mindestlaufzeit von 3-6 Monaten.",
  },
  {
    question: "Sind Backlinks in SEO-Paketen enthalten?",
    answer: "Backlink-Aufbau ist nicht automatisch in allen SEO-Paketen enthalten. Er kann separat gebucht oder mit einem SEO-Paket kombiniert werden, je nach Ihren spezifischen Anforderungen und Zielen.",
  },
  {
    question: "Sind die Backlink-Pakete sicher?",
    answer: "Der Fokus liegt auf Qualität, Relevanz und transparenter Dokumentation. Es werden keine Spam-Taktiken, Link-Farmen oder Massen-Link-Pakete verwendet. Wir setzen auf nachhaltige und seriöse Methoden.",
  },
  {
    question: "Können Pakete kombiniert werden?",
    answer: "Ja. SEO-, Content-, Backlink- und Website-Pakete können je nach Projektzielen kombiniert werden. Wir erstellen gerne ein individuelles Angebot, das auf Ihre spezifischen Bedürfnisse zugeschnitten ist.",
  },
  {
    question: "Wie funktioniert die Bezahlung über das Kundenportal?",
    answer: "Das Kundenportal zeigt Pakete, Rechnungen, Zahlungsstatus und Abonnements. Die tatsächliche Zahlungsintegration kann später über Stripe, Rechnungszahlung oder einen anderen Anbieter verbunden werden.",
  },
  {
    question: "Was kostet eine Website?",
    answer: "Die Kosten hängen von Umfang, Design-Anforderungen und technischen Features ab. Unsere Website-Pakete beginnen bei CHF 1.900 für ein Starter-Paket und reichen bis CHF 8.900+ für Premium-Lösungen. Nach einer kurzen Analyse erstellen wir ein passendes Angebot.",
  },
  {
    question: "Bietet prime CPP laufenden Support?",
    answer: "Ja. Nach dem Go-Live bieten wir laufenden Support, Updates, Koordination und Optimierung. Dies kann je nach Bedarf als Teil eines Pakets oder als separate Vereinbarung organisiert werden.",
  },
]

export function FAQSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-brand-indigo/5 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full mb-6">
              <span className="text-sm font-medium text-foreground">FAQ</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Antworten auf die wichtigsten Fragen zu unseren Leistungen, Paketen und der Zusammenarbeit.
            </p>
          </div>

          <div className="glass rounded-3xl p-6 lg:p-8 animate-fade-in">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-b border-primary/10 last:border-b-0"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5 text-base transition-colors duration-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10 p-8 glass-blue rounded-3xl text-center animate-slide-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <p className="text-foreground font-medium mb-2">
              Haben Sie weitere Fragen?
            </p>
            <p className="text-muted-foreground">
              Kontaktieren Sie uns unter{" "}
              <a href="mailto:info@primecpp.com" className="text-primary hover:underline font-medium transition-colors">
                info@primecpp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
