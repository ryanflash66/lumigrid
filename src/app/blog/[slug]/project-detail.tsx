'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { AnimatedNumber } from '@/components/ui/animated-number'
import type { Project } from '@/data/projects'

export function ProjectDetail({
  project,
  prevProject,
  nextProject
}: {
  project: Project
  prevProject: { slug: string; title: string } | null
  nextProject: { slug: string; title: string } | null
}) {
  return (
    <>
      {/* Challenge / Solution / Results */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <ScrollReveal variant="fade-up">
          <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <h3 className="text-sm font-semibold uppercase tracking-wide">Challenge</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
                />
              </svg>
              <h3 className="text-sm font-semibold uppercase tracking-wide">Solution</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="rounded-2xl border border-border/50 bg-background p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
              <h3 className="text-sm font-semibold uppercase tracking-wide">Results</h3>
            </div>
            {project.results.map((r) => (
              <div key={r.metric} className="space-y-0.5">
                <p className="text-2xl font-semibold text-primary">
                  <AnimatedNumber value={r.value} />
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.metric} &mdash; {r.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Content blocks */}
      <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
        {project.content.map((block, i) => {
          if (block.type === 'heading') {
            return (
              <ScrollReveal key={i} variant="fade-up">
                <h2 className="text-2xl font-semibold">{block.value as string}</h2>
              </ScrollReveal>
            )
          }
          if (block.type === 'paragraph') {
            return (
              <ScrollReveal key={i} variant="fade-up">
                <p>{block.value as string}</p>
              </ScrollReveal>
            )
          }
          if (block.type === 'quote') {
            return (
              <ScrollReveal key={i} variant="fade-up">
                <blockquote className="border-l-4 border-primary pl-4 text-lg italic">
                  {block.value as string}
                </blockquote>
              </ScrollReveal>
            )
          }
          if (block.type === 'list') {
            return (
              <ScrollReveal key={i} variant="fade-up">
                <ul>
                  {(block.value as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ScrollReveal>
            )
          }
          return null
        })}
      </div>

      {/* Testimonial */}
      {project.testimonial && (
        <ScrollReveal variant="fade-up">
          <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <blockquote className="text-lg italic leading-relaxed text-foreground">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src={project.testimonial.avatar}
                alt={project.testimonial.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{project.testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{project.testimonial.title}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Services used */}
      <ScrollReveal variant="fade-up">
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Services
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Previous / Next navigation */}
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {prevProject ? (
          <Link
            href={`/blog/${prevProject.slug}`}
            className="group rounded-2xl border border-border/50 p-6 transition-colors hover:border-primary/30"
          >
            <p className="text-xs text-muted-foreground">&larr; Previous</p>
            <p className="mt-1 font-semibold transition-colors group-hover:text-primary">
              {prevProject.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/blog/${nextProject.slug}`}
            className="group rounded-2xl border border-border/50 p-6 text-right transition-colors hover:border-primary/30"
          >
            <p className="text-xs text-muted-foreground">Next &rarr;</p>
            <p className="mt-1 font-semibold transition-colors group-hover:text-primary">
              {nextProject.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* CTA */}
      <ScrollReveal variant="fade-up">
        <div className="mt-16 rounded-2xl border border-border/50 bg-background p-8 text-center">
          <h3 className="text-2xl font-semibold">Have a similar challenge?</h3>
          <p className="mt-2 text-muted-foreground">
            Let&apos;s talk about what Lumigrid can build for you.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start a conversation
          </Link>
        </div>
      </ScrollReveal>
    </>
  )
}
