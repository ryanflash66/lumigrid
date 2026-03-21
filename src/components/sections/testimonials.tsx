'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'

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

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-8 text-center">
        <ScrollReveal variant="clip-reveal">
          <h2 className="text-balance text-4xl font-semibold md:text-5xl">
            Loved by designers and
            <br />
            developers across the planet
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.1}>
          <p className="text-muted-foreground">Here&apos;s what teams say about building with Lumigrid.</p>
        </ScrollReveal>
      </div>
      <StaggerContainer stagger={0.15} className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.name} variant="fade-up">
            <div className="group flex h-full flex-col gap-6 rounded-[20px] border border-border/70 bg-linear-to-b from-muted/40 to-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl">
              <Quote className="h-6 w-6 text-primary/40 transition-colors group-hover:text-primary" />
              <p className="text-sm text-muted-foreground">{testimonial.quote}</p>
              <div className="mt-auto flex items-center gap-4 pt-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full border border-border/60"
                />
                <div className="text-left">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
