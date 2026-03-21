import Image from 'next/image'
import { SplitCTASection } from '@/components/sections/cta-variations'
import { AnimatedNumber } from '@/components/ui/animated-number'

const stats = [
  { label: 'Websites launched', value: '120+' },
  { label: 'Avg. Lighthouse Score', value: '92' },
  { label: 'Client retention', value: '94%' }
]

const values = [
  {
    title: 'Strategy first',
    description:
      'Every engagement starts with a discovery sprint that aligns stakeholders, analytics, and experience KPIs.'
  },
  {
    title: 'Craft and velocity',
    description: 'We pair design systems with engineering automation so polish never slows the delivery cadence.'
  },
  {
    title: 'Outcomes you can measure',
      description: 'Performance budgets, A/B testing capabilities, and post-launch QA are part of every scope.'
  }
]

const team = [
  { name: 'Amelia Grant', role: 'Partner, Experience', headshot: '/assets/images/team/team-01.png' },
  { name: 'Kai Montgomery', role: 'Partner, Technology', headshot: '/assets/images/team/team-02.png' },
  { name: 'Priya Raman', role: 'Principal UX Writer', headshot: '/assets/images/team/team-03.png' },
  { name: 'David Chen', role: 'Lead Frontend Engineer', headshot: '/assets/images/team/team-04.png' }
]

export const metadata = {
  title: 'About',
  description: 'Meet the Lumigrid team and learn how we combine research, design, and engineering to ship fast.'
}

export default function AboutPage() {
  return (
    <main className="space-y-24 px-6 py-24">
      <section className="mx-auto max-w-5xl space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">About Lumigrid</p>
        <h1 className="text-balance text-4xl font-semibold md:text-6xl">
          We build digital experiences for teams chasing ambitious impact.
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Designers, engineers, and performance specialists working as one distributed studio. We blend
          strategy-heavy discovery with production-ready delivery so you can relaunch in weeks rather than quarters.
        </p>
        <div className="grid gap-6 pt-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-border/50 bg-background/30 backdrop-blur-xl shadow-xl shadow-primary/5 px-6 py-5 text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">
                <AnimatedNumber value={stat.value} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[32px] border border-border/50 bg-background/40 backdrop-blur-2xl shadow-2xl p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Our story</p>
          <h2 className="text-3xl font-semibold">Born from collaborative workflows</h2>
          <p className="text-muted-foreground">
            Lumigrid started as a playbook for coordinating specialized teams—content, design, development, QA—in a
            single workflow. Today that philosophy helps teams launch faster: clear ownership, transparent documentation, and
            constant performance checkpoints.
          </p>
          <div className="grid gap-6 pt-2 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border/70 p-4">
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
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
      </section>

      <section className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">Leadership</p>
          <h2 className="mt-2 text-3xl font-semibold">Meet the partners</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Every project gets a partner from strategy, design, and engineering. It keeps decisions lightweight and
            ensures we never hand off context.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group rounded-3xl border border-border/50 bg-background/20 backdrop-blur-lg p-5 text-center transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-primary/10 hover:shadow-2xl hover:shadow-primary/20">
              <div className="mx-auto h-48 w-48 overflow-hidden rounded-2xl shadow-inner">
                <Image
                  src={member.headshot}
                  alt={member.name}
                  width={240}
                  height={240}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-primary">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <SplitCTASection />
    </main>
  )
}
