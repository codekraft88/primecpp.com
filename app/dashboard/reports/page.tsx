"use client"

import {
  Download,
  Eye,
  FileText,
  BarChart3,
  Link2,
  Video,
  Search,
  Code,
  Globe,
  Calendar,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast-provider"
import { useReports } from "@/lib/supabase/hooks"
import { EmptyReports } from "@/components/dashboard/empty-states"
import type { Report } from "@/lib/supabase/types"

const reportIcons: Record<string, React.ElementType> = {
  "seo": BarChart3,
  "audit": Search,
  "backlinks": Link2,
  "ugc": Video,
  "general": FileText,
}

const reportTypeLabels: Record<string, string> = {
  "seo": "SEO Report",
  "audit": "Page Audit",
  "backlinks": "Backlinks",
  "ugc": "UGC",
  "general": "Allgemein",
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-CH', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

export default function ReportsPage() {
  const { showToast } = useToast()
  const { data: reports, isLoading, error } = useReports()

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
        <p className="text-red-600">Fehler beim Laden der Reports. Bitte versuchen Sie es erneut.</p>
      </div>
    )
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reports & Lieferungen</h1>
          <p className="text-gray-500 mt-1">
            Alle gelieferten Reports, Dokumente und Dateien
          </p>
        </div>
        <EmptyReports />
      </div>
    )
  }

  const newReports = reports.filter(r => r.status === "new")
  const viewedReports = reports.filter(r => r.status === "viewed")

  const handleDownload = (title: string) => {
    showToast(`Download fur "${title}" wurde vorbereitet.`, "success")
  }

  const handleView = (title: string) => {
    showToast(`"${title}" wird geoffnet...`, "info")
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reports & Lieferungen</h1>
        <p className="text-gray-500 mt-1">
          Alle gelieferten Reports, Dokumente und Dateien
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[#007be4]" />
            </div>
            {newReports.length > 0 && (
              <span className="text-xs font-semibold text-[#007be4] bg-blue-100 px-2 py-0.5 rounded">{newReports.length} neu</span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Gesamt Reports</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.type === "seo").length}</p>
          <p className="text-sm text-gray-500 mt-0.5">SEO Reports</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <Video className="h-5 w-5 text-rose-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.type === "ugc").length}</p>
          <p className="text-sm text-gray-500 mt-0.5">UGC Lieferungen</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{viewedReports.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Angesehen</p>
        </div>
      </div>

      {/* New Reports */}
      {newReports.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Neue Reports</h2>
            <span className="text-xs font-semibold text-[#007be4] bg-blue-100 px-2 py-0.5 rounded">{newReports.length} neu</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {newReports.map((report) => {
              const Icon = reportIcons[report.type] || FileText
              const typeLabel = reportTypeLabels[report.type] || "Report"
              return (
                <div key={report.id} className="rounded-2xl bg-white border-2 border-[#007be4]/20 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#007be4]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-[#007be4]" />
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{typeLabel}</span>
                          <h3 className="text-base font-semibold text-gray-900 mt-0.5">{report.title}</h3>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#007be4] text-white">
                        Neu
                      </span>
                    </div>

                    {report.summary && (
                      <p className="text-sm text-gray-600 mb-4">{report.summary}</p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(report.created_at)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs" onClick={() => handleView(report.title)}>
                          <Eye className="h-3 w-3 mr-1.5" />
                          Ansehen
                        </Button>
                        <Button size="sm" className="h-8 rounded-lg text-xs bg-[#007be4] hover:bg-[#0066c2]" onClick={() => handleDownload(report.title)}>
                          <Download className="h-3 w-3 mr-1.5" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Viewed Reports */}
      {viewedReports.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Fruhere Reports</h2>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {viewedReports.map((report) => {
                const Icon = reportIcons[report.type] || FileText
                const typeLabel = reportTypeLabels[report.type] || "Report"
                return (
                  <div key={report.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-400">{typeLabel} - {formatDate(report.created_at)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-gray-500 hover:text-gray-900" onClick={() => handleDownload(report.title)}>
                      <Download className="h-4 w-4 mr-1.5" />
                      Download
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
