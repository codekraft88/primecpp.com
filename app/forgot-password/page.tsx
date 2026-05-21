"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (resetError) {
      setError("Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.")
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setIsSubmitted(true)
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
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                E-Mail gesendet
              </h2>
              <p className="text-muted-foreground mb-8">
                Wenn ein Konto mit dieser E-Mail existiert, erhalten Sie in Kürze 
                einen Link zum Zurücksetzen Ihres Passworts.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück zur Anmeldung
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Passwort vergessen?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen 
                  Link zum Zurücksetzen Ihres Passworts.
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
                    <FieldLabel htmlFor="email">E-Mail-Adresse</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ihre@email.ch"
                      required
                      autoComplete="email"
                    />
                  </Field>
                </FieldGroup>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Wird gesendet..." : "Link senden"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück zur Anmeldung
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
