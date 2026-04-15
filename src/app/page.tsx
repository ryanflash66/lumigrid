import { FAQJsonLd } from '@/lib/structured-data'
import { faqs } from '@/data/faq'
import { Hero } from '@/components/sections/hero'
import { CapabilitiesSection } from '@/components/sections/capabilities'
import { FeaturesSection } from '@/components/sections/features'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQSection } from '@/components/sections/faq'
import { ContactStrip } from '@/components/sections/contact-strip'
import { SectionDivider } from '@/components/ui/section-divider'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <FAQJsonLd questions={faqs} />
      <Hero />
      <SectionDivider variant="glow-line" />
      <CapabilitiesSection />
      <SectionDivider variant="wave" />
      <FeaturesSection />
      <SectionDivider variant="glow-line" />
      <PricingPreview />
      <FAQSection />
      <SectionDivider variant="dot-cluster" />
      <ContactStrip />
    </main>
  )
}
