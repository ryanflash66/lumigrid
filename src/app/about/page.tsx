'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Target, Zap, BarChart3, Eye } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { WordReveal } from '@/components/ui/text-reveal'
import { GlowCard } from '@/components/ui/glow-card'
import { NeonButton } from '@/components/ui/neon-button'
import { SectionDivider } from '@/components/ui/section-divider'
import { brands } from '@/data/brands'

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const values = [
  {
    icon: Target,
    title: 'Strategy First',
    description:
      'Every engagement starts with a discovery sprint that aligns stakeholders, analytics, and experience KPIs before a single pixel is designed.',
  },
  {
    icon: Zap,
    title: 'Craft at Speed',
    description:
      "We pair design systems with engineering automation so polish never slows the delivery cadence. Beautiful and fast aren't mutually exclusive.",
  },
  {
    icon: BarChart3,
    title: 'Measurable Outcomes',
    description:
      "Performance budgets, A/B testing capabilities, and post-launch QA are part of every scope. If we can't measure it, we don't ship it.",
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    description:
      "Weekly updates, shared Figma files, and a Slack channel you actually want to open. You'll never wonder where your project stands.",
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    duration: 'Week 1',
    description:
      "Stakeholder interviews, analytics audit, audience mapping, and experience blueprint. We don't design until we understand.",
  },
  {
    number: '02',
    title: 'Design',
    duration: 'Weeks 2-3',
    description:
      'Wireframes, visual concepts, design system creation, and collaborative review rounds. Your feedback shapes every decision.',
  },
  {
    number: '03',
    title: 'Build',
    duration: 'Weeks 3-5',
    description:
      'Frontend development, CMS setup, integrations, and thorough QA testing. Performance is engineered in, not optimized after.',
  },
  {
    number: '04',
    title: 'Launch & Iterate',
    duration: 'Week 6+',
    description:
      'Deployment, performance monitoring, team handoff documentation, and ongoing optimization support.',
  },
]


/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/*  1. Hero                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">About Lumigrid</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-6 text-balance text-4xl font-semibold md:text-6xl">
              <WordReveal delay={0.15}>
                We build digital experiences for teams chasing ambitious impact.
              </WordReveal>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Designers, engineers, and strategists working as one studio.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="glow-line" />

      {/* ------------------------------------------------------------------ */}
      {/*  2. Origin Story                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* [OWNER TO REPLACE — supply your real origin story] */}
            <div className="space-y-6">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.4em] text-primary">Our story</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl font-semibold">Our story</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/30 px-6 py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    Coming soon — company story content to be provided by the owner.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-scale" delay={0.2}>
              <div className="relative overflow-hidden rounded-[32px]">
                <Image
                  src="/assets/images/about/about-image-02.jpg"
                  alt="Lumigrid team collaborating"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="dot-cluster" />

      {/* ------------------------------------------------------------------ */}
      {/*  3. Values                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Our principles</p>
            <h2 className="mt-4 text-3xl font-semibold">What drives us</h2>
          </ScrollReveal>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {values.map((v) => {
              const Icon = v.icon
              return (
                <StaggerItem key={v.title}>
                  <GlowCard className="p-8">
                    <Icon className="h-8 w-8 text-primary" />
                    <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                  </GlowCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="glow-line" />

      {/* ------------------------------------------------------------------ */}
      {/*  4. How We Work — Process                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Our process</p>
            <h2 className="mt-4 text-3xl font-semibold">How we work</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Every project follows the same proven framework, adapted to your timeline and complexity.
            </p>
          </ScrollReveal>

          {/* Connecting line (desktop only) */}
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />

            <StaggerContainer className="grid gap-8 md:grid-cols-4" stagger={0.12}>
              {processSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="relative rounded-3xl border border-border/50 bg-background/30 p-6 shadow-lg shadow-primary/5 backdrop-blur-xl">
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                    <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                      {step.duration}
                    </span>
                    <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <SectionDivider variant="dot-cluster" />

      {/* ------------------------------------------------------------------ */}
      {/*  6. Client Trust Bar                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-center text-sm uppercase tracking-wider text-muted-foreground">
              Trusted by teams building the future
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {brands.map((brand) => (
                <div key={brand.name} className="flex-shrink-0">
                  <Image
                    src={brand.light}
                    alt={brand.name}
                    width={140}
                    height={40}
                    className="block h-8 w-auto object-contain opacity-70 dark:hidden"
                  />
                  <Image
                    src={brand.dark}
                    alt={`${brand.name} dark`}
                    width={140}
                    height={40}
                    className="hidden h-8 w-auto object-contain opacity-70 dark:block"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="dot-cluster" />

      {/* ------------------------------------------------------------------ */}
      {/*  8. CTA                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-semibold md:text-4xl">
                From audit to launch, we operate as an integrated team.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Tell us how you like to work and we&apos;ll integrate seamlessly.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <NeonButton asChild size="lg">
                  <Link href="/contact">Start a Project</Link>
                </NeonButton>
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-full border border-border bg-background px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted"
                >
                  View Our Work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
