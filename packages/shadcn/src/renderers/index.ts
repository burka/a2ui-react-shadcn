import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { createRegistry } from 'a2ui-shadcn-ui-react'
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
 * @returns A component registry with all shadcn renderers
 */
export function createShadcnRegistry(options?: {
  includeAnimated?: boolean
  useAnimatedOverrides?: boolean
}) {
  const registry = createRegistry()

  // Register standard renderers first
  for (const renderer of shadcnRenderers) {
    registry.register(renderer)
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
}

export type { RendererRegistry } from './types.js'
