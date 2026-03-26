export type Project = {
  slug: string
  title: string
  client: string
  industry: string
  serviceType: string
  excerpt: string
  heroImage: string
  challenge: string
  solution: string
  results: Array<{ metric: string; value: string; description: string }>
  testimonial?: { quote: string; name: string; title: string; avatar: string }
  services: string[]
  duration: string
  year: string
  featured: boolean
  content: Array<{
    type: 'paragraph' | 'heading' | 'quote' | 'stats-row' | 'list'
    value: string | string[]
  }>
}

/* All placeholder case studies have been removed. Add real projects here. */
export const projects: Project[] = []
