type Window = { count: number; resetAt: number }

const ipBuckets = new Map<string, Window>()
let dailyBucket: Window = { count: 0, resetAt: 0 }

const PER_IP_LIMIT = 5
const PER_IP_WINDOW_MS = 10 * 60 * 1000
const DAILY_LIMIT = 200
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000

export type RateLimitResult =
  | { ok: true }
  | { ok: false; reason: 'per_ip' | 'global'; retryAfterSeconds: number }

function freshWindow(now: number, durationMs: number): Window {
  return { count: 0, resetAt: now + durationMs }
}

export function checkDemoRateLimit(ip: string): RateLimitResult {
  const now = Date.now()

  if (now > dailyBucket.resetAt) {
    dailyBucket = freshWindow(now, DAILY_WINDOW_MS)
  }
  if (dailyBucket.count >= DAILY_LIMIT) {
    return {
      ok: false,
      reason: 'global',
      retryAfterSeconds: Math.max(1, Math.ceil((dailyBucket.resetAt - now) / 1000)),
    }
  }

  const existing = ipBuckets.get(ip)
  const window = !existing || now > existing.resetAt
    ? freshWindow(now, PER_IP_WINDOW_MS)
    : existing

  if (window.count >= PER_IP_LIMIT) {
    return {
      ok: false,
      reason: 'per_ip',
      retryAfterSeconds: Math.max(1, Math.ceil((window.resetAt - now) / 1000)),
    }
  }

  window.count += 1
  ipBuckets.set(ip, window)
  dailyBucket.count += 1

  return { ok: true }
}

export function resolveClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const real = headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}
