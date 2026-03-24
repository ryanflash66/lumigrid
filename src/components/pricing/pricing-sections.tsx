'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Shield, Quote } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { NeonButton } from '@/components/ui/neon-button'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonCategories = [
  {
    name: 'Design',
    features: [
      { name: 'Custom mockups', starter: '✓', business: '✓', enterprise: '✓' },
      { name: 'Design system', starter: '—', business: '✓', enterprise: '✓' },
      { name: 'Brand guidelines', starter: '—', business: '—', enterprise: '✓' },
    ],
  },
  {
    name: 'Development',
    features: [
      { name: 'Pages included', starter: '1', business: 'Up to 8', enterprise: 'Unlimited' },
      { name: 'CMS integration', starter: '—', business: '✓', enterprise: '✓' },
      { name: 'API integrations', starter: '—', business: '—', enterprise: '✓' },
      { name: 'E-commerce', starter: '—', business: '—', enterprise: '✓' },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Revision rounds', starter: '1', business: '2', enterprise: 'Unlimited' },
      { name: 'Post-launch support', starter: '—', business: '30 days', enterprise: '90 days' },
      { name: 'Dedicated PM', starter: '—', business: '—', enterprise: '✓' },
    ],
  },
  {
    name: 'Performance',
    features: [
      { name: 'Lighthouse audit', starter: '—', business: '✓', enterprise: '✓' },
      { name: 'Core Web Vitals optimization', starter: '—', business: '✓', enterprise: '✓' },
    ],
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Discover',
    duration: 'Week 1',
    description:
      'Stakeholder interviews, analytics audit, competitor analysis, and experience blueprint.',
  },
  {
    step: 2,
    title: 'Design',
    duration: 'Weeks 2-3',
    description:
      'Wireframes, visual concepts, design system creation, and client review rounds.',
  },
  {
    step: 3,
    title: 'Build',
    duration: 'Weeks 3-5',
    description:
      'Frontend development, CMS setup, integrations, and thorough QA testing.',
  },
  {
    step: 4,
    title: 'Launch',
    duration: 'Week 6',
    description:
      'Deployment, performance monitoring, team handoff, and post-launch support.',
  },
]

const testimonials = [
  {
    quote:
      'Lumigrid rebuilt our entire marketing site in six weeks. The results exceeded every metric we set.',
    name: 'Mara Patel',
    company: 'FutureAid',
    initials: 'MP',
  },
  {
    quote:
      'They operated like an integrated product team. Best agency experience we\'ve had.',
    name: 'Rafael Gomez',
    company: 'Northwind Labs',
    initials: 'RG',
  },
]

const pricingFaqs = [
  {
    question: 'What happens if my project scope changes?',
    answer:
      'We build flexibility into every engagement. Minor scope adjustments are absorbed. For significant changes, we\'ll propose a scope amendment with transparent pricing before any additional work begins.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes. We typically structure payments as 40% upfront, 30% at design approval, and 30% at launch. Enterprise engagements can arrange monthly billing.',
  },
  {
    question: "What's NOT included in the pricing?",
    answer:
      'Third-party costs like hosting, domain registration, stock photography, and paid API subscriptions are separate. We\'ll flag these during discovery so there are no surprises.',
  },
  {
    question: 'How do revisions work?',
    answer:
      'Each plan includes a set number of revision rounds at key milestones. A revision round means consolidated feedback on a complete deliverable, not individual change requests.',
  },
  {
    question: 'Can I upgrade my plan mid-project?',
    answer:
      'Absolutely. If your needs grow during the engagement, we\'ll apply your current investment toward the upgraded plan and adjust the timeline accordingly.',
  },
  {
    question: 'Do you offer ongoing maintenance after launch?',
    answer:
      'Yes. All plans include a post-launch support window. Beyond that, we offer monthly retainer packages starting at $1,200/mo for ongoing updates, monitoring, and optimization.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 30 }

function CellValue({ value }: { value: string }) {
  if (value === '✓') {
    return <span className="text-primary font-semibold">✓</span>
  }
  if (value === '—') {
    return <span className="text-muted-foreground">—</span>
  }
  return <span className="text-foreground text-sm">{value}</span>
}

// ---------------------------------------------------------------------------
// 1. Comparison Table
// ---------------------------------------------------------------------------

function ComparisonTable() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal variant="clip-reveal" className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            Compare plans at a glance
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-card/60 backdrop-blur">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="sticky top-0 z-10 border-b border-border/50 bg-card/90 backdrop-blur">
                  <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      Business
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((category) => (
                  <Fragment key={category.name}>
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 pt-6 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                      >
                        {category.name}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-t border-border/30 transition-colors hover:bg-muted/30"
                      >
                        <td className="px-6 py-3 text-sm text-foreground">{feature.name}</td>
                        <td className="px-6 py-3 text-center">
                          <CellValue value={feature.starter} />
                        </td>
                        <td className="px-6 py-3 text-center">
                          <CellValue value={feature.business} />
                        </td>
                        <td className="px-6 py-3 text-center">
                          <CellValue value={feature.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 2. Process Timeline
// ---------------------------------------------------------------------------

function ProcessTimeline() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            From brief to launch
          </h2>
        </ScrollReveal>

        <StaggerContainer stagger={0.12} className="relative">
          {/* Connecting line — visible on md+ */}
          <div className="absolute left-0 right-0 top-[60px] hidden h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20 md:block" />

          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step) => (
              <StaggerItem key={step.step} variant="fade-up">
                <div className="relative rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{step.duration}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 3. Trust Signals
// ---------------------------------------------------------------------------

function TrustSignals() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Guarantee */}
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">100% Satisfaction Guarantee</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                If you&apos;re not satisfied after the first design milestone, we&apos;ll refund
                your deposit. No questions asked.
              </p>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur"
                >
                  <Quote className="mb-3 h-5 w-5 text-primary/60" />
                  <p className="text-sm text-foreground leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 4. Pricing FAQ
// ---------------------------------------------------------------------------

function PricingFAQ() {
  const [open, setOpen] = useState<string | null>(pricingFaqs[0].question)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <ScrollReveal variant="clip-reveal" className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            Pricing questions
          </h2>
        </ScrollReveal>

        <StaggerContainer stagger={0.1} className="divide-y divide-border/60">
          {pricingFaqs.map((faq) => {
            const isOpen = open === faq.question
            return (
              <StaggerItem key={faq.question} variant="fade-up">
                <motion.div layout={!prefersReducedMotion} className="relative">
                  {/* Left indicator bar */}
                  <motion.div
                    className="absolute left-0 top-0 h-full w-[2px] origin-top bg-primary"
                    initial={false}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : springTransition}
                  />

                  <button
                    type="button"
                    className="w-full py-5 pl-4 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : faq.question)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-medium">{faq.question}</p>
                      <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={
                          prefersReducedMotion ? { duration: 0 } : springTransition
                        }
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={
                            prefersReducedMotion ? false : { height: 0, opacity: 0 }
                          }
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={
                            prefersReducedMotion ? { duration: 0 } : springTransition
                          }
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 5. "Not Sure?" CTA
// ---------------------------------------------------------------------------

function NotSureCTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[40px] border border-primary/20 bg-gradient-to-br from-primary via-primary/90 to-accent p-6 text-center text-primary-foreground dark:border-primary/30 md:p-10">
          <div className="relative z-10 space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Not sure which plan fits?
            </h2>
            <p className="mx-auto max-w-lg text-primary-foreground/85 md:text-lg">
              Every project is different. Tell us what you&apos;re building and we&apos;ll
              recommend the right scope — no commitment required.
            </p>
            <div className="pt-2">
              <NeonButton asChild variant="ghost" size="lg">
                <Link
                  href="/contact?plan=Custom"
                  className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  Get a Custom Quote
                </Link>
              </NeonButton>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-16 left-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Combined export
// ---------------------------------------------------------------------------

export function PricingSections() {
  return (
    <>
      <ComparisonTable />
      <ProcessTimeline />
      <TrustSignals />
      <PricingFAQ />
      <NotSureCTA />
    </>
  )
}
