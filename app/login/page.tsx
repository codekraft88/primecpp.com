"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for error in URL params (e.g., from auth callback)
  useEffect(() => {
    const errorParam = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")
    if (errorParam) {
      setError(errorDescription || errorParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const supabase = createClient()
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        const errorMessages: Record<string, string> = {
          "Invalid login credentials": "Ungultige Anmeldedaten. Bitte uberprufen Sie Ihre E-Mail und Ihr Passwort.",
          "Email not confirmed": "Ihre E-Mail-Adresse wurde noch nicht bestatigt.",
          "Database error querying schema": "Verbindungsfehler. Bitte versuchen Sie es erneut.",
        }
        setError(errorMessages[authError.message] || authError.message)
        setIsLoading(false)
        return
      }

      if (!data.user) {
        setError("Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.")
        setIsLoading(false)
        return
      }

      // Check user role and redirect accordingly
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profile?.role === "admin" || profile?.role === "superadmin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch {
      setError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#007be4] relative overflow-hidden">
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0088ff]/30 via-transparent to-[#0055cc]/40" />
        
        {/* Animated glowing orbs */}
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-white/15 blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] right-[30%] w-[200px] h-[200px] rounded-full bg-white/10 blur-[60px] animate-float-slow" style={{ animationDelay: '4s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        
        {/* Decorative circles */}
        <div className="absolute top-[15%] right-[15%] w-32 h-32 rounded-full border border-white/10" />
        <div className="absolute top-[15%] right-[15%] w-48 h-48 rounded-full border border-white/5" />
        <div className="absolute bottom-[25%] left-[10%] w-24 h-24 rounded-full border border-white/10" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="inline-flex items-center group">
            <Image 
              src="/logo-blau.png" 
              alt="prime CPP" 
              width={160} 
              height={40} 
              className="h-10 w-auto brightness-0 invert transition-transform group-hover:scale-105"
              priority
            />
          </Link>
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight whitespace-nowrap">
              Willkommen zurück
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Melden Sie sich an, um Ihre Projekte, Pakete und Rechnungen zu verwalten.
            </p>
            
            {/* Feature highlights */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span>Projektubersicht in Echtzeit</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span>Rechnungen & Zahlungen verwalten</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span>Direkter Support-Zugang</span>
              </div>
            </div>
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
            <Link href="/" className="inline-flex items-center justify-center">
              <Image 
                src="/logo-blau.png" 
                alt="prime CPP" 
                width={140} 
                height={36} 
                className="h-9 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Anmelden</h2>
            <p className="text-muted-foreground">
              Melden Sie sich in Ihrem Kundenbereich an
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)} 
                className="text-red-500 hover:text-red-700"
                aria-label="Fehler schliessen"
              >
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Passwort</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Passwort vergessen?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ihr Passwort"
                    required
                    autoComplete="current-password"
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

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#007be4] hover:bg-[#0066c2] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Wird angemeldet..." : "Anmelden"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Noch kein Konto?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Jetzt registrieren
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
