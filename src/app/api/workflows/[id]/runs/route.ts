import { NextResponse } from 'next/server'
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

  const runs = await store.listRuns(id)
  return NextResponse.json(runs)
}
