import { NextResponse } from 'next/server'
import { updateWorkflowSchema } from '@/lib/engine/schema'
import { store } from '@/lib/engine/store'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const workflow = await store.getWorkflow(id)

  if (!workflow) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })
  }

  return NextResponse.json(workflow)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const parsed = updateWorkflowSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation error', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const workflow = await store.updateWorkflow(id, parsed.data)
  if (!workflow) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })
  }

  return NextResponse.json(workflow)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const deleted = await store.deleteWorkflow(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
