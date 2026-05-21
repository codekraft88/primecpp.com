import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { ServicesPreviewSection } from "@/components/sections/services-preview"
import { AboutSection } from "@/components/sections/about"
import { ProcessSection } from "@/components/sections/process"
import { ServicesSection } from "@/components/sections/services"
import { PlatformAssetsSection } from "@/components/sections/platform-assets"
import { PackagesSection } from "@/components/sections/packages"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FAQSection } from "@/components/sections/faq"
import { ContactSection } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesPreviewSection />
        <AboutSection />
        <ProcessSection />
        <ServicesSection />
        <PlatformAssetsSection />
        <PackagesSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
