import { projects } from '@/data/projects'
import { ProjectsGrid } from './projects-grid'
import { BreadcrumbJsonLd } from '@/lib/structured-data'

export const metadata = {
  title: 'Projects',
  description:
    'Case studies from the Lumigrid studio. Strategy, design, and engineering for teams chasing ambitious outcomes.',
  openGraph: {
    title: 'Projects — Lumigrid AI',
    description:
      'Case studies from the Lumigrid studio. Strategy, design, and engineering for teams chasing ambitious outcomes.',
  },
}

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/blog' }]} />
      <ProjectsGrid projects={projects} />
    </>
  )
}
