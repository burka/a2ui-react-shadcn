'use client'

import type { ThemeTogglerButtonComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'

export const ThemeTogglerButtonRenderer: A2UIRenderer<ThemeTogglerButtonComponent> = {
  type: 'theme-toggler-button',
  render: ({ component, onAction }) => {
    const [isDark, setIsDark] = useState(component.initialTheme === 'dark')
    const prefersReducedMotion = useReducedMotion()

    const { variant = 'default', size = 'md', animation = 'rotate' } = component

    const sizeStyles = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    }

    const iconSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'outline':
          return 'border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--accent))]'
        case 'ghost':
          return 'bg-transparent hover:bg-[hsl(var(--accent))]'
        default:
          return 'bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/80'
      }
    }

    const handleToggle = () => {
      const newTheme = !isDark
      setIsDark(newTheme)
      onAction?.({ type: 'toggle', payload: { theme: newTheme ? 'dark' : 'light' } })
    }

    const getIconAnimation = () => {
      if (prefersReducedMotion) {
        return {
          initial: {},
          animate: {},
          exit: {},
        }
      }
      switch (animation) {
        case 'flip':
          return {
            initial: { rotateY: -90, opacity: 0 },
            animate: { rotateY: 0, opacity: 1 },
            exit: { rotateY: 90, opacity: 0 },
            transition: { duration: 0.3 },
          }
        case 'scale':
          return {
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0, opacity: 0 },
            transition: { duration: 0.2 },
          }
        case 'slide':
          return {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -20, opacity: 0 },
            transition: { duration: 0.2 },
          }
        default:
          return {
            initial: { rotate: -90, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: 90, opacity: 0 },
            transition: { duration: 0.3, ease: 'easeInOut' as const },
          }
      }
    }

    const iconAnimation = getIconAnimation()

    return (
      <motion.button
        className={`relative inline-flex items-center justify-center rounded-lg transition-colors ${sizeStyles[size]} ${getVariantStyles()}`}
        onClick={handleToggle}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="moon" {...iconAnimation}>
              <Moon className={iconSizes[size]} />
            </motion.div>
          ) : (
            <motion.div key="sun" {...iconAnimation}>
              <Sun className={iconSizes[size]} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
  },
  example: {
    name: 'Theme Toggler',
    description: 'Animated light/dark theme toggle button',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'theme-toggler-example', root: 'btn-1' } },
      {
        updateComponents: {
          surfaceId: 'theme-toggler-example',
          components: [
            {
              id: 'btn-1',
              component: {
                type: 'theme-toggler-button',
                id: 'btn-1',
                initialTheme: 'light',
                variant: 'outline',
                size: 'md',
                animation: 'rotate',
              },
            },
          ],
        },
      },
    ],
  },
}
