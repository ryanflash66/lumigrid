import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function ContactStrip() {
  return (
    <section id="contact" className="relative overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[70%] rounded-full bg-blue-500/20 blur-[140px]" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">Start building</h2>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Launch your next site with a system that keeps the experience crisp, fast, and ready to scale.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg transition hover:-translate-y-px hover:shadow-xl"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-md border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/40"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
