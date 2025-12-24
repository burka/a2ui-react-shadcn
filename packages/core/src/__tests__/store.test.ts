/**
 * Store tests
 * Tests for A2UI store CRUD operations and subscriptions
 */

import { describe, expect, it, vi } from 'vitest'
import { createStore } from '../store/index.js'
import type { Surface } from '../store/types.js'

describe('createStore', () => {
  describe('surface operations', () => {
    it('should create an empty store', () => {
      const store = createStore()
      const snapshot = store.getSnapshot()

      expect(snapshot.surfaces).toEqual({})
      expect(snapshot.timestamp).toBeGreaterThan(0)
    })

    it('should set and get a surface', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)
      const retrieved = store.getSurface('surface-1')

      expect(retrieved).toEqual(surface)
    })

    it('should update an existing surface', () => {
      const store = createStore()
      const surface1: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }
      const surface2: Surface = {
        id: 'surface-1',
        root: 'root-2',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface1)
      store.setSurface('surface-1', surface2)

      const retrieved = store.getSurface('surface-1')
      expect(retrieved?.root).toBe('root-2')
    })

    it('should delete a surface', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)
      store.deleteSurface('surface-1')

      const retrieved = store.getSurface('surface-1')
      expect(retrieved).toBeUndefined()
    })

    it('should return undefined for non-existent surface', () => {
      const store = createStore()
      const retrieved = store.getSurface('non-existent')

      expect(retrieved).toBeUndefined()
    })

    it('should handle multiple surfaces', () => {
      const store = createStore()
      const surface1: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }
      const surface2: Surface = {
        id: 'surface-2',
        root: 'root-2',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface1)
      store.setSurface('surface-2', surface2)

      const snapshot = store.getSnapshot()
      expect(Object.keys(snapshot.surfaces)).toHaveLength(2)
      expect(snapshot.surfaces['surface-1']).toEqual(surface1)
      expect(snapshot.surfaces['surface-2']).toEqual(surface2)
    })
  })

  describe('data operations', () => {
    it('should get entire data model when no path provided', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: { user: { name: 'John' } },
      }

      store.setSurface('surface-1', surface)
      const data = store.getData('surface-1')

      expect(data).toEqual({ user: { name: 'John' } })
    })

    it('should get data by path', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: { user: { name: 'John', age: 30 } },
      }

      store.setSurface('surface-1', surface)
      const name = store.getData('surface-1', 'user.name')
      const age = store.getData('surface-1', 'user.age')

      expect(name).toBe('John')
      expect(age).toBe(30)
    })

    it('should return undefined for non-existent path', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: { user: { name: 'John' } },
      }

      store.setSurface('surface-1', surface)
      const value = store.getData('surface-1', 'user.email')

      expect(value).toBeUndefined()
    })

    it('should return undefined for non-existent surface', () => {
      const store = createStore()
      const value = store.getData('non-existent', 'some.path')

      expect(value).toBeUndefined()
    })

    it('should set data by path', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)
      store.setData('surface-1', 'user.name', 'John')
      store.setData('surface-1', 'user.age', 30)

      const name = store.getData('surface-1', 'user.name')
      const age = store.getData('surface-1', 'user.age')

      expect(name).toBe('John')
      expect(age).toBe(30)
    })

    it('should create nested objects when setting data', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)
      store.setData('surface-1', 'deep.nested.value', 'test')

      const value = store.getData('surface-1', 'deep.nested.value')
      expect(value).toBe('test')
    })

    it('should throw when setting data on non-existent surface', () => {
      const store = createStore()

      expect(() => {
        store.setData('non-existent', 'some.path', 'value')
      }).toThrow('Surface not found')
    })

    it('should update existing data values', () => {
      const store = createStore()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: { user: { name: 'John' } },
      }

      store.setSurface('surface-1', surface)
      store.setData('surface-1', 'user.name', 'Jane')

      const name = store.getData('surface-1', 'user.name')
      expect(name).toBe('Jane')
    })
  })

  describe('subscriptions', () => {
    it('should notify subscribers on surface change', () => {
      const store = createStore()
      const listener = vi.fn()

      store.subscribe(listener)

      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should notify subscribers on surface delete', () => {
      const store = createStore()
      const listener = vi.fn()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)
      store.subscribe(listener)
      store.deleteSurface('surface-1')

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should not notify on delete of non-existent surface', () => {
      const store = createStore()
      const listener = vi.fn()

      store.subscribe(listener)
      store.deleteSurface('non-existent')

      expect(listener).not.toHaveBeenCalled()
    })

    it('should notify subscribers on data change', () => {
      const store = createStore()
      const listener = vi.fn()
      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)
      store.subscribe(listener)
      store.setData('surface-1', 'user.name', 'John')

      expect(listener).toHaveBeenCalledTimes(1)
    })

    it('should support multiple subscribers', () => {
      const store = createStore()
      const listener1 = vi.fn()
      const listener2 = vi.fn()

      store.subscribe(listener1)
      store.subscribe(listener2)

      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(1)
    })

    it('should unsubscribe correctly', () => {
      const store = createStore()
      const listener = vi.fn()

      const unsubscribe = store.subscribe(listener)
      unsubscribe()

      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)

      expect(listener).not.toHaveBeenCalled()
    })

    it('should handle multiple unsubscribe calls', () => {
      const store = createStore()
      const listener = vi.fn()

      const unsubscribe = store.subscribe(listener)
      unsubscribe()
      unsubscribe() // Should not throw

      const surface: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: {},
      }

      store.setSurface('surface-1', surface)

      expect(listener).not.toHaveBeenCalled()
    })
  })

  describe('snapshot', () => {
    it('should create snapshot with current state', () => {
      const store = createStore()
      const surface1: Surface = {
        id: 'surface-1',
        root: 'root-1',
        components: {},
        data: { value: 1 },
      }
      const surface2: Surface = {
        id: 'surface-2',
        root: 'root-2',
        components: {},
        data: { value: 2 },
      }

      store.setSurface('surface-1', surface1)
      store.setSurface('surface-2', surface2)

      const snapshot = store.getSnapshot()

      expect(snapshot.surfaces['surface-1']).toEqual(surface1)
      expect(snapshot.surfaces['surface-2']).toEqual(surface2)
      expect(snapshot.timestamp).toBeGreaterThan(0)
    })

    it('should create new timestamp for each snapshot', async () => {
      const store = createStore()
      const snapshot1 = store.getSnapshot()

      // Wait a bit to ensure different timestamp
      await new Promise((resolve) => setTimeout(resolve, 10))

      const snapshot2 = store.getSnapshot()

      expect(snapshot2.timestamp).toBeGreaterThan(snapshot1.timestamp)
    })
  })
})
