import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
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

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Allgemeine Geschäftsbedingungen</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Geltungsbereich</h2>
              <p className="text-muted-foreground leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen prime CPP GmbH 
                (nachfolgend &ldquo;Anbieter&rdquo;) und dem Kunden über die Erbringung von Dienstleistungen im Bereich 
                Webdesign, Webentwicklung, Content-Produktion, Marketing und SEO.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Vertragsschluss</h2>
              <p className="text-muted-foreground leading-relaxed">
                Angebote des Anbieters sind freibleibend. Ein Vertrag kommt zustande durch schriftliche 
                Auftragsbestätigung des Anbieters oder durch Beginn der Leistungserbringung. Bei Buchung 
                über das Kundenportal gilt die Bestellung als Vertragsangebot des Kunden.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">3. Leistungsumfang</h2>
              <p className="text-muted-foreground leading-relaxed">
                Der Umfang der Leistungen ergibt sich aus dem jeweiligen Angebot oder der gewählten 
                Paketbeschreibung. Änderungen und Ergänzungen bedürfen der schriftlichen Vereinbarung.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Preise und Zahlung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Alle Preise verstehen sich in Schweizer Franken (CHF) exklusive Mehrwertsteuer, sofern 
                nicht anders angegeben. Rechnungen sind innert 30 Tagen nach Rechnungsdatum zahlbar. 
                Bei monatlichen Abonnements erfolgt die Abrechnung im Voraus.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Mindestlaufzeiten</h2>
              <p className="text-muted-foreground leading-relaxed">
                Für laufende Dienstleistungen wie SEO, Content oder Backlink-Pakete gelten die in der 
                Paketbeschreibung angegebenen Mindestlaufzeiten. Nach Ablauf der Mindestlaufzeit verlängert 
                sich der Vertrag automatisch um jeweils einen Monat, sofern er nicht mit einer Frist von 
                30 Tagen zum Monatsende gekündigt wird.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Mitwirkungspflichten</h2>
              <p className="text-muted-foreground leading-relaxed">
                Der Kunde stellt dem Anbieter alle für die Leistungserbringung erforderlichen Informationen, 
                Materialien und Zugänge rechtzeitig zur Verfügung. Verzögerungen durch mangelnde Mitwirkung 
                gehen zu Lasten des Kunden.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Urheberrecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die vom Anbieter erstellten Werke (Designs, Texte, Konzepte) gehen nach vollständiger 
                Bezahlung in das Eigentum des Kunden über. Der Anbieter behält sich das Recht vor, 
                erstellte Arbeiten als Referenz zu verwenden, sofern keine Vertraulichkeitsvereinbarung 
                besteht.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Haftung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Der Anbieter haftet nicht für entgangenen Gewinn, indirekte Schäden oder Folgeschäden. 
                Die Haftung ist auf die Höhe des jährlichen Auftragswertes beschränkt. Für SEO-Leistungen 
                kann keine Garantie für bestimmte Rankings oder Ergebnisse übernommen werden.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Kündigung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Einmalige Leistungen können bis zum Beginn der Arbeiten storniert werden. Bei laufenden 
                Verträgen gelten die in Ziffer 5 genannten Kündigungsfristen. Bei wichtigem Grund ist 
                eine ausserordentliche Kündigung möglich.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Anwendbares Recht und Gerichtsstand</h2>
              <p className="text-muted-foreground leading-relaxed">
                Es gilt schweizerisches Recht. Gerichtsstand ist Hergiswil, Schweiz.
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
