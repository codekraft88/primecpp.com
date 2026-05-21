"use client"

import {
  Coins,
  Info,
  Clock,
  CheckCircle,
  ShoppingCart,
  FileText,
  Search,
  BarChart3,
  CreditCard,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const creditPackages = [
  {
    id: "credit-25",
    amount: "CHF 25",
    description: "Ideal fur kleinere Zusatzleistungen oder Teilzahlungen.",
  },
  {
    id: "credit-50",
    amount: "CHF 50",
    description: "Fur kleinere SEO-, Content- oder Support-Leistungen.",
  },
  {
    id: "credit-100",
    amount: "CHF 100",
    description: "Flexibles Guthaben fur wiederkehrende kleinere Auftrage.",
  },
  {
    id: "credit-150",
    amount: "CHF 150",
    description: "Erweitertes Guthaben fur mehrere kleinere Leistungen oder laufende Optimierungen.",
  },
]

const paymentMethods = [
  {
    id: "direct",
    title: "Direktzahlung",
    description: "Sofortige Zahlung per Kreditkarte oder Debitkarte",
    icon: CreditCard,
    available: true,
  },
  {
    id: "invoice",
    title: "Rechnung",
    description: "Zahlung per Rechnung mit 30 Tagen Zahlungsziel",
    icon: FileText,
    available: true,
  },
  {
    id: "bank",
    title: "Bankuberweisung",
    description: "Direkte Uberweisung auf das prime CPP Konto",
    icon: Banknote,
    available: true,
  },
  {
    id: "credits",
    title: "Credits",
    description: "Bezahlung mit prime CPP Guthaben",
    icon: Coins,
    available: false,
    comingSoon: true,
  },
]

const futureFeatures = [
  {
    icon: ShoppingCart,
    title: "Credits kaufen",
    description: "Credits konnen als Guthaben gekauft werden.",
  },
  {
    icon: FileText,
    title: "Flexible Bezahlung",
    description: "Das Guthaben kann fur ausgewahlte Leistungen eingesetzt werden.",
  },
  {
    icon: Search,
    title: "Fur kleine Auftrage",
    description: "Geeignet fur kleinere Auftrage, Zusatzleistungen und wiederkehrende Bestellungen.",
  },
  {
    icon: BarChart3,
    title: "Transparente Ubersicht",
    description: "Der verfugbare Credit-Betrag wird im Kundenkonto angezeigt.",
  },
]

export default function CreditsPage() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">prime CPP Credits</h1>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            Coming soon
          </span>
        </div>
        <p className="text-gray-500">
          Credits ermoglichen kunftig eine flexible Bezahlung kleinerer Leistungen wie SEO-Texte, Page Audits, Content-Optimierungen oder Backlink Checks.
        </p>
      </div>

      {/* Current Balance */}
      <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Coins className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Aktuelles Guthaben</p>
              <p className="text-3xl font-bold text-gray-400">CHF 0.00</p>
              <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-gray-100 text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Coming soon
              </span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 max-w-md">
            <p className="text-sm text-gray-600">
              Credit-Zahlungen sind aktuell noch nicht aktiviert. Die Funktion wird zu einem spateren Zeitpunkt freigeschaltet.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Zahlungsmethoden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <div 
                key={method.id} 
                className={`rounded-2xl p-5 border transition-all ${
                  method.available 
                    ? 'bg-white border-gray-100 shadow-sm' 
                    : 'bg-gray-50 border-dashed border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    method.available ? 'bg-[#007be4]/10' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${method.available ? 'text-[#007be4]' : 'text-gray-400'}`} />
                  </div>
                  {method.comingSoon && (
                    <span className="text-[10px] font-medium text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">Soon</span>
                  )}
                  {method.available && (
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">Aktiv</span>
                  )}
                </div>
                <h3 className={`text-sm font-semibold ${method.available ? 'text-gray-900' : 'text-gray-500'}`}>
                  {method.title}
                </h3>
                <p className={`text-xs mt-1 ${method.available ? 'text-gray-500' : 'text-gray-400'}`}>
                  {method.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Credit Packages */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Credit-Pakete</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPackages.map((pkg) => (
            <div key={pkg.id} className="rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 p-5 opacity-60">
              <div className="flex items-center justify-between mb-3">
                <p className="text-2xl font-bold text-gray-400">{pkg.amount}</p>
                <span className="text-[10px] font-medium text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">Soon</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">{pkg.description}</p>
              <Button variant="outline" className="w-full h-9 rounded-lg text-gray-400" disabled>
                Bald verfugbar
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* How Credits Work */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">So funktionieren Credits kunftig</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Note */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-900">Transparente Dokumentation</h4>
            <p className="text-sm text-emerald-700 mt-0.5">
              Rechnungen und Zahlungen bleiben auch bei Credit-Nutzung transparent dokumentiert.
            </p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Info className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-900">Hinweis</h3>
            <p className="text-sm text-amber-700 mt-1">
              Credits befinden sich aktuell in Vorbereitung. Die Funktion wird zu einem spateren Zeitpunkt freigeschaltet. 
              Bis dahin konnen Auftrage per Direktzahlung, Rechnung oder Bankuberweisung bezahlt werden.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
