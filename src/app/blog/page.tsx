import { posts } from '@/data/posts'
import { ProjectsGrid } from './projects-grid'

export const metadata = {
  title: 'Projects Showcase',
  description: 'Lumigrid case studies, performance notes, and design system dispatches.'
}

export default function BlogPage() {
  return <ProjectsGrid posts={posts} />
}
