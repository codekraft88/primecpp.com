"use client"

import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  CreditCard,
  Plus,
  Filter,
  Search,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useOffers } from "@/lib/supabase/hooks"
import { EmptyOffers } from "@/components/dashboard/empty-states"
import type { Offer } from "@/lib/supabase/types"
import { useState, useMemo } from "react"

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; icon: React.ElementType }> = {
  "pending": { label: "Freigabe ausstehend", bgColor: "bg-amber-50", textColor: "text-amber-700", icon: Clock },
  "accepted": { label: "Angenommen", bgColor: "bg-emerald-50", textColor: "text-emerald-700", icon: CheckCircle },
  "declined": { label: "Abgelehnt", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: AlertCircle },
  "expired": { label: "Abgelaufen", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: AlertCircle },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-CH', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

function formatCurrency(amount: number): string {
  return `CHF ${amount.toLocaleString('de-CH')}`
}

export default function OffersPage() {
  const { data: offers, isLoading, error } = useOffers()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOffers = useMemo(() => {
    if (!offers) return []
    if (!searchQuery) return offers
    const query = searchQuery.toLowerCase()
    return offers.filter(o => 
      o.title.toLowerCase().includes(query) ||
      o.description?.toLowerCase().includes(query)
    )
  }, [offers, searchQuery])

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
        <p className="text-red-600">Fehler beim Laden der Angebote. Bitte versuchen Sie es erneut.</p>
      </div>
    )
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="space-y-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Angebote</h1>
            <p className="text-gray-500 mt-1">
              Prufen und akzeptieren Sie Angebote von prime CPP
            </p>
          </div>
          <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20">
            <Link href="/dashboard/new-order">
              <Plus className="mr-2 h-4 w-4" />
              Neue Anfrage
            </Link>
          </Button>
        </div>
        <EmptyOffers />
      </div>
    )
  }

  const activeOffers = offers.filter(o => o.status === "pending")
  const processedOffers = offers.filter(o => o.status !== "pending")

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Angebote</h1>
          <p className="text-gray-500 mt-1">
            Prufen und akzeptieren Sie Angebote von prime CPP
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
          <p className="text-3xl font-bold text-gray-900 mt-2">{offers.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Offen</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">{activeOffers.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Angenommen</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{offers.filter(o => o.status === "accepted").length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Abgelaufen</p>
          <p className="text-3xl font-bold text-gray-600 mt-2">{offers.filter(o => o.status === "expired").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Angebote durchsuchen..."
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

      {/* Active Offers */}
      {activeOffers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Offene Angebote</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeOffers.map((offer) => {
              const status = statusConfig[offer.status] || statusConfig.pending
              const StatusIcon = status.icon
              return (
                <div key={offer.id} className="rounded-2xl bg-white border-2 border-[#007be4]/20 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                        {offer.description && (
                          <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Preis</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(offer.total_amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-6 text-sm mb-5">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Erstellt: {formatDate(offer.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Gultig bis: {formatDate(offer.valid_until)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button asChild className="flex-1 h-11 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white shadow-md shadow-[#007be4]/20">
                        <Link href={`/dashboard/offers/${offer.id}`}>
                          Angebot prufen
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Processed Offers */}
      {processedOffers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Abgeschlossene Angebote</h2>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {processedOffers.map((offer) => {
                const status = statusConfig[offer.status] || statusConfig.pending
                const StatusIcon = status.icon
                return (
                  <Link key={offer.id} href={`/dashboard/offers/${offer.id}`}>
                    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bgColor}`}>
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold text-gray-900">{offer.title}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{formatDate(offer.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(offer.total_amount)}</span>
                        <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#007be4] transition-colors" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <FileCheck className="h-6 w-6 text-[#007be4]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Uber Angebote</h3>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              Dieses Angebot wird erst kostenpflichtig, wenn Sie es aktiv annehmen und die Zahlung abschliessen. 
              Ihr Auftrag startet nach Zahlungseingang und Freischaltung durch prime CPP.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
