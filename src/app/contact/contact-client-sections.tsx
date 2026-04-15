'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { CalendlyButton } from '@/components/ui/calendly-button'

/* ------------------------------------------------------------------ */
/*  Animated Response Badge                                           */
/* ------------------------------------------------------------------ */
export function ResponseBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary"
    >
      <Clock className="h-3.5 w-3.5" />
      We typically respond within 24 hours
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  "What happens next?" Process Preview                              */
/* ------------------------------------------------------------------ */
const steps = [
  { number: '1', title: 'We review your brief', timing: 'Within 24 hours' },
  { number: '2', title: 'Discovery call to align on scope', timing: '30 minutes, this week' },
  { number: '3', title: 'You receive a proposal and timeline', timing: 'Within 48 hours of our call' },
]

export function ProcessPreview() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        What happens next?
      </h3>
      <StaggerContainer className="grid gap-3 md:grid-cols-3">
        {steps.map((step) => (
          <StaggerItem key={step.number}>
            <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/30 p-3 md:flex-col md:items-center md:text-center">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step.number}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.timing}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Calendar Booking Callout                                          */
/* ------------------------------------------------------------------ */
export function CalendarCallout() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  if (!calendlyUrl) return null

  return (
    <div className="rounded-xl border border-border/50 bg-card/60 p-6 space-y-3">
      <p className="text-sm font-semibold text-foreground">Prefer to skip the form?</p>
      <p className="text-sm text-muted-foreground">
        Book a 30-minute discovery call directly.
      </p>
      <CalendlyButton url={calendlyUrl} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Trust Bar — Brand Logos                                           */
/* ------------------------------------------------------------------ */
const brands = [
  { name: 'Ayroui', light: '/assets/images/brands/ayroui.svg', dark: '/assets/images/brands/ayroui-white.svg' },
  { name: 'Graygrids', light: '/assets/images/brands/graygrids.svg', dark: '/assets/images/brands/graygrids-white.svg' },
  { name: 'Lineicons', light: '/assets/images/brands/lineicons.svg', dark: '/assets/images/brands/lineicons-white.svg' },
  { name: 'Tailgrids', light: '/assets/images/brands/tailgrids.svg', dark: '/assets/images/brands/tailgrids-white.svg' },
  { name: 'UIdeck', light: '/assets/images/brands/uideck.svg', dark: '/assets/images/brands/uideck-white.svg' },
]

export function TrustBar() {
  return (
    <ScrollReveal variant="fade-up">
      <div className="mx-auto max-w-6xl pt-12 text-center">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          Trusted by teams building the future
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center">
              <Image
                src={brand.light}
                alt={brand.name}
                width={120}
                height={32}
                className="block h-8 w-auto object-contain opacity-70 dark:hidden"
              />
              <Image
                src={brand.dark}
                alt={brand.name}
                width={120}
                height={32}
                className="hidden h-8 w-auto object-contain opacity-70 dark:block"
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
