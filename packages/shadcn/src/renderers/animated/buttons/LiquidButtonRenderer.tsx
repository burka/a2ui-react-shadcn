'use client'

import type { LiquidButtonComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const LiquidButtonRenderer: A2UIRenderer<LiquidButtonComponent> = {
  type: 'liquid-button',
  render: ({ component, onAction }) => {
    const [isHovered, setIsHovered] = useState(false)

    const { label = 'Click me', variant = 'default', liquidColor, duration = 0.6 } = component

    const getVariantColors = () => {
      switch (variant) {
        case 'destructive':
          return {
            bg: 'hsl(var(--destructive))',
            text: 'hsl(var(--destructive-foreground))',
            liquid: liquidColor || 'hsl(0 84% 50%)',
          }
        case 'outline':
          return {
            bg: 'transparent',
            text: 'hsl(var(--foreground))',
            liquid: liquidColor || 'hsl(var(--primary))',
          }
        case 'secondary':
          return {
            bg: 'hsl(var(--secondary))',
            text: 'hsl(var(--secondary-foreground))',
            liquid: liquidColor || 'hsl(var(--primary))',
          }
        default:
          return {
            bg: 'hsl(var(--primary))',
            text: 'hsl(var(--primary-foreground))',
            liquid: liquidColor || 'hsl(220 80% 45%)',
          }
      }
    }

    const colors = getVariantColors()

    return (
      <motion.button
        className="relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-colors"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          border: variant === 'outline' ? '1px solid hsl(var(--border))' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onAction?.({ type: 'click' })}
        whileTap={{ scale: 0.98 }}
      >
        {/* Liquid blob effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ y: '100%' }}
          animate={{ y: isHovered ? '0%' : '100%' }}
          transition={{
            duration,
            ease: [0.33, 1, 0.68, 1],
          }}
          style={{ backgroundColor: colors.liquid }}
        >
          {/* Wavy top edge */}
          <svg
            className="absolute -top-2 left-0 w-full"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            style={{ height: '12px' }}
          >
            <motion.path
              d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z"
              fill={colors.liquid}
              animate={{
                d: isHovered
                  ? [
                      'M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z',
                      'M0,10 Q25,20 50,10 T100,10 L100,20 L0,20 Z',
                      'M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z',
                    ]
                  : 'M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z',
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
        </motion.div>

        <span className="relative z-10">{label}</span>
      </motion.button>
    )
  },
  example: {
    name: 'Liquid Button',
    description: 'Button with liquid fill animation on hover',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'liquid-btn-example', root: 'btn-1' } },
      {
        updateComponents: {
          surfaceId: 'liquid-btn-example',
          components: [
            {
              id: 'btn-1',
              component: {
                type: 'liquid-button',
                id: 'btn-1',
                label: 'Hover me',
                variant: 'default',
                duration: 0.6,
              },
            },
          ],
        },
      },
    ],
  },
}
