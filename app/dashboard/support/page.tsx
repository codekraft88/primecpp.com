"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, Mail, Phone, Send, Clock, CheckCircle, ArrowUpRight, Plus, Upload, Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/toast-provider"

const supportTickets = [
  {
    id: "TKT-2026-004",
    subject: "Frage zur UGC-Lieferung",
    status: "Offen",
    priority: "Normal",
    date: "5. Mai 2026",
    lastUpdate: "5. Mai 2026",
    relatedOrder: "ORD-2026-003",
  },
  {
    id: "TKT-2026-003",
    subject: "Frage zum monatlichen Report",
    status: "Beantwortet",
    priority: "Normal",
    date: "25. April 2026",
    lastUpdate: "26. April 2026",
    relatedOrder: "ORD-2026-001",
  },
  {
    id: "TKT-2026-002",
    subject: "Keyword-Anpassung anfragen",
    status: "Geschlossen",
    priority: "Niedrig",
    date: "15. Marz 2026",
    lastUpdate: "17. Marz 2026",
    relatedOrder: null,
  },
  {
    id: "TKT-2026-001",
    subject: "Onboarding Fragen",
    status: "Geschlossen",
    priority: "Hoch",
    date: "2. Dezember 2025",
    lastUpdate: "5. Dezember 2025",
    relatedOrder: null,
  },
]

const topics = [
  "Allgemeine Anfrage",
  "Technische Frage",
  "Rechnung & Zahlung",
  "Paket andern",
  "Report & Analyse",
  "Lieferung & Revision",
  "Kundigung",
  "Sonstiges",
]

const priorities = [
  { value: "low", label: "Niedrig" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "Hoch" },
]

const relatedOrders = [
  { value: "none", label: "Kein Auftrag" },
  { value: "ORD-2026-001", label: "ORD-2026-001 - SEO Growth" },
  { value: "ORD-2026-002", label: "ORD-2026-002 - Page Audit" },
  { value: "ORD-2026-003", label: "ORD-2026-003 - UGC Video" },
]

const statusConfig: Record<string, { bgColor: string; textColor: string }> = {
  "Offen": { bgColor: "bg-amber-50", textColor: "text-amber-700" },
  "Beantwortet": { bgColor: "bg-[#007be4]/10", textColor: "text-[#007be4]" },
  "Geschlossen": { bgColor: "bg-gray-100", textColor: "text-gray-600" },
}

export default function SupportPage() {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [files, setFiles] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowForm(false)
    setFiles([])
    showToast("Ihre Support-Anfrage wurde eingereicht.", "success")
  }

  const handleFileUpload = () => {
    // Mock file upload
    setFiles([...files, `dokument-${files.length + 1}.pdf`])
    showToast("Datei wurde hinzugefugt.", "success")
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-500 mt-1">
            Wir sind fur Sie da. Senden Sie uns eine Nachricht oder kontaktieren Sie uns direkt.
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Neue Anfrage
        </Button>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#007be4]/10 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-[#007be4]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">E-Mail</h3>
          <a href="mailto:support@primecpp.ch" className="text-sm text-[#007be4] hover:underline">
            support@primecpp.ch
          </a>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#007be4]/10 flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 text-[#007be4]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
          <p className="text-sm text-gray-500">Mo-Fr, 8:00-17:00</p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#007be4]/10 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-[#007be4]" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Antwortzeit</h3>
          <p className="text-sm text-gray-500">Innerhalb von 24 Stunden</p>
        </div>
      </div>

      {/* New Support Request Form */}
      {showForm && (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-[#007be4]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Neue Support-Anfrage</h3>
                  <p className="text-sm text-gray-500">Beschreiben Sie Ihr Anliegen</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)} className="h-9 w-9 rounded-lg">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thema *</label>
                <Select name="topic" required>
                  <SelectTrigger className="h-11 rounded-xl border-gray-200">
                    <SelectValue placeholder="Thema auswahlen" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioritat</label>
                <Select name="priority" defaultValue="normal">
                  <SelectTrigger className="h-11 rounded-xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zugehoriger Auftrag (optional)</label>
              <Select name="relatedOrder">
                <SelectTrigger className="h-11 rounded-xl border-gray-200">
                  <SelectValue placeholder="Auftrag auswahlen" />
                </SelectTrigger>
                <SelectContent>
                  {relatedOrders.map((order) => (
                    <SelectItem key={order.value} value={order.value}>
                      {order.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Betreff *</label>
              <Input 
                name="subject" 
                placeholder="Kurze Beschreibung Ihres Anliegens" 
                required 
                className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nachricht *</label>
              <Textarea
                name="message"
                placeholder="Beschreiben Sie Ihr Anliegen im Detail..."
                rows={5}
                required
                className="rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anhange (optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#007be4]/50 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Dateien hierher ziehen oder</p>
                <Button type="button" variant="outline" size="sm" onClick={handleFileUpload} className="rounded-lg">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Datei auswahlen
                </Button>
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="text-sm text-gray-700">{file}</span>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-7 w-7">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="h-11 px-5 rounded-xl">
                Abbrechen
              </Button>
              <Button
                type="submit"
                className="h-11 px-6 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white shadow-md shadow-[#007be4]/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Wird gesendet..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Anfrage senden
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Support Tickets */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ihre Anfragen</h2>
        
        {supportTickets.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Keine Anfragen</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Sie haben noch keine Support-Anfragen gestellt. Bei Fragen stehen wir Ihnen gerne zur Verfugung.
            </p>
            <Button onClick={() => setShowForm(true)} className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              Neue Anfrage erstellen
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {supportTickets.map((ticket) => {
                const status = statusConfig[ticket.status]
                return (
                  <div key={ticket.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-gray-900">{ticket.subject}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{ticket.id}</span>
                          <span className="text-gray-200">|</span>
                          <span>Erstellt: {ticket.date}</span>
                          {ticket.relatedOrder && (
                            <>
                              <span className="text-gray-200">|</span>
                              <span>Auftrag: {ticket.relatedOrder}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-400">Letzte Aktualisierung</p>
                          <p className="text-sm text-gray-600">{ticket.lastUpdate}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#007be4] transition-colors" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-[#007be4]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Support-Garantie</h3>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              Wir antworten auf alle Anfragen innerhalb von 24 Stunden an Werktagen. 
              Fur dringende technische Probleme erreichen Sie uns auch telefonisch.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
