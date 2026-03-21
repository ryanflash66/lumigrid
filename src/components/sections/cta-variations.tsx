import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function GradientCTASection() {
  return (
    <section className="px-6 py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[40px] border border-primary/20 bg-gradient-to-br from-primary via-primary/90 to-accent p-10 text-primary-foreground dark:border-primary/30">
        <div className="relative z-10 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            Next launch window
          </span>
          <h2 className="font-serif text-balance text-3xl md:text-4xl lg:text-5xl">
            Ready when you are. Launch in{' '}
            <span className="italic">six weeks</span> or less.
          </h2>
          <p className="text-primary-foreground/85 md:text-lg max-w-2xl">
            We reserve limited slots each quarter for marketing site rebuilds. Book a call and we&apos;ll hold the next available project
            for your team.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-base font-medium text-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              Book a Call
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            >
              See Pricing
            </Link>
          </div>
        </div>
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-16 left-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      </div>
    </section>
  )
}

export function SplitCTASection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[36px] border border-border bg-card shadow-lg md:grid-cols-2">
        <div className="space-y-5 p-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Partner with us</p>
          <h2 className="font-serif text-3xl text-foreground">
            From audit to launch, we operate as an{' '}
            <span className="italic text-primary">integrated team</span>.
          </h2>
          <p className="text-muted-foreground">
            Need help auditing an existing build? Want to work with your product team for ongoing projects? Tell us how you like to work and we&apos;ll integrate seamlessly.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-border bg-background px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted"
            >
              Meet the team
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px]">
          <Image
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&q=80&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}

