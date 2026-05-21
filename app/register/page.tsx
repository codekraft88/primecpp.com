"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!acceptTerms) return
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const company = formData.get("company") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
        data: {
          full_name: `${firstName} ${lastName}`,
          company: company || null,
          role: "client",
        },
      },
    })

    if (authError) {
      setError(
        authError.message === "User already registered"
          ? "Diese E-Mail-Adresse ist bereits registriert."
          : authError.message
      )
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Registrierung erfolgreich!
          </h2>
          <p className="text-muted-foreground mb-8">
            Wir haben Ihnen eine E-Mail zur Bestatigung gesendet. Bitte klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren.
          </p>
          <Link href="/login">
            <Button className="bg-[#007be4] hover:bg-[#0066c2] text-white">
              Zur Anmeldung
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#007be4] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0088ff]/30 via-transparent to-[#0055cc]/40" />
        
        {/* Animated glowing orbs */}
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-white/15 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="inline-flex items-center group">
            <span className="text-2xl font-bold tracking-tight">prime</span>
            <span className="text-2xl font-bold tracking-tight text-white/90 ml-1 group-hover:text-white transition-colors">CPP</span>
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-4">Konto erstellen</h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-md mb-8">
              Registrieren Sie sich, um Zugang zu Ihrem personlichen Kundenbereich zu erhalten.
            </p>
            <ul className="space-y-3">
              {[
                "Projekte und Pakete verwalten",
                "Rechnungen einsehen und bezahlen",
                "Reports und Analysen abrufen",
                "Direkte Kommunikation mit dem Team",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} prime CPP GmbH
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-bold tracking-tight text-foreground">prime</span>
              <span className="text-2xl font-bold tracking-tight text-primary ml-1">CPP</span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Registrieren</h2>
            <p className="text-muted-foreground">
              Erstellen Sie Ihr Kundenkonto
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="firstName">Vorname</FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Max"
                    required
                    className="h-11 rounded-xl"
                  />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="lastName">Nachname</FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Muster"
                    required
                    className="h-11 rounded-xl"
                  />
                </Field>
              </FieldGroup>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="company">Unternehmen (optional)</FieldLabel>
                <Input
                  id="company"
                  name="company"
                  placeholder="Muster AG"
                  className="h-11 rounded-xl"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-Mail-Adresse</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ihre@email.ch"
                  required
                  autoComplete="email"
                  className="h-11 rounded-xl"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Passwort</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mindestens 8 Zeichen"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    className="pr-10 h-11 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>
            </FieldGroup>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                Ich akzeptiere die{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  AGB
                </Link>{" "}
                und{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Datenschutzerklarung
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Wird erstellt..." : "Konto erstellen"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Bereits registriert?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Jetzt anmelden
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Zuruck zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
