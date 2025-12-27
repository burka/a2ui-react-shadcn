/**
 * useSurface Hook
 * Subscribe to a surface and get its current state
 */

import type { Surface } from 'a2ui-react-core'
import { useCallback, useSyncExternalStore } from 'react'
import { useA2UI } from './useA2UI.js'

/**
 * Subscribe to a surface and reactively update when it changes
 * Uses React 19's useSyncExternalStore for optimal performance
 *
 * @param surfaceId - ID of the surface to subscribe to
 * @returns Surface object or undefined if not found
 *
 * @example
 * ```tsx
 * function SurfaceDebugger({ surfaceId }: { surfaceId: string }) {
 *   const surface = useSurface(surfaceId)
 *
 *   if (!surface) {
 *     return <div>Surface not found</div>
 *   }
 *
 *   return (
 *     <div>
 *       <h3>Surface: {surface.id}</h3>
 *       <p>Root: {surface.root}</p>
 *       <p>Components: {Object.keys(surface.components).length}</p>
 *     </div>
 *   )
 * }
 * ```
 */
export function useSurface(surfaceId: string): Surface | undefined {
  const { store } = useA2UI()

  // Subscribe to store changes
  const subscribe = useCallback(
    (callback: () => void) => {
      return store.subscribe(callback)
    },
    [store],
  )

  // Get current surface snapshot
  const getSnapshot = useCallback(() => {
    return store.getSurface(surfaceId)
  }, [store, surfaceId])

  // Get server snapshot (same as client for this use case)
  const getServerSnapshot = getSnapshot

  // Subscribe to the surface using useSyncExternalStore
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
