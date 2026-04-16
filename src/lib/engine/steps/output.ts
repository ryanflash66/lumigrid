import type { ExecutionContext, OutputConfig, StepHandler } from '../types'

export const outputHandler: StepHandler = {
  async execute(config, context: ExecutionContext) {
    const { mapping } = config as OutputConfig & { type: 'output' }
    const result: Record<string, unknown> = {}

    for (const [key, path] of Object.entries(mapping)) {
      const parts = path.split('.')
      let value: unknown = context
      for (const part of parts) {
        if (value == null || typeof value !== 'object') {
          value = undefined
          break
        }
        value = (value as Record<string, unknown>)[part]
      }
      result[key] = value
    }

    Object.assign(context.output, result)
    return result
  },
}
