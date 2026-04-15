import { NextResponse } from 'next/server'
import { createWorkflowSchema } from '@/lib/engine/schema'
import { store } from '@/lib/engine/store'

export async function GET() {
  const workflows = store.listWorkflows()
  return NextResponse.json(workflows)
}

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = createWorkflowSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation error', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const workflow = store.createWorkflow(parsed.data)
  return NextResponse.json(workflow, { status: 201 })
}
