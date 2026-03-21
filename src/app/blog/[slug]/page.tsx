import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { ProjectDetail } from './project-detail'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} | Lumigrid`,
    description: project.excerpt,
    openGraph: {
      images: [project.heroImage]
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  return (
    <>
      <ReadingProgress />
      <article className="bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; All Projects
          </Link>

          {/* Header */}
          <div className="mt-6 space-y-4">
            <p className="text-sm font-medium text-primary">{project.client}</p>
            <h1 className="text-balance text-4xl font-semibold md:text-6xl">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{project.duration}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
              <span>&bull;</span>
              <span>{project.industry}</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="mt-8 overflow-hidden rounded-2xl">
            <Image
              src={project.heroImage}
              alt={project.title}
              width={1200}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>

          {/* Interactive sections */}
          <ProjectDetail
            project={project}
            prevProject={prevProject ? { slug: prevProject.slug, title: prevProject.title } : null}
            nextProject={nextProject ? { slug: nextProject.slug, title: nextProject.title } : null}
          />
        </div>
      </article>
    </>
  )
}
