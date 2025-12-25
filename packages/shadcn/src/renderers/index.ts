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
 * Creates a shadcn renderer registry with all renderers registered
 * @returns A component registry with all shadcn renderers
 */
export function createShadcnRegistry() {
  const registry = createRegistry()
  for (const renderer of shadcnRenderers) {
    registry.register(renderer)
  }
  return registry
}

export type { RendererRegistry } from './types.js'
