import type { ExecutionContext, StepHandler, TransformConfig } from '../types'

export const transformHandler: StepHandler = {
  async execute(config, context: ExecutionContext) {
    const { expression } = config as TransformConfig & { type: 'transform' }

    const fn = new Function('input', 'steps', 'output', `return (${expression})`)
    return fn(context.input, context.steps, context.output)
  },
}
