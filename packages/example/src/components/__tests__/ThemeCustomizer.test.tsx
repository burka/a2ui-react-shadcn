import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { A2UIProvider, shadcnRenderers } from 'a2ui-react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ThemeCustomizer } from '../ThemeCustomizer'

// Mock clipboard API
const mockWriteText = vi.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<A2UIProvider renderers={shadcnRenderers}>{ui}</A2UIProvider>)
}

describe('ThemeCustomizer', () => {
  afterEach(() => {
    cleanup()
    mockWriteText.mockClear()
  })

  it('renders theme customizer with presets', () => {
    renderWithProvider(<ThemeCustomizer />)

    expect(screen.getByText('Theme Customizer')).toBeInTheDocument()
    expect(screen.getByText('Presets')).toBeInTheDocument()
    expect(screen.getByText('Default (Blue)')).toBeInTheDocument()
    expect(screen.getByText('Purple')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
    expect(screen.getByText('Orange')).toBeInTheDocument()
    expect(screen.getByText('Minimal')).toBeInTheDocument()
  })

  it('renders color picker and radius slider', () => {
    renderWithProvider(<ThemeCustomizer />)

    expect(screen.getByLabelText('Primary Color')).toBeInTheDocument()
    expect(screen.getByLabelText(/Border Radius/)).toBeInTheDocument()
  })

  it('renders live preview section', () => {
    renderWithProvider(<ThemeCustomizer />)

    // Use getAllByText since both the label and the A2UISurface content contain "Live Preview"
    const livePreviewElements = screen.getAllByText('Live Preview')
    expect(livePreviewElements.length).toBeGreaterThanOrEqual(1)
  })

  it('renders generated CSS section', () => {
    renderWithProvider(<ThemeCustomizer />)

    expect(screen.getByText('Generated CSS')).toBeInTheDocument()
    expect(screen.getByText(/Copy CSS/)).toBeInTheDocument()
  })

  it('shows active state on default preset', () => {
    renderWithProvider(<ThemeCustomizer />)

    const defaultButton = screen.getByText('Default (Blue)')
    expect(defaultButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('changes active preset when clicking another preset', () => {
    renderWithProvider(<ThemeCustomizer />)

    const purpleButton = screen.getByText('Purple')
    fireEvent.click(purpleButton)

    expect(purpleButton).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Default (Blue)')).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders reset button', () => {
    renderWithProvider(<ThemeCustomizer />)

    expect(screen.getByLabelText('Reset to default theme')).toBeInTheDocument()
  })

  it('resets to default when reset button is clicked', () => {
    renderWithProvider(<ThemeCustomizer />)

    // First change to Purple
    fireEvent.click(screen.getByText('Purple'))
    expect(screen.getByText('Purple')).toHaveAttribute('aria-pressed', 'true')

    // Then reset
    fireEvent.click(screen.getByLabelText('Reset to default theme'))
    expect(screen.getByText('Default (Blue)')).toHaveAttribute('aria-pressed', 'true')
  })

  it('copies CSS to clipboard when copy button is clicked', async () => {
    mockWriteText.mockResolvedValue(undefined)
    renderWithProvider(<ThemeCustomizer />)

    const copyButton = screen.getByLabelText('Copy CSS to clipboard')
    fireEvent.click(copyButton)

    expect(mockWriteText).toHaveBeenCalledTimes(1)
    expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('--primary:'))
  })

  it('shows copied feedback after clicking copy', async () => {
    mockWriteText.mockResolvedValue(undefined)
    renderWithProvider(<ThemeCustomizer />)

    const copyButton = screen.getByLabelText('Copy CSS to clipboard')
    fireEvent.click(copyButton)

    // Wait for state update
    await vi.waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('has accessible aria-live region for copy feedback', () => {
    renderWithProvider(<ThemeCustomizer />)

    const liveRegion = document.querySelector('[aria-live="polite"]')
    expect(liveRegion).toBeInTheDocument()
  })
})

// Color utility tests
describe('Color Utilities', () => {
  // Note: These are internal functions, but we test them through the component behavior
  // For direct testing, they would need to be exported

  it('displays HSL value when color is selected', () => {
    renderWithProvider(<ThemeCustomizer />)

    // Default blue theme should show HSL value
    expect(screen.getByText('221 83% 53%')).toBeInTheDocument()
  })

  it('updates HSL display when color picker changes', () => {
    renderWithProvider(<ThemeCustomizer />)

    const colorPicker = screen.getByLabelText('Primary Color')
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } })

    // After changing to red, the HSL should update (approximately 0 100% 50%)
    // The exact value depends on the conversion algorithm
    expect(screen.queryByText('221 83% 53%')).not.toBeInTheDocument()
  })

  it('clears active preset when color is manually changed', () => {
    renderWithProvider(<ThemeCustomizer />)

    // Start with default preset active
    expect(screen.getByText('Default (Blue)')).toHaveAttribute('aria-pressed', 'true')

    // Change color manually
    const colorPicker = screen.getByLabelText('Primary Color')
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } })

    // Preset should no longer be active
    expect(screen.getByText('Default (Blue)')).toHaveAttribute('aria-pressed', 'false')
  })

  it('clears active preset when radius is manually changed', () => {
    renderWithProvider(<ThemeCustomizer />)

    // Start with default preset active
    expect(screen.getByText('Default (Blue)')).toHaveAttribute('aria-pressed', 'true')

    // Change radius manually
    const slider = screen.getByLabelText(/Border Radius/)
    fireEvent.change(slider, { target: { value: '1' } })

    // Preset should no longer be active
    expect(screen.getByText('Default (Blue)')).toHaveAttribute('aria-pressed', 'false')
  })
})
