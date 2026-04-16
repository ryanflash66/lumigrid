import type { ConditionConfig, ExecutionContext, StepHandler } from '../types'

export const conditionHandler: StepHandler = {
  async execute(config, context: ExecutionContext) {
    const { expression } = config as ConditionConfig & { type: 'condition' }

    const fn = new Function(
      'input',
      'steps',
      'output',
      `"use strict"; return Boolean(${expression})`
    )

    const frozenInput = Object.freeze(structuredClone(context.input))
    const frozenSteps = Object.freeze(structuredClone(context.steps))
    const frozenOutput = Object.freeze(structuredClone(context.output))

    const result = fn(frozenInput, frozenSteps, frozenOutput)
    return { result, branch: result ? 'true' : 'false' }
  },
}
