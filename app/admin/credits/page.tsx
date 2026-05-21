"use client"

import { 
  Coins, 
  Plus, 
  Minus, 
  Download, 
  Eye, 
  Users,
  FileText,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/toast-provider"

const preparedFeatures = [
  {
    icon: Eye,
    title: "Credit-Guthaben pro Kunde anzeigen",
    description: "Ubersicht uber das verfugbare Guthaben aller Kunden",
  },
  {
    icon: Plus,
    title: "Credits manuell hinzufugen",
    description: "Gutschriften manuell auf Kundenkonten buchen",
  },
  {
    icon: Minus,
    title: "Credits manuell abziehen",
    description: "Korrekturbuchungen durchfuhren",
  },
  {
    icon: FileText,
    title: "Credit-Kaufe prufen",
    description: "Alle Kauftransaktionen einsehen und verwalten",
  },
  {
    icon: Users,
    title: "Credits einem Auftrag zuordnen",
    description: "Credit-Zahlungen mit spezifischen Auftragen verknupfen",
  },
  {
    icon: Download,
    title: "Credit-Transaktionen exportieren",
    description: "Alle Transaktionen als CSV oder Excel exportieren",
  },
]

export default function AdminCreditsPage() {
  const { showToast } = useToast()

  const handleComingSoon = () => {
    showToast("Credits sind aktuell noch nicht aktiviert.", "info")
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Credits verwalten</h1>
          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
            Coming soon
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Verwalten Sie das Credit-System und Kundenguthaben
        </p>
      </div>

      {/* Status Card */}
      <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
        <CardContent className="py-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Coins className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Credit-System in Vorbereitung
            </h3>
            <p className="text-gray-500 max-w-md mb-4">
              Die Credit-Funktion ist vorbereitet, aber aktuell nicht aktiviert. 
              Alle unten aufgefuhrten Funktionen werden zu einem spateren Zeitpunkt freigeschaltet.
            </p>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              <Clock className="h-3 w-3 mr-1" />
              Verfugbar in einer zukunftigen Version
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Prepared Features */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Geplante Funktionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preparedFeatures.map((feature, index) => (
            <Card key={index} className="bg-gray-50/50 border-dashed opacity-60">
              <CardContent className="py-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-700">{feature.title}</h4>
                      <Badge variant="outline" className="text-[10px] bg-gray-100 text-gray-500 border-0">
                        Soon
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mock Stats */}
      <Card className="border-dashed border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-500">Vorschau: Credit-Ubersicht</CardTitle>
          <CardDescription>Diese Werte werden angezeigt, sobald Credits aktiviert sind</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Gesamtes Guthaben</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">CHF 0.00</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Kunden mit Credits</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">0</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Transaktionen</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">0</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Umsatz uber Credits</p>
              <p className="text-2xl font-bold text-gray-300 mt-1">CHF 0.00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Aktionen blockiert</h4>
                <p className="text-sm text-muted-foreground">
                  Alle Credit-Verwaltungsfunktionen sind bis zur Aktivierung deaktiviert.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" disabled onClick={handleComingSoon}>
                <Plus className="h-4 w-4 mr-2" />
                Credits hinzufugen
              </Button>
              <Button variant="outline" disabled onClick={handleComingSoon}>
                <Download className="h-4 w-4 mr-2" />
                Exportieren
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
