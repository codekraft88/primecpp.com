import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Verantwortliche Stelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-foreground mt-4">
                prime CPP GmbH<br />
                Zwydenweg 5<br />
                CH-6052 Hergiswil<br />
                E-Mail: info@primecpp.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Erhebung und Verarbeitung von Daten</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bei jedem Zugriff auf unsere Website werden automatisch folgende Daten erhoben und in Logfiles gespeichert:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Aufgerufene Seite/Name der abgerufenen Datei</li>
                <li>Übertragene Datenmenge</li>
                <li>Browsertyp und Version</li>
                <li>Verwendetes Betriebssystem</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Diese Daten sind technisch notwendig, um die Website anzuzeigen und werden nach 30 Tagen gelöscht.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Kontaktformular</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre Angaben (Name, E-Mail, Nachricht) 
                zur Bearbeitung Ihrer Anfrage gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung weitergegeben. 
                Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks nicht mehr benötigt werden.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Kundenbereich</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bei der Registrierung für unseren Kundenbereich erheben wir folgende Daten:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Name und Vorname</li>
                <li>E-Mail-Adresse</li>
                <li>Unternehmen (optional)</li>
                <li>Rechnungsadresse</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Diese Daten werden zur Vertragserfüllung und Abrechnung verwendet und gemäss gesetzlichen 
                Aufbewahrungsfristen gespeichert.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unsere Website verwendet technisch notwendige Cookies, um die Funktionsfähigkeit der Website 
                zu gewährleisten. Diese Cookies enthalten keine personenbezogenen Daten und werden nach 
                Schliessung des Browsers gelöscht.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Ihre Rechte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sie haben das Recht auf:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Auskunft über Ihre gespeicherten Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Zur Ausübung dieser Rechte wenden Sie sich bitte an info@primecpp.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Änderungen</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                rechtlichen Anforderungen entspricht.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Stand: Mai 2026
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
