'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    quote:
      'Lumigrid rebuilt our entire marketing site in six weeks. The shader hero alone lifted conversions by 28% because it finally visualized our product.',
    name: 'Mara Patel',
    title: 'Executive Director, FutureAid',
    avatar: '/assets/images/testimonials/author-01.jpg'
  },
  {
    quote:
      'They operated like an integrated product team—strategy, design, frontend, and QA in one Slack channel. Every milestone launched on time.',
    name: 'Rafael Gomez',
    title: 'VP of Digital, Northwind Labs',
    avatar: '/assets/images/testimonials/author-02.jpg'
  },
  {
    quote:
      "Performance went from 58 to 96 on Lighthouse the same day we launched. The team\u2019s obsession with Core Web Vitals saved us weeks of tuning.",
    name: 'Leah McConnell',
    title: 'Growth Lead, Luminous Health',
    avatar: '/assets/images/testimonials/author-03.jpg'
  }
]

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVars: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

function TestimonialCard({
  testimonial,
  featured = false
}: {
  testimonial: (typeof testimonials)[number]
  featured?: boolean
}) {
  return (
    <motion.div
      variants={itemVars}
      className={cn(
        'group relative flex flex-col gap-6 overflow-hidden rounded-[20px] border border-border/70 transition-all duration-300',
        'hover:-translate-y-1 hover:border-primary/30 hover:bg-muted/60 hover:shadow-xl',
        featured
          ? 'bg-gradient-to-br from-primary/[0.04] via-muted/50 to-background p-8 md:p-10'
          : 'bg-gradient-to-b from-muted/40 to-background p-6'
      )}
    >
      {/* Oversized decorative quotation mark */}
      <Quote
        className={cn(
          'pointer-events-none absolute right-4 top-4 text-primary transition-all duration-500',
          'opacity-[0.06] group-hover:scale-110 group-hover:opacity-[0.15]',
          featured ? 'h-20 w-20' : 'h-16 w-16'
        )}
        strokeWidth={1}
      />

      {/* Inline quote icon */}
      <Quote
        className={cn(
          'shrink-0 text-primary/40 transition-colors duration-300 group-hover:text-primary',
          featured ? 'h-7 w-7' : 'h-6 w-6'
        )}
      />

      <p
        className={cn(
          'text-muted-foreground',
          featured ? 'text-xl md:text-2xl' : 'text-sm'
        )}
      >
        {testimonial.quote}
      </p>

      <div className="mt-auto flex items-center gap-4 pt-4">
        <div className="relative">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={featured ? 64 : 56}
            height={featured ? 64 : 56}
            className={cn(
              'rounded-full border border-border/60 transition-all duration-300',
              'group-hover:ring-2 group-hover:ring-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20',
              featured ? 'h-16 w-16' : 'h-14 w-14'
            )}
          />
        </div>
        <div className="text-left">
          <p className={cn('font-semibold', featured && 'text-lg')}>
            {testimonial.name}
          </p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials

  return (
    <section id="testimonials" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-8 text-center">
        <h2 className="text-balance text-4xl font-semibold md:text-5xl">
          Loved by designers and
          <br />
          developers across the planet
        </h2>
        <p className="text-muted-foreground">Here&apos;s what teams say about building with Lumigrid.</p>
      </div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto mt-12 max-w-6xl space-y-8"
      >
        {/* Featured testimonial - full width */}
        <TestimonialCard testimonial={featured} featured />

        {/* Remaining testimonials in a grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {rest.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
