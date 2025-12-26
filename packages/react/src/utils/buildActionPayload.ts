/**
 * Utility for building action payloads from component data
 * Eliminates duplication across interactive component renderers
 */

import type { A2UIAction, DataAccessor } from '../registry/types.js'

/**
 * Component with action properties
 */
export interface ActionableComponent {
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
}

/**
 * Builds an action payload from component configuration and data model
 *
 * @param component - Component with action configuration
 * @param data - Data accessor for reading values from data model
 * @returns A2UIAction if component has an action configured, undefined otherwise
 *
 * @example
 * ```tsx
 * const handleClick = () => {
 *   const action = buildActionPayload(component, data)
 *   if (action) {
 *     onAction(action)
 *   }
 * }
 * ```
 */
export function buildActionPayload(
  component: ActionableComponent,
  data: DataAccessor,
): A2UIAction | undefined {
  if (!component.action) {
    return undefined
  }

  const payload: Record<string, unknown> = component.actionPayload
    ? { ...component.actionPayload }
    : {}

  if (component.submitDataPaths) {
    for (const path of component.submitDataPaths) {
      const value = data.get(path)
      if (value !== undefined) {
        payload[path] = value
      }
    }
  }

  return {
    type: component.action,
    payload: Object.keys(payload).length > 0 ? payload : undefined,
  }
}

/**
 * Creates a click handler that dispatches an action
 *
 * @param component - Component with action configuration
 * @param data - Data accessor for reading values
 * @param onAction - Action dispatcher
 * @returns Click handler function
 *
 * @example
 * ```tsx
 * const handleClick = createActionHandler(component, data, onAction)
 * return <button onClick={handleClick}>Click me</button>
 * ```
 */
export function createActionHandler(
  component: ActionableComponent,
  data: DataAccessor,
  onAction: (action: A2UIAction) => void,
): () => void {
  return () => {
    const action = buildActionPayload(component, data)
    if (action) {
      onAction(action)
    }
  }
}
