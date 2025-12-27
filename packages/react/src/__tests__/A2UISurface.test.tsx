/**
 * A2UISurface Component Tests
 * Tests the main API entry point for rendering A2UI surfaces
 */

import { render, screen } from '@testing-library/react'
import type { A2UIMessage } from 'a2ui-react-core'
import { describe, expect, it, vi } from 'vitest'
import { A2UISurface } from '../components/A2UISurface.js'
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

const mockColumnRenderer: A2UIRenderer = {
  type: 'Column',
  render: ({ children }) => <div data-testid="column">{children}</div>,
}

describe('A2UISurface', () => {
  it('should render without crashing when no messages', () => {
    render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <A2UISurface surfaceId="test" messages={[]} />
      </A2UIProvider>,
    )
    // Should not throw and should return null (no surface yet)
    expect(screen.queryByTestId('text')).not.toBeInTheDocument()
  })

  it('should process createSurface message correctly', () => {
    const messages: A2UIMessage[] = [
      {
        createSurface: {
          surfaceId: 'test',
          root: 'text-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Hello World',
              },
            },
          ],
        },
      },
    ]

    render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('text')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveTextContent('Hello World')
  })

  it('should process updateComponents message correctly', () => {
    const messages: A2UIMessage[] = [
      {
        createSurface: {
          surfaceId: 'test',
          root: 'text-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Initial',
              },
            },
          ],
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Updated',
              },
            },
          ],
        },
      },
    ]

    render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('text')).toHaveTextContent('Updated')
  })

  it('should render component tree from messages', () => {
    const messages: A2UIMessage[] = [
      {
        createSurface: {
          surfaceId: 'test',
          root: 'row-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                children: ['text-1', 'text-2'],
              },
            },
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'First',
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'Text',
                id: 'text-2',
                content: 'Second',
              },
            },
          ],
        },
      },
    ]

    render(
      <A2UIProvider renderers={[mockTextRenderer, mockRowRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('row')).toBeInTheDocument()
    const texts = screen.getAllByTestId('text')
    expect(texts).toHaveLength(2)
    expect(texts[0]).toHaveTextContent('First')
    expect(texts[1]).toHaveTextContent('Second')
  })

  it('should handle missing surface gracefully', () => {
    render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <A2UISurface surfaceId="non-existent" messages={[]} />
      </A2UIProvider>,
    )
    // Should not throw and should render nothing
    expect(screen.queryByTestId('text')).not.toBeInTheDocument()
  })

  it('should call onAction when action is triggered', () => {
    const onAction = vi.fn()

    const mockButtonRenderer: A2UIRenderer = {
      type: 'Button',
      render: ({ onAction: actionHandler }) => (
        <button
          type="button"
          data-testid="button"
          onClick={() =>
            actionHandler?.({
              type: 'click',
              payload: { value: 'test' },
            })
          }
        >
          Click me
        </button>
      ),
    }

    const messages: A2UIMessage[] = [
      {
        createSurface: {
          surfaceId: 'test',
          root: 'button-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'button-1',
              component: {
                type: 'Button',
                id: 'button-1',
              },
            },
          ],
        },
      },
    ]

    render(
      <A2UIProvider renderers={[mockButtonRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} onAction={onAction} />
      </A2UIProvider>,
    )

    const button = screen.getByTestId('button')
    button.click()

    expect(onAction).toHaveBeenCalledWith({
      type: 'click',
      payload: { value: 'test' },
    })
  })

  it('should handle nested component trees correctly', () => {
    const messages: A2UIMessage[] = [
      {
        createSurface: {
          surfaceId: 'test',
          root: 'column-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'column-1',
              component: {
                type: 'Column',
                id: 'column-1',
                children: ['row-1', 'row-2'],
              },
            },
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                children: ['text-1'],
              },
            },
            {
              id: 'row-2',
              component: {
                type: 'Row',
                id: 'row-2',
                children: ['text-2'],
              },
            },
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Row 1',
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'Text',
                id: 'text-2',
                content: 'Row 2',
              },
            },
          ],
        },
      },
    ]

    render(
      <A2UIProvider renderers={[mockTextRenderer, mockRowRenderer, mockColumnRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('column')).toBeInTheDocument()
    const rows = screen.getAllByTestId('row')
    expect(rows).toHaveLength(2)
    const texts = screen.getAllByTestId('text')
    expect(texts).toHaveLength(2)
    expect(texts[0]).toHaveTextContent('Row 1')
    expect(texts[1]).toHaveTextContent('Row 2')
  })

  it('should handle className prop correctly', () => {
    const messages: A2UIMessage[] = [
      {
        createSurface: {
          surfaceId: 'test',
          root: 'text-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'test',
          components: [
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Test',
              },
            },
          ],
        },
      },
    ]

    const { container } = render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} className="custom-class" />
      </A2UIProvider>,
    )

    const surfaceDiv = container.firstChild as HTMLElement
    expect(surfaceDiv).toHaveClass('custom-class')
  })

  it('should support beginRendering message (v0.8 compatibility)', () => {
    const messages: A2UIMessage[] = [
      {
        beginRendering: {
          surfaceId: 'test',
          root: 'text-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'test',
          updates: [
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Legacy format',
              },
            },
          ],
        },
      },
    ]

    render(
      <A2UIProvider renderers={[mockTextRenderer]}>
        <A2UISurface surfaceId="test" messages={messages} />
      </A2UIProvider>,
    )

    expect(screen.getByTestId('text')).toBeInTheDocument()
    expect(screen.getByTestId('text')).toHaveTextContent('Legacy format')
  })
})
