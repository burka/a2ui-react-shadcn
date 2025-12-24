/**
 * A2UI Store Types
 * Defines the pluggable store interface for managing surfaces and data
 */

import type { A2UIComponent } from '../types/components.js'
import type { DataModel } from '../types/data.js'

/**
 * Surface - represents a rendered UI surface with components and data
 */
export interface Surface {
  /** Unique identifier for the surface */
  id: string
  /** Root component ID */
  root: string
  /** Optional catalog ID */
  catalogId?: string
  /** Optional style overrides */
  style?: Record<string, string>
  /** Component catalog - maps component IDs to components */
  components: Record<string, A2UIComponent>
  /** Data model for the surface */
  data: DataModel
}

/**
 * Store snapshot for persistence or debugging
 */
export interface StoreSnapshot {
  /** All surfaces in the store */
  surfaces: Record<string, Surface>
  /** Timestamp of the snapshot */
  timestamp: number
}

/**
 * A2UIStore interface - pluggable storage for surfaces and data
 * Implementations can use any storage mechanism (memory, localStorage, IndexedDB, etc.)
 */
export interface A2UIStore {
  /**
   * Get a surface by ID
   * @param id - Surface ID
   * @returns Surface or undefined if not found
   */
  getSurface(_id: string): Surface | undefined

  /**
   * Set or update a surface
   * @param id - Surface ID
   * @param surface - Surface data
   */
  setSurface(_id: string, _surface: Surface): void

  /**
   * Delete a surface by ID
   * @param id - Surface ID
   */
  deleteSurface(_id: string): void

  /**
   * Get data from a surface's data model
   * @param surfaceId - Surface ID
   * @param path - Optional path to specific data (dot notation)
   * @returns Data value or undefined
   */
  getData(_surfaceId: string, _path?: string): unknown

  /**
   * Set data in a surface's data model
   * @param surfaceId - Surface ID
   * @param path - Path to data (dot notation)
   * @param value - Value to set
   */
  setData(_surfaceId: string, _path: string, _value: unknown): void

  /**
   * Subscribe to store changes
   * @param listener - Callback function invoked on any change
   * @returns Unsubscribe function
   */
  subscribe(_listener: () => void): () => void

  /**
   * Get a snapshot of the entire store state
   * @returns Store snapshot
   */
  getSnapshot(): StoreSnapshot
}
