/**
 * Component Registry Tests
 */

import { describe, expect, it } from 'vitest'
import { createRegistry } from '../registry/component-registry.js'
import type { A2UIRenderer } from '../registry/types.js'

describe('Component Registry', () => {
  it('should create a registry', () => {
    const registry = createRegistry()
    expect(registry).toBeDefined()
    expect(typeof registry.register).toBe('function')
    expect(typeof registry.get).toBe('function')
    expect(typeof registry.getAll).toBe('function')
  })

  it('should register and retrieve a renderer', () => {
    const registry = createRegistry()

    const buttonRenderer: A2UIRenderer = {
      type: 'Button',
      render: ({ component }) => component,
    }

    registry.register(buttonRenderer)
    const retrieved = registry.get('Button')

    expect(retrieved).toBe(buttonRenderer)
  })

  it('should return undefined for unregistered type', () => {
    const registry = createRegistry()
    const retrieved = registry.get('NonExistent')

    expect(retrieved).toBeUndefined()
  })

  it('should return all registered renderers', () => {
    const registry = createRegistry()

    const buttonRenderer: A2UIRenderer = {
      type: 'Button',
      render: ({ component }) => component,
    }

    const textRenderer: A2UIRenderer = {
      type: 'Text',
      render: ({ component }) => component,
    }

    registry.register(buttonRenderer)
    registry.register(textRenderer)

    const all = registry.getAll()

    expect(all).toHaveLength(2)
    expect(all).toContain(buttonRenderer)
    expect(all).toContain(textRenderer)
  })

  it('should overwrite renderer if same type registered twice', () => {
    const registry = createRegistry()

    const renderer1: A2UIRenderer = {
      type: 'Button',
      render: () => 'first',
    }

    const renderer2: A2UIRenderer = {
      type: 'Button',
      render: () => 'second',
    }

    registry.register(renderer1)
    registry.register(renderer2)

    const retrieved = registry.get('Button')

    expect(retrieved).toBe(renderer2)
    expect(registry.getAll()).toHaveLength(1)
  })

  it('should handle renderers with examples', () => {
    const registry = createRegistry()

    const buttonRenderer: A2UIRenderer = {
      type: 'Button',
      render: ({ component }) => component,
      example: {
        name: 'Basic Button',
        description: 'A simple button component',
        category: 'interactive',
        messages: [
          {
            beginRendering: {
              surfaceId: 'test',
              root: 'btn1',
            },
          },
        ],
      },
    }

    registry.register(buttonRenderer)
    const retrieved = registry.get('Button')

    expect(retrieved?.example).toBeDefined()
    expect(retrieved?.example?.name).toBe('Basic Button')
    expect(retrieved?.example?.category).toBe('interactive')
  })
})
