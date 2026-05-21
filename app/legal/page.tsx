import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LegalPage() {
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

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Impressum</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Angaben gemäss Schweizer Recht</h2>
              
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Firmeninformationen</h3>
                <p className="text-foreground mb-4">
                  prime CPP GmbH
                </p>
                <p className="text-muted-foreground">
                  Zwydenweg 5<br />
                  CH-6052 Hergiswil<br />
                  Schweiz
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Kontakt</h3>
                <p className="text-muted-foreground">
                  E-Mail: info@primecpp.com<br />
                  Website: www.primecpp.ch
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-4">Handelsregister</h3>
                <p className="text-muted-foreground">
                  Eingetragen im Handelsregister des Kantons Nidwalden
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Haftungsausschluss</h2>
              <p className="text-muted-foreground leading-relaxed">
                Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, 
                Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche 
                aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch 
                Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten 
                oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen 
                oder die Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. 
                Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung 
                solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Urheberrechte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf 
                der Website gehören ausschliesslich der Firma prime CPP GmbH oder den speziell genannten 
                Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung 
                der Urheberrechtsträger im Voraus einzuholen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Datenschutz</h2>
              <p className="text-muted-foreground leading-relaxed">
                Für den Datenschutz verweisen wir auf unsere{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Datenschutzerklärung
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
