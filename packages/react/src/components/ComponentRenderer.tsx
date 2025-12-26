/**
 * ComponentRenderer
 * Recursively renders A2UI components using registered renderers
 */

import type { A2UIComponent, Surface } from 'a2ui-shadcn-ui-core'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useA2UI } from '../hooks/useA2UI.js'
import type { A2UIAction, DataAccessor } from '../registry/types.js'

/**
 * Props for ComponentRenderer
 */
export interface ComponentRendererProps {
  /** Component ID to render */
  componentId: string
  /** Surface containing the component */
  surface: Surface
  /** Optional surface-scoped action handler override */
  onAction?: (action: A2UIAction) => void
}

/**
 * Get child component IDs from a component
 */
function getChildIds(component: A2UIComponent): string[] {
  // Components with children arrays
  if ('children' in component && Array.isArray(component.children)) {
    return component.children
  }

  // Components with single 'child' property (Button, AnimatedButton, RippleButton, etc.)
  if ('child' in component && typeof component.child === 'string') {
    return [component.child]
  }

  // FlipButton has frontChild and backChild
  if ('frontChild' in component && 'backChild' in component) {
    const fc = component.frontChild as string
    const bc = component.backChild as string
    return [fc, bc]
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

  // AnimatedAccordion has items with trigger and content
  if ('items' in component && Array.isArray(component.items)) {
    const items = component.items as Array<{ trigger?: string; content?: string }>
    const ids: string[] = []
    for (const item of items) {
      if (item.trigger) ids.push(item.trigger)
      if (item.content) ids.push(item.content)
    }
    if (ids.length > 0) return ids
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
export function ComponentRenderer({
  componentId,
  surface,
  onAction: propOnAction,
}: ComponentRendererProps): ReactNode {
  const { registry, onAction: contextOnAction, store } = useA2UI()
  const onAction = propOnAction ?? contextOnAction

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
    <ComponentRenderer key={childId} componentId={childId} surface={surface} onAction={onAction} />
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
