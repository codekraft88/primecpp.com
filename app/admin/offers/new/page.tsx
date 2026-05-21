"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft,
  Send,
  Save,
  User,
  FileText,
  Calendar,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/toast-provider"

const clients = [
  { id: "CLT-001", name: "Muster AG", email: "max@muster.ch" },
  { id: "CLT-002", name: "Tech Solutions AG", email: "info@techsolutions.ch" },
  { id: "CLT-003", name: "Digital GmbH", email: "kontakt@digital.ch" },
  { id: "CLT-004", name: "Startup Inc.", email: "hello@startup.ch" },
]

const serviceCategories = [
  "Page Audit",
  "SEO Texte",
  "SEO Content",
  "Backlinks",
  "Technisches SEO",
  "Website / Landingpage",
  "UGC Videos",
  "Google Business Profil",
  "Individuelle Anfrage",
]

const paymentTypes = [
  { value: "one-time", label: "Einmalzahlung" },
  { value: "monthly", label: "Monatlich" },
  { value: "quarterly", label: "Quartalsweise" },
]

export default function NewOfferPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [isSending, setIsSending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSendOffer = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSending(false)
    showToast("Angebot wurde an den Kunden gesendet.", "success")
    router.push("/admin/offers")
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    showToast("Angebot wurde als Entwurf gespeichert.", "success")
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl">
          <Link href="/admin/offers">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Neues Angebot erstellen</h1>
          <p className="text-muted-foreground mt-1">Erstellen Sie ein Angebot fur einen Kunden</p>
        </div>
      </div>

      <form onSubmit={handleSendOffer} className="space-y-6">
        {/* Client Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Kunde
            </CardTitle>
            <CardDescription>Wahlen Sie den Kunden fur dieses Angebot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Kunde *</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Kunde auswahlen" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Offer Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Angebotsdetails
            </CardTitle>
            <CardDescription>Definieren Sie den Umfang und Inhalt des Angebots</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Angebots-Titel *</label>
              <Input placeholder="z.B. SEO Text Professional fur Landingpage" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Leistungskategorie *</label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie auswahlen" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Leistungsumfang *</label>
              <Textarea 
                placeholder="Beschreiben Sie den Umfang der Leistung im Detail..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Lieferumfang (Deliverables) *</label>
              <Textarea 
                placeholder="Was wird konkret geliefert? (z.B. 1 SEO-Text bis 1.500 Worter inkl. Keyword-Integration und Meta-Daten)"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Geschatzte Lieferzeit</label>
                <Input placeholder="z.B. 5-7 Werktage" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Revisionsrunden</label>
                <Input type="number" placeholder="z.B. 2" min="0" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Preis & Zahlung
            </CardTitle>
            <CardDescription>Definieren Sie Preis und Zahlungskonditionen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Preis (CHF) *</label>
                <Input type="number" placeholder="490" required min="0" step="0.01" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Zahlungsart *</label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Zahlungsart wahlen" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">MwSt.-Hinweis</label>
                <Input placeholder="z.B. zzgl. 8.1% MwSt." />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mindestlaufzeit</label>
                <Input placeholder="z.B. 3 Monate" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validity & Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Gultigkeit & Notizen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gultig bis *</label>
                <Input type="date" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Zahlungsziel</label>
                <Input placeholder="z.B. 14 Tage nach Rechnungsstellung" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nachricht an Kunden</label>
              <Textarea 
                placeholder="Optionale personliche Nachricht zum Angebot..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Interne Notizen</label>
              <Textarea 
                placeholder="Interne Notizen (nicht fur Kunden sichtbar)..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="h-11"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Wird gespeichert..." : "Als Entwurf speichern"}
          </Button>
          <Button 
            type="submit" 
            disabled={isSending}
            className="h-11 bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? "Wird gesendet..." : "Angebot an Kunden senden"}
          </Button>
        </div>
      </form>
    </div>
  )
}
