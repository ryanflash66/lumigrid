import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none fixed -left-32 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-tl from-accent/10 to-secondary/5 blur-3xl" />
      
      <div className="relative z-10 space-y-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">404 Error</p>
        <h1 className="font-serif text-5xl text-foreground md:text-7xl">
          Page not <span className="italic text-primary">found</span>
        </h1>
        <p className="max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
      </div>
      
      <Link
        href="/"
        className="group relative z-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to Home
      </Link>
    </main>
  )
}

