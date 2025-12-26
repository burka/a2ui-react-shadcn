/**
 * Shared button style constants
 * Eliminates duplication across animated button renderers
 */

import type { CSSProperties } from 'react'

/**
 * Primary button inline styles for framer-motion buttons
 */
export const primaryButtonStyle: CSSProperties = {
  backgroundColor: 'hsl(var(--primary))',
  color: 'hsl(var(--primary-foreground))',
}

/**
 * Secondary/outline button inline styles for framer-motion buttons
 */
export const secondaryButtonStyle: CSSProperties = {
  backgroundColor: 'hsl(var(--background))',
  color: 'hsl(var(--foreground))',
  borderColor: 'hsl(var(--input))',
}

/**
 * Get button style based on primary flag
 */
export function getButtonStyle(primary?: boolean): CSSProperties {
  return primary ? primaryButtonStyle : secondaryButtonStyle
}

/**
 * Base button class names (shared across animated buttons)
 */
export const baseButtonClassName =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'

/**
 * Primary button class names
 */
export const primaryButtonClassName = `bg-primary text-primary-foreground shadow hover:bg-primary/90 ${baseButtonClassName}`

/**
 * Secondary button class names
 */
export const secondaryButtonClassName = `border border-input bg-background hover:bg-accent hover:text-accent-foreground ${baseButtonClassName}`

/**
 * Get button class name based on primary flag
 */
export function getButtonClassName(primary?: boolean, additionalClasses?: string): string {
  const base = primary ? primaryButtonClassName : secondaryButtonClassName
  return additionalClasses ? `${additionalClasses} ${base}` : base
}
