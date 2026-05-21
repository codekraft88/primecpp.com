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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  "submitted": { label: "Eingereicht", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  "in-review": { label: "In Prufung", bgColor: "bg-purple-50", textColor: "text-purple-700" },
  "question-open": { label: "Ruckfrage offen", bgColor: "bg-amber-50", textColor: "text-amber-700" },
  "offer-created": { label: "Angebot erstellt", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  "payment-pending": { label: "Zahlung ausstehend", bgColor: "bg-rose-50", textColor: "text-rose-700" },
  "declined": { label: "Abgelehnt", bgColor: "bg-gray-100", textColor: "text-gray-600" },
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

const requests = [
  {
    id: "REQ-001",
    title: "Page Audit fur primecpp.ch",
    category: "page-audit",
    categoryLabel: "Page Audit",
    date: "28. April 2026",
    status: "in-review",
    lastUpdate: "vor 2 Stunden",
  },
  {
    id: "REQ-002",
    title: "SEO Text fur Landingpage",
    category: "seo-texts",
    categoryLabel: "SEO Texte",
    date: "25. April 2026",
    status: "offer-created",
    lastUpdate: "vor 1 Tag",
  },
  {
    id: "REQ-003",
    title: "Backlink Check",
    category: "backlinks",
    categoryLabel: "Backlinks",
    date: "20. April 2026",
    status: "payment-pending",
    lastUpdate: "vor 3 Tagen",
  },
  {
    id: "REQ-004",
    title: "UGC Video fur Social Ad",
    category: "ugc-videos",
    categoryLabel: "UGC Videos",
    date: "18. April 2026",
    status: "question-open",
    lastUpdate: "vor 5 Tagen",
  },
]

export default function RequestsPage() {
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
          <p className="text-3xl font-bold text-purple-600 mt-2">{requests.filter(r => r.status === "in-review").length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Angebot erstellt</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{requests.filter(r => r.status === "offer-created").length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Ruckfrage offen</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">{requests.filter(r => r.status === "question-open").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Anfragen durchsuchen..."
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
        {requests.map((request) => {
          const status = statusConfig[request.status]
          const CategoryIcon = categoryIcons[request.category] || FileText
          const categoryColor = categoryColors[request.category] || "bg-gray-50 text-gray-600"
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
                        <p className="text-base font-semibold text-gray-900">{request.title}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-400">{request.id}</span>
                        <span className="text-gray-200">|</span>
                        <span className="text-sm text-gray-400">{request.categoryLabel}</span>
                        <span className="text-gray-200">|</span>
                        <span className="text-sm text-gray-400">{request.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-gray-400">Letzte Aktualisierung</p>
                      <p className="text-sm text-gray-600">{request.lastUpdate}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-[#007be4] transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
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
