'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { NeonButton } from '@/components/ui/neon-button'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { Home, Info, CreditCard, BookOpen, MessageCircle } from 'lucide-react'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: Info },
  { name: 'Pricing', url: '/pricing', icon: CreditCard },
  { name: 'Insights', url: '/blog', icon: BookOpen },
  { name: 'Contact', url: '/contact', icon: MessageCircle }
]

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-40 w-full pointer-events-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 pointer-events-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/images/logo/logo.svg" alt="Lumigrid" width={32} height={32} />
          <span className="text-sm font-semibold tracking-[0.2em] text-foreground">LUMIGRID</span>
        </Link>

        {/* Tubelight Navbar: floating on mobile, inline on desktop */}
        <NavBar 
          items={navItems} 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:bottom-auto" 
        />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/signin" className="hidden text-sm font-medium text-foreground/70 transition hover:text-foreground sm:inline-flex">
            Sign in
          </Link>
          <NeonButton
            asChild
            variant="solid"
            size="sm"
            className="hidden items-center rounded-full sm:inline-flex"
          >
            <Link href="/contact">Get started</Link>
          </NeonButton>
        </div>
      </div>
    </header>
  )
}
