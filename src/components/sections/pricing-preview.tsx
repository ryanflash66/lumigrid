'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useInView,
  type Variants,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { MagneticWrapper } from '@/components/ui/magnetic-wrapper'
import { TiltCard } from '@/components/ui/tilt-card'

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

// ---------------------------------------------------------------------------
// Card variants
// ---------------------------------------------------------------------------

function getCardVariants(featured: boolean, prefersReduced: boolean | null): Variants {
  if (prefersReduced) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.4 },
      },
    }
  }

  if (featured) {
    return {
      hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: 8, filter: 'blur(2px)' },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        transition: {
          type: 'spring',
          stiffness: 220,
          damping: 22,
        },
      },
    }
  }

  return {
    hidden: { opacity: 0, y: 60, scale: 0.95, rotateX: 8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 22,
      },
    },
  }
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

// ---------------------------------------------------------------------------
// PricingPreview
// ---------------------------------------------------------------------------

export function PricingPreview() {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="bg-background px-6 py-12 md:py-24">
      <ScrollReveal variant="clip-reveal" className="mx-auto max-w-6xl text-center">
        <h2 className="text-balance text-4xl font-semibold md:text-5xl">
          Build your dream landing page, today.
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Simple, transparent pricing for teams ready to ship with confidence.
        </p>
      </ScrollReveal>

      {isMobile ? (
        <div
          ref={containerRef}
          className="mx-auto mt-12 grid max-w-6xl gap-6"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative flex h-full flex-col rounded-[20px] p-6',
                'bg-card/60 border border-border/50',
                tier.featured && 'ring-2 ring-primary/30',
              )}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                <p className="mt-3 text-3xl font-semibold text-foreground">
                  $<AnimatedNumber value={tier.price} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition-colors touch-manipulation',
                    tier.featured
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-foreground/20 text-foreground',
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3 md:items-center"
          style={{ perspective: '800px' }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={getCardVariants(!!tier.featured, prefersReduced)}
            >
              <TiltCard maxTilt={3} glowBorder={false}>
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-[20px] p-6',
                    'backdrop-blur-md bg-card/60 border border-border/50',
                    'transition-[border-color,box-shadow] duration-300 ease-in-out',
                    'hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10',
                    tier.featured && 'motion-safe:md:scale-105 ring-2 ring-primary/30 z-10',
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[20px] opacity-40"
                    style={{
                      background: 'radial-gradient(ellipse at 30% 0%, oklch(0.95 0 0 / 0.15), transparent 60%)',
                    }}
                  />
                  {tier.featured && (
                    <div className="pointer-events-none absolute -inset-px rounded-[21px] bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
                  )}
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="relative z-[1]">
                    <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                    <p className="mt-3 text-3xl font-semibold text-foreground">
                      $<AnimatedNumber value={tier.price} />
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                  <div className="relative z-[1] mt-6">
                    <MagneticWrapper>
                      <Link
                        href="/contact"
                        className={cn(
                          'inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                          tier.featured
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'border border-foreground/20 text-foreground hover:border-foreground/40',
                        )}
                      >
                        {tier.cta}
                      </Link>
                    </MagneticWrapper>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      )}
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
