import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Authentifizierungsfehler
        </h1>
        <p className="text-gray-600 mb-8">
          Bei der Anmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full h-11 rounded-xl bg-[#007be4] hover:bg-[#0066c2]">
            <Link href="/login">
              Erneut anmelden
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-11 rounded-xl">
            <Link href="/">
              Zur Startseite
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
