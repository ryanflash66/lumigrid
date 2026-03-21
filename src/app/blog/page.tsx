import { projects } from '@/data/projects'
import { ProjectsGrid } from './projects-grid'

export const metadata = {
  title: 'Projects | Lumigrid',
  description:
    'Case studies from the Lumigrid studio. Strategy, design, and engineering for teams chasing ambitious outcomes.'
}

export default function BlogPage() {
  return <ProjectsGrid projects={projects} />
}
