import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { createRegistry } from 'a2ui-shadcn-ui-react'
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

// Animated UI Components
import {
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
} from './animated/index.js'

/**
 * Array of all shadcn renderers
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
 * All renderers including animated components
 */
export const allRenderers = [...shadcnRenderers, ...animatedRenderers] as A2UIRenderer[]

/**
 * Creates a shadcn renderer registry with all renderers registered
 * @param options.includeAnimated - Whether to include animated components (default: false)
 * @returns A component registry with all shadcn renderers
 */
export function createShadcnRegistry(options?: { includeAnimated?: boolean }) {
  const registry = createRegistry()
  const renderers = options?.includeAnimated ? allRenderers : shadcnRenderers
  for (const renderer of renderers) {
    registry.register(renderer)
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
}

export type { RendererRegistry } from './types.js'
