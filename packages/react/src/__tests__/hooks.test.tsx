/**
 * Hooks Tests
 */

import { createStore } from 'a2ui-shadcn-ui-core'
import { act, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { A2UIProvider } from '../context/A2UIProvider.js'
import { useA2UI } from '../hooks/useA2UI.js'
import { useAction } from '../hooks/useAction.js'
import { useDataBinding } from '../hooks/useDataBinding.js'
import { useSurface } from '../hooks/useSurface.js'

describe('useA2UI', () => {
  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useA2UI())
    }).toThrow('useA2UI must be used within an A2UIProvider')
  })

  it('should return context value when used inside provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, null, children)

    const { result } = renderHook(() => useA2UI(), { wrapper })

    expect(result.current.store).toBeDefined()
    expect(result.current.registry).toBeDefined()
    expect(result.current.onAction).toBeDefined()
  })
})

describe('useAction', () => {
  it('should return action dispatcher', () => {
    const onAction = vi.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { onAction }, children)

    const { result } = renderHook(() => useAction(), { wrapper })

    expect(typeof result.current).toBe('function')
  })

  it('should call onAction when dispatcher is called', () => {
    const onAction = vi.fn()
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { onAction }, children)

    const { result } = renderHook(() => useAction(), { wrapper })

    const action = { type: 'test', payload: { foo: 'bar' } }
    act(() => {
      result.current(action)
    })

    expect(onAction).toHaveBeenCalledWith(action)
  })
})

describe('useDataBinding', () => {
  it('should bind to data path and return value', () => {
    const store = createStore()

    // Create a surface with data
    store.setSurface('test-surface', {
      id: 'test-surface',
      root: 'root',
      components: {},
      data: { user: { name: 'Alice' } },
    })

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { store }, children)

    const { result } = renderHook(() => useDataBinding<string>('test-surface', 'user.name'), {
      wrapper,
    })

    expect(result.current.value).toBe('Alice')
  })

  it('should update value when setValue is called', () => {
    const store = createStore()

    store.setSurface('test-surface', {
      id: 'test-surface',
      root: 'root',
      components: {},
      data: { user: { name: 'Alice' } },
    })

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { store }, children)

    const { result } = renderHook(() => useDataBinding<string>('test-surface', 'user.name'), {
      wrapper,
    })

    expect(result.current.value).toBe('Alice')

    act(() => {
      result.current.setValue('Bob')
    })

    expect(result.current.value).toBe('Bob')
  })

  it('should return undefined for non-existent path', () => {
    const store = createStore()

    store.setSurface('test-surface', {
      id: 'test-surface',
      root: 'root',
      components: {},
      data: {},
    })

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { store }, children)

    const { result } = renderHook(() => useDataBinding<string>('test-surface', 'non.existent'), {
      wrapper,
    })

    expect(result.current.value).toBeUndefined()
  })
})

describe('useSurface', () => {
  it('should return surface from store', () => {
    const store = createStore()

    const surface = {
      id: 'test-surface',
      root: 'root',
      components: {},
      data: {},
    }

    store.setSurface('test-surface', surface)

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { store }, children)

    const { result } = renderHook(() => useSurface('test-surface'), { wrapper })

    expect(result.current).toEqual(surface)
  })

  it('should return undefined for non-existent surface', () => {
    const store = createStore()

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { store }, children)

    const { result } = renderHook(() => useSurface('non-existent'), { wrapper })

    expect(result.current).toBeUndefined()
  })

  it('should update when surface changes', () => {
    const store = createStore()

    const surface = {
      id: 'test-surface',
      root: 'root',
      components: {},
      data: {},
    }

    store.setSurface('test-surface', surface)

    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(A2UIProvider, { store }, children)

    const { result } = renderHook(() => useSurface('test-surface'), { wrapper })

    expect(result.current?.root).toBe('root')

    // Update the surface
    act(() => {
      store.setSurface('test-surface', {
        ...surface,
        root: 'new-root',
      })
    })

    expect(result.current?.root).toBe('new-root')
  })
})
