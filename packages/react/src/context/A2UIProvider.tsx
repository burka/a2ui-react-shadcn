/**
 * A2UI Provider Component
 * Sets up the A2UI context for child components
 */

import type { A2UIStore } from 'a2ui-react-core'
import { createStore } from 'a2ui-react-core'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { createRegistry } from '../registry/component-registry.js'
import type { A2UIAction, A2UIRenderer } from '../registry/types.js'
import { A2UIContext } from './A2UIContext.js'

/**
 * Props for A2UIProvider
 */
export interface A2UIProviderProps {
  /** Child components that will have access to A2UI context */
  children: ReactNode
  /** Optional A2UI store instance. If not provided, a default store will be created */
  store?: A2UIStore
  /** Optional array of renderers to pre-register */
  renderers?: A2UIRenderer[]
  /** Optional action handler. Defaults to console.log */
  onAction?: (action: A2UIAction) => void
}

/**
 * Default action handler - logs actions to console
 */
const defaultActionHandler = (action: A2UIAction): void => {
  console.log('[A2UI Action]', action)
}

/**
 * A2UIProvider - Sets up the A2UI context
 *
 * @example
 * ```tsx
 * import { A2UIProvider } from 'a2ui-react-react'
 *
 * function App() {
 *   return (
 *     <A2UIProvider
 *       renderers={[buttonRenderer, textRenderer]}
 *       onAction={(action) => console.log('Action:', action)}
 *     >
 *       <YourApp />
 *     </A2UIProvider>
 *   )
 * }
 * ```
 */
export function A2UIProvider({
  children,
  store,
  renderers = [],
  onAction = defaultActionHandler,
}: A2UIProviderProps) {
  // Create context value - memoized to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    // Use provided store or create a new one
    const storeInstance = store ?? createStore()

    // Create registry and register provided renderers
    const registry = createRegistry()
    for (const renderer of renderers) {
      registry.register(renderer)
    }

    return {
      store: storeInstance,
      registry,
      onAction,
    }
  }, [store, renderers, onAction])

  return <A2UIContext.Provider value={contextValue}>{children}</A2UIContext.Provider>
}
