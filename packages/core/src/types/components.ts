/**
 * A2UI component types
 * Defines all component types supported by the A2UI protocol
 */

/**
 * Distribution strategy for Row/Column layouts
 */
export type Distribution = 'packed' | 'equal' | 'spaceBetween' | 'spaceAround'

/**
 * Alignment strategy for Row/Column layouts
 */
export type Alignment = 'start' | 'center' | 'end' | 'stretch'

/**
 * Text style hints
 */
export type TextStyle = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body'

/**
 * TextField input types
 */
export type InputType = 'date' | 'longText' | 'number' | 'shortText' | 'obscured'

/**
 * Divider orientation
 */
export type Orientation = 'horizontal' | 'vertical'

/**
 * Base component with common properties
 */
export interface BaseComponent {
  /** Unique identifier for the component */
  id: string
}

/**
 * Layout Components
 */

export interface RowComponent extends BaseComponent {
  type: 'Row'
  distribution?: Distribution
  alignment?: Alignment
  children?: string[]
}

export interface ColumnComponent extends BaseComponent {
  type: 'Column'
  distribution?: Distribution
  alignment?: Alignment
  children?: string[]
}

/**
 * Display Components
 */

export interface TextComponent extends BaseComponent {
  type: 'Text'
  content: string
  style?: TextStyle
  dataPath?: string
}

export interface ImageComponent extends BaseComponent {
  type: 'Image'
  url: string
  alt?: string
}

export interface IconComponent extends BaseComponent {
  type: 'Icon'
  name: string
}

export interface DividerComponent extends BaseComponent {
  type: 'Divider'
  orientation?: Orientation
}

export interface VideoComponent extends BaseComponent {
  type: 'Video'
  url: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
}

export interface AudioPlayerComponent extends BaseComponent {
  type: 'AudioPlayer'
  url: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
}

/**
 * Interactive Components
 */

export interface ButtonComponent extends BaseComponent {
  type: 'Button'
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  /** Data paths to include in action payload (reads from data model) */
  submitDataPaths?: string[]
}

export interface TextFieldComponent extends BaseComponent {
  type: 'TextField'
  label?: string
  inputType?: InputType
  dataPath?: string
}

export interface CheckboxComponent extends BaseComponent {
  type: 'Checkbox'
  label?: string
  dataPath?: string
}

/**
 * Option for Select and MultipleChoice components
 */
export interface SelectOption {
  value: string
  label: string
}

export interface SelectComponent extends BaseComponent {
  type: 'Select'
  options: SelectOption[]
  placeholder?: string
  dataPath?: string
}

export interface SliderComponent extends BaseComponent {
  type: 'Slider'
  min?: number
  max?: number
  step?: number
  dataPath?: string
}

export interface DateTimeInputComponent extends BaseComponent {
  type: 'DateTimeInput'
  inputType: 'date' | 'time' | 'datetime-local'
  label?: string
  dataPath?: string
}

export interface MultipleChoiceComponent extends BaseComponent {
  type: 'MultipleChoice'
  options: SelectOption[]
  maxSelections?: number
  dataPath?: string
}

export interface AnimatedButtonComponent extends BaseComponent {
  type: 'AnimatedButton'
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
}

/**
 * Container Components
 */

export interface CardComponent extends BaseComponent {
  type: 'Card'
  children?: string[]
}

export interface ModalComponent extends BaseComponent {
  type: 'Modal'
  trigger: string
  content: string
}

export interface TabItem {
  label: string
  content: string
}

export interface TabsComponent extends BaseComponent {
  type: 'Tabs'
  tabs: TabItem[]
}

export interface ListComponent extends BaseComponent {
  type: 'List'
  template: string
  dataPath?: string
}

/**
 * Union type of all components
 */
export type A2UIComponent =
  | RowComponent
  | ColumnComponent
  | TextComponent
  | ImageComponent
  | IconComponent
  | DividerComponent
  | VideoComponent
  | AudioPlayerComponent
  | ButtonComponent
  | TextFieldComponent
  | CheckboxComponent
  | SelectComponent
  | SliderComponent
  | DateTimeInputComponent
  | MultipleChoiceComponent
  | AnimatedButtonComponent
  | CardComponent
  | ModalComponent
  | TabsComponent
  | ListComponent

/**
 * Component update for surfaceUpdate messages
 */
export interface ComponentUpdate {
  /** Component ID to update */
  id: string
  /** Updated component data (partial or full) */
  component: Partial<A2UIComponent>
}

/**
 * Component catalog - maps component IDs to components
 */
export type ComponentCatalog = Record<string, A2UIComponent>
