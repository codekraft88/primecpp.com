"use client"

import { useState } from "react"
import { User, Building, MapPin, Save, Lock, Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/toast-provider"

export default function ProfilePage() {
  const { showToast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    showToast("Anderungen wurden gespeichert.", "success")
  }

  const handleChangePassword = async () => {
    setIsChangingPassword(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsChangingPassword(false)
    showToast("Passwort wurde erfolgreich geandert.", "success")
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-500 mt-1">
          Verwalten Sie Ihre personlichen Daten und Kontoeinstellungen.
        </p>
      </div>

      {/* Profile Header */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#007be4] to-[#00a8ff] flex items-center justify-center shadow-lg shadow-[#007be4]/20">
            <span className="text-3xl font-bold text-white">MM</span>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">Max Muster</h2>
            <p className="text-gray-600">Muster AG</p>
            <p className="text-sm text-gray-400 mt-1">Kunde seit Dezember 2025</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <User className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Personliche Daten</h3>
              <p className="text-sm text-gray-500">Ihre personlichen Kontaktinformationen</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vorname</label>
              <Input defaultValue="Max" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nachname</label>
              <Input defaultValue="Muster" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
              <Input type="email" defaultValue="max@muster.ch" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
              <Input type="tel" defaultValue="+41 79 123 45 67" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <Building className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Unternehmensdaten</h3>
              <p className="text-sm text-gray-500">Informationen zu Ihrem Unternehmen</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unternehmen</label>
              <Input defaultValue="Muster AG" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UID-Nummer (optional)</label>
              <Input defaultValue="CHE-123.456.789" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Rechnungsadresse</h3>
              <p className="text-sm text-gray-500">Adresse fur Rechnungen und Korrespondenz</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Strasse & Hausnummer</label>
            <Input defaultValue="Musterstrasse 123" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PLZ</label>
              <Input defaultValue="8000" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ort</label>
              <Input defaultValue="Zurich" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Land</label>
            <Input defaultValue="Schweiz" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Passwort andern</h3>
              <p className="text-sm text-gray-500">Aktualisieren Sie Ihr Kontopasswort</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aktuelles Passwort</label>
            <Input type="password" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Neues Passwort</label>
              <Input type="password" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passwort bestatigen</label>
              <Input type="password" className="h-11 rounded-xl border-gray-200 focus:border-[#007be4] focus:ring-[#007be4]/20" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              variant="outline"
              className="h-11 px-5 rounded-xl border-gray-200"
            >
              {isChangingPassword ? "Wird geandert..." : "Passwort andern"}
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#007be4]/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-[#007be4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Benachrichtigungen</h3>
              <p className="text-sm text-gray-500">Verwalten Sie Ihre E-Mail-Benachrichtigungen</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-900">Neue Angebote</p>
              <p className="text-xs text-gray-500">Benachrichtigung wenn ein neues Angebot vorliegt</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-900">Reports</p>
              <p className="text-xs text-gray-500">Benachrichtigung wenn ein neuer Report verfugbar ist</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-900">Rechnungen</p>
              <p className="text-xs text-gray-500">Benachrichtigung bei neuen Rechnungen</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <p className="text-sm font-medium text-gray-900">Newsletter</p>
              <p className="text-xs text-gray-500">Neuigkeiten und Updates von prime CPP</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" className="h-11 px-5 rounded-xl border-gray-200">
          Abbrechen
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="h-11 px-6 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white shadow-md shadow-[#007be4]/20"
        >
          {isSaving ? (
            "Wird gespeichert..."
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Anderungen speichern
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
