"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, Mail, Phone, Send, Clock, CheckCircle, ArrowUpRight, Plus, Upload, Paperclip, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/toast-provider"
import { useSupportTickets, useOrders } from "@/lib/supabase/hooks"
import { EmptySupportTickets } from "@/components/dashboard/empty-states"
import { createClient } from "@/lib/supabase/client"

const topics = [
  { value: "general", label: "Allgemeine Anfrage" },
  { value: "technical", label: "Technische Frage" },
  { value: "billing", label: "Rechnung & Zahlung" },
  { value: "feedback", label: "Feedback" },
]

const priorities = [
  { value: "low", label: "Niedrig" },
  { value: "medium", label: "Normal" },
  { value: "high", label: "Hoch" },
  { value: "urgent", label: "Dringend" },
]

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  "open": { label: "Offen", bgColor: "bg-amber-50", textColor: "text-amber-700" },
  "in_progress": { label: "In Bearbeitung", bgColor: "bg-[#007be4]/10", textColor: "text-[#007be4]" },
  "resolved": { label: "Gelost", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  "closed": { label: "Geschlossen", bgColor: "bg-gray-100", textColor: "text-gray-600" },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-CH', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `vor ${diffMins} Minuten`
  if (diffHours < 24) return `vor ${diffHours} Stunden`
  if (diffDays === 1) return 'vor 1 Tag'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  return formatDate(dateString)
}

export default function SupportPage() {
  const { showToast } = useToast()
  const { data: tickets, isLoading, error, mutate } = useSupportTickets()
  const { data: orders } = useOrders()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const category = formData.get('topic') as string
    const priority = formData.get('priority') as string

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        showToast("Sie mussen angemeldet sein.", "error")
        return
      }

      const { error: insertError } = await supabase.from('support_tickets').insert({
        user_id: user.id,
        subject,
        message,
        category: category || 'general',
        priority: priority || 'medium',
        status: 'open',
      })

      if (insertError) throw insertError

      setShowForm(false)
      mutate() // Refresh tickets
      showToast("Ihre Support-Anfrage wurde eingereicht.", "success")
    } catch (err) {
      showToast("Fehler beim Senden der Anfrage.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#007be4]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center">
        <p className="text-red-600">Fehler beim Laden der Support-Anfragen. Bitte versuchen Sie es erneut.</p>
      </div>
    )
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
                      <SelectItem key={topic.value} value={topic.value}>
                        {topic.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioritat</label>
                <Select name="priority" defaultValue="medium">
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
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird gesendet...
                  </>
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
        
        {!tickets || tickets.length === 0 ? (
          <EmptySupportTickets />
        ) : (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {tickets.map((ticket) => {
                const status = statusConfig[ticket.status] || statusConfig.open
                return (
                  <div key={ticket.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-gray-900">{ticket.subject}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>Erstellt: {formatDate(ticket.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-400">Letzte Aktualisierung</p>
                          <p className="text-sm text-gray-600">{formatTimeAgo(ticket.updated_at)}</p>
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
