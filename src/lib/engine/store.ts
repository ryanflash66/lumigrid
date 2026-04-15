import type { Workflow, WorkflowRun } from './types'
import type { CreateWorkflowInput, UpdateWorkflowInput } from './schema'

const workflows = new Map<string, Workflow>()
const runs = new Map<string, WorkflowRun>()
const workflowRuns = new Map<string, string[]>()

export const store = {
  createWorkflow(data: CreateWorkflowInput): Workflow {
    const workflow = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Workflow
    workflows.set(workflow.id, workflow)
    return workflow
  },

  getWorkflow(id: string): Workflow | undefined {
    return workflows.get(id)
  },

  listWorkflows(): Workflow[] {
    return Array.from(workflows.values()).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  },

  updateWorkflow(id: string, data: UpdateWorkflowInput): Workflow | undefined {
    const existing = workflows.get(id)
    if (!existing) return undefined

    const updated = {
      ...existing,
      ...data,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    } as Workflow
    workflows.set(id, updated)
    return updated
  },

  deleteWorkflow(id: string): boolean {
    return workflows.delete(id)
  },

  saveRun(run: WorkflowRun): void {
    runs.set(run.id, run)
    const existing = workflowRuns.get(run.workflowId) ?? []
    existing.push(run.id)
    workflowRuns.set(run.workflowId, existing)
  },

  getRun(id: string): WorkflowRun | undefined {
    return runs.get(id)
  },

  listRuns(workflowId: string): WorkflowRun[] {
    const runIds = workflowRuns.get(workflowId) ?? []
    return runIds
      .map((id) => runs.get(id))
      .filter((r): r is WorkflowRun => r != null)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
  },
}
