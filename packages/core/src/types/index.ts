/**
 * A2UI Core Types
 * Export all types from the types directory
 */

export type * from './components.js'
export type * from './data.js'
// Re-export utility functions
export { getDataByPath, setDataByPath } from './data.js'
export type * from './messages.js'

export {
  isBeginRenderingMessage,
  isDataModelUpdateMessage,
  isDeleteSurfaceMessage,
  isSurfaceUpdateMessage,
} from './messages.js'
