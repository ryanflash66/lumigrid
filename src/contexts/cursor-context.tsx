'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'lumigrid-cursor-disabled'

interface CursorContextValue {
  enabled: boolean
  toggle: () => void
}

const CursorContext = createContext<CursorContextValue>({
  enabled: true,
  toggle: () => {},
})

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') {
      setEnabled(false)
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      document.documentElement.setAttribute('data-custom-cursor', 'true')
    } else {
      document.documentElement.removeAttribute('data-custom-cursor')
    }
  }, [enabled])

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      if (next) {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, 'true')
      }
      return next
    })
  }, [])

  return (
    <CursorContext.Provider value={{ enabled, toggle }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursorEnabled() {
  return useContext(CursorContext)
}
