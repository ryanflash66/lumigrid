'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import type { BlogPost } from '@/data/posts'

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 20 }

export function ProjectsGrid({ posts }: { posts: BlogPost[] }) {
  const prefersReduced = useReducedMotion()

  return (
    <main className="bg-background px-6 py-24">
      <section className="mx-auto max-w-5xl text-center">
        <ScrollReveal variant="fade-up">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Projects Showcase</p>
        </ScrollReveal>
        <ScrollReveal variant="clip-reveal">
          <h1 className="mt-2 text-balance text-4xl font-semibold md:text-6xl">
            Work from the Lumigrid studio.
          </h1>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.15}>
          <p className="mt-4 text-lg text-muted-foreground">
            Behind-the-scenes breakdowns of shader experiments, team workflows, and launch playbooks.
          </p>
        </ScrollReveal>
      </section>

      <StaggerContainer stagger={0.1} className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <StaggerItem key={post.slug} variant="fade-up">
            <motion.article
              className="group overflow-hidden rounded-[28px] border border-border/70 bg-background transition-shadow duration-300 hover:shadow-xl hover:border-border/90"
              whileHover={prefersReduced ? undefined : { scale: 1.02 }}
              transition={springTransition}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="overflow-hidden">
                  <motion.div
                    whileHover={prefersReduced ? undefined : { scale: 1.05 }}
                    transition={springTransition}
                  >
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      width={900}
                      height={600}
                      className="h-64 w-full object-cover"
                    />
                  </motion.div>
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{post.category}</span>
                    <span>&bull;</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-2xl font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{post.author.name}</span>
                    <span>&bull;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </main>
  )
}
