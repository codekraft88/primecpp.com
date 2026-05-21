import Link from "next/link"
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Vielen Dank für Ihre Bestellung!
        </h1>
        <p className="text-muted-foreground mt-2">
          Ihr Auftrag wurde erfolgreich aktiviert.
        </p>
      </div>

      {/* Order Summary */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Auftrag</span>
            <span className="font-medium">SEO Text Professional</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Auftragsnummer</span>
            <span className="font-medium">ORD-006</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Zahlungsstatus</span>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <CheckCircle className="h-3 w-3 mr-1" />
              Bezahlt
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Betrag</span>
            <span className="font-semibold">CHF 490.00</span>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-4">Nächste Schritte</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-medium">1</span>
              </div>
              <div>
                <p className="font-medium">Auftragsbestätigung per E-Mail</p>
                <p className="text-sm text-muted-foreground">Sie erhalten in Kürze eine Bestätigung an Ihre E-Mail-Adresse.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-medium">2</span>
              </div>
              <div>
                <p className="font-medium">Projektstart durch prime CPP</p>
                <p className="text-sm text-muted-foreground">Unser Team beginnt mit der Bearbeitung Ihres Auftrags.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-medium">3</span>
              </div>
              <div>
                <p className="font-medium">Lieferung & Report</p>
                <p className="text-sm text-muted-foreground">Sie werden benachrichtigt, sobald Ergebnisse verfügbar sind.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Note */}
      <div className="p-4 bg-muted/50 rounded-xl">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Geschätzte Lieferzeit: 5-7 Werktage</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/orders">
            Auftrag ansehen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            Zur Übersicht
          </Link>
        </Button>
      </div>
    </div>
  )
}
