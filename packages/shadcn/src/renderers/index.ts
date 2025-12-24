import type { A2UIRenderer } from '@a2ui/react'
import { createRegistry } from '@a2ui/react'
import { CardRenderer, ListRenderer, ModalRenderer, TabsRenderer } from './container/index.js'
import { DividerRenderer, IconRenderer, ImageRenderer, TextRenderer } from './display/index.js'
import {
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
  // Interactive
  ButtonRenderer,
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
