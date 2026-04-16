import { NextResponse } from 'next/server'
import { z } from 'zod'
import { executeWorkflow } from '@/lib/engine/runtime'
import { leadQualifierWorkflow } from '@/lib/engine/workflows/lead-qualifier'
import { checkDemoRateLimit, resolveClientIp } from '@/lib/engine/demo-rate-limit'

export const runtime = 'nodejs'

const MAX_MESSAGE_CHARS = 2000

const requestSchema = z.object({
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(MAX_MESSAGE_CHARS, `Message must be at most ${MAX_MESSAGE_CHARS} characters.`),
})

export async function POST(request: Request) {
  const ip = resolveClientIp(request.headers)
  const limit = checkDemoRateLimit(ip)
  if (!limit.ok) {
    const message =
      limit.reason === 'per_ip'
        ? 'You have hit the demo rate limit. Try again in a few minutes.'
        : 'The public demo has hit its daily quota. Please try again tomorrow or book a call.'
    return NextResponse.json(
      { error: message, retryAfterSeconds: limit.retryAfterSeconds },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      }
    )
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'Demo is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? 'Invalid request.',
      },
      { status: 400 }
    )
  }

  try {
    const run = await executeWorkflow(leadQualifierWorkflow, {
      message: parsed.data.message,
    })

    if (run.status !== 'completed') {
      return NextResponse.json(
        {
          error: 'Workflow failed to complete. Please try a different message.',
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      output: run.output,
      timings: {
        startedAt: run.startedAt,
        completedAt: run.completedAt,
      },
    })
  } catch (err) {
    const detail = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Demo run failed.', detail },
      { status: 500 }
    )
  }
}
