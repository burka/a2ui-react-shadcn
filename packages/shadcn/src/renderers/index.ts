import type { A2UIRenderer } from 'a2ui-react-react'
import { createRegistry } from 'a2ui-react-react'
// Accessibility Extension Components (@extension a2ui-react)
import {
  AlertRenderer,
  ArticleRenderer,
  AsideRenderer,
  FooterRenderer,
  HeaderRenderer,
  LiveRegionRenderer,
  MainRenderer,
  NavRenderer,
  ProgressRenderer,
  SectionRenderer,
  SkipLinkRenderer,
} from './a11y/index.js'
// Animated UI Components
import {
  // Containers
  AnimatedAccordionRenderer,
  AnimatedAvatarGroupRenderer,
  AnimatedCardRenderer,
  AnimatedDialogRenderer,
  AnimatedTabsRenderer,
  // Utility
  AnimatedTooltipRenderer,
  AuroraBackgroundRenderer,
  BlurRevealTextRenderer,
  BubbleBackgroundRenderer,
  CopyButtonRenderer,
  CountUpRenderer,
  CursorRenderer,
  FireworksBackgroundRenderer,
  FlipButtonRenderer,
  FlipCardRenderer,
  GlowButtonRenderer,
  // Backgrounds
  GradientBackgroundRenderer,
  GradientTextRenderer,
  GravityStarsBackgroundRenderer,
  HexagonBackgroundRenderer,
  HoleBackgroundRenderer,
  IconButtonRenderer,
  LiquidButtonRenderer,
  MagneticButtonRenderer,
  MorphingIconRenderer,
  ParticlesBackgroundRenderer,
  // Buttons
  RippleButtonRenderer,
  ShimmerButtonRenderer,
  SpotlightRenderer,
  StarsBackgroundRenderer,
  TextScrambleRenderer,
  ThemeTogglerButtonRenderer,
  // Text
  TypewriterTextRenderer,
} from './animated/index.js'
// Animated Overrides - same types as standard components but with animations
import {
  AnimatedButtonOverride,
  AnimatedCardOverride,
  AnimatedCheckboxOverride,
  AnimatedModalOverride,
  AnimatedSelectOverride,
  AnimatedTabsOverride,
  AnimatedTextOverride,
} from './animated/overrides/index.js'
// Chart Components
import {
  AreaChartRenderer,
  BarChartRenderer,
  LineChartRenderer,
  PieChartRenderer,
} from './charts/index.js'
import { CardRenderer, ListRenderer, ModalRenderer, TabsRenderer } from './container/index.js'
import {
  AudioPlayerRenderer,
  DividerRenderer,
  IconRenderer,
  ImageRenderer,
  TextRenderer,
  VideoRenderer,
} from './display/index.js'
import {
  AnimatedButtonRenderer,
  ButtonRenderer,
  CheckboxRenderer,
  DateTimeInputRenderer,
  MultipleChoiceRenderer,
  SelectRenderer,
  SliderRenderer,
  TextFieldRenderer,
} from './interactive/index.js'
import { ColumnRenderer, RowRenderer } from './layout/index.js'

/**
 * Array of all shadcn renderers (standard, no animations)
 */
export const shadcnRenderers = [
  // Layout
  RowRenderer,
  ColumnRenderer,
  // Display
  TextRenderer,
  ImageRenderer,
  IconRenderer,
  DividerRenderer,
  VideoRenderer,
  AudioPlayerRenderer,
  // Interactive
  ButtonRenderer,
  AnimatedButtonRenderer,
  TextFieldRenderer,
  CheckboxRenderer,
  SelectRenderer,
  SliderRenderer,
  DateTimeInputRenderer,
  MultipleChoiceRenderer,
  // Container
  CardRenderer,
  ModalRenderer,
  TabsRenderer,
  ListRenderer,
  // Charts
  PieChartRenderer,
  BarChartRenderer,
  LineChartRenderer,
  AreaChartRenderer,
] as A2UIRenderer[]

/**
 * Array of chart renderers for data visualization
 */
export const chartRenderers = [
  PieChartRenderer,
  BarChartRenderer,
  LineChartRenderer,
  AreaChartRenderer,
] as A2UIRenderer[]

/**
 * @extension a2ui-react
 * Accessibility extension renderers for WCAG 2.1 AA compliance.
 * These are NOT part of the official A2UI standard but are recommended for accessibility.
 * Includes: Landmarks (Main, Nav, Section, Aside, Header, Footer, Article),
 * Alert, LiveRegion, SkipLink, and Progress components.
 */
export const a11yRenderers = [
  // Landmark Components
  MainRenderer,
  NavRenderer,
  SectionRenderer,
  AsideRenderer,
  HeaderRenderer,
  FooterRenderer,
  ArticleRenderer,
  // Alert & Live Region Components
  AlertRenderer,
  LiveRegionRenderer,
  // Navigation & Progress Components
  SkipLinkRenderer,
  ProgressRenderer,
] as A2UIRenderer[]

/**
 * Animated overrides for standard components
 * These use the SAME type names but add Framer Motion animations
 */
export const animatedOverrides = [
  AnimatedButtonOverride,
  AnimatedTabsOverride,
  AnimatedCardOverride,
  AnimatedCheckboxOverride,
  AnimatedModalOverride,
  AnimatedTextOverride,
  AnimatedSelectOverride,
] as A2UIRenderer[]

/**
 * Array of all animated UI renderers (animate-ui.com alternative)
 * Import these separately if you want to include animated components
 */
export const animatedRenderers = [
  // Animated Buttons
  RippleButtonRenderer,
  FlipButtonRenderer,
  ShimmerButtonRenderer,
  MagneticButtonRenderer,
  GlowButtonRenderer,
  LiquidButtonRenderer,
  CopyButtonRenderer,
  IconButtonRenderer,
  ThemeTogglerButtonRenderer,
  // Animated Text
  TypewriterTextRenderer,
  GradientTextRenderer,
  CountUpRenderer,
  TextScrambleRenderer,
  BlurRevealTextRenderer,
  // Animated Containers
  AnimatedAccordionRenderer,
  AnimatedDialogRenderer,
  AnimatedCardRenderer,
  AnimatedTabsRenderer,
  FlipCardRenderer,
  // Animated Backgrounds
  GradientBackgroundRenderer,
  ParticlesBackgroundRenderer,
  AuroraBackgroundRenderer,
  BubbleBackgroundRenderer,
  FireworksBackgroundRenderer,
  StarsBackgroundRenderer,
  HexagonBackgroundRenderer,
  HoleBackgroundRenderer,
  GravityStarsBackgroundRenderer,
  // Utility Animations
  AnimatedTooltipRenderer,
  AnimatedAvatarGroupRenderer,
  SpotlightRenderer,
  MorphingIconRenderer,
  CursorRenderer,
] as A2UIRenderer[]

/**
 * All renderers including animated components (but NOT animated overrides)
 */
export const allRenderers = [...shadcnRenderers, ...animatedRenderers] as A2UIRenderer[]

/**
 * All renderers with animated overrides - standard components behave with animations
 * The overrides are registered LAST so they replace the standard versions
 */
export const allAnimatedRenderers = [
  ...shadcnRenderers,
  ...animatedRenderers,
  ...animatedOverrides,
] as A2UIRenderer[]

/**
 * Creates a shadcn renderer registry with all renderers registered
 * @param options.includeAnimated - Include animated components (RippleButton, etc.)
 * @param options.useAnimatedOverrides - Replace standard components with animated versions
 * @param options.includeA11y - Include accessibility extension components (@extension a2ui-react)
 * @returns A component registry with all shadcn renderers
 */
export function createShadcnRegistry(options?: {
  includeAnimated?: boolean
  useAnimatedOverrides?: boolean
  includeA11y?: boolean
}) {
  const registry = createRegistry()

  // Register standard renderers first
  for (const renderer of shadcnRenderers) {
    registry.register(renderer)
  }

  // Add accessibility extension components if requested (@extension a2ui-react)
  if (options?.includeA11y) {
    for (const renderer of a11yRenderers) {
      registry.register(renderer)
    }
  }

  // Add animated components if requested
  if (options?.includeAnimated) {
    for (const renderer of animatedRenderers) {
      registry.register(renderer)
    }
  }

  // Register overrides LAST to replace standard components with animated versions
  if (options?.useAnimatedOverrides) {
    for (const renderer of animatedOverrides) {
      registry.register(renderer)
    }
  }

  return registry
}

/**
 * Creates a registry with only animated components
 * @returns A component registry with all animated renderers
 */
export function createAnimatedRegistry() {
  const registry = createRegistry()
  for (const renderer of animatedRenderers) {
    registry.register(renderer)
  }
  return registry
}

/**
 * Creates a fully animated registry - all standard components are replaced with animated versions
 * @returns A component registry where Button, Card, Tabs, etc. all have animations
 */
export function createFullyAnimatedRegistry() {
  return createShadcnRegistry({
    includeAnimated: true,
    useAnimatedOverrides: true,
  })
}

/**
 * @extension a2ui-react
 * Creates a registry with accessibility extension components for WCAG 2.1 AA compliance.
 * @returns A component registry with standard shadcn + a11y extension renderers
 */
export function createAccessibleRegistry() {
  return createShadcnRegistry({
    includeA11y: true,
  })
}

/**
 * @extension a2ui-react
 * Creates a complete registry with all features: standard, animated, and accessibility.
 * @returns A component registry with all renderers
 */
export function createCompleteRegistry() {
  return createShadcnRegistry({
    includeAnimated: true,
    useAnimatedOverrides: true,
    includeA11y: true,
  })
}

// Re-export all animated components for individual use
export {
  // Buttons
  RippleButtonRenderer,
  FlipButtonRenderer,
  ShimmerButtonRenderer,
  MagneticButtonRenderer,
  GlowButtonRenderer,
  LiquidButtonRenderer,
  CopyButtonRenderer,
  IconButtonRenderer,
  ThemeTogglerButtonRenderer,
  // Text
  TypewriterTextRenderer,
  GradientTextRenderer,
  CountUpRenderer,
  TextScrambleRenderer,
  BlurRevealTextRenderer,
  // Containers
  AnimatedAccordionRenderer,
  AnimatedDialogRenderer,
  AnimatedCardRenderer,
  AnimatedTabsRenderer,
  FlipCardRenderer,
  // Backgrounds
  GradientBackgroundRenderer,
  ParticlesBackgroundRenderer,
  AuroraBackgroundRenderer,
  BubbleBackgroundRenderer,
  FireworksBackgroundRenderer,
  StarsBackgroundRenderer,
  HexagonBackgroundRenderer,
  HoleBackgroundRenderer,
  GravityStarsBackgroundRenderer,
  // Utility
  AnimatedTooltipRenderer,
  AnimatedAvatarGroupRenderer,
  SpotlightRenderer,
  MorphingIconRenderer,
  CursorRenderer,
  // Overrides
  AnimatedButtonOverride,
  AnimatedTabsOverride,
  AnimatedCardOverride,
  AnimatedCheckboxOverride,
  AnimatedModalOverride,
  AnimatedTextOverride,
  AnimatedSelectOverride,
  // Charts
  PieChartRenderer,
  BarChartRenderer,
  LineChartRenderer,
  AreaChartRenderer,
}

// Re-export accessibility extension components (@extension a2ui-react)
export {
  // Landmark Components
  MainRenderer,
  NavRenderer,
  SectionRenderer,
  AsideRenderer,
  HeaderRenderer,
  FooterRenderer,
  ArticleRenderer,
  // Alert & Live Region Components
  AlertRenderer,
  LiveRegionRenderer,
  // Navigation & Progress Components
  SkipLinkRenderer,
  ProgressRenderer,
}

// Re-export chart utilities
export {
  buildChartConfig,
  DEFAULT_CHART_COLORS,
  getChartColor,
  getChartData,
  transformToRechartsData,
} from './charts/index.js'

export type { RendererRegistry } from './types.js'
