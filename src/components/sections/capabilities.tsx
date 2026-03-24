'use client'

import { CheckCircle2, Zap, Palette, Code2 } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { GlowCard } from '@/components/ui/glow-card'
import { useIsMobile } from '@/hooks/use-mobile'

const capabilities = [
  {
    title: 'Experience strategy',
    description: 'Narrative-driven discovery sprints that turn stakeholder goals into a measurable roadmap.',
    bullets: ['User research', 'Audience mapping', 'Experience blueprints']
  },
  {
    title: 'Design systems',
    description: 'Composable UI libraries that keep marketing pages, dashboards, and microsites on the same rails.',
    bullets: ['Component library', 'Accessibility built-in', 'Reusable UI components']
  },
  {
    title: 'Full-stack delivery',
    description: 'Modern web platforms that scale, with CMS integrations and form handling built-in.',
    bullets: ['Headless CMS ready', 'Automation hooks', 'Performance budgets']
  }
]

const mobileItems = [
  { icon: Zap, title: 'Strategy & Discovery', desc: 'Research-backed roadmaps that align teams' },
  { icon: Palette, title: 'Design Systems', desc: 'Composable UI that scales with your brand' },
  { icon: Code2, title: 'Full-Stack Build', desc: 'Next.js, CMS, integrations — shipped fast' },
]

export function CapabilitiesSection() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <section id="capabilities" className="bg-background px-6 py-10">
        <h2 className="text-2xl font-semibold text-foreground">
          What we do
        </h2>
        <div className="mt-6 space-y-4">
          {mobileItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section id="capabilities" className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-4">
        <ScrollReveal variant="clip-reveal">
          <h2 className="text-balance text-4xl font-semibold text-foreground md:text-5xl">
            Build a better website, faster.
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.1}>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            A modular system that keeps strategy, design, and delivery aligned, with enough flexibility to tailor every
            section.
          </p>
        </ScrollReveal>
      </div>

      <StaggerContainer className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
        <StaggerItem variant="fade-up">
          <GlowCard className="flex h-full flex-col justify-between p-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">100+ sections and components</h3>
              <p className="text-sm text-muted-foreground">
                Everything you need to ship an elegant landing page without reinventing the wheel.
              </p>
            </div>
            <div className="mt-6 rounded-[18px] border border-border/60 bg-linear-to-br from-muted/70 via-background to-muted/20 p-6">
              <div className="flex flex-wrap gap-2 text-xs text-foreground/70">
                <span className="rounded-full border border-border/60 bg-background px-3 py-1">Hero layouts</span>
                <span className="rounded-full border border-border/60 bg-background px-3 py-1">Social proof</span>
                <span className="rounded-full border border-border/60 bg-background px-3 py-1">CTA systems</span>
              </div>
            </div>
          </GlowCard>
        </StaggerItem>

        <StaggerItem variant="fade-up">
          <GlowCard className="flex h-full flex-col justify-between p-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">You&apos;re in control</h3>
              <p className="text-sm text-muted-foreground">
                Flexible components that drop into any tech stack, with clean structure for your team to extend.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {capabilities.slice(0, 3).map((item) => (
                <span key={item.title} className="rounded-full border border-border/60 bg-background px-3 py-1">
                  {item.title}
                </span>
              ))}
            </div>
          </GlowCard>
        </StaggerItem>

        <StaggerItem variant="fade-up">
          <GlowCard className="flex h-full flex-col p-6">
            <h3 className="text-xl font-semibold text-foreground">Performance-first delivery</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Core Web Vitals guidance baked into every layout so your launch stays fast.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {capabilities[2].bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground/60" />
                  {item}
                </li>
              ))}
            </ul>
          </GlowCard>
        </StaggerItem>

        <StaggerItem variant="fade-up">
          <GlowCard className="flex h-full flex-col p-6">
            <h3 className="text-xl font-semibold text-foreground">Design system ready</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Maintain a single visual language across marketing, product, and growth surfaces.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {capabilities[1].bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground/60" />
                  {item}
                </li>
              ))}
            </ul>
          </GlowCard>
        </StaggerItem>
      </StaggerContainer>
    </section>
  )
}
