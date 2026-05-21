"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Banknote,
  Check,
  Info,
  Coins,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Mock offer data
const offer = {
  id: "OFF-001",
  title: "SEO Text Professional",
  category: "SEO Texte",
  price: 490.00,
  vat: 39.69,
  total: 490.00,
  vatRate: "8.1%",
}

const paymentMethods = [
  {
    id: "card",
    label: "Kreditkarte",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
    available: true,
  },
  {
    id: "invoice",
    label: "Rechnung",
    description: "Zahlung innerhalb von 14 Tagen",
    icon: Building2,
    available: true,
  },
  {
    id: "transfer",
    label: "Banküberweisung",
    description: "Manuelle Überweisung",
    icon: Banknote,
    available: true,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPayment, setAcceptPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async () => {
    if (!acceptTerms || !acceptPayment) return
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push("/dashboard/checkout/success")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/offers">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground">Schliessen Sie Ihre Bestellung ab</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Zahlungsmethode wählen</CardTitle>
              <CardDescription>Wählen Sie Ihre bevorzugte Zahlungsmethode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Direct Payment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                    Verfügbar
                  </Badge>
                  <span className="font-medium">Direktzahlung</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bezahlen Sie diesen Auftrag direkt per verfügbarer Zahlungsmethode.
                </p>
                
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="p-2 rounded-lg bg-muted">
                        <method.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      {selectedPayment === method.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              {/* Credits - Coming Soon */}
              <div className="space-y-3 opacity-60">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-slate-500/10 text-slate-500 border-slate-500/20">
                    Coming soon
                  </Badge>
                  <span className="font-medium text-muted-foreground">Zahlung per Credits</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nutzen Sie künftig Ihr prime CPP Credit-Guthaben, um kleinere Leistungen, SEO-Texte, Audits oder Content-Aufträge flexibel zu bezahlen.
                </p>
                
                <div className="p-4 rounded-xl border border-dashed bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Coins className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-muted-foreground">Credits verwenden</p>
                      <p className="text-sm text-muted-foreground">Verfügbares Guthaben: CHF 0.00</p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Bald verfügbar
                    </Button>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Die Zahlung per Credits wird vorbereitet und steht bald zur Verfügung. Bis dahin können Aufträge per Direktzahlung, Rechnung oder Banküberweisung bezahlt werden.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Rechnungsadresse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Firma *</Label>
                  <Input id="company" defaultValue="Muster AG" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat">UID-Nummer (optional)</Label>
                  <Input id="vat" placeholder="CHE-000.000.000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse *</Label>
                <Input id="address" defaultValue="Musterstrasse 123" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">PLZ *</Label>
                  <Input id="zip" defaultValue="8000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ort *</Label>
                  <Input id="city" defaultValue="Zürich" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  Ich akzeptiere die <Link href="#" className="text-primary underline">Allgemeinen Geschäftsbedingungen</Link> und 
                  die <Link href="#" className="text-primary underline">Datenschutzerklärung</Link> von prime CPP.
                </span>
              </label>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  id="payment-obligation"
                  checked={acceptPayment}
                  onCheckedChange={(checked) => setAcceptPayment(checked as boolean)}
                  className="mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  Ich bestätige, dass ich mit dem Klick auf „Zahlungspflichtig buchen" eine <strong>kostenpflichtige Bestellung</strong> aufgebe 
                  und zur Zahlung des angegebenen Betrags verpflichtet bin.
                </span>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Bestellübersicht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <Badge variant="outline" className="mb-2">{offer.category}</Badge>
                <p className="font-medium">{offer.title}</p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zwischensumme</span>
                  <span>CHF {(offer.price - offer.vat).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MwSt. ({offer.vatRate})</span>
                  <span>CHF {offer.vat.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-semibold">Gesamtbetrag</span>
                <span className="text-xl font-bold">CHF {offer.total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!acceptTerms || !acceptPayment || isProcessing}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isProcessing ? (
                  "Wird verarbeitet..."
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Zahlungspflichtig buchen
                  </>
                )}
              </Button>

              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Ihr Auftrag startet nach Zahlungseingang und Freischaltung durch prime CPP.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
