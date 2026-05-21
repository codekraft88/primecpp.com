"use client"

import { useState } from "react"
import { 
  Save,
  Building2,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Palette
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Einstellungen</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie Ihre Systemeinstellungen</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Speichern..." : "Speichern"}
        </Button>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger value="company" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Firma</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">E-Mail</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Zahlung</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Benachrichtigungen</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sicherheit</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Erscheinung</span>
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Firmeninformationen</h3>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firmenname</Label>
                  <Input id="companyName" defaultValue="prime CPP GmbH" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatId">USt-IdNr.</Label>
                  <Input id="vatId" defaultValue="CHE-123.456.789" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" defaultValue="Musterstrasse 123&#10;8000 Zürich&#10;Schweiz" rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" defaultValue="+41 44 123 45 67" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" defaultValue="info@primecpp.ch" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Bankverbindung</h3>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank</Label>
                  <Input id="bankName" defaultValue="UBS Switzerland AG" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN</Label>
                  <Input id="iban" defaultValue="CH12 3456 7890 1234 5678 9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bic">BIC/SWIFT</Label>
                <Input id="bic" defaultValue="UBSWCHZH80A" className="md:w-1/2" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">E-Mail-Konfiguration</h3>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" defaultValue="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" defaultValue="587" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Benutzername</Label>
                  <Input id="smtpUser" defaultValue="noreply@primecpp.ch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass">Passwort</Label>
                  <Input id="smtpPass" type="password" defaultValue="••••••••" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">E-Mail-Vorlagen</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Willkommens-E-Mail</p>
                  <p className="text-sm text-muted-foreground">Wird bei Neuregistrierung gesendet</p>
                </div>
                <Button variant="outline" size="sm">Bearbeiten</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Angebotsbenachrichtigung</p>
                  <p className="text-sm text-muted-foreground">Wird bei neuem Angebot gesendet</p>
                </div>
                <Button variant="outline" size="sm">Bearbeiten</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Rechnungs-E-Mail</p>
                  <p className="text-sm text-muted-foreground">Wird mit Rechnung gesendet</p>
                </div>
                <Button variant="outline" size="sm">Bearbeiten</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Zahlungsmethoden</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Kreditkarte</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Banküberweisung</p>
                    <p className="text-sm text-muted-foreground">SEPA, Überweisung</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Rechnungseinstellungen</h3>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Rechnungsnummer-Präfix</Label>
                  <Input id="invoicePrefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerm">Zahlungsziel (Tage)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="paymentTerm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Tage</SelectItem>
                      <SelectItem value="14">14 Tage</SelectItem>
                      <SelectItem value="30">30 Tage</SelectItem>
                      <SelectItem value="60">60 Tage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Währung</Label>
                <Select defaultValue="CHF">
                  <SelectTrigger id="currency" className="md:w-1/2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CHF">CHF - Schweizer Franken</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">E-Mail-Benachrichtigungen</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Neue Anfragen</p>
                  <p className="text-sm text-muted-foreground">Bei neuer Kundenanfrage benachrichtigen</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Angenommene Angebote</p>
                  <p className="text-sm text-muted-foreground">Wenn ein Kunde ein Angebot annimmt</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Zahlungseingänge</p>
                  <p className="text-sm text-muted-foreground">Bei eingehenden Zahlungen</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Überfällige Rechnungen</p>
                  <p className="text-sm text-muted-foreground">Bei überfälligen Zahlungen</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Sicherheitseinstellungen</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Zwei-Faktor-Authentifizierung</p>
                  <p className="text-sm text-muted-foreground">Zusätzliche Sicherheitsebene für Admin-Konten</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session-Timeout</p>
                  <p className="text-sm text-muted-foreground">Automatische Abmeldung nach Inaktivität</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Minuten</SelectItem>
                    <SelectItem value="30">30 Minuten</SelectItem>
                    <SelectItem value="60">1 Stunde</SelectItem>
                    <SelectItem value="120">2 Stunden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Branding</h3>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border border-dashed border-border">
                    <span className="text-xs text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline">Hochladen</Button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primärfarbe</Label>
                  <div className="flex gap-2">
                    <Input id="primaryColor" defaultValue="#2380ee" />
                    <div className="w-10 h-10 rounded-lg bg-primary border border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Akzentfarbe</Label>
                  <div className="flex gap-2">
                    <Input id="accentColor" defaultValue="#007be4" />
                    <div className="w-10 h-10 rounded-lg bg-[#007be4] border border-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
