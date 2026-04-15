export type TriggerType = 'manual' | 'webhook' | 'schedule'

export type StepType = 'ai_prompt' | 'transform' | 'condition' | 'http_request' | 'output'

export type RunStatus = 'pending' | 'running' | 'completed' | 'failed'

export type StepRunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

export interface VariableDefinition {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  description?: string
  required?: boolean
  default?: unknown
}

export interface TriggerConfig {
  type: TriggerType
  config?: Record<string, unknown>
}

export interface AiPromptConfig {
  provider: 'anthropic' | 'openai'
  model?: string
  systemPrompt?: string
  userPrompt: string
  temperature?: number
  maxTokens?: number
}

export interface TransformConfig {
  expression: string
}

export interface ConditionConfig {
  expression: string
  trueSteps: string[]
  falseSteps: string[]
}

export interface HttpRequestConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: string
}

export interface OutputConfig {
  mapping: Record<string, string>
}

export type StepConfig =
  | { type: 'ai_prompt' } & AiPromptConfig
  | { type: 'transform' } & TransformConfig
  | { type: 'condition' } & ConditionConfig
  | { type: 'http_request' } & HttpRequestConfig
  | { type: 'output' } & OutputConfig

export interface WorkflowStep {
  id: string
  name: string
  config: StepConfig
  dependsOn: string[]
}

export interface Workflow {
  id: string
  name: string
  description: string
  trigger: TriggerConfig
  steps: WorkflowStep[]
  variables: Record<string, VariableDefinition>
  createdAt: string
  updatedAt: string
}

export interface StepRunResult {
  stepId: string
  status: StepRunStatus
  output?: unknown
  error?: string
  startedAt?: string
  completedAt?: string
}

export interface WorkflowRun {
  id: string
  workflowId: string
  status: RunStatus
  input: Record<string, unknown>
  output?: Record<string, unknown>
  stepResults: StepRunResult[]
  startedAt: string
  completedAt?: string
  error?: string
}

export interface ExecutionContext {
  input: Record<string, unknown>
  steps: Record<string, unknown>
  output: Record<string, unknown>
}

export interface StepHandler {
  execute(
    config: StepConfig,
    context: ExecutionContext
  ): Promise<unknown>
}
