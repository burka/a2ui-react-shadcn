/**
 * a2ui-shadcn-ui - Beautiful shadcn/ui components for A2UI protocol
 *
 * This package provides everything you need to render A2UI protocol messages:
 * - Core types, parser, and store from a2ui-shadcn-ui-core
 * - React hooks and components from a2ui-shadcn-ui-react
 * - shadcn/ui-based renderers for all A2UI component types
 *
 * @example
 * ```tsx
 * import { A2UIProvider, A2UISurface, shadcnRenderers } from 'a2ui-shadcn-ui'
 *
 * function App() {
 *   return (
 *     <A2UIProvider renderers={shadcnRenderers}>
 *       <A2UISurface surfaceId="my-surface" messages={messages} />
 *     </A2UIProvider>
 *   )
 * }
 * ```
 */

export const version = '0.1.0'

// ============================================================================
// Re-export everything from a2ui-shadcn-ui-core
// ============================================================================
export {
  // Types
  type A2UIComponent,
  type A2UIMessage,
  type A2UIStore,
  type Alignment,
  type BaseComponent,
  type BeginRenderingMessage,
  type ButtonComponent,
  // Builders
  buildMessages,
  type CardComponent,
  type CheckboxComponent,
  type ColumnComponent,
  type ComponentCatalog,
  type ComponentNode,
  type ComponentUpdate,
  c,
  // Store
  createStore,
  // Parser
  createStreamParser,
  type DataModelUpdateMessage,
  type DataValue,
  type DateTimeInputComponent,
  type DeleteSurfaceMessage,
  type Distribution,
  type DividerComponent,
  type ErrorCallback,
  // Data utilities
  getDataByPath,
  type IconComponent,
  type ImageComponent,
  type InputType,
  // Type Guards
  isBeginRenderingMessage,
  isDataModelUpdateMessage,
  isDeleteSurfaceMessage,
  isSurfaceUpdateMessage,
  type ListComponent,
  type MessageCallback,
  MessageParseError,
  type ModalComponent,
  type MultipleChoiceComponent,
  type Orientation,
  parseJSONL,
  parseMessage,
  type RowComponent,
  type SelectComponent,
  type SelectOption,
  type SliderComponent,
  type StoreSnapshot,
  type StreamParser,
  type Surface,
  type SurfaceUpdateMessage,
  setDataByPath,
  type TabItem,
  type TabsComponent,
  type TextComponent,
  type TextFieldComponent,
  type TextStyle,
} from 'a2ui-shadcn-ui-core'

// ============================================================================
// Re-export everything from a2ui-shadcn-ui-react
// ============================================================================
export {
  // Types
  type A2UIAction,
  // Context & Provider
  A2UIContext,
  type A2UIContextValue,
  A2UIProvider,
  type A2UIProviderProps,
  type A2UIRenderer,
  // Components
  A2UISurface,
  type A2UISurfaceProps,
  type ComponentRegistry,
  ComponentRenderer,
  type ComponentRendererProps,
  // Registry
  createRegistry,
  type DataAccessor,
  type DataBinding,
  type RendererExample,
  type RendererProps,
  // Hooks
  useA2UI,
  useAction,
  useDataBinding,
  useSurface,
} from 'a2ui-shadcn-ui-react'

// ============================================================================
// shadcn/ui Components
// ============================================================================
export * from './components/ui/button.js'
export * from './components/ui/checkbox.js'
export * from './components/ui/dialog.js'
export * from './components/ui/input.js'
export * from './components/ui/tabs.js'
export * from './components/ui/textarea.js'

// ============================================================================
// Utilities
// ============================================================================
export { cn } from './lib/utils.js'

// ============================================================================
// A2UI Renderers (the main export)
// ============================================================================
export * from './renderers/index.js'
