"use client"

import Link from "next/link"
import { ArrowRight, Video, Plus, Download, Play, Clock, CheckCircle, Eye, MessageSquare, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const videos = [
  {
    id: "UGC-001",
    title: "Produktunboxing",
    duration: "28s",
    format: "9:16",
    platform: "TikTok",
    status: "delivered",
    deliveredDate: "28. April 2026",
    order: "ORD-005",
    usageRights: "12 Monate Nutzungsrecht fur Organic + Paid",
  },
  {
    id: "UGC-002",
    title: "Anwendungsdemo",
    duration: "45s",
    format: "9:16",
    platform: "Reels",
    status: "delivered",
    deliveredDate: "5. Mai 2026",
    order: "ORD-005",
    usageRights: "12 Monate Nutzungsrecht fur Organic + Paid",
  },
  {
    id: "UGC-003",
    title: "Testimonial Video",
    duration: "30s",
    format: "9:16",
    platform: "Meta Ads",
    status: "feedback",
    order: "ORD-005",
    usageRights: "12 Monate Nutzungsrecht fur Organic + Paid",
  },
  {
    id: "UGC-004",
    title: "Brand Story",
    duration: "60s",
    format: "1:1",
    platform: "Website",
    status: "production",
    order: "ORD-006",
    usageRights: "Unbegrenzt",
  },
]

const statusConfig = {
  delivered: { label: "Geliefert", color: "emerald", icon: CheckCircle },
  feedback: { label: "Wartet auf Feedback", color: "amber", icon: AlertCircle },
  production: { label: "In Produktion", color: "blue", icon: Clock },
  review: { label: "Review", color: "purple", icon: Eye },
}

export default function UgcVideosPage() {
  const deliveredVideos = videos.filter(v => v.status === "delivered")
  const feedbackVideos = videos.filter(v => v.status === "feedback")
  const productionVideos = videos.filter(v => v.status === "production")

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">UGC Videos</h1>
          <p className="text-gray-500 mt-1">
            Authentische Kurzvideos fur Social Media, Ads und Kampagnen
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20">
          <Link href="/dashboard/new-order?service=ugc">
            <Plus className="mr-2 h-4 w-4" />
            UGC Video anfragen
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <Video className="h-5 w-5 text-[#007be4]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Gesamt Videos</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{productionVideos.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">In Produktion</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            {feedbackVideos.length > 0 && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Aktion</span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900">{feedbackVideos.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Wartet auf Feedback</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{deliveredVideos.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Geliefert</p>
        </div>
      </div>

      {/* Feedback Required */}
      {feedbackVideos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Feedback erforderlich</h2>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{feedbackVideos.length}</span>
          </div>
          <div className="space-y-3">
            {feedbackVideos.map((video) => (
              <div key={video.id} className="rounded-2xl bg-white border-2 border-amber-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Video Preview */}
                    <div className="w-24 h-40 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                      <Video className="h-8 w-8 text-gray-400" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="h-4 w-4 text-gray-900 ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Wartet auf Feedback
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{video.platform}</span>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{video.format}</span>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{video.duration}</span>
                      </div>

                      <p className="text-sm text-gray-500">Auftrag: {video.order}</p>
                      <p className="text-xs text-gray-400 mt-1">{video.usageRights}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" className="h-10 rounded-xl border-gray-200">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button className="h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Feedback geben
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Production */}
      {productionVideos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">In Produktion</h2>
          <div className="space-y-3">
            {productionVideos.map((video) => (
              <div key={video.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="w-24 h-40 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                      <Video className="h-8 w-8 text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          <Clock className="h-3 w-3 mr-1" />
                          In Produktion
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{video.platform}</span>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{video.format}</span>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{video.duration}</span>
                      </div>

                      <p className="text-sm text-gray-500">Auftrag: {video.order}</p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" className="h-10 rounded-xl border-gray-200">
                        Details ansehen
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delivered Videos */}
      {deliveredVideos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Gelieferte Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveredVideos.map((video) => (
              <div key={video.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden group">
                {/* Video Preview */}
                <div className="aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
                  <Video className="h-12 w-12 text-gray-400" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-emerald-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Geliefert
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{video.title}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{video.platform}</span>
                    <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{video.format}</span>
                    <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{video.duration}</span>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">Geliefert am {video.deliveredDate}</p>
                  
                  <div className="p-2 rounded-lg bg-gray-50 mt-3">
                    <p className="text-[10px] text-gray-500">{video.usageRights}</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 h-9 rounded-lg text-xs">
                      <Eye className="mr-1.5 h-3 w-3" />
                      Ansehen
                    </Button>
                    <Button size="sm" className="flex-1 h-9 rounded-lg text-xs bg-[#007be4] hover:bg-[#0066c2]">
                      <Download className="mr-1.5 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Video className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Noch keine UGC Videos</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Bestellen Sie authentische UGC-Videos fur Ihre Social Media Kanale und Werbekampagnen.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Nutzungsrechte, Creator-Einsatz und Produktionsumfang werden im Angebot transparent ausgewiesen.
          </p>
          <Button asChild className="mt-6 bg-[#007be4] hover:bg-[#0066c2] h-11 px-5 rounded-xl">
            <Link href="/dashboard/new-order?service=ugc">
              <Plus className="mr-2 h-4 w-4" />
              Jetzt bestellen
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
