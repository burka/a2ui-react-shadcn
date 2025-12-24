import type { A2UIRenderer } from '@a2ui/react'

/**
 * Renderer registry type for shadcn components
 */
export type RendererRegistry = Record<string, A2UIRenderer>

/**
 * Configuration options for creating a shadcn renderer registry
 */
export interface RendererRegistryOptions {
  /**
   * Custom class name overrides for components
   */
  classNames?: Record<string, string>

  /**
   * Custom renderer overrides
   */
  customRenderers?: Partial<RendererRegistry>
}
