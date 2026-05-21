"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  FileSearch,
  FileText,
  Link2,
  Video,
  Clock,
  Filter,
  Search,
  Plus,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRequests } from "@/lib/supabase/hooks"
import { EmptyRequests } from "@/components/dashboard/empty-states"
import type { Request } from "@/lib/supabase/types"
import { useState, useMemo } from "react"

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  "pending": { label: "Eingereicht", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  "in_review": { label: "In Prufung", bgColor: "bg-purple-50", textColor: "text-purple-700" },
  "offer_sent": { label: "Angebot erstellt", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  "completed": { label: "Abgeschlossen", bgColor: "bg-gray-100", textColor: "text-gray-600" },
  "cancelled": { label: "Abgebrochen", bgColor: "bg-gray-100", textColor: "text-gray-600" },
}

const categoryIcons: Record<string, React.ElementType> = {
  "page-audit": FileSearch,
  "seo-texts": FileText,
  "backlinks": Link2,
  "ugc-videos": Video,
}

const categoryColors: Record<string, string> = {
  "page-audit": "bg-indigo-50 text-indigo-600",
  "seo-texts": "bg-blue-50 text-blue-600",
  "backlinks": "bg-emerald-50 text-emerald-600",
  "ugc-videos": "bg-pink-50 text-pink-600",
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

function getCategorySlug(serviceName: string): string {
  const name = serviceName.toLowerCase()
  if (name.includes('audit')) return 'page-audit'
  if (name.includes('seo') || name.includes('text')) return 'seo-texts'
  if (name.includes('backlink')) return 'backlinks'
  if (name.includes('ugc') || name.includes('video')) return 'ugc-videos'
  return 'seo-texts'
}

export default function RequestsPage() {
  const { data: requests, isLoading, error } = useRequests()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = useMemo(() => {
    if (!requests) return []
    if (!searchQuery) return requests
    const query = searchQuery.toLowerCase()
    return requests.filter(r => 
      r.service_name.toLowerCase().includes(query) ||
      r.project_name?.toLowerCase().includes(query) ||
      r.description?.toLowerCase().includes(query)
    )
  }, [requests, searchQuery])

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
      <div className="space-y-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Meine Anfragen</h1>
            <p className="text-gray-500 mt-1">
              Ubersicht aller eingereichten Anfragen und deren Status
            </p>
          </div>
          <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20">
            <Link href="/dashboard/new-order">
              <Plus className="mr-2 h-4 w-4" />
              Neue Anfrage
            </Link>
          </Button>
        </div>
        <EmptyRequests />
      </div>
    )
  }

  const inReviewCount = requests.filter(r => r.status === 'in_review').length
  const offerCreatedCount = requests.filter(r => r.status === 'offer_sent').length
  const pendingCount = requests.filter(r => r.status === 'pending').length

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Meine Anfragen</h1>
          <p className="text-gray-500 mt-1">
            Ubersicht aller eingereichten Anfragen und deren Status
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Neue Anfrage
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Gesamt</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{requests.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">In Prufung</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{inReviewCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Angebot erstellt</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{offerCreatedCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Eingereicht</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{pendingCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Anfragen durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 bg-white border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:border-[#007be4] focus:ring-[#007be4]/20"
          />
        </div>
        <Button variant="outline" className="h-11 rounded-xl border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Requests Cards */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-100 p-8 text-center">
            <p className="text-gray-500">Keine Anfragen gefunden.</p>
          </div>
        ) : (
          filteredRequests.map((request) => {
            const status = statusConfig[request.status] || statusConfig.pending
            const categorySlug = getCategorySlug(request.service_name)
            const CategoryIcon = categoryIcons[categorySlug] || FileText
            const categoryColor = categoryColors[categorySlug] || "bg-gray-50 text-gray-600"
            return (
              <Link key={request.id} href={`/dashboard/requests/${request.id}`}>
                <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#007be4]/20 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColor}`}>
                        <CategoryIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="text-base font-semibold text-gray-900">{request.service_name}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          {request.project_name && (
                            <>
                              <span className="text-sm text-gray-500">{request.project_name}</span>
                              <span className="text-gray-200">|</span>
                            </>
                          )}
                          <span className="text-sm text-gray-400">{formatDate(request.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-xs text-gray-400">Letzte Aktualisierung</p>
                        <p className="text-sm text-gray-600">{formatTimeAgo(request.updated_at)}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#007be4] transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6 text-[#007be4]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Uber Anfragen</h3>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              Das Absenden einer Anfrage ist unverbindlich. prime CPP pruft Ihre Angaben und erstellt ein passendes Angebot. 
              Erst nach Ihrer aktiven Freigabe und Zahlung wird der Auftrag kostenpflichtig aktiviert.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
