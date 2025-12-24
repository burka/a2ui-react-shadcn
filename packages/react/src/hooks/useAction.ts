/**
 * useAction Hook
 * Get the action dispatcher function
 */

import type { A2UIAction } from '../registry/types.js'
import { useA2UI } from './useA2UI.js'

/**
 * Get the action dispatcher function
 * Convenience hook for accessing just the onAction handler
 *
 * @returns Action dispatcher function
 *
 * @example
 * ```tsx
 * function MyButton() {
 *   const onAction = useAction()
 *
 *   const handleClick = () => {
 *     onAction({ type: 'button.click', payload: { id: 'my-button' } })
 *   }
 *
 *   return <button onClick={handleClick}>Click me</button>
 * }
 * ```
 */
export function useAction(): (action: A2UIAction) => void {
  const { onAction } = useA2UI()
  return onAction
}
