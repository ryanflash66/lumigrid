import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Sign in',
  description: 'Access the Lumigrid client workspace.'
}

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
      <div className="w-full max-w-md space-y-6 rounded-[32px] border border-border/60 p-8 shadow-lg shadow-primary/10">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/80">Client access</p>
          <h1 className="text-3xl font-semibold">Sign in to Lumigrid</h1>
          <p className="text-sm text-muted-foreground">Use the email address you received an invitation to.</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email address</label>
            <input
              type="email"
              required
              className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
              placeholder="you@company.com"
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
          <div className="text-right">
            <Link href="/contact" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          New client?{' '}
          <Link href="/(auth)/signup" className="text-primary hover:underline">
            Request access
          </Link>
        </p>
      </div>
    </main>
  )
}

