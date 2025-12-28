import { Monitor, Moon, Sun } from 'lucide-react'
import { memo } from 'react'
import { useTheme } from '../context/ThemeContext'

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(nextTheme)
  }

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
      aria-label={`Current theme: ${theme}. Click to cycle to next theme.`}
      title={`Current: ${theme}`}
    >
      <Icon className="w-5 h-5 text-[var(--color-text-primary)]" />
    </button>
  )
})
