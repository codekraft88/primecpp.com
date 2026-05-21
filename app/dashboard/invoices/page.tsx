"use client"

import { Download, Eye, FileText, Check, Clock, AlertTriangle, CreditCard, Search, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/toast-provider"
import { useInvoices } from "@/lib/supabase/hooks"
import { EmptyInvoices } from "@/components/dashboard/empty-states"
import { useState, useMemo } from "react"

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; icon: typeof Clock }> = {
  draft: { label: "Entwurf", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: FileText },
  open: { label: "Offen", bgColor: "bg-amber-100", textColor: "text-amber-700", icon: Clock },
  paid: { label: "Bezahlt", bgColor: "bg-emerald-100", textColor: "text-emerald-700", icon: Check },
  overdue: { label: "Uberfallig", bgColor: "bg-red-100", textColor: "text-red-700", icon: AlertTriangle },
  cancelled: { label: "Storniert", bgColor: "bg-gray-100", textColor: "text-gray-600", icon: AlertTriangle },
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

export default function InvoicesPage() {
  const { showToast } = useToast()
  const { data: invoices, isLoading, error } = useInvoices()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInvoices = useMemo(() => {
    if (!invoices) return []
    if (!searchQuery) return invoices
    const query = searchQuery.toLowerCase()
    return invoices.filter(inv => 
      inv.invoice_number.toLowerCase().includes(query)
    )
  }, [invoices, searchQuery])

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
        <p className="text-red-600">Fehler beim Laden der Rechnungen. Bitte versuchen Sie es erneut.</p>
      </div>
    )
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="space-y-8 max-w-7xl">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Rechnungen</h1>
          <p className="text-gray-500 mt-1">
            Ubersicht aller Rechnungen und Zahlungshistorie
          </p>
        </div>
        <EmptyInvoices />
      </div>
    )
  }

  const openInvoices = invoices.filter(inv => inv.status === "open")
  const paidInvoices = invoices.filter(inv => inv.status === "paid")
  const overdueInvoices = invoices.filter(inv => inv.status === "overdue")
  
  const totalOpen = openInvoices.reduce((sum, inv) => sum + inv.total_amount, 0)
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.total_amount, 0)

  const handleDownload = (invoiceId: string) => {
    showToast(`PDF fur ${invoiceId} wird heruntergeladen...`, "info")
  }

  const handleView = (invoiceId: string) => {
    showToast(`${invoiceId} wird geoffnet...`, "info")
  }

  const handlePayNow = () => {
    showToast("Weiterleitung zur Zahlung...", "info")
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Rechnungen</h1>
        <p className="text-gray-500 mt-1">
          Ubersicht aller Rechnungen und Zahlungshistorie
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            {openInvoices.length > 0 && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{openInvoices.length}</span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOpen)}</p>
          <p className="text-sm text-gray-500 mt-0.5">Offen</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Check className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{paidInvoices.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Bezahlt</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{overdueInvoices.length}</p>
          <p className="text-sm text-gray-500 mt-0.5">Uberfallig</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
          <p className="text-sm text-gray-500 mt-0.5">Gesamt bezahlt</p>
        </div>
      </div>

      {/* Open Invoice Highlight */}
      {openInvoices.length > 0 && (
        <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Offene Rechnung</h3>
                <p className="text-sm text-gray-600">
                  Rechnung {openInvoices[0].invoice_number} uber {formatCurrency(openInvoices[0].total_amount)} ist fallig am {formatDate(openInvoices[0].due_date)}.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="h-10 rounded-xl border-gray-200" onClick={() => handleView(openInvoices[0].invoice_number)}>
                <Eye className="mr-2 h-4 w-4" />
                Ansehen
              </Button>
              <Button className="h-10 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white" onClick={handlePayNow}>
                Jetzt bezahlen
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* All Invoices Table */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-base font-semibold text-gray-900">Alle Rechnungen</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 w-48 bg-gray-50 border-gray-200 rounded-lg text-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 rounded-lg">
              <Filter className="mr-2 h-3.5 w-3.5" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rechnung</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fallig</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Betrag</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvoices.map((invoice) => {
                const status = statusConfig[invoice.status] || statusConfig.open
                const StatusIcon = status.icon
                return (
                  <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{invoice.invoice_number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.created_at)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.due_date)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(invoice.total_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900" onClick={() => handleView(invoice.invoice_number)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900" onClick={() => handleDownload(invoice.invoice_number)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
        <p className="text-sm text-blue-800">
          <strong>Hinweis:</strong> Rechnungen und Zahlungen bleiben auch bei zukunftiger Credit-Nutzung transparent dokumentiert. 
          Aktuell stehen Direktzahlung, Rechnung und Bankuberweisung zur Verfugung.
        </p>
      </div>
    </div>
  )
}
