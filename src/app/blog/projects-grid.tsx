'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { GlowCard } from '@/components/ui/glow-card'
import { AnimatedNumber } from '@/components/ui/animated-number'
import type { Project } from '@/data/projects'

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 24 }

function IndustryFilter({
  industries,
  active,
  onChange
}: {
  industries: string[]
  active: string
  onChange: (v: string) => void
}) {
  const options = ['All', ...industries]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {options.map((label) => (
        <button
          key={label}
          onClick={() => onChange(label)}
          className="relative shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
        >
          {active === label && (
            <motion.span
              layoutId="filter-indicator"
              className="absolute inset-0 rounded-full bg-primary/10 border border-primary/30"
              transition={springTransition}
            />
          )}
          <span
            className={
              active === label ? 'relative text-primary' : 'relative text-muted-foreground hover:text-foreground'
            }
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion()

  return (
    <ScrollReveal variant="fade-up">
      <GlowCard className="overflow-hidden rounded-[28px] border border-border/70 bg-background">
        <Link href={`/blog/${project.slug}`} className="group block">
          <div className="overflow-hidden">
            <motion.div
              whileHover={prefersReduced ? undefined : { scale: 1.03 }}
              transition={springTransition}
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                width={1200}
                height={675}
                className="aspect-video w-full object-cover"
              />
            </motion.div>
          </div>
          <div className="space-y-4 p-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {project.client}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {project.industry}
              </span>
              <span className="text-xs text-muted-foreground">&bull;</span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {project.serviceType}
              </span>
            </div>
            <h2 className="text-balance text-3xl font-semibold transition-colors group-hover:text-primary md:text-4xl">
              {project.title}
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">{project.excerpt}</p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {project.results.map((r) => (
                <div key={r.metric} className="space-y-1">
                  <p className="text-2xl font-semibold text-primary md:text-3xl">
                    <AnimatedNumber value={r.value} />
                  </p>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </GlowCard>
    </ScrollReveal>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.article
      layout
      whileHover={prefersReduced ? undefined : { y: -4 }}
      transition={springTransition}
      className="group overflow-hidden rounded-[28px] border border-border/70 bg-background transition-shadow duration-300 hover:shadow-xl hover:border-border/90"
    >
      <Link href={`/blog/${project.slug}`} className="block h-full">
        <div className="overflow-hidden">
          <motion.div
            whileHover={prefersReduced ? undefined : { scale: 1.05 }}
            transition={springTransition}
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              width={900}
              height={600}
              className="h-64 w-full object-cover"
            />
          </motion.div>
        </div>
        <div className="space-y-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {project.industry}
            </span>
            <span className="rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground">
              {project.serviceType}
            </span>
          </div>
          <h2 className="text-2xl font-semibold transition-colors group-hover:text-primary">
            {project.title}
          </h2>
          <p className="text-sm text-muted-foreground">{project.excerpt}</p>
          {project.results[0] && (
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-lg font-semibold text-primary">{project.results[0].value}</span>
              <span className="text-xs text-muted-foreground">{project.results[0].description}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

/* [OWNER TO REPLACE — update categories once real projects are added] */
const serviceCategories = ['Workflow Automation', 'CRM Integration', 'Lead Generation', 'Web Development']

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const featured = projects.find((p) => p.featured)
  const filteredProjects = useMemo(() => {
    const nonFeatured = projects.filter((p) => !p.featured)
    if (activeFilter === 'All') return nonFeatured
    return nonFeatured.filter((p) => p.industry === activeFilter)
  }, [projects, activeFilter])

  return (
    <main className="bg-background px-6 py-24">
      <section className="mx-auto max-w-5xl text-center">
        <ScrollReveal variant="fade-up">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Projects Showcase</p>
        </ScrollReveal>
        <ScrollReveal variant="clip-reveal">
          <h1 className="mt-2 text-balance text-4xl font-semibold md:text-6xl">
            Work that moves the needle.
          </h1>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.15}>
          <p className="mt-4 text-lg text-muted-foreground">
            AI automation case studies from the Lumigrid studio. Strategy, implementation, and
            optimization for teams chasing ambitious outcomes.
          </p>
        </ScrollReveal>
      </section>

      {featured && (
        <div className="mx-auto mt-12 max-w-6xl">
          <FeaturedProject project={featured} />
        </div>
      )}

      <div className="mx-auto mt-12 max-w-6xl">
        <ScrollReveal variant="fade-up">
          <IndustryFilter
            industries={serviceCategories}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </ScrollReveal>

        {projects.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-muted/20 px-8 py-20 text-center">
            <p className="text-lg font-medium text-foreground">
              Our first case studies are on the way.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon to see real results from our AI automation projects.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <StaggerContainer
                stagger={0.1}
                className="mt-8 grid gap-8 md:grid-cols-2"
              >
                {filteredProjects.map((project) => (
                  <StaggerItem key={project.slug} variant="fade-up">
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  )
}
