"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Building, Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const packages = {
  "seo-starter": {
    name: "SEO Starter",
    price: 590,
    period: "/ Monat",
    minTerm: "3 Monate",
  },
  "content-starter": {
    name: "Content Starter",
    price: 490,
    period: "einmalig",
    minTerm: null,
  },
  "backlink-check": {
    name: "Backlink Check",
    price: 490,
    period: "einmalig",
    minTerm: null,
  },
  "website-starter": {
    name: "Website Starter",
    price: 1900,
    period: "einmalig",
    minTerm: null,
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package") || "seo-starter"
  const selectedPackage = packages[packageId as keyof typeof packages] || packages["seo-starter"]
  
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate checkout
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Would redirect to success page
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-foreground">prime</span>
            <span className="text-xl font-bold tracking-tight text-primary ml-1">CPP</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Sichere Zahlung
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <Link
          href="/#packages"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu den Paketen
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Checkout</h1>
              <p className="text-muted-foreground">
                Schliessen Sie Ihre Bestellung sicher ab.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Kontaktdaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="firstName">Vorname *</FieldLabel>
                        <Input id="firstName" name="firstName" required />
                      </Field>
                    </FieldGroup>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="lastName">Nachname *</FieldLabel>
                        <Input id="lastName" name="lastName" required />
                      </Field>
                    </FieldGroup>
                  </div>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="email">E-Mail *</FieldLabel>
                      <Input id="email" name="email" type="email" required />
                    </Field>
                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="company">Unternehmen</FieldLabel>
                      <Input id="company" name="company" />
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Rechnungsadresse</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="street">Strasse & Hausnummer *</FieldLabel>
                      <Input id="street" name="street" required />
                    </Field>
                  </FieldGroup>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="zip">PLZ *</FieldLabel>
                        <Input id="zip" name="zip" required />
                      </Field>
                    </FieldGroup>
                    <FieldGroup className="md:col-span-2">
                      <Field>
                        <FieldLabel htmlFor="city">Ort *</FieldLabel>
                        <Input id="city" name="city" required />
                      </Field>
                    </FieldGroup>
                  </div>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="country">Land *</FieldLabel>
                      <Input id="country" name="country" defaultValue="Schweiz" required />
                    </Field>
                  </FieldGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Zahlungsmethode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Kreditkarte</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="invoice" id="invoice" />
                      <Label htmlFor="invoice" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Rechnung</p>
                          <p className="text-sm text-muted-foreground">Zahlung innert 30 Tagen</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-6 pt-4 border-t border-border">
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="cardNumber">Kartennummer *</FieldLabel>
                          <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </Field>
                      </FieldGroup>
                      <div className="grid grid-cols-2 gap-6">
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="expiry">Gültig bis *</FieldLabel>
                            <Input id="expiry" name="expiry" placeholder="MM/JJ" required />
                          </Field>
                        </FieldGroup>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="cvc">CVC *</FieldLabel>
                            <Input id="cvc" name="cvc" placeholder="123" required />
                          </Field>
                        </FieldGroup>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Wird verarbeitet..."
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Zahlungspflichtig bestellen
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Mit der Bestellung akzeptieren Sie unsere{" "}
                <Link href="/terms" className="text-primary hover:underline">AGB</Link>
                {" "}und{" "}
                <Link href="/privacy" className="text-primary hover:underline">Datenschutzerklärung</Link>.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Bestellübersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground">{selectedPackage.name}</h3>
                  {selectedPackage.minTerm && (
                    <p className="text-sm text-muted-foreground">
                      Mindestlaufzeit: {selectedPackage.minTerm}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paketpreis</span>
                    <span className="text-foreground">
                      CHF {selectedPackage.price.toFixed(2)} {selectedPackage.period}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">MwSt. (8.1%)</span>
                    <span className="text-foreground">
                      CHF {(selectedPackage.price * 0.081).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">
                    CHF {(selectedPackage.price * 1.081).toFixed(2)} {selectedPackage.period}
                  </span>
                </div>

                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Nach der Buchung erhalten Sie eine Bestätigung per E-Mail. 
                      Wir melden uns innerhalb von 24 Stunden für das Onboarding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
