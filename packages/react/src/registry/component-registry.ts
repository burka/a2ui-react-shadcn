/**
 * Component Registry Implementation
 * Provides registration and lookup for component renderers
 */

import type { A2UIRenderer, ComponentRegistry } from './types.js'

/**
 * Create a new component registry
 * @returns ComponentRegistry instance
 */
export function createRegistry(): ComponentRegistry {
  const renderers = new Map<string, A2UIRenderer>()

  return {
    /**
     * Register a renderer for a component type
     * @param renderer - Renderer to register
     */
    register(renderer: A2UIRenderer): void {
      renderers.set(renderer.type, renderer)
    },

    /**
     * Get a renderer by component type
     * @param type - Component type (e.g., "Button", "Text")
     * @returns Renderer or undefined if not found
     */
    get(type: string): A2UIRenderer | undefined {
      return renderers.get(type)
    },

    /**
     * Get all registered renderers
     * Useful for building showcases and documentation
     * @returns Array of all renderers
     */
    getAll(): A2UIRenderer[] {
      return Array.from(renderers.values())
    },
  }
}
