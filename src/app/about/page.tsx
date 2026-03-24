'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Target, Zap, BarChart3, Eye } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { WordReveal } from '@/components/ui/text-reveal'
import { GlowCard } from '@/components/ui/glow-card'
import { AnimatedNumber } from '@/components/ui/animated-number'
import { NeonButton } from '@/components/ui/neon-button'
import { SectionDivider } from '@/components/ui/section-divider'
import { brands } from '@/data/brands'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const stats = [
  { label: 'Websites launched', value: '120+' },
  { label: 'Avg. Lighthouse Score', value: '92' },
  { label: 'Client retention', value: '94%' },
  { label: 'Avg. client rating', value: '4.9' },
]

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

const team = [
  { name: 'Amelia Grant', role: 'Partner, Experience', headshot: '/assets/images/team/team-01.png' },
  { name: 'Kai Montgomery', role: 'Partner, Technology', headshot: '/assets/images/team/team-02.png' },
  { name: 'Priya Raman', role: 'Principal UX Writer', headshot: '/assets/images/team/team-03.png' },
  { name: 'David Chen', role: 'Lead Frontend Engineer', headshot: '/assets/images/team/team-04.png' },
  { name: 'Sofia Martinez', role: 'Senior Designer', headshot: '/assets/images/team/team-01.png' },
  { name: 'James Okafor', role: 'Backend Engineer', headshot: '/assets/images/team/team-02.png' },
  { name: 'Nina Takahashi', role: 'Motion Design Lead', headshot: '/assets/images/team/team-03.png' },
  { name: 'Leo Park', role: 'Project Manager', headshot: '/assets/images/team/team-04.png' },
]

const milestones = [
  { year: '2021', description: 'Founded in San Francisco with a mission to eliminate the strategy-to-delivery gap.' },
  { year: '2022', description: 'Shipped our 25th project and grew to a team of 5 specialists.' },
  { year: '2023', description: 'Achieved a 92 average Lighthouse score across all client projects.' },
  { year: '2024', description: 'Crossed the 100-project milestone and launched our partner program.' },
  { year: '2025', description: '120+ projects delivered with a 94% client retention rate.' },
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

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-3xl border border-border/50 bg-background/30 px-6 py-5 text-left shadow-xl shadow-primary/5 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold">
                    <AnimatedNumber value={stat.value} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="glow-line" />

      {/* ------------------------------------------------------------------ */}
      {/*  2. Origin Story                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <ScrollReveal>
                <p className="text-xs uppercase tracking-[0.4em] text-primary">Our story</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl font-semibold">Born from collaborative workflows</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="text-muted-foreground">
                  Lumigrid started in 2021 when two agency veterans realized that the handoff between
                  strategy, design, and engineering was where most projects lost momentum. Timelines
                  slipped, context got lost, and the final product rarely matched the original vision.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-muted-foreground">
                  We built a workflow that keeps all three disciplines in the same room — literally and
                  figuratively. No handoffs, no telephone games, no &quot;that&apos;s not what I
                  designed.&quot; Every team member sees the full picture from day one.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p className="text-muted-foreground">
                  Today we&apos;re a distributed studio of specialists across design, engineering, and
                  strategy. We&apos;ve shipped 120+ projects for teams ranging from seed-stage startups
                  to Fortune 500 divisions — and we&apos;re just getting started.
                </p>
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

          <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-6" stagger={0.1}>
            {values.map((v) => {
              const Icon = v.icon
              return (
                <StaggerItem key={v.title}>
                  <GlowCard className="p-4 md:p-8">
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

            <StaggerContainer className="grid gap-4 md:grid-cols-4 md:gap-8" stagger={0.12}>
              {processSteps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="relative rounded-3xl border border-border/50 bg-background/30 p-4 shadow-lg shadow-primary/5 backdrop-blur-xl md:p-6">
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
      {/*  5. Team                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.4em] text-primary/80">Leadership</p>
            <h2 className="mt-2 text-3xl font-semibold">Meet the partners</h2>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Every project gets a partner from strategy, design, and engineering.
            </p>
          </ScrollReveal>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group rounded-3xl border border-border/50 bg-background/20 p-5 text-center backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-primary/10 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="mx-auto h-48 w-48 overflow-hidden rounded-2xl shadow-inner">
                    <Image
                      src={member.headshot}
                      alt={member.name}
                      width={240}
                      height={240}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="glow-line" />

      {/* ------------------------------------------------------------------ */}
      {/*  6. Client Trust Bar                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-center text-sm uppercase tracking-wider text-muted-foreground">
              Trusted by teams building the future
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:mt-10 md:gap-12">
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
      {/*  7. Milestones Timeline                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Milestones</p>
            <h2 className="mt-4 text-3xl font-semibold">Our journey</h2>
          </ScrollReveal>

          <StaggerContainer className="relative mt-14" stagger={0.12}>
            {/* Vertical center line — desktop */}
            <div className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isEven = i % 2 === 0
                return (
                  <StaggerItem key={m.year}>
                    <div className="relative grid md:grid-cols-2 md:gap-12">
                      {/* Year badge */}
                      <div className="absolute left-4 top-0 z-10 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                        <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
                          {m.year}
                        </span>
                      </div>

                      {/* Content — alternating sides on desktop, always right on mobile */}
                      <div
                        className={cn(
                          'pl-10 md:pl-0',
                          isEven ? 'md:col-start-1 md:text-right md:pr-12' : 'md:col-start-2 md:pl-12',
                        )}
                      >
                        <div className="mt-1 rounded-2xl border border-border/50 bg-background/30 p-5 shadow-md shadow-primary/5 backdrop-blur-xl">
                          <p className="text-muted-foreground">{m.description}</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider variant="glow-line" />

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
