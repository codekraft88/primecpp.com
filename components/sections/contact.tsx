"use client"

import { useState } from "react"
import { Mail, MapPin, Clock, Send, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

const services = [
  "UI/UX Design",
  "Web Development",
  "Content Production",
  "Marketing & Kommunikation",
  "Publishing",
  "SEO",
  "Platform Assets / Confidential Project Information",
  "Komplettpaket",
  "Sonstiges",
]

const budgetRanges = [
  "Unter CHF 2.000",
  "CHF 2.000 – 5.000",
  "CHF 5.000 – 10.000",
  "CHF 10.000 – 25.000",
  "Über CHF 25.000",
  "Auf Anfrage",
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot check: if the hidden field has a value, silently block submission
    const form = e.currentTarget
    const honeypot = (form.elements.namedItem('website_url') as HTMLInputElement)?.value
    if (honeypot) {
      // Fake success to not alert bots
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setIsSubmitted(true)
      return
    }

    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/3 -left-40 w-80 h-80 rounded-full bg-brand-cyan/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Kontakt</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
              Lassen Sie uns über Ihr Projekt sprechen
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Ob Website, Content, SEO oder digitale Kommunikation – prime CPP unterstützt 
              Sie von der ersten Idee bis zur Veröffentlichung und kontinuierlichen Verbesserung.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 glass rounded-2xl hover-lift animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/15 text-primary transition-all duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">E-Mail</h3>
                  <a href="mailto:info@primecpp.com" className="text-muted-foreground hover:text-primary transition-colors">
                    {"info(a)primecpp.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 glass rounded-2xl hover-lift animate-slide-up opacity-0" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 transition-all duration-300">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                  <a href="tel:+41415522240" className="text-muted-foreground hover:text-primary transition-colors">
                    +41 41 552 22 40
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 glass rounded-2xl hover-lift animate-slide-up opacity-0" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-brand-cyan/20 text-cyan-600 transition-all duration-300">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Öffnungszeiten</h3>
                  <p className="text-muted-foreground">Montag – Freitag, 8:00 – 17:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 glass rounded-2xl hover-lift animate-slide-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-brand-indigo/15 text-brand-indigo transition-all duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Standort</h3>
                  <p className="text-muted-foreground">
                    Zwydenweg 5<br />
                    CH-6052 Hergiswil
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="glass-strong rounded-3xl p-8 lg:p-10 animate-scale-in opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full glass-blue mb-6 animate-pulse-glow">
                  <Send className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Nachricht gesendet
                </h3>
                <p className="text-muted-foreground text-lg">
                  Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from real users, traps bots */}
                <div className="absolute overflow-hidden" style={{ width: 0, height: 0, opacity: 0, position: 'absolute', top: -9999, left: -9999 }} aria-hidden="true">
                  <label htmlFor="website_url">Website</label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Name *</FieldLabel>
                      <Input id="name" name="name" placeholder="Ihr Name" required className="bg-white/50 border-white/50 focus:border-primary" />
                    </Field>
                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="email">E-Mail *</FieldLabel>
                      <Input id="email" name="email" type="email" placeholder="ihre@email.ch" required className="bg-white/50 border-white/50 focus:border-primary" />
                    </Field>
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="company">Unternehmen</FieldLabel>
                    <Input id="company" name="company" placeholder="Ihr Unternehmen" className="bg-white/50 border-white/50 focus:border-primary" />
                  </Field>
                </FieldGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="service">Gewünschte Leistung</FieldLabel>
                      <Select name="service">
                        <SelectTrigger id="service" className="bg-white/50 border-white/50">
                          <SelectValue placeholder="Leistung auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="budget">Budgetrahmen</FieldLabel>
                      <Select name="budget">
                        <SelectTrigger id="budget" className="bg-white/50 border-white/50">
                          <SelectValue placeholder="Budget auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="message">Nachricht *</FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                      rows={5}
                      required
                      className="bg-white/50 border-white/50 focus:border-primary"
                    />
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 transition-all duration-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
