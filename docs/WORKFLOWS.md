# Workflow Engine — Authoring Guide

This site ships with a small, typed workflow engine that runs deterministic
graphs of AI calls, transforms, conditions, HTTP requests, and structured
outputs. The engine lives under `src/lib/engine` and is exposed both through
authenticated CRUD routes (`/api/workflows`) and through narrow public demo
routes (`/api/demo/*`).

The `/demo` page is the canonical reference implementation — start there if
you want to see a workflow end-to-end.

## TL;DR — add a new workflow in 4 steps

1. Define the workflow as a TypeScript object (see `src/lib/engine/workflows/lead-qualifier.ts`).
2. (Optional) Save it to Supabase by POSTing to `/api/workflows`. Static
   in-repo workflows are fine for showcase / demo routes.
3. Add a public route under `src/app/api/demo/<slug>/route.ts` that wraps
   `executeWorkflow(workflow, input)` and applies rate limiting.
4. Add a UI under `src/app/<slug>/page.tsx` that POSTs the user input to
   that route and renders `output`.

## Anatomy of a Workflow

A `Workflow` is a JSON-shaped object (typed in `src/lib/engine/types.ts`):

```ts
{
  id: string
  name: string
  description: string
  trigger: { type: 'manual' | 'webhook' | 'schedule' }
  variables: Record<string, VariableDefinition>
  steps: WorkflowStep[]
}
```

Each `WorkflowStep` has:

- `id` — unique within the workflow, used in `dependsOn`.
- `name` — human label.
- `dependsOn: string[]` — IDs of steps that must complete first. Empty for
  entry steps.
- `config` — discriminated by `type`.

The runtime topologically sorts steps and runs each layer in parallel via
`Promise.all`. A circular dependency throws.

## Step Types

### `ai_prompt`

Calls a model provider (currently Anthropic) with a system + user prompt.

```ts
{
  type: 'ai_prompt',
  provider: 'anthropic',
  model: 'claude-haiku-4-5-20251001', // optional
  systemPrompt: 'You are a triage analyst…',
  userPrompt: 'Classify this message:\n{{input.message}}',
  temperature: 0.2,                    // optional
  maxTokens: 600,                      // optional
}
```

The prompt strings interpolate `{{input.x}}`, `{{steps.<id>.<field>}}`, and
`{{output.x}}`. Missing values render as empty strings (for strings) or
JSON-stringified (for non-strings).

The step output is the model's text response (a string).

### `transform`

Runs a sandboxed JavaScript expression against the execution context.

```ts
{
  type: 'transform',
  expression: 'JSON.parse(steps.classify)',
}
```

Inside the expression you have three frozen, deep-cloned values: `input`,
`steps`, `output`. The expression must be a single JS expression (no
statements). The return value becomes the step output.

Several patterns are blocked for safety: `process`, `require`, `import`,
`globalThis`, `eval`, `Function`, `__proto__`, `fetch`, `XMLHttpRequest`, and
`constructor[…]` indexing. Stick to pure data shaping.

### `condition`

Branches based on an expression (same sandbox rules as `transform`). The
runtime currently records the branch result as the step output; the
`trueSteps` / `falseSteps` arrays are advisory metadata and do not skip
downstream steps. Wire branching via `dependsOn` for now.

### `http_request`

Calls an external URL. URL must pass `z.string().url()` validation. The body
field is a string — interpolate context yourself if needed.

### `output`

Maps context paths into the run's final `output` object. This is what your
public route returns to the browser.

```ts
{
  type: 'output',
  mapping: {
    intent: 'steps.parse.intent',
    summary: 'steps.parse.summary',
  },
}
```

## Running a workflow programmatically

```ts
import { executeWorkflow } from '@/lib/engine/runtime'
import { leadQualifierWorkflow } from '@/lib/engine/workflows/lead-qualifier'

const run = await executeWorkflow(leadQualifierWorkflow, {
  message: 'Hi, can you build us an intake bot?',
})

if (run.status === 'completed') {
  console.log(run.output)
}
```

## Public demo routes — required guardrails

If a route is unauthenticated and calls a paid model, it MUST:

1. Apply per-IP rate limiting via `checkDemoRateLimit` from
   `src/lib/engine/demo-rate-limit.ts`.
2. Validate the request body with Zod, including a maximum input size.
3. Return a non-paying response (4xx) before invoking the workflow if either
   limit fails.

See `src/app/api/demo/lead-qualifier/route.ts` for the canonical example.

## Persistence

When `NEXT_PUBLIC_SUPABASE_URL` and a Supabase key (`SUPABASE_SERVICE_ROLE_KEY`
or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are set, `store` reads/writes from the
`workflows`, `workflow_runs`, and `workflow_step_runs` tables. Otherwise it
falls back to in-process maps — fine for local development and demo routes
that ship a static workflow.

Demo routes deliberately do NOT call `store.saveRun` so we avoid logging
visitor input.

## Selling custom workflows

This engine is the basis of the productized "Lead Qualifier" demo on `/demo`,
but the same primitives — AI step + transform + output — cover the most
common SMB asks: triage, classification, summarization, structured extraction,
and routing. When scoping a new client workflow, ask:

- What is the input shape? (form, email, webhook payload)
- What structured fields does the operator need?
- Where should the output land? (CRM, Slack, helpdesk, sheet)
- What is the volume and per-call cost ceiling?

Then build it as a single workflow definition file, wire a route, and ship it.
