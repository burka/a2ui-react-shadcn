import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CodeModal } from '../CodeModal'

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
})

// Mock HTMLDialogElement methods (jsdom doesn't support them)
HTMLDialogElement.prototype.showModal = vi.fn()
HTMLDialogElement.prototype.close = vi.fn()

describe('CodeModal', () => {
  const mockMessages = [
    { beginRendering: { surfaceId: 'test', root: 'root' } },
    {
      surfaceUpdate: {
        surfaceId: 'test',
        updates: [{ id: 'root', component: { type: 'Text', content: 'Hello' } }],
      },
    },
  ]

  it('renders when open is true', () => {
    render(
      <CodeModal
        componentName="Test Component"
        messages={mockMessages}
        open={true}
        onOpenChange={() => {}}
      />,
    )

    // Check if the dialog title is rendered
    expect(screen.getByText('Test Component - Code')).toBeInTheDocument()
  })

  it('does not render content when open is false', () => {
    render(
      <CodeModal
        componentName="Test Component"
        messages={mockMessages}
        open={false}
        onOpenChange={() => {}}
      />,
    )

    // Dialog should not be visible
    expect(screen.queryByText('Test Component - Code')).not.toBeInTheDocument()
  })

  it('calls onOpenChange when close button is clicked', () => {
    const onOpenChange = vi.fn()
    render(
      <CodeModal
        componentName="Test Component"
        messages={mockMessages}
        open={true}
        onOpenChange={onOpenChange}
      />,
    )

    // Find and click the close button (use hidden: true since dialog is not modal in jsdom)
    const closeButton = screen.getByRole('button', { name: /close/i, hidden: true })
    fireEvent.click(closeButton)

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('shows JSON and React code sections', () => {
    render(
      <CodeModal
        componentName="Test Component"
        messages={mockMessages}
        open={true}
        onOpenChange={() => {}}
      />,
    )

    expect(screen.getByText('JSON Messages')).toBeInTheDocument()
    expect(screen.getByText('React Code')).toBeInTheDocument()
  })
})
