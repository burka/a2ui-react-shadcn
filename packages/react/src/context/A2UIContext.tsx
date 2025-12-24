/**
 * A2UI React Context
 * Provides access to the A2UI store, registry, and action dispatcher
 */

import type { A2UIStore } from 'a2ui-shadcn-ui-core'
import { createContext } from 'react'
import type { A2UIAction, ComponentRegistry } from '../registry/types.js'

/**
 * Context value provided to all A2UI components
 */
export interface A2UIContextValue {
  /** A2UI store for managing surfaces and data */
  store: A2UIStore
  /** Component registry for looking up renderers */
  registry: ComponentRegistry
  /** Action dispatcher for handling user interactions */
  onAction: (action: A2UIAction) => void
}

/**
 * A2UI React Context
 * Use useA2UI() hook to access this context
 */
export const A2UIContext = createContext<A2UIContextValue | null>(null)

// Set display name for debugging
A2UIContext.displayName = 'A2UIContext'
