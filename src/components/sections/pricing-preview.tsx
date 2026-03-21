import Link from 'next/link'

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For early-stage teams testing messaging and demand.',
    cta: 'Get started'
  },
  {
    name: 'Studio',
    price: '$6,000',
    description: 'Full strategy, design, and build for a production launch.',
    cta: 'Book a call',
    featured: true
  },
  {
    name: 'Growth',
    price: '$12,000',
    description: 'Optimization, experimentation, and multi-page scale.',
    cta: 'Talk to us'
  }
]

export function PricingPreview() {
  return (
    <section id="pricing" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-balance text-4xl font-semibold md:text-5xl">Build your dream landing page, today.</h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Simple, transparent pricing for teams ready to ship with confidence.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex h-full flex-col rounded-[20px] border border-border/70 p-6 ${
              tier.featured ? 'bg-foreground text-background' : 'bg-card/60'
            }`}
          >
            <div>
              <h3 className={`text-lg font-semibold ${tier.featured ? 'text-background' : 'text-foreground'}`}>
                {tier.name}
              </h3>
              <p className={`mt-3 text-3xl font-semibold ${tier.featured ? 'text-background' : 'text-foreground'}`}>
                {tier.price}
              </p>
              <p className={`mt-2 text-sm ${tier.featured ? 'text-background/80' : 'text-muted-foreground'}`}>
                {tier.description}
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${
                  tier.featured
                    ? 'bg-background text-foreground hover:bg-background/90'
                    : 'border border-foreground/20 text-foreground hover:border-foreground/40'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/pricing" className="font-medium text-foreground/80 hover:text-foreground">
          View full pricing →
        </Link>
      </div>
    </section>
  )
}
