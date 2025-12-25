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
  isCreateSurfaceMessage,
  isDataModelUpdateMessage,
  isDeleteSurfaceMessage,
  isSurfaceUpdateMessage,
  isUpdateComponentsMessage,
  isUpdateDataModelMessage,
} from './messages.js'
