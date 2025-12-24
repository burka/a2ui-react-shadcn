/**
 * @a2ui/react - React components and hooks for A2UI protocol
 *
 * This package provides:
 * - React context and provider for A2UI
 * - Component registry for registering custom renderers
 * - Hooks for accessing store, data binding, and actions
 * - Components for rendering A2UI surfaces
 *
 * Requires React 19.0.0 or higher
 */

export const version = '0.1.0'

export type { A2UISurfaceProps, ComponentRendererProps } from './components/index.js'
// Export components
export { A2UISurface, ComponentRenderer } from './components/index.js'
export type { A2UIContextValue, A2UIProviderProps } from './context/index.js'
// Export context and provider
export { A2UIContext, A2UIProvider } from './context/index.js'
export type { DataBinding } from './hooks/index.js'
// Export hooks
export { useA2UI, useAction, useDataBinding, useSurface } from './hooks/index.js'
export type {
  A2UIAction,
  A2UIRenderer,
  ComponentRegistry,
  DataAccessor,
  RendererExample,
  RendererProps,
} from './registry/index.js'
// Export registry
export { createRegistry } from './registry/index.js'
