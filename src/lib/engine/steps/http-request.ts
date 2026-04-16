import type { ExecutionContext, HttpRequestConfig, StepHandler } from '../types'

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

export const httpRequestHandler: StepHandler = {
  async execute(config, context: ExecutionContext) {
    const cfg = config as HttpRequestConfig & { type: 'http_request' }

    const url = interpolateTemplate(cfg.url, context)
    const headers: Record<string, string> = {}
    if (cfg.headers) {
      for (const [key, value] of Object.entries(cfg.headers)) {
        headers[key] = interpolateTemplate(value, context)
      }
    }

    const body = cfg.body ? interpolateTemplate(cfg.body, context) : undefined

    const response = await fetch(url, {
      method: cfg.method,
      headers,
      ...(body && cfg.method !== 'GET' ? { body } : {}),
    })

    const contentType = response.headers.get('content-type') ?? ''
    const responseBody = contentType.includes('application/json')
      ? await response.json()
      : await response.text()

    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
    }
  },
}
