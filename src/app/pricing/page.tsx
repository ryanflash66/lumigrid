import { ModernPricingPage, PricingCardProps } from '@/components/ui/animated-glassy-pricing'
import { GradientCTASection } from '@/components/sections/cta-variations'
import { PricingSections } from '@/components/pricing/pricing-sections'
import { ServiceJsonLd } from '@/lib/structured-data'

// Transform pricing data to match new component format
const transformPricingData = (): PricingCardProps[] => {
  const rawTiers = [
    {
      tier: 'Starter',
      price: 'Starting at $1,800',
      bestFor: 'Perfect for landing pages',
      CTA: 'Book a Call',
      ctaHref: '/contact?plan=Starter',
      benefits: [
        { text: 'Single-page or campaign-focused experience', checked: true },
        { text: 'Fully responsive design', checked: true },
        { text: 'Basic SEO optimization', checked: true },
        { text: 'Contact form integration', checked: true },
        { text: 'Basic analytics setup', checked: false }
      ],
      featured: false
    },
    {
      tier: 'Business',
      price: 'Starting at $3,500',
      bestFor: 'Most popular for growing teams',
      CTA: 'Book a Call',
      ctaHref: '/contact?plan=Business',
      featured: true,
      benefits: [
        { text: 'Multi-page website (up to 10 pages)', checked: true },
        { text: 'Custom design system', checked: true },
        { text: 'Blog/CMS integration', checked: true },
        { text: 'Advanced SEO & performance optimization', checked: true },
        { text: 'E-commerce functionality', checked: false }
      ]
    },
    {
      tier: 'Enterprise',
      price: 'Starting at $5,999',
      bestFor: 'For complex requirements',
      CTA: 'Start a Project',
      ctaHref: '/contact?plan=Enterprise',
      benefits: [
        { text: 'Unlimited pages & custom features', checked: true },
        { text: 'Enterprise-grade architecture', checked: true },
        { text: 'Advanced integrations & APIs', checked: true },
        { text: 'Dedicated project manager', checked: true },
        { text: 'Ongoing maintenance & support', checked: false }
      ],
      featured: false
    }
  ]

  return rawTiers.map(tier => {
    // Extract price number from "Starting at $1,800" format
    const priceMatch = tier.price.match(/\$([\d,]+)/)
    const priceNumber = priceMatch ? priceMatch[1].replace(/,/g, '') : '0'

    // Convert benefits to features array (only checked items)
    const features = tier.benefits.filter(b => b.checked).map(b => b.text)

    return {
      planName: tier.tier,
      description: tier.bestFor,
      price: priceNumber,
      priceSuffix: 'One-Time Project',
      features,
      buttonText: tier.CTA,
      buttonHref: tier.ctaHref,
      isPopular: tier.featured || false
    }
  })
}

export const metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for Lumigrid AI automation services and what each tier includes.',
  openGraph: {
    title: 'Pricing — Lumigrid AI',
    description: 'Transparent pricing for Lumigrid AI automation services.',
  },
}

/* [OWNER TO REPLACE — all pricing tiers, features, and copy below are placeholders.
   Update with real pricing before going live.] */
export default function PricingPage() {
  const pricingPlans = transformPricingData()

  return (
    <>
      <ServiceJsonLd
        name="AI Automation Services"
        description="Custom AI automations that save your business time and money. From landing pages to enterprise solutions."
        price="1800"
      />
      <ModernPricingPage
        title={
          <>
            Flexible scopes for every{' '}
            <span className="italic text-primary">growth stage</span>
          </>
        }
        subtitle="Start with a launchpad project or engage a full team for ongoing work. Every package includes strategy, design, build, and QA wrapped in a predictable scope."
        plans={pricingPlans}
      />
      <PricingSections />
      <GradientCTASection />
    </>
  )
}
