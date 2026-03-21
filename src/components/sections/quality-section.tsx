'use client'

import { Activity, Zap, Layers, Users } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

const metrics = [
  { id: 1, label: 'Guaranteed Uptime', value: '99.9%', icon: Activity },
  { id: 2, label: 'Avg. Response Time', value: '120ms', icon: Zap },
  { id: 3, label: 'Seamless Integrations', value: '45+', icon: Layers },
  { id: 4, label: 'Daily Active Users', value: '10k+', icon: Users },
]

export function QualitySection() {
  return (
    <section id="quality" className="relative overflow-hidden bg-background px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[80%] rounded-full bg-linear-to-r from-foreground/5 via-blue-500/20 to-foreground/5 blur-[140px]" />
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <ScrollReveal variant="clip-reveal">
          <h2 className="max-w-5xl text-4xl font-semibold text-foreground md:text-6xl">
            Quality you can trust.
            <br />
            And build on.
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.15}>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Every layout is designed with scalability in mind, so your team can keep shipping new pages without starting
            from scratch.
          </p>
        </ScrollReveal>

        {/* Metrics Dashboard Mockup */}
        <ScrollReveal variant="fade-scale" delay={0.2} className="w-full">
          <div className="relative mt-16 flex min-h-[320px] w-full max-w-5xl mx-auto flex-col items-center justify-center overflow-hidden rounded-[28px] border border-border/70 bg-muted/20 p-8 md:p-12 shadow-sm">
            <div className="absolute inset-0 bg-linear-to-br from-foreground/5 via-transparent to-foreground/10" />

            <StaggerContainer stagger={0.1} className="relative z-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {metrics.map((metric) => (
                <StaggerItem key={metric.id} variant="fade-up">
                  <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-background/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] backdrop-blur-md border border-border/50 transition-all hover:-translate-y-1 hover:bg-background/80 hover:border-border/80">
                    <div className="rounded-full bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                      <metric.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col items-center text-center mt-2">
                      <span className="text-3xl font-bold tracking-tight text-foreground">{metric.value}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-2">{metric.label}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background/90 md:h-56 pointer-events-none" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
