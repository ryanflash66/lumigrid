import { NextResponse } from 'next/server'
import { runWorkflowSchema } from '@/lib/engine/schema'
import { store } from '@/lib/engine/store'
import { executeWorkflow } from '@/lib/engine/runtime'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const workflow = await store.getWorkflow(id)

  if (!workflow) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const parsed = runWorkflowSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation error', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const run = await executeWorkflow(workflow, parsed.data.input)
  await store.saveRun(run)

  return NextResponse.json(run, {
    status: run.status === 'failed' ? 500 : 200,
  })
}
