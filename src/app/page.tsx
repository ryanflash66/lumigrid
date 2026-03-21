import { Hero } from '@/components/sections/hero'
import { CapabilitiesSection } from '@/components/sections/capabilities'
import { BrandsSection } from '@/components/sections/brands'
import { FeaturesSection } from '@/components/sections/features'
import { QualitySection } from '@/components/sections/quality-section'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQSection } from '@/components/sections/faq'
import { ContactStrip } from '@/components/sections/contact-strip'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <BrandsSection />
      <CapabilitiesSection />
      <FeaturesSection />
      <QualitySection />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <ContactStrip />
    </main>
  )
}
