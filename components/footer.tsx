import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Clock } from "lucide-react"

const services = [
  { href: "#services", label: "UI/UX Design" },
  { href: "#services", label: "Web Development" },
  { href: "#services", label: "Content Production" },
  { href: "#services", label: "Marketing & Kommunikation" },
  { href: "#services", label: "SEO" },
  { href: "#platform-assets", label: "Platform Assets" },
  { href: "#platform-assets", label: "Subscription Platforms" },
  { href: "#platform-assets", label: "Digital Ventures" },
]

const packages = [
  { href: "#packages", label: "SEO Pakete" },
  { href: "#packages", label: "Content Pakete" },
  { href: "#packages", label: "Backlink Pakete" },
  { href: "#packages", label: "Website Pakete" },
]

const legalLinks = [
  { href: "/privacy", label: "Datenschutz" },
  { href: "/terms", label: "AGB" },
  { href: "/legal", label: "Impressum" },
]

function FooterLogo() {
  return (
    <Image
      src="/logo-blau.png"
      alt="prime CPP"
      width={160}
      height={40}
      className="h-9 w-auto brightness-0 invert transition-transform duration-300 hover:scale-105"
    />
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-blue-waves text-white overflow-hidden">
      {/* Modern mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0055aa]/40 via-transparent to-transparent" />
      
      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] blue-glow-orb animate-float-slow" />
      <div className="absolute bottom-1/2 right-1/3 w-[400px] h-[400px] blue-glow-orb animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container relative mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <FooterLogo />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Content. Production. Publishing. Wir entwickeln digitale Inhalte, Websites und 
              Marketingstrukturen für nachhaltiges Wachstum.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <a href="mailto:info@primecpp.com" className="text-sm text-white/70 hover:text-white transition-colors pt-1.5">
                  info@primecpp.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-white/70 pt-1.5">Mo–Fr, 8:00–17:00</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-white/70 pt-1.5">
                  Zwydenweg 5<br />
                  CH-6052 Hergiswil
                </span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Leistungen
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Pakete
            </h3>
            <ul className="space-y-3">
              {packages.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Kundenbereich
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Kunden-Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Registrierung
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © 2020–{currentYear} prime CPP GmbH. Alle Rechte vorbehalten.
            </p>
            <nav className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
