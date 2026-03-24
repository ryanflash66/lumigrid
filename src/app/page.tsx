'use client'

import { Hero } from '@/components/sections/hero'
import { CapabilitiesSection } from '@/components/sections/capabilities'
import { BrandsSection } from '@/components/sections/brands'
import { FeaturesSection } from '@/components/sections/features'
import { QualitySection } from '@/components/sections/quality-section'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { PricingPreview } from '@/components/sections/pricing-preview'
import { FAQSection } from '@/components/sections/faq'
import { ContactStrip } from '@/components/sections/contact-strip'
import { SectionDivider } from '@/components/ui/section-divider'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Home() {
  const isMobile = useIsMobile()

  if (isMobile) {
    // Mobile: lean conversion funnel — minimal scrolling to CTA
    return (
      <main className="flex min-h-screen flex-col">
        <Hero />
        <BrandsSection />
        <CapabilitiesSection />
        <TestimonialsSection />
        <PricingPreview />
        <FAQSection />
        <ContactStrip />
      </main>
    )
  }

  // Desktop: full experience with all sections and dividers
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <SectionDivider variant="glow-line" />
      <BrandsSection />
      <CapabilitiesSection />
      <SectionDivider variant="wave" />
      <FeaturesSection />
      <SectionDivider variant="dot-cluster" />
      <QualitySection />
      <TestimonialsSection />
      <SectionDivider variant="glow-line" />
      <PricingPreview />
      <FAQSection />
      <SectionDivider variant="dot-cluster" />
      <ContactStrip />
    </main>
  )
}
