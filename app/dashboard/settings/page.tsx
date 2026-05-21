"use client"

import { useState } from "react"
import { User, Mail, Lock, Bell, CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Einstellungen</h1>
        <p className="text-muted-foreground mt-1">
          Verwalten Sie Ihr Konto und Ihre Präferenzen
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <User className="h-4 w-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bell className="h-4 w-4 mr-2" />
            Benachrichtigungen
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Shield className="h-4 w-4 mr-2" />
            Sicherheit
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Zahlung
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Persönliche Informationen</CardTitle>
              <CardDescription>Aktualisieren Sie Ihre persönlichen Daten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#007be4] to-[#00a8ff] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MM</span>
                </div>
                <div>
                  <Button variant="outline" size="sm">Foto ändern</Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG max. 2MB</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Vorname</Label>
                  <Input id="firstName" defaultValue="Max" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input id="lastName" defaultValue="Muster" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" defaultValue="max@muster.ch" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" defaultValue="+41 79 123 45 67" />
                </div>
              </div>

              <Button className="bg-[#007be4] hover:bg-[#0066c2]">Änderungen speichern</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Firmeninformationen</CardTitle>
              <CardDescription>Rechnungsadresse und Firmendaten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Firmenname</Label>
                <Input id="company" defaultValue="Muster AG" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Strasse</Label>
                  <Input id="street" defaultValue="Musterstrasse 123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">PLZ / Ort</Label>
                  <Input id="city" defaultValue="8000 Zürich" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="uid">UID-Nummer</Label>
                <Input id="uid" defaultValue="CHE-123.456.789" />
              </div>

              <Button className="bg-[#007be4] hover:bg-[#0066c2]">Änderungen speichern</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>E-Mail Benachrichtigungen</CardTitle>
              <CardDescription>Wählen Sie, welche E-Mails Sie erhalten möchten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auftrags-Updates</p>
                  <p className="text-sm text-muted-foreground">Benachrichtigungen über Fortschritte bei Ihren Aufträgen</p>
                </div>
                <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Neue Angebote</p>
                  <p className="text-sm text-muted-foreground">Wenn ein neues Angebot für Sie erstellt wurde</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing E-Mails</p>
                  <p className="text-sm text-muted-foreground">Tipps, Neuigkeiten und Angebote von prime CPP</p>
                </div>
                <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Passwort ändern</CardTitle>
              <CardDescription>Aktualisieren Sie Ihr Passwort regelmässig</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Neues Passwort</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="bg-[#007be4] hover:bg-[#0066c2]">Passwort ändern</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zwei-Faktor-Authentifizierung</CardTitle>
              <CardDescription>Erhöhen Sie die Sicherheit Ihres Kontos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">2FA aktivieren</p>
                  <p className="text-sm text-muted-foreground">Verwenden Sie eine Authenticator-App für zusätzliche Sicherheit</p>
                </div>
                <Button variant="outline">Einrichten</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zahlungsmethoden</CardTitle>
              <CardDescription>Verwalten Sie Ihre Zahlungsmethoden</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Visa •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Läuft ab 12/27</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Entfernen</Button>
              </div>
              <Button variant="outline" className="w-full">
                + Neue Zahlungsmethode hinzufügen
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rechnungsverlauf</CardTitle>
              <CardDescription>Ihre letzten Rechnungen</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href="/dashboard/invoices">Alle Rechnungen ansehen</a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
