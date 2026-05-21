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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; icon: React.ElementType }> = {
  "pending-approval": { label: "Freigabe ausstehend", bgColor: "bg-amber-50", textColor: "text-amber-700", icon: Clock },
  "payment-pending": { label: "Zahlung ausstehend", bgColor: "bg-rose-50", textColor: "text-rose-700", icon: CreditCard },
  "paid": { label: "Bezahlt", bgColor: "bg-emerald-50", textColor: "text-emerald-700", icon: CheckCircle },
  "expired": { label: "Abgelaufen", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: AlertCircle },
  "declined": { label: "Abgelehnt", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: AlertCircle },
}

const offers = [
  {
    id: "OFF-001",
    title: "SEO Text fur Landingpage",
    category: "SEO Texte",
    date: "27. April 2026",
    price: "CHF 490",
    status: "pending-approval",
    validUntil: "10. Mai 2026",
    description: "1 SEO-Text bis 1.500 Worter inkl. Keyword-Integration und Meta-Daten",
  },
  {
    id: "OFF-002",
    title: "Backlink Check & Analyse",
    category: "Backlinks",
    date: "24. April 2026",
    price: "CHF 490",
    status: "payment-pending",
    validUntil: "8. Mai 2026",
    description: "Backlink-Analyse mit Qualitatsbewertung und Empfehlungsreport",
  },
  {
    id: "OFF-003",
    title: "Page Audit Professional",
    category: "Page Audit",
    date: "15. April 2026",
    price: "CHF 790",
    status: "paid",
    validUntil: "29. April 2026",
    description: "Umfassende Analyse von bis zu 5 URLs inkl. PDF-Report",
  },
  {
    id: "OFF-004",
    title: "UGC Starter Paket",
    category: "UGC Videos",
    date: "10. April 2026",
    price: "CHF 490",
    status: "expired",
    validUntil: "24. April 2026",
    description: "1 Short-Form Video bis 30 Sekunden",
  },
]

export default function OffersPage() {
  const activeOffers = offers.filter(o => o.status === "pending-approval" || o.status === "payment-pending")
  const processedOffers = offers.filter(o => o.status !== "pending-approval" && o.status !== "payment-pending")

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
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Bezahlt</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{offers.filter(o => o.status === "paid").length}</p>
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
              const status = statusConfig[offer.status]
              const StatusIcon = status.icon
              return (
                <div key={offer.id} className="rounded-2xl bg-white border-2 border-[#007be4]/20 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#007be4] mb-2">
                          {offer.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Preis</p>
                        <p className="text-2xl font-bold text-gray-900">{offer.price}</p>
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
                        <span>Erstellt: {offer.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Gultig bis: {offer.validUntil}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {offer.status === "pending-approval" && (
                        <Button asChild className="flex-1 h-11 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white shadow-md shadow-[#007be4]/20">
                          <Link href={`/dashboard/offers/${offer.id}`}>
                            Angebot prufen
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {offer.status === "payment-pending" && (
                        <Button asChild className="flex-1 h-11 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white shadow-md shadow-[#007be4]/20">
                          <Link href={`/dashboard/checkout/${offer.id}`}>
                            Zahlung abschliessen
                            <CreditCard className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
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
                const status = statusConfig[offer.status]
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
                          <p className="text-sm text-gray-500">{offer.category} - {offer.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-900">{offer.price}</span>
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
