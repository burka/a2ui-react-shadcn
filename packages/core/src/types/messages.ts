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
 * v0.9 Message Types
 */

/**
 * Create surface message (v0.9) - initializes a new surface
 */
export interface CreateSurfaceMessage {
  createSurface: {
    surfaceId: string
    root: string
    catalogId?: string
    style?: Record<string, string>
  }
}

/**
 * Update components message (v0.9) - updates components in an existing surface
 */
export interface UpdateComponentsMessage {
  updateComponents: {
    surfaceId: string
    components: ComponentUpdate[]
  }
}

/**
 * Update data model message (v0.9) - updates data values
 */
export interface UpdateDataModelMessage {
  updateDataModel: {
    surfaceId: string
    path?: string
    op?: 'add' | 'replace' | 'remove'
    value?: unknown
  }
}

/**
 * Union type of all A2UI messages
 */
export type A2UIMessage =
  // v0.8 (legacy)
  | BeginRenderingMessage
  | SurfaceUpdateMessage
  | DataModelUpdateMessage
  | DeleteSurfaceMessage
  // v0.9
  | CreateSurfaceMessage
  | UpdateComponentsMessage
  | UpdateDataModelMessage

/**
 * Type guard to check if a message is BeginRenderingMessage
 */
export function isBeginRenderingMessage(msg: A2UIMessage): msg is BeginRenderingMessage {
  return 'beginRendering' in msg
}

/**
 * Type guard to check if a message is SurfaceUpdateMessage
 */
export function isSurfaceUpdateMessage(msg: A2UIMessage): msg is SurfaceUpdateMessage {
  return 'surfaceUpdate' in msg
}

/**
 * Type guard to check if a message is DataModelUpdateMessage
 */
export function isDataModelUpdateMessage(msg: A2UIMessage): msg is DataModelUpdateMessage {
  return 'dataModelUpdate' in msg
}

/**
 * Type guard to check if a message is DeleteSurfaceMessage
 */
export function isDeleteSurfaceMessage(msg: A2UIMessage): msg is DeleteSurfaceMessage {
  return 'deleteSurface' in msg
}

/**
 * Type guard to check if a message is CreateSurfaceMessage (v0.9)
 */
export function isCreateSurfaceMessage(msg: A2UIMessage): msg is CreateSurfaceMessage {
  return 'createSurface' in msg
}

/**
 * Type guard to check if a message is UpdateComponentsMessage (v0.9)
 */
export function isUpdateComponentsMessage(msg: A2UIMessage): msg is UpdateComponentsMessage {
  return 'updateComponents' in msg
}

/**
 * Type guard to check if a message is UpdateDataModelMessage (v0.9)
 */
export function isUpdateDataModelMessage(msg: A2UIMessage): msg is UpdateDataModelMessage {
  return 'updateDataModel' in msg
}
