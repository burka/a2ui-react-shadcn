/**
 * A2UI message builders
 * Helpers for creating A2UI messages from nested component trees
 */

import type {
  ComponentUpdate,
  CreateSurfaceMessage,
  UpdateComponentsMessage,
  UpdateDataModelMessage,
} from '../types/index.js'

/**
 * A component node in a nested tree structure.
 * Unlike A2UIComponent, children are inline objects rather than ID references.
 */
export interface ComponentNode {
  type: string
  /** Inline children for container components (Row, Column, Card, etc.) */
  children?: ComponentNode[]
  /** Inline child for Button */
  child?: ComponentNode
  /** Inline content child for Modal */
  content?: ComponentNode | string
  /** Inline trigger child for Modal */
  trigger?: ComponentNode | string
  /** Inline template for List */
  template?: ComponentNode | string
  /** Tab items with inline content */
  tabs?: Array<{ label: string; content: ComponentNode | string }>
  /** All other component properties */
  [key: string]: unknown
}

/**
 * Build A2UI messages from a nested component tree.
 *
 * Takes a nested component structure where children are inline objects,
 * and produces the flat A2UI message format with auto-generated IDs.
 *
 * @param surfaceId - Unique identifier for the surface
 * @param root - Root component node with nested children
 * @param initialData - Optional initial data model values to set
 * @returns Array of A2UI messages ready for A2UISurface
 *
 * @example
 * ```ts
 * const messages = buildMessages('my-surface', {
 *   type: 'Column',
 *   alignment: 'center',
 *   children: [
 *     { type: 'Text', content: 'Hello World', style: 'h1' },
 *     { type: 'Row', distribution: 'spaceBetween', children: [
 *       { type: 'Button', primary: true, child: { type: 'Text', content: 'Click me' } },
 *       { type: 'Icon', name: 'Settings' }
 *     ]}
 *   ]
 * }, { count: 0 })
 * ```
 */
export function buildMessages(
  surfaceId: string,
  root: ComponentNode,
  initialData?: Record<string, unknown>,
): Array<CreateSurfaceMessage | UpdateComponentsMessage | UpdateDataModelMessage> {
  const components: ComponentUpdate[] = []
  let idCounter = 0

  function generateId(type: string): string {
    return `${type.toLowerCase()}-${++idCounter}`
  }

  function processNode(node: ComponentNode): string {
    const id = generateId(node.type)
    const component: Record<string, unknown> = { type: node.type, id }

    // Copy all properties except nested ones we handle specially
    for (const [key, value] of Object.entries(node)) {
      if (['children', 'child', 'content', 'trigger', 'template', 'tabs'].includes(key)) {
        continue
      }
      component[key] = value
    }

    // Process inline children array (Row, Column, Card)
    if (node.children) {
      component.children = node.children.map((child) => processNode(child))
    }

    // Process inline child (Button)
    if (node.child) {
      component.child = processNode(node.child)
    }

    // Process Modal content/trigger
    if (node.type === 'Modal') {
      if (node.trigger) {
        component.trigger =
          typeof node.trigger === 'string' ? node.trigger : processNode(node.trigger)
      }
      if (node.content) {
        component.content =
          typeof node.content === 'string' ? node.content : processNode(node.content)
      }
    }

    // Process List template
    if (node.type === 'List' && node.template) {
      component.template =
        typeof node.template === 'string' ? node.template : processNode(node.template)
    }

    // Process Tabs
    if (node.type === 'Tabs' && node.tabs) {
      component.tabs = node.tabs.map((tab) => ({
        label: tab.label,
        content: typeof tab.content === 'string' ? tab.content : processNode(tab.content),
      }))
    }

    components.push({ id, component })
    return id
  }

  const rootId = processNode(root)

  const result: Array<CreateSurfaceMessage | UpdateComponentsMessage | UpdateDataModelMessage> = [
    { createSurface: { surfaceId, root: rootId } },
    { updateComponents: { surfaceId, components } },
  ]

  // Add updateDataModel messages if initialData provided (one per key)
  if (initialData && Object.keys(initialData).length > 0) {
    for (const [path, value] of Object.entries(initialData)) {
      result.push({ updateDataModel: { surfaceId, path, op: 'add', value } })
    }
  }

  return result
}

/**
 * Shorthand component node creators for cleaner syntax.
 *
 * @example
 * ```ts
 * import { c, buildMessages } from 'a2ui-shadcn-ui-core'
 *
 * const messages = buildMessages('ui', c.column({ alignment: 'center' }, [
 *   c.text('Hello', { style: 'h1' }),
 *   c.row({ distribution: 'spaceBetween' }, [
 *     c.button(c.text('Click'), { primary: true }),
 *     c.icon('Settings')
 *   ])
 * ]))
 * ```
 */
export const c = {
  // Layout
  row: (props: Omit<ComponentNode, 'type' | 'children'>, children: ComponentNode[] = []) => ({
    type: 'Row' as const,
    ...props,
    children,
  }),
  column: (props: Omit<ComponentNode, 'type' | 'children'>, children: ComponentNode[] = []) => ({
    type: 'Column' as const,
    ...props,
    children,
  }),

  // Display
  text: (content: string, props: Omit<ComponentNode, 'type' | 'content'> = {}) => ({
    type: 'Text' as const,
    content,
    ...props,
  }),
  image: (url: string, props: Omit<ComponentNode, 'type' | 'url'> = {}) => ({
    type: 'Image' as const,
    url,
    ...props,
  }),
  icon: (name: string, props: Omit<ComponentNode, 'type' | 'name'> = {}) => ({
    type: 'Icon' as const,
    name,
    ...props,
  }),
  divider: (props: Omit<ComponentNode, 'type'> = {}) => ({
    type: 'Divider' as const,
    ...props,
  }),

  // Interactive
  button: (child: ComponentNode, props: Omit<ComponentNode, 'type' | 'child'> = {}) => ({
    type: 'Button' as const,
    child,
    ...props,
  }),
  textField: (props: Omit<ComponentNode, 'type'> = {}) => ({
    type: 'TextField' as const,
    ...props,
  }),
  checkbox: (props: Omit<ComponentNode, 'type'> = {}) => ({
    type: 'Checkbox' as const,
    ...props,
  }),
  select: (
    options: Array<{ value: string; label: string }>,
    props: Omit<ComponentNode, 'type' | 'options'> = {},
  ) => ({
    type: 'Select' as const,
    options,
    ...props,
  }),
  slider: (props: Omit<ComponentNode, 'type'> = {}) => ({
    type: 'Slider' as const,
    ...props,
  }),

  // Container
  card: (props: Omit<ComponentNode, 'type' | 'children'>, children: ComponentNode[] = []) => ({
    type: 'Card' as const,
    ...props,
    children,
  }),
  tabs: (
    tabs: Array<{ label: string; content: ComponentNode }>,
    props: Omit<ComponentNode, 'type' | 'tabs'> = {},
  ) => ({
    type: 'Tabs' as const,
    tabs,
    ...props,
  }),
}
