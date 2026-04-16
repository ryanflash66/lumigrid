'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LeadOutput = {
  intent?: string
  urgency?: string
  budgetSignal?: string
  estimatedBudgetUsd?: string | null
  summary?: string
  suggestedNextAction?: string
}

type ApiSuccess = {
  output?: LeadOutput
  timings?: { startedAt: string; completedAt: string }
}

type ApiError = {
  error?: string
  retryAfterSeconds?: number
}

const SAMPLES: Array<{ label: string; body: string }> = [
  {
    label: 'Hot inbound',
    body: `Hi — we run a 40-person dental group and need help setting up automated patient intake by end of next month. We've already budgeted around $20k for the first phase. Can we book a call this week?`,
  },
  {
    label: 'Tire kicker',
    body: `Just curious what you guys do. Saw an Instagram ad. Maybe will need something next year, not sure yet.`,
  },
  {
    label: 'Support request',
    body: `My website you built last year is showing a 500 error on the contact form, can someone take a look ASAP please.`,
  },
]

const MAX_CHARS = 2000

export function LeadQualifierDemo() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [output, setOutput] = useState<LeadOutput | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const charCount = message.length
  const tooLong = charCount > MAX_CHARS
  const tooShort = message.trim().length > 0 && message.trim().length < 10
  const canSubmit = !tooLong && !tooShort && message.trim().length >= 10 && status !== 'loading'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setStatus('loading')
    setErrorMsg(null)
    setOutput(null)

    try {
      const res = await fetch('/api/demo/lead-qualifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      })

      const data = (await res.json().catch(() => ({}))) as ApiSuccess & ApiError

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? `Request failed (${res.status}).`)
        return
      }

      if (!data.output) {
        setStatus('error')
        setErrorMsg('The workflow returned no output. Try a different message.')
        return
      }

      setOutput(data.output)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Check your connection and try again.')
    }
  }

  function loadSample(body: string) {
    setMessage(body)
    setStatus('idle')
    setOutput(null)
    setErrorMsg(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Try a sample:
        </span>
        {SAMPLES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => loadSample(sample.body)}
            className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-border/50 bg-background/40 p-5 backdrop-blur-xl md:p-6"
      >
        <label htmlFor="demo-message" className="block text-sm font-medium">
          Inbound message
        </label>
        <textarea
          id="demo-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          maxLength={MAX_CHARS + 200}
          placeholder="Paste a sample inbound message here, or pick one above…"
          className={cn(
            'w-full resize-y rounded-2xl border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40',
            tooLong ? 'border-red-500/60' : 'border-border/60'
          )}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            className={cn(
              'text-xs',
              tooLong ? 'text-red-500' : 'text-muted-foreground'
            )}
            aria-live="polite"
          >
            {charCount} / {MAX_CHARS} characters
            {tooShort && ' • need at least 10 characters'}
          </p>
          <button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              'inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all',
              canSubmit
                ? 'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40'
                : 'opacity-50'
            )}
          >
            {status === 'loading' ? 'Running workflow…' : 'Run workflow'}
          </button>
        </div>
      </form>

      {status === 'error' && errorMsg && (
        <div
          role="alert"
          className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          {errorMsg}
        </div>
      )}

      {status === 'success' && output && <LeadOutputCard output={output} />}
    </div>
  )
}

function LeadOutputCard({ output }: { output: LeadOutput }) {
  const fields: Array<{ label: string; value: string | null | undefined; tone?: string }> = [
    { label: 'Intent', value: output.intent, tone: toneFor(output.intent) },
    { label: 'Urgency', value: output.urgency, tone: toneFor(output.urgency) },
    { label: 'Budget signal', value: output.budgetSignal, tone: toneFor(output.budgetSignal) },
    { label: 'Estimated budget', value: output.estimatedBudgetUsd ?? '—' },
  ]

  return (
    <div className="space-y-5 rounded-3xl border border-primary/40 bg-background/60 p-5 backdrop-blur-xl md:p-6">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Workflow output
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {fields.map((field) => (
          <div
            key={field.label}
            className="rounded-2xl border border-border/40 bg-background/40 p-3"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {field.label}
            </p>
            <p
              className={cn(
                'mt-1 text-sm font-medium capitalize',
                field.tone ?? 'text-foreground'
              )}
            >
              {formatValue(field.value)}
            </p>
          </div>
        ))}
      </div>

      {output.summary && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Summary
          </p>
          <p className="mt-1 text-sm text-foreground">{output.summary}</p>
        </div>
      )}

      {output.suggestedNextAction && (
        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            Suggested next action
          </p>
          <p className="mt-1 text-sm text-foreground">{output.suggestedNextAction}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4">
        <p className="text-xs text-muted-foreground">
          This is the same engine we&apos;d wire into your CRM, helpdesk, or Slack.
        </p>
        <Link
          href="/contact?plan=Lead%20Qualifier"
          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          Get this for my team →
        </Link>
      </div>
    </div>
  )
}

function formatValue(value: string | null | undefined): string {
  if (value == null || value === '') return '—'
  return String(value).replace(/_/g, ' ')
}

function toneFor(value: string | undefined): string {
  switch (value) {
    case 'buying_now':
    case 'high':
    case 'explicit':
      return 'text-emerald-300'
    case 'exploring':
    case 'medium':
    case 'implicit':
      return 'text-amber-300'
    case 'support':
    case 'low':
    case 'none':
      return 'text-sky-300'
    case 'spam':
      return 'text-red-300'
    default:
      return 'text-foreground'
  }
}
