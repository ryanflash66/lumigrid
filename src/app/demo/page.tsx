import type { Metadata } from 'next'
import Link from 'next/link'
import { LeadQualifierDemo } from './lead-qualifier-demo'

export const metadata: Metadata = {
  title: 'Live Demo — Lead Qualifier',
  description:
    'See a Lumigrid AI workflow in action. Paste a sample inbound message and get back structured lead data — intent, urgency, budget signal, and a suggested next step.',
  openGraph: {
    title: 'Lumigrid AI — Live Lead Qualifier Demo',
    description:
      'A working AI workflow that turns raw inbound messages into structured lead data.',
  },
}

export default function DemoPage() {
  return (
    <main className="px-6 py-24 md:py-28">
      <section className="mx-auto max-w-3xl space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Live Demo</p>
        <h1 className="text-balance text-4xl font-semibold md:text-5xl">
          Lead Qualifier
        </h1>
        <p className="text-lg text-muted-foreground">
          Paste a sample message a prospect might send through your contact form. Our
          workflow reads it, classifies the intent and urgency, looks for budget
          signals, and tells your team what to do next — all in one round-trip.
        </p>
        <div className="rounded-2xl border border-border/50 bg-background/40 p-5 text-sm text-muted-foreground backdrop-blur-xl">
          <p className="font-medium text-foreground">How it works</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Inbound message comes in (web form, email, chat).</li>
            <li>The workflow asks Claude to triage it against your rules.</li>
            <li>Structured fields land in your CRM, not a free-text blob.</li>
          </ol>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-3xl">
        <LeadQualifierDemo />
      </section>

      <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-primary/40 bg-primary/10 p-8 text-center backdrop-blur-xl md:p-10">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Want one of these wired into your business?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          We design and ship custom AI workflows for SMBs — usually in under two
          weeks. Book a free call and we&apos;ll scope the right one for you.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/contact?plan=Lead%20Qualifier"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40"
          >
            Book a call to build one for your business
          </Link>
        </div>
      </section>
    </main>
  )
}
