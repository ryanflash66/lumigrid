import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the Lumigrid team and learn how we combine research, design, and engineering to ship fast.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
