"use client"

import Link from "next/link"
import {
  ArrowRight,
  FileSearch,
  FileText,
  Link2,
  Video,
  Clock,
  Search,
  Plus,
  Loader2,
  CheckCircle2,
  Send,
  FileCheck,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRequests } from "@/lib/supabase/hooks"
import { EmptyRequests } from "@/components/dashboard/empty-states"
import type { Request } from "@/lib/supabase/types"
import { useState, useMemo } from "react"

const statusConfig: Record<string, { 
  label: string
  bgColor: string
  textColor: string
  icon: typeof Clock
  description: string
}> = {
  "pending": { 
    label: "Eingereicht", 
    bgColor: "bg-blue-50", 
    textColor: "text-blue-700",
    icon: Send,
    description: "Ihre Anfrage wurde ubermittelt"
  },
  "in_review": { 
    label: "In Prufung", 
    bgColor: "bg-amber-50", 
    textColor: "text-amber-700",
    icon: Clock,
    description: "Wird aktuell bearbeitet"
  },
  "offer_sent": { 
    label: "Angebot erstellt", 
    bgColor: "bg-emerald-50", 
    textColor: "text-emerald-700",
    icon: FileCheck,
    description: "Ein Angebot wartet auf Sie"
  },
  "completed": { 
    label: "Abgeschlossen", 
    bgColor: "bg-gray-100", 
    textColor: "text-gray-600",
    icon: CheckCircle2,
    description: "Erfolgreich abgeschlossen"
  },
  "cancelled": { 
    label: "Abgebrochen", 
    bgColor: "bg-gray-100", 
    textColor: "text-gray-500",
    icon: XCircle,
    description: "Anfrage wurde storniert"
  },
}

const categoryConfig: Record<string, { icon: typeof FileText; color: string; bgColor: string; label: string }> = {
  "page-audit": { 
    icon: FileSearch, 
    color: "text-indigo-600", 
    bgColor: "bg-indigo-50",
    label: "Page Audit"
  },
  "seo-texts": { 
    icon: FileText, 
    color: "text-blue-600", 
    bgColor: "bg-blue-50",
    label: "SEO Texte"
  },
  "backlinks": { 
    icon: Link2, 
    color: "text-emerald-600", 
    bgColor: "bg-emerald-50",
    label: "Backlinks"
  },
  "ugc-videos": { 
    icon: Video, 
    color: "text-pink-600", 
    bgColor: "bg-pink-50",
    label: "UGC Videos"
  },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-CH', { 
    day: 'numeric', 
    month: 'short', 
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

  if (diffMins < 60) return `vor ${diffMins} Min.`
  if (diffHours < 24) return `vor ${diffHours} Std.`
  if (diffDays === 1) return 'Gestern'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  return formatDate(dateString)
}

function getCategorySlug(serviceName: string): string {
  const name = serviceName.toLowerCase()
  if (name.includes('audit')) return 'page-audit'
  if (name.includes('seo') || name.includes('text')) return 'seo-texts'
  if (name.includes('backlink')) return 'backlinks'
  if (name.includes('ugc') || name.includes('video')) return 'ugc-videos'
  return 'seo-texts'
}

type StatusFilter = 'all' | 'pending' | 'in_review' | 'offer_sent' | 'completed'

export default function RequestsPage() {
  const { data: requests, isLoading, error } = useRequests()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredRequests = useMemo(() => {
    if (!requests) return []
    let filtered = requests
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(r => 
        r.service_name.toLowerCase().includes(query) ||
        r.project_name?.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [requests, searchQuery, statusFilter])

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
        <p className="text-red-600">Fehler beim Laden der Anfragen. Bitte versuchen Sie es erneut.</p>
      </div>
    )
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Meine Anfragen</h1>
            <p className="text-gray-500 mt-1">
              Verwalten Sie Ihre Projektanfragen und verfolgen Sie den Status
            </p>
          </div>
          <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-6 rounded-xl shadow-md shadow-[#007be4]/20">
            <Link href="/dashboard/new-order">
              <Plus className="mr-2 h-4 w-4" />
              Neue Anfrage stellen
            </Link>
          </Button>
        </div>
        <EmptyRequests />
      </div>
    )
  }

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inReview: requests.filter(r => r.status === 'in_review').length,
    offerSent: requests.filter(r => r.status === 'offer_sent').length,
    completed: requests.filter(r => r.status === 'completed').length,
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Meine Anfragen</h1>
          <p className="text-gray-500 mt-1">
            Verwalten Sie Ihre Projektanfragen und verfolgen Sie den Status
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-6 rounded-xl shadow-md shadow-[#007be4]/20">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Neue Anfrage stellen
          </Link>
        </Button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <button 
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-xl border transition-all text-left ${
            statusFilter === 'all' 
              ? 'bg-gray-900 border-gray-900 text-white' 
              : 'bg-white border-gray-100 hover:border-gray-200'
          }`}
        >
          <p className={`text-2xl font-bold ${statusFilter === 'all' ? 'text-white' : 'text-gray-900'}`}>
            {stats.total}
          </p>
          <p className={`text-xs font-medium mt-1 ${statusFilter === 'all' ? 'text-gray-300' : 'text-gray-500'}`}>
            Gesamt
          </p>
        </button>
        <button 
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-xl border transition-all text-left ${
            statusFilter === 'pending' 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-white border-gray-100 hover:border-blue-200'
          }`}
        >
          <p className={`text-2xl font-bold ${statusFilter === 'pending' ? 'text-white' : 'text-blue-600'}`}>
            {stats.pending}
          </p>
          <p className={`text-xs font-medium mt-1 ${statusFilter === 'pending' ? 'text-blue-100' : 'text-gray-500'}`}>
            Eingereicht
          </p>
        </button>
        <button 
          onClick={() => setStatusFilter('in_review')}
          className={`p-4 rounded-xl border transition-all text-left ${
            statusFilter === 'in_review' 
              ? 'bg-amber-500 border-amber-500 text-white' 
              : 'bg-white border-gray-100 hover:border-amber-200'
          }`}
        >
          <p className={`text-2xl font-bold ${statusFilter === 'in_review' ? 'text-white' : 'text-amber-600'}`}>
            {stats.inReview}
          </p>
          <p className={`text-xs font-medium mt-1 ${statusFilter === 'in_review' ? 'text-amber-100' : 'text-gray-500'}`}>
            In Prufung
          </p>
        </button>
        <button 
          onClick={() => setStatusFilter('offer_sent')}
          className={`p-4 rounded-xl border transition-all text-left ${
            statusFilter === 'offer_sent' 
              ? 'bg-emerald-600 border-emerald-600 text-white' 
              : 'bg-white border-gray-100 hover:border-emerald-200'
          }`}
        >
          <p className={`text-2xl font-bold ${statusFilter === 'offer_sent' ? 'text-white' : 'text-emerald-600'}`}>
            {stats.offerSent}
          </p>
          <p className={`text-xs font-medium mt-1 ${statusFilter === 'offer_sent' ? 'text-emerald-100' : 'text-gray-500'}`}>
            Angebot
          </p>
        </button>
        <button 
          onClick={() => setStatusFilter('completed')}
          className={`p-4 rounded-xl border transition-all text-left ${
            statusFilter === 'completed' 
              ? 'bg-gray-600 border-gray-600 text-white' 
              : 'bg-white border-gray-100 hover:border-gray-300'
          }`}
        >
          <p className={`text-2xl font-bold ${statusFilter === 'completed' ? 'text-white' : 'text-gray-600'}`}>
            {stats.completed}
          </p>
          <p className={`text-xs font-medium mt-1 ${statusFilter === 'completed' ? 'text-gray-300' : 'text-gray-500'}`}>
            Fertig
          </p>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Anfragen durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:border-[#007be4] focus:ring-[#007be4]/20"
          />
        </div>
        {statusFilter !== 'all' && (
          <Button 
            variant="outline" 
            onClick={() => setStatusFilter('all')}
            className="h-11 rounded-xl border-gray-200 text-gray-600"
          >
            Filter zurucksetzen
          </Button>
        )}
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-100 p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-900 font-medium">Keine Anfragen gefunden</p>
            <p className="text-sm text-gray-500 mt-1">Versuchen Sie einen anderen Suchbegriff oder Filter</p>
          </div>
        ) : (
          filteredRequests.map((request) => {
            const status = statusConfig[request.status] || statusConfig.pending
            const StatusIcon = status.icon
            const categorySlug = getCategorySlug(request.service_name)
            const category = categoryConfig[categorySlug] || categoryConfig['seo-texts']
            const CategoryIcon = category.icon

            return (
              <Link key={request.id} href={`/dashboard/requests/${request.id}`}>
                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#007be4]/30 transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${category.bgColor}`}>
                        <CategoryIcon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-base font-semibold text-gray-900 truncate">
                            {request.service_name}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </span>
                        </div>
                        
                        {request.project_name && (
                          <p className="text-sm text-gray-600 mt-1 truncate">
                            Projekt: {request.project_name}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>Erstellt: {formatDate(request.created_at)}</span>
                          <span className="hidden sm:inline">Aktualisiert: {formatTimeAgo(request.updated_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {request.status === 'offer_sent' && (
                        <span className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700">
                          Angebot prufen
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-[#007be4] transition-colors">
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      {/* Info Note */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-50 border border-blue-100 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <Clock className="h-5 w-5 text-[#007be4]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">So funktioniert es</h3>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              Nach Einreichung Ihrer Anfrage erstellen wir ein massgeschneidertes Angebot. 
              Sie entscheiden selbst, ob Sie das Angebot annehmen mochten - erst dann entstehen Kosten.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
