import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the Lumigrid AI team and learn how we build custom AI automations for businesses.',
  openGraph: {
    title: 'About Lumigrid AI',
    description: 'Meet the team behind Lumigrid AI and our approach to AI automation.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
