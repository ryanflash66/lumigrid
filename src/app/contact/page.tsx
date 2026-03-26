import Link from 'next/link'
import { Mail } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'
import {
  ResponseBadge,
  ProcessPreview,
  CalendarCallout,
  TrustBar,
} from './contact-client-sections'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@lumigrid.ai',
    href: 'mailto:hello@lumigrid.ai'
  },
]

export const metadata = {
  title: 'Contact',
  description: 'Reach out to discuss your AI automation needs with Lumigrid AI.',
  openGraph: {
    title: 'Contact Lumigrid AI',
    description: 'Reach out to discuss your AI automation needs.',
  },
}

type ContactPageProps = {
  searchParams?: {
    plan?: string
  }
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const selectedPlan = searchParams?.plan ? decodeURIComponent(searchParams.plan) : undefined

  return (
    <main className="px-6 py-16">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
        {/* ---- Left Column ---- */}
        <div className="space-y-6">
          {/* Hero */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">Contact</p>
            <h1 className="text-balance text-4xl font-semibold md:text-5xl">
              Let&apos;s build something remarkable.
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you have a detailed brief or just a napkin sketch, we&apos;ll help you figure
              out the path to launch.
            </p>
            <ResponseBadge />
          </div>

          {/* Contact Info Cards */}
          <div className="grid gap-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="group flex items-center gap-4 rounded-3xl border border-border/50 bg-background/30 backdrop-blur-xl p-4 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 transition-colors group-hover:bg-primary flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <Link href={item.href} className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                      {item.value}
                    </Link>
                  ) : (
                    <p className="text-lg font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* What happens next? */}
          <ProcessPreview />

          {/* Calendar Booking Callout */}
          <CalendarCallout />
        </div>

        {/* ---- Right Column ---- */}
        <div className="space-y-6">
          <div className="rounded-[32px] border border-border/50 bg-background/40 backdrop-blur-2xl p-8 shadow-2xl shadow-primary/10">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you within two business days.
            </p>
            {selectedPlan && (
              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
                <p className="font-semibold tracking-wide uppercase text-xs">Selected plan</p>
                <p className="mt-1 text-base font-medium text-primary">{selectedPlan}</p>
                <p className="text-primary/80">We&apos;ll prefill your message so you can skip retyping details.</p>
              </div>
            )}
            <div className="mt-8">
              <ContactForm prefillPlan={selectedPlan} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Trust Bar ---- */}
      <TrustBar />
    </main>
  )
}
