/**
 * ComponentRenderer
 * Recursively renders A2UI components using registered renderers
 */

import type { A2UIComponent, Surface } from '@a2ui/core'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useA2UI } from '../hooks/useA2UI.js'
import type { DataAccessor } from '../registry/types.js'

/**
 * Props for ComponentRenderer
 */
export interface ComponentRendererProps {
  /** Component ID to render */
  componentId: string
  /** Surface containing the component */
  surface: Surface
}

/**
 * Get child component IDs from a component
 */
function getChildIds(component: A2UIComponent): string[] {
  // Components with children arrays
  if ('children' in component && Array.isArray(component.children)) {
    return component.children
  }

  // Button has a single child
  if (component.type === 'Button' && 'child' in component) {
    return [component.child]
  }

  // Modal has trigger and content
  if (component.type === 'Modal') {
    return [component.trigger, component.content]
  }

  // Tabs have content in each tab
  if (component.type === 'Tabs') {
    return component.tabs.map((tab) => tab.content)
  }

  // List has a template
  if (component.type === 'List' && 'template' in component) {
    return [component.template]
  }

  return []
}

/**
 * ComponentRenderer - Recursively renders A2UI components
 *
 * Looks up the appropriate renderer from the registry and renders the component.
 * Recursively renders child components and passes them as children prop.
 *
 * @example
 * ```tsx
 * <ComponentRenderer componentId="root" surface={surface} />
 * ```
 */
export function ComponentRenderer({ componentId, surface }: ComponentRendererProps): ReactNode {
  const { registry, onAction, store } = useA2UI()

  // Create data accessor for this surface (moved to top for hooks rule)
  const dataAccessor: DataAccessor = useMemo(
    () => ({
      get: <V,>(path: string) => store.getData(surface.id, path) as V | undefined,
      set: (path: string, value: unknown) => store.setData(surface.id, path, value),
    }),
    [store, surface.id],
  )

  // Get the component from the surface
  const component = surface.components[componentId]

  if (!component) {
    return null
  }

  // Get the renderer for this component type
  const renderer = registry.get(component.type)

  if (!renderer) {
    return (
      <div style={{ color: 'red', border: '1px solid red', padding: '8px' }}>
        No renderer for type: {component.type}
      </div>
    )
  }

  // Render child components recursively
  const childIds = getChildIds(component)
  const children = childIds.map((childId) => (
    <ComponentRenderer key={childId} componentId={childId} surface={surface} />
  ))

  // Render using the registered renderer
  return renderer.render({
    component,
    id: componentId,
    children,
    data: dataAccessor,
    onAction,
  })
}
