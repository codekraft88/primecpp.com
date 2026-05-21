import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Info,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock offer data
const offer = {
  id: "OFF-001",
  title: "SEO Text Professional",
  category: "SEO Texte",
  status: "pending-approval",
  createdAt: "27. April 2026",
  validUntil: "10. Mai 2026",
  price: "CHF 490.00",
  vatNote: "inkl. 8.1% MwSt.",
  paymentMethod: "Einmalig",
  requestedService: "SEO Texte bestellen",
  scope: [
    "1 SEO-optimierter Text bis 1.500 Wörter",
    "Keyword-Recherche und Integration",
    "Strukturierte Überschriften (H1-H3)",
    "Meta Title und Meta Description",
    "1 Revisionsrunde inkludiert",
  ],
  deliverables: [
    "SEO-Text als Word-Dokument",
    "Meta-Daten separat aufgeführt",
    "Keyword-Übersicht",
  ],
  estimatedDelivery: "5-7 Werktage nach Auftragsstart",
  revisionRounds: 1,
  terms: "Zahlbar innerhalb von 14 Tagen nach Rechnungsstellung.",
  notes: "Der Text wird auf Basis Ihrer Briefing-Angaben erstellt. Bitte stellen Sie sicher, dass alle relevanten Informationen im Auftrag enthalten sind.",
}

export default function OfferDetailPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/offers">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline">{offer.category}</Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
              <Clock className="h-3 w-3 mr-1" />
              Freigabe ausstehend
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{offer.title}</h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Offer Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leistungsumfang</CardTitle>
              <CardDescription>Was ist in diesem Angebot enthalten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Angefragte Leistung</h4>
                <p className="text-muted-foreground">{offer.requestedService}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Umfang</h4>
                <ul className="space-y-2">
                  {offer.scope.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Lieferumfang</h4>
                <ul className="space-y-2">
                  {offer.deliverables.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Geschätzte Lieferzeit</h4>
                  <p className="text-muted-foreground">{offer.estimatedDelivery}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Revisionsrunden</h4>
                  <p className="text-muted-foreground">{offer.revisionRounds} Runde inkludiert</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zahlungsbedingungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Zahlungsart</h4>
                  <p className="text-muted-foreground">{offer.paymentMethod}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Zahlungsziel</h4>
                  <p className="text-muted-foreground">{offer.terms}</p>
                </div>
              </div>
              
              {offer.notes && (
                <div className="p-4 bg-muted/50 rounded-xl">
                  <h4 className="font-medium mb-1">Hinweise von prime CPP</h4>
                  <p className="text-sm text-muted-foreground">{offer.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Price & Actions */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Zusammenfassung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Preis</span>
                <span className="text-2xl font-bold">{offer.price}</span>
              </div>
              <p className="text-sm text-muted-foreground text-right">{offer.vatNote}</p>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Erstellt am</span>
                  <span>{offer.createdAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gültig bis</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>{offer.validUntil}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Note */}
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Wichtiger Hinweis</p>
                  <p className="text-amber-700 mt-1">
                    Der Auftrag wird erst nach Ihrer aktiven Freigabe und Zahlung verbindlich gestartet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90" size="lg">
              <Link href={`/dashboard/checkout/${offer.id}`}>
                Angebot kostenpflichtig annehmen
                <CreditCard className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/support">
                <MessageSquare className="mr-2 h-4 w-4" />
                Rückfrage stellen
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
