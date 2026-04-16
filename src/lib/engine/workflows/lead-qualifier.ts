import type { Workflow } from '../types'

export const leadQualifierWorkflow: Workflow = {
  id: 'lead-qualifier',
  name: 'Lead Qualifier',
  description:
    'Reads a raw inbound message from a website contact form and returns structured lead data: intent, urgency, budget signal, and a suggested next action.',
  trigger: { type: 'manual' },
  variables: {
    message: {
      type: 'string',
      description: 'Raw inbound message text from a contact form or email.',
      required: true,
    },
  },
  steps: [
    {
      id: 'classify',
      name: 'Classify the message',
      dependsOn: [],
      config: {
        type: 'ai_prompt',
        provider: 'anthropic',
        model: 'claude-haiku-4-5-20251001',
        temperature: 0.2,
        maxTokens: 600,
        systemPrompt:
          'You are a senior sales operations analyst at a B2B services agency. ' +
          'You triage inbound leads. You always reply with a single JSON object — ' +
          'no prose, no markdown fences, no commentary.',
        userPrompt: [
          'Analyze the inbound message below and return a JSON object with these fields:',
          '',
          '- intent: one of "buying_now", "exploring", "support", "spam", "other"',
          '- urgency: one of "high", "medium", "low"',
          '- budget_signal: one of "explicit", "implicit", "none"',
          '- estimated_budget_usd: a string like "$5k-$15k" or null if unknown',
          '- summary: one sentence (max 25 words) describing what the prospect wants',
          '- suggested_next_action: one short sentence the rep should do next',
          '',
          'Return JSON only. No surrounding text.',
          '',
          'Inbound message:',
          '"""',
          '{{input.message}}',
          '"""',
        ].join('\n'),
      },
    },
    {
      id: 'parse',
      name: 'Parse JSON output',
      dependsOn: ['classify'],
      config: {
        type: 'transform',
        expression:
          "JSON.parse((String(steps.classify).match(/\\{[\\s\\S]*\\}/) || ['{}'])[0])",
      },
    },
    {
      id: 'finalize',
      name: 'Shape final output',
      dependsOn: ['parse'],
      config: {
        type: 'output',
        mapping: {
          intent: 'steps.parse.intent',
          urgency: 'steps.parse.urgency',
          budgetSignal: 'steps.parse.budget_signal',
          estimatedBudgetUsd: 'steps.parse.estimated_budget_usd',
          summary: 'steps.parse.summary',
          suggestedNextAction: 'steps.parse.suggested_next_action',
        },
      },
    },
  ],
  createdAt: '2026-04-16T00:00:00.000Z',
  updatedAt: '2026-04-16T00:00:00.000Z',
}
