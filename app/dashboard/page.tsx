"use client"

import Link from "next/link"
import {
  FileQuestion,
  FileCheck,
  Briefcase,
  FileText,
  BarChart3,
  ArrowRight,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight,
  HelpCircle,
  CreditCard,
  Video,
  Search,
  Link2,
  Globe,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDashboardStats, useRecentActivity, useProfile } from "@/lib/supabase/hooks"
import { EmptyDashboard, DashboardSkeleton } from "@/components/dashboard/empty-states"

// Quick order services (static data - these are service options, not user data)
const serviceCategories = [
  {
    label: "SEO & Content",
    services: [
      { 
        label: "SEO Texte bestellen", 
        description: "Hochwertige SEO-Texte fur bessere Rankings",
        href: "/dashboard/new-order?service=seo-texts", 
        icon: FileText, 
        chips: ["Landingpages", "Blogartikel", "Produkttexte"],
      },
      { 
        label: "Page Audit", 
        description: "Detaillierte Analyse Ihrer Website",
        href: "/dashboard/new-order?service=audit", 
        icon: Search, 
        chips: ["Technik", "Content", "UX"],
      },
    ]
  },
  {
    label: "Sichtbarkeit & Authority",
    services: [
      { 
        label: "Backlinks", 
        description: "Qualitative Backlinks fur Domain Authority",
        href: "/dashboard/new-order?service=backlinks", 
        icon: Link2, 
        chips: ["Gastbeitrage", "Mentions", "Outreach"],
      },
      { 
        label: "Google Business Profil", 
        description: "Lokale Sichtbarkeit maximieren",
        href: "/dashboard/new-order?service=google-business", 
        icon: Globe, 
        chips: ["Setup", "Optimierung", "Bewertungen"],
        comingSoon: true,
      },
    ]
  },
  {
    label: "Production",
    services: [
      { 
        label: "UGC Videos", 
        description: "Authentische Kurzvideos fur Social Media, Ads und Kampagnen",
        href: "/dashboard/new-order?service=ugc", 
        icon: Video, 
        chips: ["TikTok", "Reels", "Meta Ads"],
      },
    ]
  },
]

export default function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity(4)

  const isLoading = profileLoading || statsLoading

  if (isLoading) {
    return <DashboardSkeleton />
  }

  const userName = profile?.full_name?.split(' ')[0] || 'Kunde'
  const hasData = stats && (stats.openRequests > 0 || stats.pendingOffers > 0 || stats.activeOrders > 0 || stats.openInvoices > 0 || stats.newReports > 0)
  const hasActionItems = stats && (stats.pendingOffers > 0 || stats.openInvoices > 0)

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Willkommen zuruck, {userName}
          </h1>
          <p className="text-gray-500 mt-1 max-w-xl">
            Hier finden Sie eine Ubersicht Ihrer Projekte, offenen Aufgaben und nachsten Schritte.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="h-11 px-5 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50">
            <Link href="/dashboard/support">
              <HelpCircle className="mr-2 h-4 w-4" />
              Support kontaktieren
            </Link>
          </Button>
          <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20 hover:shadow-lg transition-all">
            <Link href="/dashboard/new-order">
              <Plus className="mr-2 h-4 w-4" />
              Neue Bestellung aufgeben
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Link href="/dashboard/requests" className="group">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#007be4]/20 transition-all h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileQuestion className="h-5 w-5 text-[#007be4]" />
              </div>
              {stats && stats.openRequests > 0 && (
                <span className="flex items-center justify-center h-6 min-w-[24px] px-2 text-xs font-semibold rounded-full bg-blue-50 text-[#007be4]">
                  {stats.openRequests}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.openRequests || 0}</p>
            <p className="text-sm text-gray-500 mt-0.5">Offene Anfragen</p>
          </div>
        </Link>

        <Link href="/dashboard/offers" className="group">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <FileCheck className="h-5 w-5 text-amber-600" />
              </div>
              {stats && stats.pendingOffers > 0 && (
                <span className="flex items-center justify-center h-6 min-w-[24px] px-2 text-xs font-semibold rounded-full bg-amber-50 text-amber-700">
                  <AlertCircle className="h-3 w-3 mr-0.5" />
                  {stats.pendingOffers}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.pendingOffers || 0}</p>
            <p className="text-sm text-gray-500 mt-0.5">Angebote zur Freigabe</p>
          </div>
        </Link>

        <Link href="/dashboard/orders" className="group">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.activeOrders || 0}</p>
            <p className="text-sm text-gray-500 mt-0.5">Aktive Auftrage</p>
          </div>
        </Link>

        <Link href="/dashboard/invoices" className="group">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-rose-600" />
              </div>
              {stats && stats.openInvoices > 0 && (
                <span className="flex items-center justify-center h-6 min-w-[24px] px-2 text-xs font-semibold rounded-full bg-rose-50 text-rose-700">
                  {stats.openInvoices}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.openInvoices || 0}</p>
            <p className="text-sm text-gray-500 mt-0.5">Offene Rechnungen</p>
          </div>
        </Link>

        <Link href="/dashboard/reports" className="group">
          <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              {stats && stats.newReports > 0 && (
                <span className="flex items-center justify-center h-6 min-w-[24px] px-2 text-xs font-semibold rounded-full bg-purple-50 text-purple-700">
                  {stats.newReports}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats?.newReports || 0}</p>
            <p className="text-sm text-gray-500 mt-0.5">Neue Reports</p>
          </div>
        </Link>
      </div>

      {/* Empty state for new users */}
      {!hasData && <EmptyDashboard />}

      {/* Action Items - Only show if user has pending items */}
      {hasActionItems && (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-amber-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Heute wichtig</h2>
                <p className="text-sm text-gray-500">Die wichtigsten offenen Punkte und nachsten Schritte auf einen Blick.</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {stats && stats.pendingOffers > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50">
                    <FileCheck className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{stats.pendingOffers} Angebot(e) zur Freigabe</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 mt-1">
                      Freigabe ausstehend
                    </span>
                  </div>
                </div>
                <Button asChild size="sm" className="h-9 rounded-lg flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white">
                  <Link href="/dashboard/offers">
                    Angebote prufen
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
            {stats && stats.openInvoices > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50">
                    <CreditCard className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{stats.openInvoices} offene Rechnung(en)</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 mt-1">
                      Zahlung ausstehend
                    </span>
                  </div>
                </div>
                <Button asChild size="sm" className="h-9 rounded-lg flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white">
                  <Link href="/dashboard/invoices">
                    Rechnungen ansehen
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schnell bestellen */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Schnell bestellen</h2>
              <p className="text-sm text-gray-500 mt-0.5">Services direkt beauftragen oder Anfrage stellen.</p>
            </div>
            <div className="p-4 space-y-6">
              {serviceCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">{category.label}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {category.services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.comingSoon ? "#" : service.href}
                        className={`group relative p-4 rounded-xl border transition-all ${
                          service.comingSoon 
                            ? 'border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-60' 
                            : 'border-gray-100 hover:border-[#007be4]/30 hover:shadow-md bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            service.comingSoon ? 'bg-gray-100' : 'bg-[#007be4]/5 group-hover:bg-[#007be4]/10'
                          } transition-colors`}>
                            <service.icon className={`h-5 w-5 ${
                              service.comingSoon ? 'text-gray-400' : 'text-[#007be4]'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{service.label}</p>
                              {service.comingSoon && (
                                <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{service.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {service.chips.map((chip, chipIndex) => (
                                <span key={chipIndex} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {!service.comingSoon && (
                          <ArrowRight className="absolute top-4 right-4 h-4 w-4 text-gray-300 group-hover:text-[#007be4] group-hover:translate-x-0.5 transition-all" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Letzte Aktivitaten</h2>
              </div>
              <Link href="/dashboard/requests" className="text-xs text-[#007be4] hover:text-[#0066c2] font-medium flex items-center gap-0.5 transition-colors">
                Alle
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {activityLoading ? (
                <div className="px-6 py-4">
                  <div className="animate-pulse space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-100 rounded" />
                    ))}
                  </div>
                </div>
              ) : recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.status === 'pending' ? 'bg-amber-400' :
                      activity.status === 'in_progress' ? 'bg-[#007be4]' :
                      activity.status === 'completed' || activity.status === 'paid' ? 'bg-emerald-400' :
                      activity.status === 'new' ? 'bg-purple-400' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-gray-400">Noch keine Aktivitaten</p>
                </div>
              )}
            </div>
          </div>

          {/* New Reports Badge */}
          {stats && stats.newReports > 0 && (
            <Link href="/dashboard/reports">
              <div className="rounded-2xl bg-purple-50 border border-purple-100 p-5 hover:border-purple-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{stats.newReports} neue Reports</p>
                    <p className="text-xs text-gray-500">Jetzt ansehen</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <MessageSquare className="h-6 w-6 text-[#007be4]" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">So funktioniert es</h3>
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
