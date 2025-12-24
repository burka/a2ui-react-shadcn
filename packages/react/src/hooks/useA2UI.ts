/**
 * useA2UI Hook
 * Access the full A2UI context (store, registry, onAction)
 */

import { useContext } from 'react'
import type { A2UIContextValue } from '../context/A2UIContext.js'
import { A2UIContext } from '../context/A2UIContext.js'

/**
 * Access the A2UI context
 * Must be used within an A2UIProvider
 *
 * @returns A2UIContextValue with store, registry, and onAction
 * @throws Error if used outside A2UIProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { store, registry, onAction } = useA2UI()
 *   // Use store, registry, or onAction
 * }
 * ```
 */
export function useA2UI(): A2UIContextValue {
  const context = useContext(A2UIContext)

  if (!context) {
    throw new Error('useA2UI must be used within an A2UIProvider')
  }

  return context
}
