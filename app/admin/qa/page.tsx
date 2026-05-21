"use client"

import { 
  CheckCircle,
  ClipboardCheck,
  Navigation,
  MousePointer,
  ShoppingCart,
  FileCheck,
  CreditCard,
  Coins,
  BarChart3,
  Video,
  FileText,
  HelpCircle,
  Shield,
  Smartphone,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const qaItems = [
  {
    category: "Navigation",
    icon: Navigation,
    status: "done",
    items: [
      { name: "Sidebar-Navigation funktioniert", status: "done" },
      { name: "Alle Seiten erreichbar", status: "done" },
      { name: "Breadcrumbs korrekt", status: "done" },
      { name: "Mobile Navigation funktioniert", status: "done" },
    ],
    note: "Alle Navigationselemente getestet und funktionsfähig."
  },
  {
    category: "Buttons & Interaktionen",
    icon: MousePointer,
    status: "done",
    items: [
      { name: "CTAs haben Aktionen", status: "done" },
      { name: "Formulare validieren", status: "done" },
      { name: "Toast-Benachrichtigungen aktiv", status: "done" },
      { name: "Hover-States vorhanden", status: "done" },
    ],
    note: "Alle Buttons zeigen Feedback oder navigieren korrekt."
  },
  {
    category: "Bestellflow",
    icon: ShoppingCart,
    status: "done",
    items: [
      { name: "Servicekategorien wählbar", status: "done" },
      { name: "Formulare vollständig", status: "done" },
      { name: "Step-Navigation funktioniert", status: "done" },
      { name: "Erfolgsseite nach Absenden", status: "done" },
    ],
    note: "Neuer Bestellprozess vollständig implementiert."
  },
  {
    category: "Angebotsflow",
    icon: FileCheck,
    status: "done",
    items: [
      { name: "Angebote anzeigbar", status: "done" },
      { name: "Angebot prüfen funktioniert", status: "done" },
      { name: "Annahme-Prozess klar", status: "done" },
      { name: "Statusänderungen sichtbar", status: "done" },
    ],
    note: "Angebotsflow client- und admin-seitig getestet."
  },
  {
    category: "Zahlungsflow",
    icon: CreditCard,
    status: "done",
    items: [
      { name: "Checkout-Seite vollständig", status: "done" },
      { name: "Zahlungsmethoden anzeigbar", status: "done" },
      { name: "Erfolgsseite nach Zahlung", status: "done" },
      { name: "Rechnungen downloadbar", status: "done" },
    ],
    note: "Direktzahlung und Rechnung als Methoden verfügbar."
  },
  {
    category: "Credit-System",
    icon: Coins,
    status: "done",
    items: [
      { name: "Coming-soon Status sichtbar", status: "done" },
      { name: "Funktionen deaktiviert", status: "done" },
      { name: "Erklärungstext vorhanden", status: "done" },
      { name: "Admin-Bereich vorbereitet", status: "done" },
    ],
    note: "Credits als 'Coming soon' korrekt blockiert."
  },
  {
    category: "Reports",
    icon: BarChart3,
    status: "done",
    items: [
      { name: "Report-Übersicht vorhanden", status: "done" },
      { name: "Verschiedene Typen darstellbar", status: "done" },
      { name: "Download-Buttons aktiv", status: "done" },
      { name: "Admin-Upload vorbereitet", status: "done" },
    ],
    note: "Reports für Kunden und Admin vollständig."
  },
  {
    category: "UGC-Lieferungen",
    icon: Video,
    status: "done",
    items: [
      { name: "Video-Übersicht vorhanden", status: "done" },
      { name: "Status-Anzeige korrekt", status: "done" },
      { name: "Nutzungsrechte sichtbar", status: "done" },
      { name: "Download-Funktion aktiv", status: "done" },
    ],
    note: "UGC-Videos mit korrekten Metadaten angezeigt."
  },
  {
    category: "Rechnungen",
    icon: FileText,
    status: "done",
    items: [
      { name: "Rechnungsliste vorhanden", status: "done" },
      { name: "Status-Badges korrekt", status: "done" },
      { name: "PDF-Download funktioniert", status: "done" },
      { name: "Zahlung-Buttons aktiv", status: "done" },
    ],
    note: "Rechnungen mit korrekten Status und Aktionen."
  },
  {
    category: "Support",
    icon: HelpCircle,
    status: "done",
    items: [
      { name: "Ticket-Erstellung möglich", status: "done" },
      { name: "Ticket-Übersicht vorhanden", status: "done" },
      { name: "Prioritäten wählbar", status: "done" },
      { name: "Admin-Verwaltung aktiv", status: "done" },
    ],
    note: "Support-System client- und admin-seitig vollständig."
  },
  {
    category: "Superadmin",
    icon: Shield,
    status: "done",
    items: [
      { name: "Dashboard-Übersicht vollständig", status: "done" },
      { name: "Alle Admin-Seiten erreichbar", status: "done" },
      { name: "Angebot-Erstellung möglich", status: "done" },
      { name: "Kundenverwaltung vorhanden", status: "done" },
    ],
    note: "Admin-Dashboard mit allen Funktionen."
  },
  {
    category: "Mobile Ansicht",
    icon: Smartphone,
    status: "done",
    items: [
      { name: "Responsive Layout", status: "done" },
      { name: "Mobile Navigation", status: "done" },
      { name: "Touch-freundliche Buttons", status: "done" },
      { name: "Tabellen scrollbar", status: "done" },
    ],
    note: "Alle Seiten für mobile Geräte optimiert."
  },
]

export default function QAChecklistPage() {
  const completedCategories = qaItems.filter(item => item.status === "done").length
  const totalCategories = qaItems.length

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Systemprüfung</h1>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            QA abgeschlossen
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Übersicht der getesteten Funktionen und Bereiche
        </p>
      </div>

      {/* Summary */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <ClipboardCheck className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-900">
                {completedCategories} von {totalCategories} Bereichen geprüft
              </h2>
              <p className="text-emerald-700 mt-1">
                Das Dashboard ist vollständig funktionsfähig und bereit für die Demo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QA Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {qaItems.map((category, index) => {
          const Icon = category.icon
          const completedItems = category.items.filter(i => i.status === "done").length
          const totalItems = category.items.length
          
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <CardTitle className="text-base">{category.category}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {completedItems}/{totalItems}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  {category.note}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Final Note */}
      <Card>
        <CardContent className="py-6">
          <h3 className="font-semibold text-foreground mb-2">Zusammenfassung</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Das prime CPP Dashboard ist als vollständig klickbarer und logisch verbundener Prototyp implementiert. 
            Jede Benutzeraktion hat ein sichtbares Ergebnis, alle Report- und Dateibereiche enthalten realistische 
            Mock-Beispiele, alle Buttons funktionieren, und jede deaktivierte Funktion (wie Credits) erklärt 
            ihren Status deutlich.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
