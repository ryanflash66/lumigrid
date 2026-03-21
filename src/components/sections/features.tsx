import { Globe, MonitorSmartphone, SunMoon, Blocks, Gauge, Languages } from 'lucide-react'

const features = [
  {
    title: 'Accessibility first',
    description: 'WCAG-conscious structure with clear hierarchy, contrast, and keyboard-friendly layouts.',
    icon: Globe
  },
  {
    title: 'Responsive by default',
    description: 'Layouts that scale from small phones to large screens without extra rework.',
    icon: MonitorSmartphone
  },
  {
    title: 'Light and dark mode',
    description: 'Design tokens tuned for instant theme switching across every section.',
    icon: SunMoon
  },
  {
    title: 'Composable blocks',
    description: 'Drop-in modules you can rearrange quickly without breaking the system.',
    icon: Blocks
  },
  {
    title: 'Performance tuned',
    description: 'Fast-loading layouts designed around Core Web Vitals and conversion journeys.',
    icon: Gauge
  },
  {
    title: 'Localization ready',
    description: 'Structured content that adapts cleanly to multiple languages and regions.',
    icon: Languages
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background px-6 py-28 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Everything you need.
          <br />
          Nothing you <em className="font-serif text-primary">don&apos;t</em>.
        </h2>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div key={feature.title} className="flex flex-col gap-3 text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/40">
                  <Icon className="h-5 w-5 text-foreground/70" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-foreground/85">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
