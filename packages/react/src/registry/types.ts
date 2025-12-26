/**
 * A2UI Renderer Types
 * Defines the interface for component renderers and their registration
 */

import type { A2UIMessage } from 'a2ui-shadcn-ui-core'
import type { ReactNode } from 'react'

/**
 * Action type - represents a user action triggered by a component
 * Actions are dispatched when users interact with components (button clicks, form submissions, etc.)
 */
export interface A2UIAction {
  /** Type of action (e.g., "submit", "cancel", "navigate") */
  type: string
  /** Optional payload data for the action */
  payload?: Record<string, unknown>
}

/**
 * Data accessor for reading and writing data model values
 */
export interface DataAccessor {
  /**
   * Get a value from the data model by path
   * @param path - Dot-notation path (e.g., "user.name")
   * @returns Value at the path or undefined if not found
   */
  get: <V>(path: string) => V | undefined

  /**
   * Set a value in the data model by path
   * @param path - Dot-notation path (e.g., "user.name")
   * @param value - Value to set
   */
  set: (path: string, value: unknown) => void
}

/**
 * Props passed to renderer functions
 */
export interface RendererProps<T = unknown> {
  /** The component data to render */
  component: T
  /** Unique component ID */
  id: string
  /** Pre-rendered child components */
  children: ReactNode[]
  /** Data accessor for reading/writing the data model */
  data: DataAccessor
  /** Action dispatcher for handling user interactions */
  onAction: (action: A2UIAction) => void
}

/**
 * Example definition for renderer showcase/documentation
 */
export interface RendererExample {
  /** Human-readable name */
  name: string
  /** Description of what this renderer does */
  description: string
  /** Category for grouping in showcases. 'a11y' is @extension a2ui-shadcn-ui */
  category: 'layout' | 'display' | 'interactive' | 'container' | 'animated' | 'charts' | 'a11y'
  /** Example A2UI messages demonstrating this renderer */
  messages: A2UIMessage[]
}

/**
 * A2UI Renderer - defines how to render a specific component type
 */
export interface A2UIRenderer<T = unknown> {
  /** Component type this renderer handles (e.g., "Button", "Text") */
  type: string
  /** Render function that converts component data to React elements */
  render: (props: RendererProps<T>) => ReactNode
  /** Optional example for showcase/documentation */
  example?: RendererExample
}

/**
 * Component registry interface
 */
export interface ComponentRegistry {
  /** Register a renderer for a component type */
  register: (renderer: A2UIRenderer) => void
  /** Get renderer by component type */
  get: (type: string) => A2UIRenderer | undefined
  /** Get all registered renderers */
  getAll: () => A2UIRenderer[]
}
