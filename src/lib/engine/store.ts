import type { Workflow, WorkflowRun } from './types'
import type { CreateWorkflowInput, UpdateWorkflowInput } from './schema'
import { getSupabase } from './supabase'

function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))
}

// -- In-memory fallback --
const memWorkflows = new Map<string, Workflow>()
const memRuns = new Map<string, WorkflowRun>()
const memWorkflowRuns = new Map<string, string[]>()

// -- Row-to-domain mappers --
function rowToWorkflow(row: Record<string, unknown>): Workflow {
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    trigger: row.trigger as Workflow['trigger'],
    steps: row.steps as Workflow['steps'],
    variables: (row.variables ?? {}) as Workflow['variables'],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

function rowToRun(row: Record<string, unknown>): WorkflowRun {
  return {
    id: row.id as string,
    workflowId: row.workflow_id as string,
    status: row.status as WorkflowRun['status'],
    input: (row.input ?? {}) as Record<string, unknown>,
    output: row.output as Record<string, unknown> | undefined,
    stepResults: (row.step_results ?? []) as WorkflowRun['stepResults'],
    startedAt: row.started_at as string,
    completedAt: row.completed_at as string | undefined,
    error: row.error as string | undefined,
  }
}

export const store = {
  async createWorkflow(data: CreateWorkflowInput): Promise<Workflow> {
    if (!isSupabaseConfigured()) {
      const workflow = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Workflow
      memWorkflows.set(workflow.id, workflow)
      return workflow
    }

    const sb = getSupabase()
    const { data: row, error } = await sb
      .from('workflows')
      .insert({
        name: data.name,
        description: data.description,
        trigger: data.trigger,
        steps: data.steps,
        variables: data.variables,
      })
      .select()
      .single()

    if (error) throw new Error(`Failed to create workflow: ${error.message}`)
    return rowToWorkflow(row)
  },

  async getWorkflow(id: string): Promise<Workflow | undefined> {
    if (!isSupabaseConfigured()) return memWorkflows.get(id)

    const sb = getSupabase()
    const { data: row, error } = await sb
      .from('workflows')
      .select()
      .eq('id', id)
      .single()

    if (error || !row) return undefined
    return rowToWorkflow(row)
  },

  async listWorkflows(): Promise<Workflow[]> {
    if (!isSupabaseConfigured()) {
      return Array.from(memWorkflows.values()).sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    }

    const sb = getSupabase()
    const { data: rows, error } = await sb
      .from('workflows')
      .select()
      .order('updated_at', { ascending: false })

    if (error) throw new Error(`Failed to list workflows: ${error.message}`)
    return (rows ?? []).map(rowToWorkflow)
  },

  async updateWorkflow(id: string, data: UpdateWorkflowInput): Promise<Workflow | undefined> {
    if (!isSupabaseConfigured()) {
      const existing = memWorkflows.get(id)
      if (!existing) return undefined
      const updated = {
        ...existing,
        ...data,
        id: existing.id,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
      } as Workflow
      memWorkflows.set(id, updated)
      return updated
    }

    const sb = getSupabase()
    const updatePayload: Record<string, unknown> = {}
    if (data.name !== undefined) updatePayload.name = data.name
    if (data.description !== undefined) updatePayload.description = data.description
    if (data.trigger !== undefined) updatePayload.trigger = data.trigger
    if (data.steps !== undefined) updatePayload.steps = data.steps
    if (data.variables !== undefined) updatePayload.variables = data.variables

    const { data: row, error } = await sb
      .from('workflows')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error || !row) return undefined
    return rowToWorkflow(row)
  },

  async deleteWorkflow(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return memWorkflows.delete(id)

    const sb = getSupabase()
    const { error } = await sb.from('workflows').delete().eq('id', id)
    return !error
  },

  async saveRun(run: WorkflowRun): Promise<void> {
    if (!isSupabaseConfigured()) {
      memRuns.set(run.id, run)
      const existing = memWorkflowRuns.get(run.workflowId) ?? []
      existing.push(run.id)
      memWorkflowRuns.set(run.workflowId, existing)
      return
    }

    const sb = getSupabase()
    const { error: runError } = await sb.from('workflow_runs').upsert({
      id: run.id,
      workflow_id: run.workflowId,
      status: run.status,
      input: run.input,
      output: run.output ?? null,
      error: run.error ?? null,
      started_at: run.startedAt,
      completed_at: run.completedAt ?? null,
    })
    if (runError) throw new Error(`Failed to save run: ${runError.message}`)

    if (run.stepResults.length > 0) {
      const stepRows = run.stepResults.map((sr) => ({
        run_id: run.id,
        step_id: sr.stepId,
        status: sr.status,
        output: sr.output ?? null,
        error: sr.error ?? null,
        started_at: sr.startedAt ?? null,
        completed_at: sr.completedAt ?? null,
      }))

      const { error: stepError } = await sb
        .from('workflow_step_runs')
        .upsert(stepRows, { onConflict: 'run_id,step_id', ignoreDuplicates: false })

      if (stepError) {
        // Step runs table doesn't have a unique on (run_id, step_id) yet — insert instead
        await sb.from('workflow_step_runs').insert(stepRows)
      }
    }
  },

  async getRun(id: string): Promise<WorkflowRun | undefined> {
    if (!isSupabaseConfigured()) return memRuns.get(id)

    const sb = getSupabase()
    const { data: row, error } = await sb
      .from('workflow_runs')
      .select()
      .eq('id', id)
      .single()

    if (error || !row) return undefined

    const { data: stepRows } = await sb
      .from('workflow_step_runs')
      .select()
      .eq('run_id', id)

    const run = rowToRun(row)
    run.stepResults = (stepRows ?? []).map((sr) => ({
      stepId: sr.step_id as string,
      status: sr.status as WorkflowRun['stepResults'][number]['status'],
      output: sr.output as unknown,
      error: sr.error as string | undefined,
      startedAt: sr.started_at as string | undefined,
      completedAt: sr.completed_at as string | undefined,
    }))

    return run
  },

  async listRuns(workflowId: string): Promise<WorkflowRun[]> {
    if (!isSupabaseConfigured()) {
      const runIds = memWorkflowRuns.get(workflowId) ?? []
      return runIds
        .map((id) => memRuns.get(id))
        .filter((r): r is WorkflowRun => r != null)
        .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    }

    const sb = getSupabase()
    const { data: rows, error } = await sb
      .from('workflow_runs')
      .select()
      .eq('workflow_id', workflowId)
      .order('started_at', { ascending: false })

    if (error) throw new Error(`Failed to list runs: ${error.message}`)
    return (rows ?? []).map(rowToRun)
  },
}
