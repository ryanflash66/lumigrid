import type { ExecutionContext, StepHandler, TransformConfig } from '../types'

const BLOCKED_PATTERNS = [
  /\bprocess\b/,
  /\brequire\b/,
  /\bimport\b/,
  /\bglobal(This)?\b/,
  /\beval\b/,
  /\bFunction\b/,
  /\b__proto__\b/,
  /\bconstructor\b\s*\[/,
  /\bfetch\b/,
  /\bXMLHttpRequest\b/,
]

function validateExpression(expression: string): void {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(expression)) {
      throw new Error(
        `Transform expression contains blocked pattern: ${pattern.source}`
      )
    }
  }
}

function deepFreeze<T>(obj: T): T {
  if (obj != null && typeof obj === 'object') {
    for (const value of Object.values(obj as Record<string, unknown>)) {
      deepFreeze(value)
    }
    Object.freeze(obj)
  }
  return obj
}

export const transformHandler: StepHandler = {
  async execute(config, context: ExecutionContext) {
    const { expression } = config as TransformConfig & { type: 'transform' }

    validateExpression(expression)

    const frozenInput = deepFreeze(structuredClone(context.input))
    const frozenSteps = deepFreeze(structuredClone(context.steps))
    const frozenOutput = deepFreeze(structuredClone(context.output))

    const fn = new Function(
      'input',
      'steps',
      'output',
      `"use strict"; return (${expression})`
    )
    return fn(frozenInput, frozenSteps, frozenOutput)
  },
}
