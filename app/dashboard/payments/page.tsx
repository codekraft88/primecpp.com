"use client"

import Link from "next/link"
import { CreditCard, Building, Plus, Check, AlertCircle, Download, ArrowUpRight, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast-provider"

const paymentMethods = [
  {
    id: "1",
    type: "card",
    name: "Visa",
    last4: "4242",
    expiry: "12/27",
    isDefault: true,
  },
  {
    id: "2",
    type: "invoice",
    name: "Rechnung",
    details: "30 Tage Zahlungsziel",
    isDefault: false,
  },
]

const paymentHistory = [
  {
    id: "PAY-001",
    date: "1. Mai 2026",
    amount: "CHF 1.190.00",
    method: "Visa ****4242",
    status: "Erfolgreich",
    invoice: "INV-2026-004",
  },
  {
    id: "PAY-002",
    date: "1. April 2026",
    amount: "CHF 1.190.00",
    method: "Visa ****4242",
    status: "Erfolgreich",
    invoice: "INV-2026-003",
  },
  {
    id: "PAY-003",
    date: "1. Marz 2026",
    amount: "CHF 1.190.00",
    method: "Visa ****4242",
    status: "Erfolgreich",
    invoice: "INV-2026-002",
  },
  {
    id: "PAY-004",
    date: "1. Februar 2026",
    amount: "CHF 1.190.00",
    method: "Visa ****4242",
    status: "Erfolgreich",
    invoice: "INV-2026-001",
  },
]

const statusConfig: Record<string, { bgColor: string; textColor: string }> = {
  "Erfolgreich": { bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  "Ausstehend": { bgColor: "bg-amber-50", textColor: "text-amber-700" },
  "Fehlgeschlagen": { bgColor: "bg-red-50", textColor: "text-red-700" },
  "Ruckerstattet": { bgColor: "bg-purple-50", textColor: "text-purple-700" },
}

export default function PaymentsPage() {
  const { showToast } = useToast()

  const handleDownloadReceipt = (paymentId: string) => {
    showToast(`Beleg fur ${paymentId} wird heruntergeladen...`, "info")
  }

  const handleAddMethod = () => {
    showToast("Diese Funktion ist in der Demo nicht verfugbar.", "info")
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Zahlungen</h1>
        <p className="text-gray-500 mt-1">
          Verwalten Sie Ihre Zahlungsmethoden und sehen Sie Ihre Zahlungshistorie ein.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Gesamt bezahlt</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">CHF 4.760.00</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Zahlungen</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{paymentHistory.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Erfolgreich</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{paymentHistory.filter(p => p.status === "Erfolgreich").length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Zahlungsmethoden</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{paymentMethods.length}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Zahlungsmethoden</h2>
          <Button variant="outline" size="sm" onClick={handleAddMethod} className="h-9 rounded-xl border-gray-200">
            <Plus className="mr-2 h-4 w-4" />
            Methode hinzufugen
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`rounded-2xl bg-white border shadow-sm p-5 ${method.isDefault ? "border-[#007be4]/30 bg-[#007be4]/5" : "border-gray-100"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.isDefault ? "bg-[#007be4]/10" : "bg-gray-100"}`}>
                    {method.type === "card" ? (
                      <CreditCard className={`h-6 w-6 ${method.isDefault ? "text-[#007be4]" : "text-gray-600"}`} />
                    ) : (
                      <Building className={`h-6 w-6 ${method.isDefault ? "text-[#007be4]" : "text-gray-600"}`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      {method.isDefault && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#007be4]/10 text-[#007be4]">
                          Standard
                        </span>
                      )}
                    </div>
                    {method.type === "card" ? (
                      <p className="text-sm text-gray-500">
                        **** {method.last4} - Gultig bis {method.expiry}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">{method.details}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Credits - Coming Soon */}
          <div className="rounded-2xl bg-gray-50 border border-dashed border-gray-200 p-5 opacity-60">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <Coins className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-600">Credits</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                    Coming soon
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Zahlung per Credits wird vorbereitet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Payment */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-[#007be4]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Nachste Zahlung</h3>
              <p className="text-sm text-gray-600">
                CHF 1.190.00 fur SEO Growth wird am 1. Juni 2026 abgebucht.
              </p>
            </div>
          </div>
          <Button variant="outline" className="h-10 rounded-xl border-gray-200 hover:bg-white">
            Methode andern
          </Button>
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Zahlungshistorie</h2>
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {paymentHistory.map((payment) => {
              const status = statusConfig[payment.status]
              return (
                <div key={payment.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Check className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{payment.amount}</p>
                        <p className="text-sm text-gray-500">{payment.date} - {payment.method}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                          {payment.status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{payment.invoice}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDownloadReceipt(payment.id)}
                        className="h-9 w-9 rounded-lg text-gray-400 hover:text-gray-600"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Zahlungsinformationen</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Zahlungen werden sicher uber unseren Zahlungsanbieter abgewickelt. 
              Bei Fragen zu Zahlungen oder Rechnungen kontaktieren Sie bitte unser Support-Team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
