import type { AiPromptConfig, ExecutionContext, StepHandler } from '../types'
import { executeAiPrompt } from '../providers/anthropic'

export const aiPromptHandler: StepHandler = {
  async execute(config, context: ExecutionContext) {
    const promptConfig = config as AiPromptConfig & { type: 'ai_prompt' }

    if (promptConfig.provider === 'anthropic') {
      return executeAiPrompt(promptConfig, context)
    }

    throw new Error(`Unsupported AI provider: ${promptConfig.provider}`)
  },
}
