import type { A2UIMessage } from 'a2ui-react'
import { A2UISurface } from 'a2ui-react'
import { Check, Copy, Palette } from 'lucide-react'
import { memo, useCallback, useEffect, useState } from 'react'

// HSL color utilities
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result || !result[1] || !result[2] || !result[3]) return { h: 0, s: 0, l: 0 }
  const r = Number.parseInt(result[1], 16) / 255
  const g = Number.parseInt(result[2], 16) / 255
  const b = Number.parseInt(result[3], 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60
        break
      case g:
        h = ((b - r) / d + 2) * 60
        break
      case b:
        h = ((r - g) / d + 4) * 60
        break
    }
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

interface ThemePreset {
  name: string
  primary: string // HSL string "h s% l%"
  radius: string
  background?: string
}

const THEME_PRESETS: ThemePreset[] = [
  { name: 'Default (Blue)', primary: '221 83% 53%', radius: '0.5rem' },
  { name: 'Purple', primary: '270 76% 58%', radius: '0.75rem' },
  { name: 'Green', primary: '142 71% 45%', radius: '0.5rem' },
  { name: 'Orange', primary: '25 95% 53%', radius: '0.625rem' },
  { name: 'Minimal', primary: '0 0% 15%', radius: '0' },
]

// Sample A2UI messages for live preview
const PREVIEW_MESSAGES: A2UIMessage[] = [
  {
    createSurface: {
      surfaceId: 'theme-preview',
      root: 'preview-root',
    },
  },
  {
    updateComponents: {
      surfaceId: 'theme-preview',
      components: [
        {
          id: 'preview-root',
          component: {
            type: 'Column',
            id: 'preview-root',
            children: ['preview-card'],
          },
        },
        {
          id: 'preview-card',
          component: {
            type: 'Card',
            id: 'preview-card',
            children: ['card-content'],
          },
        },
        {
          id: 'card-content',
          component: {
            type: 'Column',
            id: 'card-content',
            children: ['preview-title', 'preview-text', 'preview-buttons'],
          },
        },
        {
          id: 'preview-title',
          component: {
            type: 'Text',
            id: 'preview-title',
            text: 'Live Preview',
            style: 'h3',
          },
        },
        {
          id: 'preview-text',
          component: {
            type: 'Text',
            id: 'preview-text',
            text: 'See your theme changes in real-time.',
            style: 'body',
          },
        },
        {
          id: 'preview-buttons',
          component: {
            type: 'Row',
            id: 'preview-buttons',
            distribution: 'packed',
            children: ['btn-primary', 'btn-secondary'],
          },
        },
        {
          id: 'btn-primary',
          component: {
            type: 'Button',
            id: 'btn-primary',
            child: 'btn-primary-text',
            primary: true,
          },
        },
        {
          id: 'btn-primary-text',
          component: {
            type: 'Text',
            id: 'btn-primary-text',
            text: 'Primary',
          },
        },
        {
          id: 'btn-secondary',
          component: {
            type: 'Button',
            id: 'btn-secondary',
            child: 'btn-secondary-text',
            primary: false,
          },
        },
        {
          id: 'btn-secondary-text',
          component: {
            type: 'Text',
            id: 'btn-secondary-text',
            text: 'Secondary',
          },
        },
      ],
    },
  },
]

interface ThemeValues {
  primary: string
  radius: string
  background: string
}

function parseHslString(hsl: string): { h: number; s: number; l: number } {
  const parts = hsl.split(' ')
  return {
    h: parseFloat(parts[0] || '0'),
    s: parseFloat((parts[1] || '0%').replace('%', '')),
    l: parseFloat((parts[2] || '0%').replace('%', '')),
  }
}

function ThemeCustomizerComponent() {
  const [theme, setTheme] = useState<ThemeValues>({
    primary: '221 83% 53%',
    radius: '0.5rem',
    background: '0 0% 100%',
  })
  const [copied, setCopied] = useState(false)

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--a2ui-accent', theme.primary)
    root.style.setProperty('--radius', theme.radius)
    root.style.setProperty('--a2ui-radius', theme.radius)

    return () => {
      // Reset on unmount
      root.style.removeProperty('--primary')
      root.style.removeProperty('--a2ui-accent')
      root.style.removeProperty('--radius')
      root.style.removeProperty('--a2ui-radius')
    }
  }, [theme])

  const applyPreset = useCallback((preset: ThemePreset) => {
    setTheme({
      primary: preset.primary,
      radius: preset.radius,
      background: preset.background || '0 0% 100%',
    })
  }, [])

  const handleColorChange = useCallback((hex: string) => {
    const hsl = hexToHsl(hex)
    setTheme((prev) => ({
      ...prev,
      primary: `${hsl.h} ${hsl.s}% ${hsl.l}%`,
    }))
  }, [])

  const handleRadiusChange = useCallback((value: string) => {
    setTheme((prev) => ({ ...prev, radius: value }))
  }, [])

  const generateCSS = useCallback(() => {
    return `:root {
  /* Custom A2UI Theme */
  --primary: ${theme.primary};
  --a2ui-accent: ${theme.primary};
  --radius: ${theme.radius};
  --a2ui-radius: ${theme.radius};
}`
  }, [theme])

  const copyCSS = useCallback(async () => {
    await navigator.clipboard.writeText(generateCSS())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generateCSS])

  const primaryHsl = parseHslString(theme.primary)
  const primaryHex = hslToHex(primaryHsl.h, primaryHsl.s, primaryHsl.l)

  return (
    <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-5 h-5 text-[var(--color-a2ui-accent)]" />
        <h3 className="text-xl font-semibold text-[var(--color-a2ui-text-primary)]">
          Theme Customizer
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          {/* Presets */}
          <div>
            <span className="block text-sm font-medium text-[var(--color-a2ui-text-secondary)] mb-2">
              Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-1.5 text-sm rounded-md border border-[var(--color-a2ui-border)] bg-[var(--color-a2ui-bg-primary)] text-[var(--color-a2ui-text-primary)] hover:bg-[var(--color-a2ui-bg-tertiary)] transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Color */}
          <div>
            <label
              htmlFor="theme-primary-color"
              className="block text-sm font-medium text-[var(--color-a2ui-text-secondary)] mb-2"
            >
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                id="theme-primary-color"
                type="color"
                value={primaryHex}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-10 rounded cursor-pointer border border-[var(--color-a2ui-border)]"
              />
              <code className="text-sm text-[var(--color-a2ui-text-secondary)] font-mono bg-[var(--color-a2ui-bg-primary)] px-2 py-1 rounded">
                {theme.primary}
              </code>
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <label
              htmlFor="theme-border-radius"
              className="block text-sm font-medium text-[var(--color-a2ui-text-secondary)] mb-2"
            >
              Border Radius: {theme.radius}
            </label>
            <input
              id="theme-border-radius"
              type="range"
              min="0"
              max="1.5"
              step="0.125"
              value={parseFloat(theme.radius)}
              onChange={(e) => handleRadiusChange(`${e.target.value}rem`)}
              className="w-full"
            />
          </div>

          {/* Generated CSS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--color-a2ui-text-secondary)]">
                Generated CSS
              </span>
              <button
                type="button"
                onClick={copyCSS}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-[var(--color-a2ui-accent)] text-white hover:opacity-90 transition-opacity"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
            <pre className="text-xs bg-[var(--color-a2ui-bg-primary)] p-3 rounded border border-[var(--color-a2ui-border)] overflow-x-auto text-[var(--color-a2ui-text-primary)]">
              <code>{generateCSS()}</code>
            </pre>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <span className="block text-sm font-medium text-[var(--color-a2ui-text-secondary)] mb-2">
            Live Preview
          </span>
          <div className="border border-[var(--color-a2ui-border)] rounded-lg p-4 bg-[var(--color-a2ui-bg-primary)] min-h-[200px]">
            <A2UISurface surfaceId="theme-preview" messages={PREVIEW_MESSAGES} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const ThemeCustomizer = memo(ThemeCustomizerComponent)
