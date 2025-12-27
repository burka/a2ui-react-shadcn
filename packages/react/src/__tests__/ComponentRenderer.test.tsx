/**
 * ComponentRenderer Component Tests
 * Tests recursive component tree rendering
 */

import { render, screen } from '@testing-library/react'
import type { Surface } from 'a2ui-react-core'
import { createStore } from 'a2ui-react-core'
import { describe, expect, it, vi } from 'vitest'
import { ComponentRenderer } from '../components/ComponentRenderer.js'
import { A2UIProvider } from '../context/A2UIProvider.js'
import type { A2UIRenderer } from '../registry/types.js'

// Create mock renderers for testing
const mockTextRenderer: A2UIRenderer = {
  type: 'Text',
  render: ({ component }) => {
    const textComp = component as { content?: string }
    return <span data-testid="text">{textComp.content}</span>
  },
}

const mockRowRenderer: A2UIRenderer = {
  type: 'Row',
  render: ({ children }) => <div data-testid="row">{children}</div>,
}

const mockButtonRenderer: A2UIRenderer = {
  type: 'Button',
  render: ({ component, onAction }) => {
    const buttonComp = component as { child?: string }
    return (
      <button
        type="button"
        data-testid="button"
        onClick={() =>
          onAction?.({
            type: 'click',
            payload: { componentId: buttonComp.child },
          })
        }
      >
        Button
      </button>
    )
  },
}

const mockDataBoundRenderer: A2UIRenderer = {
  type: 'DataBound',
  render: ({ data }) => {
    const value = data.get<string>('user.name')
    return <div data-testid="data-bound">{value ?? 'No data'}</div>
  },
}

describe('ComponentRenderer', () => {
  it('should render a simple component (Text)', () => {
    const surface: Surface = {
      id: 'test-surface',
      root: 'text-1',
      components: {
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Hello World',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <ComponentRenderer componentId="text-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('text')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveTextContent('Hello World')
  })

  it('should render nested components (Row with children)', () => {
    const surface: Surface = {
      id: 'test-surface',
      root: 'row-1',
      components: {
        'row-1': {
          type: 'Row',
          id: 'row-1',
          children: ['text-1', 'text-2'],
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'First',
        },
        'text-2': {
          type: 'Text',
          id: 'text-2',
          content: 'Second',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockTextRenderer, mockRowRenderer]}>
        <ComponentRenderer componentId="row-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('row')).toBeInTheDocument()
    const texts = screen.getAllByTestId('text')
    expect(texts).toHaveLength(2)
    expect(texts[0]).toHaveTextContent('First')
    expect(texts[1]).toHaveTextContent('Second')
  })

  it('should pass data accessor correctly', () => {
    const store = createStore()
    const surface: Surface = {
      id: 'test-surface',
      root: 'data-1',
      components: {
        'data-1': {
          type: 'DataBound',
          id: 'data-1',
        },
      },
      data: {
        user: {
          name: 'Alice',
        },
      },
    }

    store.setSurface('test-surface', surface)

    render(
      <A2UIProvider renderers={[mockDataBoundRenderer]} store={store}>
        <ComponentRenderer componentId="data-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('data-bound')).toBeInTheDocument()
    expect(screen.getByTestId('data-bound')).toHaveTextContent('Alice')
  })

  it('should call onAction when triggered', () => {
    const onAction = vi.fn()
    const surface: Surface = {
      id: 'test-surface',
      root: 'button-1',
      components: {
        'button-1': {
          type: 'Button',
          id: 'button-1',
          child: 'text-1',
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Click me',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockButtonRenderer, mockTextRenderer]}>
        <ComponentRenderer componentId="button-1" surface={surface} onAction={onAction} />
      </A2UIProvider>,
    )

    const button = screen.getByTestId('button')
    button.click()

    expect(onAction).toHaveBeenCalledWith({
      type: 'click',
      payload: { componentId: 'text-1' },
    })
  })

  it('should handle missing renderer gracefully (shows error div)', () => {
    const surface: Surface = {
      id: 'test-surface',
      root: 'unknown-1',
      components: {
        'unknown-1': {
          type: 'UnknownComponent',
          id: 'unknown-1',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[]}>
        <ComponentRenderer componentId="unknown-1" surface={surface} />
      </A2UIProvider>,
    )

    const errorDiv = screen.getByText(/No renderer for type: UnknownComponent/)
    expect(errorDiv).toBeInTheDocument()
    // Verify it has red text styling (browser converts 'red' to rgb format)
    const computedColor = window.getComputedStyle(errorDiv).color
    expect(computedColor).toBe('rgb(255, 0, 0)')
  })

  it('should return null when component not found', () => {
    const surface: Surface = {
      id: 'test-surface',
      root: 'text-1',
      components: {
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Exists',
        },
      },
      data: {},
    }

    const { container } = render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <ComponentRenderer componentId="non-existent" surface={surface} />
      </A2UIProvider>,
    )

    // Should render nothing
    expect(container.firstChild).toBeNull()
  })

  it('should handle deeply nested components', () => {
    const surface: Surface = {
      id: 'test-surface',
      root: 'row-1',
      components: {
        'row-1': {
          type: 'Row',
          id: 'row-1',
          children: ['row-2'],
        },
        'row-2': {
          type: 'Row',
          id: 'row-2',
          children: ['row-3'],
        },
        'row-3': {
          type: 'Row',
          id: 'row-3',
          children: ['text-1'],
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Deeply nested',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockTextRenderer, mockRowRenderer]}>
        <ComponentRenderer componentId="row-1" surface={surface} />
      </A2UIProvider>,
    )

    const rows = screen.getAllByTestId('row')
    expect(rows).toHaveLength(3)
    expect(screen.getByTestId('text')).toHaveTextContent('Deeply nested')
  })

  it('should handle components with single child property', () => {
    const mockCardRenderer: A2UIRenderer = {
      type: 'Card',
      render: ({ children }) => <div data-testid="card">{children}</div>,
    }

    const surface: Surface = {
      id: 'test-surface',
      root: 'card-1',
      components: {
        'card-1': {
          type: 'Card',
          id: 'card-1',
          child: 'text-1',
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Card content',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockCardRenderer, mockTextRenderer]}>
        <ComponentRenderer componentId="card-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveTextContent('Card content')
  })

  it('should handle Modal with trigger and content', () => {
    const mockModalRenderer: A2UIRenderer = {
      type: 'Modal',
      render: ({ children }) => <div data-testid="modal">{children}</div>,
    }

    const surface: Surface = {
      id: 'test-surface',
      root: 'modal-1',
      components: {
        'modal-1': {
          type: 'Modal',
          id: 'modal-1',
          trigger: 'button-1',
          content: 'text-1',
        },
        'button-1': {
          type: 'Button',
          id: 'button-1',
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Modal content',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockModalRenderer, mockButtonRenderer, mockTextRenderer]}>
        <ComponentRenderer componentId="modal-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('button')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveTextContent('Modal content')
  })

  it('should handle Tabs with multiple tab contents', () => {
    const mockTabsRenderer: A2UIRenderer = {
      type: 'Tabs',
      render: ({ children }) => <div data-testid="tabs">{children}</div>,
    }

    const surface: Surface = {
      id: 'test-surface',
      root: 'tabs-1',
      components: {
        'tabs-1': {
          type: 'Tabs',
          id: 'tabs-1',
          tabs: [
            { label: 'Tab 1', content: 'text-1' },
            { label: 'Tab 2', content: 'text-2' },
          ],
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'Tab 1 content',
        },
        'text-2': {
          type: 'Text',
          id: 'text-2',
          content: 'Tab 2 content',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockTabsRenderer, mockTextRenderer]}>
        <ComponentRenderer componentId="tabs-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('tabs')).toBeInTheDocument()
    const texts = screen.getAllByTestId('text')
    expect(texts).toHaveLength(2)
    expect(texts[0]).toHaveTextContent('Tab 1 content')
    expect(texts[1]).toHaveTextContent('Tab 2 content')
  })

  it('should use surface-scoped onAction over context onAction', () => {
    const surfaceOnAction = vi.fn()
    const contextOnAction = vi.fn()

    const surface: Surface = {
      id: 'test-surface',
      root: 'button-1',
      components: {
        'button-1': {
          type: 'Button',
          id: 'button-1',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockButtonRenderer]} onAction={contextOnAction}>
        <ComponentRenderer componentId="button-1" surface={surface} onAction={surfaceOnAction} />
      </A2UIProvider>,
    )

    const button = screen.getByTestId('button')
    button.click()

    // Surface-scoped handler should be called
    expect(surfaceOnAction).toHaveBeenCalled()
    // Context handler should NOT be called
    expect(contextOnAction).not.toHaveBeenCalled()
  })

  it('should handle List component with template', () => {
    const mockListRenderer: A2UIRenderer = {
      type: 'List',
      render: ({ children }) => <ul data-testid="list">{children}</ul>,
    }

    const surface: Surface = {
      id: 'test-surface',
      root: 'list-1',
      components: {
        'list-1': {
          type: 'List',
          id: 'list-1',
          template: 'text-1',
        },
        'text-1': {
          type: 'Text',
          id: 'text-1',
          content: 'List item',
        },
      },
      data: {},
    }

    render(
      <A2UIProvider renderers={[mockListRenderer, mockTextRenderer]}>
        <ComponentRenderer componentId="list-1" surface={surface} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('list')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveTextContent('List item')
  })
})
