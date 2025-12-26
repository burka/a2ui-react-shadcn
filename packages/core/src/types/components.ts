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
 * Animated UI Components
 * Alternative set of components with rich animations (animate-ui.com style)
 */

// Animated Buttons
export interface RippleButtonComponent extends BaseComponent {
  type: 'RippleButton'
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  rippleColor?: string
}

export interface FlipButtonComponent extends BaseComponent {
  type: 'FlipButton'
  frontChild: string
  backChild: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
}

export interface ShimmerButtonComponent extends BaseComponent {
  type: 'ShimmerButton'
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  shimmerColor?: string
  shimmerDuration?: number
}

export interface MagneticButtonComponent extends BaseComponent {
  type: 'MagneticButton'
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  strength?: number
}

export interface GlowButtonComponent extends BaseComponent {
  type: 'GlowButton'
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  glowColor?: string
  glowIntensity?: number
}

export interface LiquidButtonComponent extends BaseComponent {
  type: 'liquid-button'
  label?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary'
  liquidColor?: string
  duration?: number
}

export interface CopyButtonComponent extends BaseComponent {
  type: 'copy-button'
  text: string
  label?: string
  copiedLabel?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  showIcon?: boolean
  duration?: number
}

export interface IconButtonComponent extends BaseComponent {
  type: 'icon-button'
  icon?: string
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  animation?: 'scale' | 'rotate' | 'bounce' | 'shake' | 'pulse'
  tooltip?: string
}

export interface ThemeTogglerButtonComponent extends BaseComponent {
  type: 'theme-toggler-button'
  initialTheme?: 'light' | 'dark'
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  animation?: 'rotate' | 'flip' | 'scale' | 'slide'
}

// Animated Text
export interface TypewriterTextComponent extends BaseComponent {
  type: 'TypewriterText'
  content: string
  style?: TextStyle
  speed?: number
  cursor?: boolean
  cursorChar?: string
  loop?: boolean
  delayBetweenLoops?: number
}

export interface GradientTextComponent extends BaseComponent {
  type: 'GradientText'
  content: string
  style?: TextStyle
  colors?: string[]
  animationDuration?: number
  direction?: 'horizontal' | 'vertical' | 'diagonal'
}

export interface CountUpComponent extends BaseComponent {
  type: 'CountUp'
  from?: number
  to: number
  duration?: number
  style?: TextStyle
  prefix?: string
  suffix?: string
  decimals?: number
  separator?: string
}

export interface TextScrambleComponent extends BaseComponent {
  type: 'TextScramble'
  content: string
  style?: TextStyle
  speed?: number
  characters?: string
  trigger?: 'mount' | 'hover'
}

export interface BlurRevealTextComponent extends BaseComponent {
  type: 'BlurRevealText'
  content: string
  style?: TextStyle
  delay?: number
  duration?: number
  staggerChildren?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

// Animated Containers
export interface AnimatedAccordionItem {
  trigger: string
  content: string
}

export interface AnimatedAccordionComponent extends BaseComponent {
  type: 'AnimatedAccordion'
  items: AnimatedAccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: number[]
}

export interface AnimatedDialogComponent extends BaseComponent {
  type: 'AnimatedDialog'
  trigger: string
  content: string
  title?: string
  description?: string
  animation?: 'scale' | 'slide' | 'flip' | 'rotate'
}

export interface AnimatedCardComponent extends BaseComponent {
  type: 'AnimatedCard'
  children?: string[]
  animation?: 'hover-lift' | 'hover-glow' | 'hover-border' | 'tilt'
  delay?: number
}

export interface AnimatedTabItem {
  label: string
  content: string
}

export interface AnimatedTabsComponent extends BaseComponent {
  type: 'AnimatedTabs'
  tabs: AnimatedTabItem[]
  defaultTab?: number
  animation?: 'slide' | 'fade' | 'scale'
}

export interface FlipCardComponent extends BaseComponent {
  type: 'FlipCard'
  front: string
  back: string
  trigger?: 'hover' | 'click'
  direction?: 'horizontal' | 'vertical'
  height?: string
}

// Animated Backgrounds
export interface GradientBackgroundComponent extends BaseComponent {
  type: 'GradientBackground'
  children?: string[]
  colors?: string[]
  speed?: number
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'radial'
  blur?: number
}

export interface ParticlesBackgroundComponent extends BaseComponent {
  type: 'ParticlesBackground'
  children?: string[]
  particleCount?: number
  particleColor?: string
  particleSize?: number
  speed?: number
  connected?: boolean
}

export interface AuroraBackgroundComponent extends BaseComponent {
  type: 'AuroraBackground'
  children?: string[]
  colors?: string[]
  speed?: number
  blur?: number
}

export interface BubbleBackgroundComponent extends BaseComponent {
  type: 'bubble-background'
  children?: string[]
  bubbleCount?: number
  minSize?: number
  maxSize?: number
  color?: string
  speed?: number
}

export interface FireworksBackgroundComponent extends BaseComponent {
  type: 'fireworks-background'
  children?: string[]
  frequency?: number
  particleCount?: number
  colors?: string[]
  autoPlay?: boolean
}

export interface StarsBackgroundComponent extends BaseComponent {
  type: 'stars-background'
  children?: string[]
  starCount?: number
  minSize?: number
  maxSize?: number
  color?: string
  twinkle?: boolean
  speed?: number
}

export interface HexagonBackgroundComponent extends BaseComponent {
  type: 'hexagon-background'
  children?: string[]
  rows?: number
  cols?: number
  color?: string
  hoverEffect?: boolean
  animated?: boolean
  gap?: number
}

export interface HoleBackgroundComponent extends BaseComponent {
  type: 'hole-background'
  children?: string[]
  holeSize?: number
  color?: string
  rings?: number
  animated?: boolean
  pulseSpeed?: number
}

export interface GravityStarsBackgroundComponent extends BaseComponent {
  type: 'gravity-stars-background'
  children?: string[]
  starCount?: number
  minSize?: number
  maxSize?: number
  color?: string
  gravity?: number
  interactive?: boolean
}

// Utility Animations
export interface AnimatedTooltipComponent extends BaseComponent {
  type: 'AnimatedTooltip'
  trigger: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  animation?: 'scale' | 'slide' | 'fade'
}

export interface AvatarItem {
  src?: string
  alt?: string
  fallback: string
}

export interface AnimatedAvatarGroupComponent extends BaseComponent {
  type: 'AnimatedAvatarGroup'
  avatars: AvatarItem[]
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
  animation?: 'expand' | 'pop' | 'slide'
}

export interface SpotlightComponent extends BaseComponent {
  type: 'Spotlight'
  children?: string[]
  spotlightColor?: string
  spotlightSize?: number
  intensity?: number
}

export interface MorphingIconComponent extends BaseComponent {
  type: 'MorphingIcon'
  icons: string[]
  trigger?: 'hover' | 'click' | 'auto'
  interval?: number
  size?: number
  color?: string
}

export interface CursorComponent extends BaseComponent {
  type: 'cursor'
  children?: string[]
  size?: number
  color?: string
  trailLength?: number
  smoothing?: number
  showTrail?: boolean
  mixBlendMode?: string
}

/**
 * Chart Components
 * Data visualization components using Recharts
 */

/**
 * Single data point for charts
 */
export interface ChartDataItem {
  /** Label for the data point (x-axis or segment name) */
  label: string
  /** Numeric value */
  value: number
  /** Optional color override for this data point */
  color?: string
  /** Additional data fields for multi-series charts */
  [key: string]: unknown
}

/**
 * Pie/Donut Chart Component
 */
export interface PieChartComponent extends BaseComponent {
  type: 'PieChart'
  /** Static data array */
  data?: ChartDataItem[]
  /** Path to data in data model (alternative to static data) */
  dataPath?: string
  /** Render as donut chart (hole in center) */
  donut?: boolean
  /** Inner radius for donut (0-1, percentage of outer radius) */
  innerRadius?: number
  /** Show labels on segments */
  showLabels?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Enable animations */
  animated?: boolean
  /** Chart height in pixels */
  height?: number
  /** Custom colors array */
  colors?: string[]
}

/**
 * Bar Chart Component
 */
export interface BarChartComponent extends BaseComponent {
  type: 'BarChart'
  /** Static data array */
  data?: ChartDataItem[]
  /** Path to data in data model */
  dataPath?: string
  /** Horizontal bar orientation */
  horizontal?: boolean
  /** Show grid lines */
  showGrid?: boolean
  /** Show X axis */
  showXAxis?: boolean
  /** Show Y axis */
  showYAxis?: boolean
  /** Enable animations */
  animated?: boolean
  /** Chart height in pixels */
  height?: number
  /** Custom colors array */
  colors?: string[]
  /** Bar radius (rounded corners) */
  radius?: number
}

/**
 * Line Chart Component
 */
export interface LineChartComponent extends BaseComponent {
  type: 'LineChart'
  /** Static data array */
  data?: ChartDataItem[]
  /** Path to data in data model */
  dataPath?: string
  /** Smooth curve interpolation */
  smooth?: boolean
  /** Show dots on data points */
  showDots?: boolean
  /** Show grid lines */
  showGrid?: boolean
  /** Show X axis */
  showXAxis?: boolean
  /** Show Y axis */
  showYAxis?: boolean
  /** Enable animations */
  animated?: boolean
  /** Chart height in pixels */
  height?: number
  /** Line color */
  color?: string
  /** Stroke width */
  strokeWidth?: number
}

/**
 * Area Chart Component
 */
export interface AreaChartComponent extends BaseComponent {
  type: 'AreaChart'
  /** Static data array */
  data?: ChartDataItem[]
  /** Path to data in data model */
  dataPath?: string
  /** Smooth curve interpolation */
  smooth?: boolean
  /** Show dots on data points */
  showDots?: boolean
  /** Show grid lines */
  showGrid?: boolean
  /** Show X axis */
  showXAxis?: boolean
  /** Show Y axis */
  showYAxis?: boolean
  /** Enable animations */
  animated?: boolean
  /** Chart height in pixels */
  height?: number
  /** Area fill color */
  color?: string
  /** Fill opacity (0-1) */
  fillOpacity?: number
  /** Enable gradient fill */
  gradient?: boolean
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
  // Animated UI Components
  | RippleButtonComponent
  | FlipButtonComponent
  | ShimmerButtonComponent
  | MagneticButtonComponent
  | GlowButtonComponent
  | TypewriterTextComponent
  | GradientTextComponent
  | CountUpComponent
  | TextScrambleComponent
  | BlurRevealTextComponent
  | AnimatedAccordionComponent
  | AnimatedDialogComponent
  | AnimatedCardComponent
  | AnimatedTabsComponent
  | FlipCardComponent
  | GradientBackgroundComponent
  | ParticlesBackgroundComponent
  | AuroraBackgroundComponent
  | AnimatedTooltipComponent
  | AnimatedAvatarGroupComponent
  | SpotlightComponent
  | MorphingIconComponent
  // New animate-ui.com components
  | LiquidButtonComponent
  | CopyButtonComponent
  | IconButtonComponent
  | ThemeTogglerButtonComponent
  | BubbleBackgroundComponent
  | FireworksBackgroundComponent
  | StarsBackgroundComponent
  | HexagonBackgroundComponent
  | HoleBackgroundComponent
  | GravityStarsBackgroundComponent
  | CursorComponent
  // Chart components
  | PieChartComponent
  | BarChartComponent
  | LineChartComponent
  | AreaChartComponent

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
