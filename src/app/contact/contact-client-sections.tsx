'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

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
  return (
    <div className="rounded-xl border border-border/50 bg-card/60 p-6 space-y-3">
      <p className="text-sm font-semibold text-foreground">Prefer to skip the form?</p>
      <p className="text-sm text-muted-foreground">
        Book a 30-minute discovery call directly.
      </p>
      {/* [OWNER TO REPLACE — supply real Calendly or booking link] */}
      <Link
        href="[OWNER_CALENDLY_LINK]"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <Calendar className="h-4 w-4" />
        Schedule a Call &rarr;
      </Link>
    </div>
  )
}
