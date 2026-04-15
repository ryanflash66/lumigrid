import type {
  ExecutionContext,
  StepConfig,
  StepHandler,
  StepRunResult,
  Workflow,
  WorkflowRun,
  WorkflowStep,
} from './types'
import { aiPromptHandler } from './steps/ai-prompt'
import { transformHandler } from './steps/transform'
import { outputHandler } from './steps/output'

const stepHandlers: Record<string, StepHandler> = {
  ai_prompt: aiPromptHandler,
  transform: transformHandler,
  output: outputHandler,
}

function topologicalSort(steps: WorkflowStep[]): WorkflowStep[][] {
  const stepMap = new Map(steps.map((s) => [s.id, s]))
  const visited = new Set<string>()
  const layers: WorkflowStep[][] = []

  while (visited.size < steps.length) {
    const layer: WorkflowStep[] = []

    for (const step of steps) {
      if (visited.has(step.id)) continue
      const depsReady = step.dependsOn.every((dep) => visited.has(dep))
      if (depsReady) layer.push(step)
    }

    if (layer.length === 0) {
      throw new Error('Circular dependency detected in workflow steps')
    }

    for (const step of layer) {
      visited.add(step.id)
    }
    layers.push(layer)
  }

  return layers
}

async function executeStep(
  step: WorkflowStep,
  context: ExecutionContext,
  stepResult: StepRunResult
): Promise<void> {
  const handler = stepHandlers[step.config.type]
  if (!handler) {
    throw new Error(`No handler for step type: ${step.config.type}`)
  }

  stepResult.status = 'running'
  stepResult.startedAt = new Date().toISOString()

  try {
    const output = await handler.execute(step.config as StepConfig, context)
    context.steps[step.id] = output
    stepResult.output = output
    stepResult.status = 'completed'
  } catch (err) {
    stepResult.status = 'failed'
    stepResult.error = err instanceof Error ? err.message : String(err)
    throw err
  } finally {
    stepResult.completedAt = new Date().toISOString()
  }
}

export async function executeWorkflow(
  workflow: Workflow,
  input: Record<string, unknown>
): Promise<WorkflowRun> {
  const run: WorkflowRun = {
    id: crypto.randomUUID(),
    workflowId: workflow.id,
    status: 'running',
    input,
    stepResults: workflow.steps.map((s) => ({
      stepId: s.id,
      status: 'pending' as const,
    })),
    startedAt: new Date().toISOString(),
  }

  const context: ExecutionContext = {
    input,
    steps: {},
    output: {},
  }

  const resultMap = new Map(run.stepResults.map((r) => [r.stepId, r]))

  try {
    const layers = topologicalSort(workflow.steps)

    for (const layer of layers) {
      await Promise.all(
        layer.map((step) => {
          const stepResult = resultMap.get(step.id)!
          return executeStep(step, context, stepResult)
        })
      )
    }

    run.status = 'completed'
    run.output = context.output
  } catch (err) {
    run.status = 'failed'
    run.error = err instanceof Error ? err.message : String(err)

    for (const result of run.stepResults) {
      if (result.status === 'pending') {
        result.status = 'skipped'
      }
    }
  }

  run.completedAt = new Date().toISOString()
  return run
}
