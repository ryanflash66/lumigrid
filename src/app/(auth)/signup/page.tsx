import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Request access',
  description: 'Create a Lumigrid workspace account for your team.'
}

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
      <div className="w-full max-w-xl space-y-6 rounded-[32px] border border-border/60 p-8 shadow-lg shadow-primary/10">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">Start collaborating</p>
          <h1 className="text-3xl font-semibold">Create your client workspace</h1>
          <p className="text-sm text-muted-foreground">We’ll verify your organization before enabling access.</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Full name</label>
            <input
              type="text"
              required
              className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
              placeholder="Jordan Michaels"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Work email</label>
            <input
              type="email"
              required
              className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
              placeholder="team@company.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Company</label>
            <input
              type="text"
              required
              className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
              placeholder="Lumigrid"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
            />
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already invited?{' '}
          <Link href="/(auth)/signin" className="text-primary hover:underline">
            Sign in instead
          </Link>
        </p>
      </div>
    </main>
  )
}

