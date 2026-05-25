"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, CheckCircle, AlertCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  )
}

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Die Passworter stimmen nicht uberein.")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein.")
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    })

    if (updateError) {
      setError("Fehler beim Aktualisieren des Passworts. Bitte versuchen Sie es erneut.")
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setIsSubmitted(true)
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center">
            <span className="text-2xl font-bold tracking-tight text-foreground">prime</span>
            <span className="text-2xl font-bold tracking-tight text-primary ml-1">CPP</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Passwort aktualisiert
              </h2>
              <p className="text-muted-foreground mb-4">
                Ihr Passwort wurde erfolgreich geandert. Sie werden zur Anmeldung weitergeleitet...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Neues Passwort festlegen
                </h2>
                <p className="text-muted-foreground text-sm">
                  Geben Sie Ihr neues Passwort ein.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="password">Neues Passwort</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mindestens 8 Zeichen"
                        required
                        minLength={8}
                        autoComplete="new-password"
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

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">Passwort bestatigen</FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Passwort wiederholen"
                      required
                      minLength={8}
                      autoComplete="new-password"
                    />
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Wird gespeichert..." : "Passwort speichern"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
