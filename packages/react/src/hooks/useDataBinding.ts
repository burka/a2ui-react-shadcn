/**
 * useDataBinding Hook
 * Bind to a data path in the surface's data model
 */

import { useCallback, useSyncExternalStore } from 'react'
import { useA2UI } from './useA2UI.js'

/**
 * Data binding result
 */
export interface DataBinding<T = unknown> {
  /** Current value at the data path */
  value: T | undefined
  /** Set a new value at the data path */
  setValue: (value: T) => void
}

/**
 * Bind to a data path in a surface's data model
 * Uses React 19's useSyncExternalStore for optimal performance
 *
 * @param surfaceId - ID of the surface containing the data
 * @param path - Dot-notation path to the data (e.g., "user.name")
 * @returns Data binding with value and setValue
 *
 * @example
 * ```tsx
 * function UserName() {
 *   const { value, setValue } = useDataBinding<string>('main', 'user.name')
 *
 *   return (
 *     <input
 *       value={value ?? ''}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   )
 * }
 * ```
 */
export function useDataBinding<T = unknown>(surfaceId: string, path: string): DataBinding<T> {
  const { store } = useA2UI()

  // Subscribe to store changes
  const subscribe = useCallback(
    (callback: () => void) => {
      return store.subscribe(callback)
    },
    [store],
  )

  // Get current value snapshot
  const getSnapshot = useCallback(() => {
    return store.getData(surfaceId, path) as T | undefined
  }, [store, surfaceId, path])

  // Get server snapshot (same as client for this use case)
  const getServerSnapshot = getSnapshot

  // Subscribe to the data using useSyncExternalStore
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Create setValue callback
  const setValue = useCallback(
    (newValue: T) => {
      store.setData(surfaceId, path, newValue)
    },
    [store, surfaceId, path],
  )

  return { value, setValue }
}
