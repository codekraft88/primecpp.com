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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast-provider"

const reportIcons: Record<string, React.ElementType> = {
  "seo-report": BarChart3,
  "page-audit": Search,
  "backlinks": Link2,
  "content": FileText,
  "technical": Code,
  "ugc": Video,
  "website": Globe,
}

const reports = [
  {
    id: "RPT-001",
    title: "SEO Monatsreport April 2026",
    type: "seo-report",
    typeLabel: "SEO Report",
    relatedOrder: "ORD-001",
    date: "28. April 2026",
    status: "new",
    summary: "Keyword-Rankings verbessert, Traffic +15% gegenuber Vormonat",
    metrics: { keywords: 45, pages: 12, recommendations: 8 },
    downloadUrl: "#",
  },
  {
    id: "RPT-002",
    title: "Page Audit Report - primecpp.ch",
    type: "page-audit",
    typeLabel: "Page Audit",
    relatedOrder: "ORD-002",
    date: "29. April 2026",
    status: "new",
    summary: "Technische Analyse abgeschlossen, 23 Optimierungspunkte identifiziert",
    metrics: { pages: 8, issues: 23, priority: 5 },
    downloadUrl: "#",
  },
  {
    id: "RPT-003",
    title: "Backlink Dokumentation Q1",
    type: "backlinks",
    typeLabel: "Backlinks",
    relatedOrder: "ORD-005",
    date: "5. April 2026",
    status: "viewed",
    summary: "12 neue Backlinks dokumentiert, Domain Authority Potenzial",
    metrics: { links: 12, domains: 8, notes: 4 },
    downloadUrl: "#",
  },
  {
    id: "RPT-004",
    title: "SEO Monatsreport Marz 2026",
    type: "seo-report",
    typeLabel: "SEO Report",
    relatedOrder: "ORD-001",
    date: "28. Marz 2026",
    status: "viewed",
    downloadUrl: "#",
  },
]

const ugcDeliverables = [
  {
    id: "UGC-001",
    title: "Produktvideo - Summer Collection",
    format: "9:16",
    platform: "Instagram Reels",
    length: "30 Sekunden",
    date: "25. April 2026",
    status: "delivered",
    usageRights: "12 Monate Nutzungsrecht fur Organic + Paid",
    downloadUrl: "#",
  },
]

export default function ReportsPage() {
  const { showToast } = useToast()
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
          <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.type === "seo-report").length}</p>
          <p className="text-sm text-gray-500 mt-0.5">SEO Reports</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <Video className="h-5 w-5 text-rose-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{ugcDeliverables.length}</p>
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
              return (
                <div key={report.id} className="rounded-2xl bg-white border-2 border-[#007be4]/20 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#007be4]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-[#007be4]" />
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{report.typeLabel}</span>
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

                    {report.metrics && (
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {report.type === "seo-report" && (
                          <>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.keywords}</p>
                              <p className="text-xs text-gray-500">Keywords gepruft</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.pages}</p>
                              <p className="text-xs text-gray-500">Seiten optimiert</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.recommendations}</p>
                              <p className="text-xs text-gray-500">Empfehlungen</p>
                            </div>
                          </>
                        )}
                        {report.type === "page-audit" && (
                          <>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.pages}</p>
                              <p className="text-xs text-gray-500">Seiten analysiert</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.issues}</p>
                              <p className="text-xs text-gray-500">Issues gefunden</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-amber-600">{report.metrics.priority}</p>
                              <p className="text-xs text-gray-500">Prioritat hoch</p>
                            </div>
                          </>
                        )}
                        {report.type === "backlinks" && (
                          <>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.links}</p>
                              <p className="text-xs text-gray-500">Links dokumentiert</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.domains}</p>
                              <p className="text-xs text-gray-500">Domains</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50">
                              <p className="text-lg font-bold text-gray-900">{report.metrics.notes}</p>
                              <p className="text-xs text-gray-500">Notizen</p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </div>
                        <span>Auftrag: {report.relatedOrder}</span>
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

      {/* UGC Deliverables */}
      {ugcDeliverables.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">UGC Video Lieferungen</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ugcDeliverables.map((ugc) => (
              <div key={ugc.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <Video className="h-6 w-6 text-rose-600" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">UGC Video</span>
                      <h3 className="text-base font-semibold text-gray-900 mt-0.5">{ugc.title}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{ugc.format}</p>
                      <p className="text-xs text-gray-500">Format</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{ugc.platform}</p>
                      <p className="text-xs text-gray-500">Plattform</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{ugc.length}</p>
                      <p className="text-xs text-gray-500">Lange</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 mb-4">
                    <p className="text-xs text-emerald-700 font-medium">Nutzungsrechte</p>
                    <p className="text-sm text-emerald-900">{ugc.usageRights}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Geliefert am {ugc.date}</span>
                    <Button size="sm" className="h-8 rounded-lg text-xs bg-[#007be4] hover:bg-[#0066c2]" onClick={() => handleDownload(ugc.title)}>
                      <Download className="h-3 w-3 mr-1.5" />
                      Video herunterladen
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
                return (
                  <div key={report.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-400">{report.typeLabel} - {report.date}</p>
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

      {/* Empty State */}
      {reports.length === 0 && ugcDeliverables.length === 0 && (
        <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Noch keine Reports verfugbar</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Reports und Lieferungen erscheinen hier, sobald prime CPP diese veroffentlicht.
          </p>
        </div>
      )}
    </div>
  )
}
