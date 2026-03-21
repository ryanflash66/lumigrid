'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AnimatedNumber } from '@/components/ui/animated-number'

const tiers = [
  {
    name: 'Starter',
    price: '0',
    description: 'For early-stage teams testing messaging and demand.',
    cta: 'Get started',
  },
  {
    name: 'Studio',
    price: '6,000',
    description: 'Full strategy, design, and build for a production launch.',
    cta: 'Book a call',
    featured: true,
  },
  {
    name: 'Growth',
    price: '12,000',
    description: 'Optimization, experimentation, and multi-page scale.',
    cta: 'Talk to us',
  },
]

export function PricingPreview() {
  return (
    <section id="pricing" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-balance text-4xl font-semibold md:text-5xl">
          Build your dream landing page, today.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Simple, transparent pricing for teams ready to ship with confidence.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3 md:items-center">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              // Base card styles with glassmorphism
              'relative flex h-full flex-col rounded-[20px] p-6',
              'backdrop-blur-md bg-card/60 border border-border/50',
              // Hover effects
              'transition-all duration-300 ease-in-out',
              'motion-safe:hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10',
              // Featured card elevation
              tier.featured && [
                'motion-safe:md:scale-105 ring-2 ring-primary/30 z-10',
              ]
            )}
          >
            {/* Glassmorphism radial gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[20px] opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 0%, oklch(0.95 0 0 / 0.15), transparent 60%)',
              }}
            />

            {/* Featured gradient border wrapper */}
            {tier.featured && (
              <div className="pointer-events-none absolute -inset-px rounded-[21px] bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
            )}

            {/* Most Popular badge */}
            {tier.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              </div>
            )}

            {/* Card content (relative to sit above overlays) */}
            <div className="relative z-[1]">
              <h3 className="text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                $<AnimatedNumber value={tier.price} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>
            </div>
            <div className="relative z-[1] mt-6">
              <Link
                href="/contact"
                className={cn(
                  'inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                  tier.featured
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-foreground/20 text-foreground hover:border-foreground/40'
                )}
              >
                {tier.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <Link
          href="/pricing"
          className="font-medium text-foreground/80 hover:text-foreground"
        >
          View full pricing →
        </Link>
      </div>
    </section>
  )
}
