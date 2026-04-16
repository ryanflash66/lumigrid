import Anthropic from '@anthropic-ai/sdk'
import type { AiPromptConfig, ExecutionContext } from '../types'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic()
  }
  return client
}

function interpolateTemplate(template: string, context: ExecutionContext): string {
  return template.replace(/\{\{(.+?)\}\}/g, (_, path: string) => {
    const parts = path.trim().split('.')
    let value: unknown = context
    for (const part of parts) {
      if (value == null || typeof value !== 'object') return ''
      value = (value as Record<string, unknown>)[part]
    }
    return typeof value === 'string' ? value : JSON.stringify(value ?? '')
  })
}

export async function executeAiPrompt(
  config: AiPromptConfig,
  context: ExecutionContext
): Promise<string> {
  const anthropic = getClient()
  const model = config.model ?? 'claude-sonnet-4-20250514'
  const userPrompt = interpolateTemplate(config.userPrompt, context)

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userPrompt },
  ]

  const response = await anthropic.messages.create({
    model,
    max_tokens: config.maxTokens ?? 1024,
    ...(config.systemPrompt
      ? { system: interpolateTemplate(config.systemPrompt, context) }
      : {}),
    ...(config.temperature != null ? { temperature: config.temperature } : {}),
    messages,
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  return textBlock?.text ?? ''
}
