'use client'

import { useEffect, useState } from 'react'
import { MousePointer2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCursorEnabled } from '@/contexts/cursor-context'

export function CursorToggle() {
  const { enabled, toggle } = useCursorEnabled()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setVisible(mq.matches)
    const handler = (e: MediaQueryListEvent) => setVisible(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!visible) return null

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={enabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      title={enabled ? 'Disable custom cursor' : 'Enable custom cursor'}
      onClick={toggle}
    >
      <MousePointer2
        className={`h-4 w-4 transition-opacity ${enabled ? 'opacity-100' : 'opacity-40'}`}
      />
    </Button>
  )
}
