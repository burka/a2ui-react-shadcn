/**
 * A2UI Core Types
 * Export all types from the types directory
 */

export type * from './components.js'
export type * from './data.js'
export type * from './messages.js'

// Re-export utility functions
export { getDataByPath, setDataByPath } from './data.js'

export {
  isBeginRenderingMessage,
  isSurfaceUpdateMessage,
  isDataModelUpdateMessage,
  isDeleteSurfaceMessage,
} from './messages.js'
