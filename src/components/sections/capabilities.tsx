import { CheckCircle2 } from 'lucide-react'

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

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="bg-background px-6 py-28 md:py-32">
      <div className="mx-auto max-w-6xl space-y-4">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Build a better website, <em className="font-serif text-primary">faster</em>.
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          A modular system that keeps strategy, design, and delivery aligned, with enough flexibility to tailor every
          section.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="flex h-full flex-col justify-between rounded-[24px] border border-border/70 bg-card/60 p-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">100+ sections and components</h3>
            <p className="text-sm text-muted-foreground">
              Everything you need to ship an elegant landing page without reinventing the wheel.
            </p>
          </div>
          <div className="mt-6 rounded-[18px] border border-border/60 bg-linear-to-br from-muted/70 via-background to-muted/20 p-6">
            <div className="grid gap-3 text-xs text-foreground/70">
              <span className="rounded-full border border-border/60 bg-background px-3 py-1">Hero layouts</span>
              <span className="rounded-full border border-border/60 bg-background px-3 py-1">Social proof</span>
              <span className="rounded-full border border-border/60 bg-background px-3 py-1">CTA systems</span>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between rounded-[24px] border border-border/70 bg-card/60 p-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-foreground">You&apos;re in control</h3>
            <p className="text-sm text-muted-foreground">
              Flexible components that drop into any tech stack, with clean structure for your team to extend.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            {capabilities.slice(0, 3).map((item) => (
              <span key={item.title} className="rounded-full border border-border/60 bg-background px-3 py-1">
                {item.title}
              </span>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col rounded-[24px] border border-border/70 bg-card/60 p-6">
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
        </div>

        <div className="flex h-full flex-col rounded-[24px] border border-border/70 bg-card/60 p-6">
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
        </div>
      </div>
    </section>
  )
}

