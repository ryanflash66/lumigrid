import Image from 'next/image'
import Link from 'next/link'
import { posts } from '@/data/posts'

export const metadata = {
  title: 'Insights',
  description: 'Lumigrid case studies, performance notes, and design system dispatches.'
}

export default function BlogPage() {
  return (
    <main className="bg-background px-6 py-24">
      <section className="mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Insights</p>
        <h1 className="mt-2 text-balance text-4xl font-semibold md:text-6xl">Ideas from the Lumigrid studio.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Behind-the-scenes breakdowns of shader experiments, team workflows, and launch playbooks.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="group overflow-hidden rounded-[28px] border border-border/70 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-border/90">
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  width={900}
                  height={600}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-2xl font-semibold transition-colors group-hover:text-primary">{post.title}</h2>
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
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

