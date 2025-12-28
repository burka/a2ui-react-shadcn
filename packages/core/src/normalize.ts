/**
 * Normalizes A2UI messages and components to a consistent internal format
 * Supports both v0.9 flat format and legacy nested format
 */

import type {
  A2UIComponent,
  ComponentUpdate,
  ComponentUpdateV09,
  ComponentUpdateLegacy,
  TextComponent,
} from './types/components.js'

/**
 * Check if a component update is in v0.9 flat format
 */
export function isV09Format(update: ComponentUpdate): update is ComponentUpdateV09 {
  return typeof update.component === 'string'
}

/**
 * Check if a component update is in legacy nested format
 */
export function isLegacyFormat(update: ComponentUpdate): update is ComponentUpdateLegacy {
  return typeof update.component === 'object'
}

/**
 * Normalize a component update to internal A2UIComponent format
 * Handles both v0.9 flat format and legacy nested format
 */
export function normalizeComponentUpdate(update: ComponentUpdate): A2UIComponent {
  if (isV09Format(update)) {
    // v0.9 flat format: { id, component: "Text", text: "Hello" }
    // Convert to: { id, type: "Text", text: "Hello" }
    const { id, component: type, ...rest } = update
    return { id, type, ...rest } as A2UIComponent
  }

  // Legacy nested format: { id, component: { type: "Text", content: "Hello" } }
  const component = update.component as A2UIComponent

  // Ensure id is set on the component
  if (!component.id) {
    component.id = update.id
  }

  // Normalize Text component: support both 'text' and 'content'
  if (component.type === 'Text') {
    const textComponent = component as TextComponent
    // Prefer 'text' over 'content' for v0.9 compatibility
    if (textComponent.content && !textComponent.text) {
      textComponent.text = textComponent.content
    }
  }

  return component
}

/**
 * Normalize text content: returns 'text' field, falling back to 'content' for legacy
 */
export function getTextContent(component: TextComponent): string {
  return component.text ?? component.content ?? ''
}

/**
 * Get components array from surfaceUpdate or updateComponents message
 * Handles both 'updates' (legacy) and 'components' (v0.9) keys
 */
export function getComponentsArray(
  msg: { updates?: ComponentUpdate[]; components?: ComponentUpdate[] }
): ComponentUpdate[] {
  return msg.components ?? msg.updates ?? []
}
