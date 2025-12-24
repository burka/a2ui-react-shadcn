/**
 * A2UI Store Implementation
 * Default in-memory implementation of the A2UIStore interface
 */

import { getDataByPath, setDataByPath } from '../types/data.js'
import type { A2UIStore, StoreSnapshot, Surface } from './types.js'

/**
 * Create a new in-memory A2UI store
 * @returns A new A2UIStore instance
 */
export function createStore(): A2UIStore {
  const surfaces = new Map<string, Surface>()
  const listeners = new Set<() => void>()

  /**
   * Notify all listeners of a change
   */
  function notify(): void {
    for (const listener of listeners) {
      listener()
    }
  }

  return {
    getSurface(id: string): Surface | undefined {
      return surfaces.get(id)
    },

    setSurface(id: string, surface: Surface): void {
      surfaces.set(id, surface)
      notify()
    },

    deleteSurface(id: string): void {
      const existed = surfaces.delete(id)
      if (existed) {
        notify()
      }
    },

    getData(surfaceId: string, path?: string): unknown {
      const surface = surfaces.get(surfaceId)
      if (!surface) {
        return undefined
      }

      if (!path) {
        return surface.data
      }

      return getDataByPath(surface.data, path)
    },

    setData(surfaceId: string, path: string, value: unknown): void {
      const surface = surfaces.get(surfaceId)
      if (!surface) {
        throw new Error(`Surface not found: ${surfaceId}`)
      }

      // Create new data object to trigger React reactivity
      const newData = { ...surface.data }
      setDataByPath(newData, path, value)

      // Create new surface object with new data reference
      surfaces.set(surfaceId, { ...surface, data: newData })
      notify()
    },

    subscribe(listener: () => void): () => void {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },

    getSnapshot(): StoreSnapshot {
      const surfaceMap: Record<string, Surface> = {}
      for (const [id, surface] of surfaces) {
        surfaceMap[id] = surface
      }

      return {
        surfaces: surfaceMap,
        timestamp: Date.now(),
      }
    },
  }
}
