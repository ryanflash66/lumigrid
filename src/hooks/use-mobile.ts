import { useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

// Singleton: every consumer shares ONE matchMedia listener
let cachedMql: MediaQueryList | null = null
function getMql() {
  if (cachedMql === null) cachedMql = window.matchMedia(QUERY)
  return cachedMql
}

function subscribe(callback: () => void) {
  const mql = getMql()
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot() {
  return getMql().matches
}

function getServerSnapshot() {
  return false
}

/**
 * React 19-safe mobile detection hook using useSyncExternalStore.
 * Returns true when viewport is below 768px.
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
