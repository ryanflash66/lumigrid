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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      {/* Dividers hidden on mobile via the component's own isMobile check */}
      <SectionDivider variant="glow-line" />
      <BrandsSection />
      <CapabilitiesSection />
      <SectionDivider variant="wave" />
      {/* Features + Quality hidden on mobile via CSS — keeps server render stable */}
      <div className="hidden md:contents">
        <FeaturesSection />
        <SectionDivider variant="dot-cluster" />
        <QualitySection />
      </div>
      <TestimonialsSection />
      <SectionDivider variant="glow-line" />
      <PricingPreview />
      <FAQSection />
      <SectionDivider variant="dot-cluster" />
      <ContactStrip />
    </main>
  )
}
