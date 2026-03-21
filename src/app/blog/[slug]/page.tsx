import Image from 'next/image'
import { notFound } from 'next/navigation'
import { posts } from '@/data/posts'
import { ReadingProgress } from '@/components/ui/reading-progress'

type BlogPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.heroImage]
    }
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)
  if (!post) notFound()

  return (
    <>
      <ReadingProgress />
      <article className="bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">{post.category}</p>
          <h1 className="text-balance text-4xl font-semibold md:text-6xl">{post.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="rounded-full" />
            <span>{post.author.name}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
        <Image
          src={post.heroImage}
          alt={post.title}
          width={1200}
          height={700}
          className="h-[420px] w-full rounded-[32px] object-cover"
        />
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {post.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index}>{block.value as string}</p>
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={index} className="border-l-4 border-primary pl-4 text-lg italic">
                  {block.value as string}
                </blockquote>
              )
            }
            if (block.type === 'list') {
              return (
                <ul key={index}>
                  {(block.value as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            }
            return null
          })}
        </div>
      </div>
    </article>
    </>
  )
}

