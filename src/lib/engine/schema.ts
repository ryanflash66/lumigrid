import { z } from 'zod'

const variableDefinitionSchema = z.object({
  type: z.enum(['string', 'number', 'boolean', 'object', 'array']),
  description: z.string().optional(),
  required: z.boolean().optional(),
  default: z.unknown().optional(),
})

const triggerConfigSchema = z.object({
  type: z.enum(['manual', 'webhook', 'schedule']),
  config: z.record(z.string(), z.unknown()).optional(),
})

const aiPromptConfigSchema = z.object({
  type: z.literal('ai_prompt'),
  provider: z.enum(['anthropic', 'openai']),
  model: z.string().optional(),
  systemPrompt: z.string().optional(),
  userPrompt: z.string(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().positive().optional(),
})

const transformConfigSchema = z.object({
  type: z.literal('transform'),
  expression: z.string(),
})

const conditionConfigSchema = z.object({
  type: z.literal('condition'),
  expression: z.string(),
  trueSteps: z.array(z.string()),
  falseSteps: z.array(z.string()),
})

const httpRequestConfigSchema = z.object({
  type: z.literal('http_request'),
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.string().optional(),
})

const outputConfigSchema = z.object({
  type: z.literal('output'),
  mapping: z.record(z.string(), z.string()),
})

const stepConfigSchema = z.discriminatedUnion('type', [
  aiPromptConfigSchema,
  transformConfigSchema,
  conditionConfigSchema,
  httpRequestConfigSchema,
  outputConfigSchema,
])

const workflowStepSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  config: stepConfigSchema,
  dependsOn: z.array(z.string()).default([]),
})

export const createWorkflowSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).default(''),
  trigger: triggerConfigSchema,
  steps: z.array(workflowStepSchema).min(1),
  variables: z.record(z.string(), variableDefinitionSchema).default({}),
})

export const updateWorkflowSchema = createWorkflowSchema.partial()

export const runWorkflowSchema = z.object({
  input: z.record(z.string(), z.unknown()).default({}),
})

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>
export type RunWorkflowInput = z.infer<typeof runWorkflowSchema>
