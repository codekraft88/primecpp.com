"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileSearch,
  FileText,
  Search,
  Link2,
  Code,
  Globe,
  Video,
  Sparkles,
  MessageSquare,
  Info,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "page-audit",
    icon: FileSearch,
    title: "Page Audit",
    description: "Technische und inhaltliche Analyse einer bestehenden Website oder Landingpage.",
    category: "Analyse",
  },
  {
    id: "seo-texts",
    icon: FileText,
    title: "SEO Texte",
    description: "Professionelle SEO-Texte fur Landingpages, Blogartikel und mehr.",
    category: "Content",
  },
  {
    id: "seo-content",
    icon: Search,
    title: "SEO Content",
    description: "Planung und Erstellung suchmaschinenoptimierter Inhalte.",
    category: "Content",
  },
  {
    id: "backlinks",
    icon: Link2,
    title: "Backlinks",
    description: "Qualitatsorientierter Aufbau relevanter Verweise.",
    category: "Authority",
  },
  {
    id: "technical-seo",
    icon: Code,
    title: "Technisches SEO",
    description: "Optimierung der technischen Website-Grundlage.",
    category: "Technik",
  },
  {
    id: "website",
    icon: Globe,
    title: "Website / Landingpage",
    description: "Erstellung oder Optimierung von Websites.",
    category: "Development",
  },
  {
    id: "ugc-videos",
    icon: Video,
    title: "UGC Videos",
    description: "Authentische Kurzvideos fur Social Media und Ads.",
    category: "Production",
  },
  {
    id: "google-business",
    icon: Sparkles,
    title: "Google Business Profil",
    description: "Optimierung fur lokale Sichtbarkeit.",
    category: "Lokal",
  },
  {
    id: "custom",
    icon: MessageSquare,
    title: "Individuelle Anfrage",
    description: "Fur Projekte ausserhalb der Standardkategorien.",
    category: "Individuell",
  },
]

// Form fields for each service
const serviceFields: Record<string, React.ReactNode> = {
  "page-audit": <PageAuditFields />,
  "seo-texts": <SeoTextsFields />,
  "seo-content": <SeoContentFields />,
  "backlinks": <BacklinksFields />,
  "technical-seo": <TechnicalSeoFields />,
  "website": <WebsiteFields />,
  "ugc-videos": <UgcVideosFields />,
  "google-business": <GoogleBusinessFields />,
  "custom": <CustomFields />,
}

export default function NewOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get("service")
  
  const [step, setStep] = useState(preselectedService ? 2 : 1)
  const [selectedService, setSelectedService] = useState(preselectedService || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedServiceData = services.find(s => s.id === selectedService)

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const handleNext = () => {
    if (step === 1 && selectedService) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push("/dashboard/requests?submitted=true")
  }

  const steps = [
    { number: 1, label: "Leistung wahlen" },
    { number: 2, label: "Details erfassen" },
    { number: 3, label: "Zusammenfassung" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Neue Bestellung</h1>
            <p className="text-gray-500 mt-0.5">Erstellen Sie eine unverbindliche Anfrage</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step > s.number
                      ? "bg-[#007be4] text-white"
                      : step === s.number
                      ? "bg-[#007be4] text-white ring-4 ring-[#007be4]/20"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {step > s.number ? <Check className="h-5 w-5" /> : s.number}
                </div>
                <span className={cn(
                  "mt-2 text-sm font-medium hidden sm:block",
                  step >= s.number ? "text-gray-900" : "text-gray-400"
                )}>
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-24 lg:w-32 h-1 mx-4 rounded-full transition-colors",
                    step > s.number ? "bg-[#007be4]" : "bg-gray-100"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Leistung auswahlen</h2>
              <p className="text-gray-500 mt-0.5">Wahlen Sie die gewunschte Dienstleistung</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = service.icon
              const isSelected = selectedService === service.id
              return (
                <div
                  key={service.id}
                  className={cn(
                    "relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-md",
                    isSelected 
                      ? "border-[#007be4] bg-[#007be4]/[0.02]" 
                      : "border-gray-100 hover:border-gray-200"
                  )}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-[#007be4] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                    isSelected ? "bg-[#007be4] text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="mt-3 bg-gray-100 text-gray-600 hover:bg-gray-100">
                    {service.category}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 2: Details Form */}
      {step === 2 && selectedServiceData && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#007be4] text-white flex items-center justify-center">
              <selectedServiceData.icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{selectedServiceData.title}</h2>
              <p className="text-gray-500">Geben Sie die Details fur Ihre Anfrage ein</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
            <div className="space-y-6">
              {serviceFields[selectedService]}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Summary */}
      {step === 3 && selectedServiceData && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Zusammenfassung</h2>
            <p className="text-gray-500 mt-0.5">Prufen Sie Ihre Angaben vor dem Absenden</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 lg:p-8 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#007be4] text-white flex items-center justify-center">
                  <selectedServiceData.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedServiceData.title}</h3>
                  <p className="text-gray-500">Anfrage wird nach Absenden gepruft</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 lg:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Leistung</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedServiceData.title}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Status nach Absenden</p>
                  <p className="font-semibold text-gray-900 mt-1">In Prufung</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Geschatzte Prufzeit</p>
                  <p className="font-semibold text-gray-900 mt-1">1-2 Werktage</p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Info className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-amber-900">Wichtiger Hinweis</p>
                    <p className="text-amber-700 mt-1 text-sm leading-relaxed">
                      Das Absenden dieser Anfrage ist unverbindlich. prime CPP pruft Ihre Angaben und erstellt ein passendes Angebot. 
                      Erst nach Ihrer aktiven Freigabe und Zahlung wird der Auftrag kostenpflichtig aktiviert.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Kostenlose und unverbindliche Anfrage</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="rounded-xl h-11 px-5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zuruck
        </Button>

        {step < 3 ? (
          <Button
            onClick={handleNext}
            disabled={step === 1 && !selectedService}
            className="bg-[#007be4] hover:bg-[#0066c2] rounded-xl h-11 px-6"
          >
            Weiter
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#007be4] hover:bg-[#0066c2] rounded-xl h-11 px-6"
          >
            {isSubmitting ? "Wird gesendet..." : "Anfrage einreichen"}
            {!isSubmitting && <Check className="h-4 w-4 ml-2" />}
          </Button>
        )}
      </div>
    </div>
  )
}

// Service-specific form fields components
function FormSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      {title && <h3 className="font-medium text-gray-900">{title}</h3>}
      {children}
    </div>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  )
}

function PageAuditFields() {
  return (
    <>
      <FormField label="Website-URL" required>
        <Input placeholder="https://beispiel.ch" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Ziel der Analyse">
        <Textarea placeholder="Was mochten Sie mit dem Audit erreichen?" className="rounded-xl min-h-[100px]" />
      </FormField>
      <FormField label="Anzahl zu prufender Seiten">
        <Select>
          <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Einzelne Seite</SelectItem>
            <SelectItem value="5">Bis zu 5 Seiten</SelectItem>
            <SelectItem value="10">Bis zu 10 Seiten</SelectItem>
            <SelectItem value="full">Komplette Website</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <FormField label="Gewunschter Fokus">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Technik", "SEO", "Content", "Conversion", "Gesamtanalyse"].map((focus) => (
            <label key={focus} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={focus} />
              <span className="text-sm text-gray-700">{focus}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Zugang zu Google Search Console vorhanden?">
        <RadioGroup defaultValue="no" className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="gsc-yes" />
            <Label htmlFor="gsc-yes" className="text-gray-700">Ja</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="gsc-no" />
            <Label htmlFor="gsc-no" className="text-gray-700">Nein</Label>
          </div>
        </RadioGroup>
      </FormField>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function SeoTextsFields() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Thema" required>
          <Input placeholder="Worum geht es im Text?" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Zielseite oder gewunschte URL">
          <Input placeholder="https://beispiel.ch/seite" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Textart">
          <Select>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="landingpage">Landingpage</SelectItem>
              <SelectItem value="blog">Blogartikel</SelectItem>
              <SelectItem value="service">Leistungsseite</SelectItem>
              <SelectItem value="category">Kategorietext</SelectItem>
              <SelectItem value="guide">Ratgeber</SelectItem>
              <SelectItem value="meta">Meta-Daten</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Gewunschte Wortanzahl">
          <Select>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="500">Bis 500 Worter</SelectItem>
              <SelectItem value="800">800 Worter</SelectItem>
              <SelectItem value="1200">1.200 Worter</SelectItem>
              <SelectItem value="1500">1.500 Worter</SelectItem>
              <SelectItem value="custom">Individuell</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Hauptkeyword">
          <Input placeholder="z.B. SEO Agentur Zurich" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Nebenkeywords">
          <Input placeholder="Kommagetrennt" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Zielgruppe">
          <Input placeholder="Wer soll angesprochen werden?" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Tonalitat">
          <Select>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professionell</SelectItem>
              <SelectItem value="direct">Direkt</SelectItem>
              <SelectItem value="advisory">Beratend</SelectItem>
              <SelectItem value="sales">Verkaufsstark</SelectItem>
              <SelectItem value="informative">Informativ</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="Deadline">
        <Input type="date" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function SeoContentFields() {
  return (
    <>
      <FormField label="Website-URL" required>
        <Input placeholder="https://beispiel.ch" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Ziel des Contents">
        <Textarea placeholder="Was soll erreicht werden?" className="rounded-xl min-h-[100px]" />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Branche">
          <Input placeholder="z.B. Finanzdienstleistungen" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Gewunschte Anzahl Inhalte">
          <Input type="number" placeholder="z.B. 5" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Einmalig oder monatlich?">
        <Select>
          <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="once">Einmalig</SelectItem>
            <SelectItem value="monthly">Monatlich</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <FormField label="Gewunschter Content-Typ">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Blogartikel", "Landingpages", "Leistungsseiten", "Ratgeber", "Content-Plan"].map((type) => (
            <label key={type} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={type} />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Wichtigste Wettbewerber">
        <Textarea placeholder="URLs oder Namen von Wettbewerbern" className="rounded-xl min-h-[80px]" />
      </FormField>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function BacklinksFields() {
  return (
    <>
      <FormField label="Website-URL" required>
        <Input placeholder="https://beispiel.ch" className="h-11 rounded-xl" />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Branche">
          <Input placeholder="z.B. E-Commerce" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Zielregion">
          <Input placeholder="z.B. Schweiz, DACH" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Bestehende Backlinks bekannt?">
        <RadioGroup defaultValue="no" className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="backlinks-yes" />
            <Label htmlFor="backlinks-yes" className="text-gray-700">Ja</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="backlinks-no" />
            <Label htmlFor="backlinks-no" className="text-gray-700">Nein</Label>
          </div>
        </RadioGroup>
      </FormField>
      <FormField label="Gewunschter Fokus">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Backlink Check", "Lokale Links", "Branchenlinks", "Autoritat", "Analyse", "Outreach-Vorbereitung"].map((focus) => (
            <label key={focus} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={focus} />
              <span className="text-sm text-gray-700">{focus}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Bestehende Partner oder Branchenplattformen?">
        <Textarea placeholder="Falls vorhanden, bitte angeben" className="rounded-xl min-h-[80px]" />
      </FormField>
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
        <p className="text-sm text-amber-700">
          <strong>Hinweis:</strong> Backlink-Leistungen werden qualitatsorientiert gepruft. 
          Veroffentlichungen durch externe Plattformen konnen nicht garantiert werden.
        </p>
      </div>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function TechnicalSeoFields() {
  return (
    <>
      <FormField label="Website-URL" required>
        <Input placeholder="https://beispiel.ch" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="CMS / System">
        <Input placeholder="z.B. WordPress, Shopify, Custom" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Bekannte technische Probleme">
        <Textarea placeholder="Falls bekannt, bitte beschreiben" className="rounded-xl min-h-[80px]" />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Zugriff auf Google Search Console?">
          <RadioGroup defaultValue="no" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="tech-gsc-yes" />
              <Label htmlFor="tech-gsc-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="tech-gsc-no" />
              <Label htmlFor="tech-gsc-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
        <FormField label="Zugriff auf Analytics?">
          <RadioGroup defaultValue="no" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="analytics-yes" />
              <Label htmlFor="analytics-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="analytics-no" />
              <Label htmlFor="analytics-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>
      <FormField label="Gewunschter Fokus">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Performance", "Indexierung", "Strukturierte Daten", "Fehleranalyse", "Mobile Optimierung", "Core Web Vitals"].map((focus) => (
            <label key={focus} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={focus} />
              <span className="text-sm text-gray-700">{focus}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function WebsiteFields() {
  return (
    <>
      <FormField label="Projektart" required>
        <Select>
          <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="new-website">Neue Website</SelectItem>
            <SelectItem value="new-landing">Neue Landingpage</SelectItem>
            <SelectItem value="optimize">Bestehende Seite optimieren</SelectItem>
            <SelectItem value="relaunch">Relaunch</SelectItem>
            <SelectItem value="conversion">Conversion-Optimierung</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Anzahl Seiten">
          <Input type="number" placeholder="z.B. 5" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Gewunschter Launch-Zeitraum">
          <Input type="date" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Ziel der Seite">
        <Textarea placeholder="Was soll die Seite erreichen?" className="rounded-xl min-h-[100px]" />
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField label="Bestehendes Design?">
          <RadioGroup defaultValue="no" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="design-yes" />
              <Label htmlFor="design-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="design-no" />
              <Label htmlFor="design-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
        <FormField label="Texte vorhanden?">
          <RadioGroup defaultValue="no" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="texts-yes" />
              <Label htmlFor="texts-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="texts-no" />
              <Label htmlFor="texts-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
        <FormField label="Bilder vorhanden?">
          <RadioGroup defaultValue="no" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="images-yes" />
              <Label htmlFor="images-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="images-no" />
              <Label htmlFor="images-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>
      <FormField label="Benotigte Funktionen">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Kontaktformular", "Buchungsformular", "Kundenlogin", "Zahlungsfunktion", "Blog", "Mehrsprachigkeit"].map((feature) => (
            <label key={feature} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={feature} />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function UgcVideosFields() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Marke / Unternehmen" required>
          <Input placeholder="Ihr Unternehmen" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Produkt oder Dienstleistung">
          <Input placeholder="Was wird beworben?" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Ziel des Videos">
        <Textarea placeholder="Was soll das Video erreichen?" className="rounded-xl min-h-[80px]" />
      </FormField>
      <FormField label="Plattform">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["TikTok", "Instagram Reels", "YouTube Shorts", "Meta Ads", "Website", "Andere"].map((platform) => (
            <label key={platform} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={platform} />
              <span className="text-sm text-gray-700">{platform}</span>
            </label>
          ))}
        </div>
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Videoformat">
          <Select>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Format" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="9:16">9:16 (Vertikal)</SelectItem>
              <SelectItem value="1:1">1:1 (Quadrat)</SelectItem>
              <SelectItem value="16:9">16:9 (Horizontal)</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Anzahl Videos">
          <Input type="number" placeholder="z.B. 3" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Videolange">
          <Select>
            <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Lange" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 Sekunden</SelectItem>
              <SelectItem value="30">30 Sekunden</SelectItem>
              <SelectItem value="60">60 Sekunden</SelectItem>
              <SelectItem value="custom">Individuell</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="Videoart">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["UGC", "Produktdemo", "Testimonial-Style", "Problem-Losung", "Unboxing", "Ad Creative", "Erklarvideo"].map((type) => (
            <label key={type} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={type} />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Zielgruppe">
          <Input placeholder="Wer soll angesprochen werden?" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Kernbotschaft">
          <Input placeholder="Die wichtigste Aussage" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Tonalitat">
        <Select>
          <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Bitte wahlen" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="authentic">Authentisch</SelectItem>
            <SelectItem value="professional">Professionell</SelectItem>
            <SelectItem value="emotional">Emotional</SelectItem>
            <SelectItem value="humorous">Humorvoll</SelectItem>
            <SelectItem value="direct">Direkt</SelectItem>
            <SelectItem value="explaining">Erklarend</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField label="Script benotigt?">
          <RadioGroup defaultValue="yes" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="script-yes" />
              <Label htmlFor="script-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="script-no" />
              <Label htmlFor="script-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
        <FormField label="Creator benotigt?">
          <RadioGroup defaultValue="yes" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="creator-yes" />
              <Label htmlFor="creator-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="creator-no" />
              <Label htmlFor="creator-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
        <FormField label="Schnitt benotigt?">
          <RadioGroup defaultValue="yes" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="edit-yes" />
              <Label htmlFor="edit-yes" className="text-gray-700">Ja</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="edit-no" />
              <Label htmlFor="edit-no" className="text-gray-700">Nein</Label>
            </div>
          </RadioGroup>
        </FormField>
      </div>
      <FormField label="Deadline">
        <Input type="date" className="h-11 rounded-xl" />
      </FormField>
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <p className="text-sm text-blue-700">
          <strong>Hinweis:</strong> Nach dem Absenden pruft prime CPP Anforderungen, Aufwand, Creator-Verfugbarkeit, 
          Nutzungsrechte und Produktionsumfang. Anschliessend erhalten Sie ein passendes Angebot.
        </p>
      </div>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function GoogleBusinessFields() {
  return (
    <>
      <FormField label="Unternehmensname" required>
        <Input placeholder="Ihr Unternehmen" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Profil-Link (falls vorhanden)">
        <Input placeholder="https://g.page/..." className="h-11 rounded-xl" />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Website-URL">
          <Input placeholder="https://beispiel.ch" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Standort">
          <Input placeholder="z.B. Zurich" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Branche">
        <Input placeholder="z.B. Gastronomie" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Ziel der Optimierung">
        <Textarea placeholder="Was mochten Sie erreichen?" className="rounded-xl min-h-[80px]" />
      </FormField>
      <FormField label="Bestehender Zugriff vorhanden?">
        <RadioGroup defaultValue="yes" className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="access-yes" />
            <Label htmlFor="access-yes" className="text-gray-700">Ja</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="access-no" />
            <Label htmlFor="access-no" className="text-gray-700">Nein</Label>
          </div>
        </RadioGroup>
      </FormField>
      <FormField label="Gewunschter Fokus">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {["Sichtbarkeit", "Beschreibung", "Kategorien", "Leistungen", "Bilder", "Bewertungen", "Lokale SEO"].map((focus) => (
            <label key={focus} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
              <Checkbox id={focus} />
              <span className="text-sm text-gray-700">{focus}</span>
            </label>
          ))}
        </div>
      </FormField>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}

function CustomFields() {
  return (
    <>
      <FormField label="Projekttitel" required>
        <Input placeholder="Name Ihres Projekts" className="h-11 rounded-xl" />
      </FormField>
      <FormField label="Beschreibung" required>
        <Textarea placeholder="Beschreiben Sie Ihr Projekt ausfuhrlich" rows={5} className="rounded-xl min-h-[140px]" />
      </FormField>
      <FormField label="Ziel des Projekts">
        <Textarea placeholder="Was soll erreicht werden?" className="rounded-xl min-h-[80px]" />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Gewunschter Zeitraum">
          <Input placeholder="z.B. 3 Monate" className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Budgetrahmen">
          <Input placeholder="z.B. CHF 5.000 - 10.000" className="h-11 rounded-xl" />
        </FormField>
      </div>
      <FormField label="Zusatzliche Hinweise">
        <Textarea placeholder="Weitere Informationen, Links oder Dateien..." className="rounded-xl min-h-[100px]" />
      </FormField>
    </>
  )
}
