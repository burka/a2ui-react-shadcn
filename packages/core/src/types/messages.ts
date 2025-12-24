/**
 * A2UI protocol message types
 */

import type { ComponentUpdate } from './components.js'
import type { DataValue } from './data.js'

/**
 * Begin rendering message - initializes a new surface
 */
export interface BeginRenderingMessage {
  beginRendering: {
    /** Unique identifier for the surface */
    surfaceId: string
    /** Root component ID */
    root: string
    /** Optional catalog ID for component definitions */
    catalogId?: string
    /** Optional style overrides */
    style?: Record<string, string>
  }
}

/**
 * Surface update message - updates components in an existing surface
 */
export interface SurfaceUpdateMessage {
  surfaceUpdate: {
    /** Surface ID to update */
    surfaceId: string
    /** Array of component updates to apply */
    updates: ComponentUpdate[]
  }
}

/**
 * Data model update message - updates data values
 */
export interface DataModelUpdateMessage {
  dataModelUpdate: {
    /** Surface ID whose data model to update */
    surfaceId: string
    /** Optional base path for the updates */
    path?: string
    /** Array of data values to set */
    values: DataValue[]
  }
}

/**
 * Delete surface message - removes a surface
 */
export interface DeleteSurfaceMessage {
  deleteSurface: {
    /** Surface ID to delete */
    surfaceId: string
  }
}

/**
 * Union type of all A2UI messages
 */
export type A2UIMessage =
  | BeginRenderingMessage
  | SurfaceUpdateMessage
  | DataModelUpdateMessage
  | DeleteSurfaceMessage

/**
 * Type guard to check if a message is BeginRenderingMessage
 */
export function isBeginRenderingMessage(
  msg: A2UIMessage
): msg is BeginRenderingMessage {
  return 'beginRendering' in msg
}

/**
 * Type guard to check if a message is SurfaceUpdateMessage
 */
export function isSurfaceUpdateMessage(
  msg: A2UIMessage
): msg is SurfaceUpdateMessage {
  return 'surfaceUpdate' in msg
}

/**
 * Type guard to check if a message is DataModelUpdateMessage
 */
export function isDataModelUpdateMessage(
  msg: A2UIMessage
): msg is DataModelUpdateMessage {
  return 'dataModelUpdate' in msg
}

/**
 * Type guard to check if a message is DeleteSurfaceMessage
 */
export function isDeleteSurfaceMessage(
  msg: A2UIMessage
): msg is DeleteSurfaceMessage {
  return 'deleteSurface' in msg
}
