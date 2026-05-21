"use client"

import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Plus,
  Activity,
  Calendar,
  User,
  Clock,
  Eye,
  Package,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/lib/supabase/hooks"
import { EmptyOrders } from "@/components/dashboard/empty-states"
import type { Order } from "@/lib/supabase/types"

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  "pending": { label: "Ausstehend", bgColor: "bg-gray-100", textColor: "text-gray-600" },
  "in_progress": { label: "In Bearbeitung", bgColor: "bg-blue-100", textColor: "text-blue-700" },
  "review": { label: "Review verfugbar", bgColor: "bg-purple-100", textColor: "text-purple-700" },
  "completed": { label: "Abgeschlossen", bgColor: "bg-emerald-100", textColor: "text-emerald-700" },
  "cancelled": { label: "Storniert", bgColor: "bg-gray-100", textColor: "text-gray-600" },
}

const progressSteps = [
  { key: "request", label: "Anfrage" },
  { key: "offer", label: "Angebot" },
  { key: "payment", label: "Zahlung" },
  { key: "active", label: "Aktiv" },
  { key: "progress", label: "In Bearbeitung" },
  { key: "review", label: "Review" },
  { key: "delivered", label: "Geliefert" },
]

function getStepFromProgress(progress: number, status: string): number {
  if (status === 'completed') return 7
  if (status === 'review') return 6
  if (progress >= 75) return 5
  if (progress >= 25) return 4
  if (status === 'in_progress') return 4
  return 3
}

function ProgressTimeline({ currentStep, steps }: { currentStep: number; steps: typeof progressSteps }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep - 1
        return (
          <div key={step.key} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                isCompleted 
                  ? 'bg-emerald-500 text-white' 
                  : isCurrent 
                  ? 'bg-[#007be4] text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : index + 1}
              </div>
              <span className={`text-[10px] mt-1 whitespace-nowrap ${
                isCompleted || isCurrent ? 'text-gray-700 font-medium' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${
                isCompleted ? 'bg-emerald-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('de-CH', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders()

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
        <p className="text-red-600">Fehler beim Laden der Auftrage. Bitte versuchen Sie es erneut.</p>
      </div>
    )
  }

  const activeOrders = orders?.filter(o => o.status !== 'completed' && o.status !== 'cancelled') || []
  const completedOrders = orders?.filter(o => o.status === 'completed') || []
  const activeCount = activeOrders.filter(o => o.status === 'in_progress').length
  const reviewCount = activeOrders.filter(o => o.status === 'review').length

  if (!orders || orders.length === 0) {
    return (
      <div className="space-y-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Aktive Auftrage</h1>
            <p className="text-gray-500 mt-1">
              Verfolgen Sie den Fortschritt Ihrer laufenden Auftrage
            </p>
          </div>
          <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20">
            <Link href="/dashboard/new-order">
              <Plus className="mr-2 h-4 w-4" />
              Neue Bestellung
            </Link>
          </Button>
        </div>
        <EmptyOrders />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Aktive Auftrage</h1>
          <p className="text-gray-500 mt-1">
            Verfolgen Sie den Fortschritt Ihrer laufenden Auftrage
          </p>
        </div>
        <Button asChild className="bg-[#007be4] hover:bg-[#0066c2] text-white h-11 px-5 rounded-xl shadow-md shadow-[#007be4]/20">
          <Link href="/dashboard/new-order">
            <Plus className="mr-2 h-4 w-4" />
            Neue Bestellung
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-[#007be4]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeOrders.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Aktive Auftrage</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#007be4]">{activeCount}</p>
          <p className="text-sm text-gray-500 mt-0.5">In Bearbeitung</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
            {reviewCount > 0 && (
              <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">{reviewCount}</span>
            )}
          </div>
          <p className="text-2xl font-bold text-purple-600">{reviewCount}</p>
          <p className="text-sm text-gray-500 mt-0.5">Review verfugbar</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{completedOrders.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Abgeschlossen</p>
        </div>
      </div>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Laufende Auftrage</h2>
          <div className="space-y-4">
            {activeOrders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending
              const currentStep = getStepFromProgress(order.progress, order.status)
              return (
                <div key={order.id} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[#007be4]/20 transition-all">
                  <div className="p-6">
                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-400">{order.order_number}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                            {status.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.service_name}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-9 rounded-xl border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Support
                        </Button>
                        <Button asChild size="sm" className="h-9 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white">
                          <Link href={`/dashboard/orders/${order.id}`}>
                            Details ansehen
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="mb-5 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <ProgressTimeline currentStep={currentStep} steps={progressSteps} />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Gesamtfortschritt</span>
                        <span className="text-sm font-semibold text-gray-900">{order.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#007be4] to-[#00a8ff]"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Start</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(order.start_date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Lieferung</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(order.expected_completion)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Betrag</p>
                          <p className="text-sm font-medium text-gray-900">CHF {order.amount.toLocaleString('de-CH')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Aktualisiert</p>
                          <p className="text-sm font-medium text-gray-900">{formatDate(order.updated_at)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <p className="text-xs font-medium text-[#007be4] mb-1">Letzte Aktualisierung</p>
                        <p className="text-sm text-gray-700">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed Orders */}
      {completedOrders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Abgeschlossene Auftrage</h2>
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {completedOrders.map((order) => (
                <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
                  <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{order.service_name}</p>
                        <p className="text-sm text-gray-500">{order.order_number} - Abgeschlossen am {formatDate(order.completed_at)}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-[#007be4] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
        <p className="text-sm text-blue-800">
          <strong>Info:</strong> Ihr Auftrag wurde freigeschaltet und befindet sich in Bearbeitung. 
          Bei Fragen steht Ihnen unser Support-Team jederzeit zur Verfugung.
        </p>
      </div>
    </div>
  )
}
