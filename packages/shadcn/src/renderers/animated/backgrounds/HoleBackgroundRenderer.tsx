'use client'

import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import type { HoleBackgroundComponent } from 'a2ui-shadcn-ui-core'
import { motion } from 'framer-motion'

export const HoleBackgroundRenderer: A2UIRenderer<HoleBackgroundComponent> = {
  type: 'hole-background',
  render: ({ component, children }) => {
    const {
      holeSize = 200,
      color = 'hsl(var(--primary))',
      rings = 5,
      animated = true,
      pulseSpeed = 2,
    } = component

    return (
      <div className="relative w-full h-full min-h-[300px] overflow-hidden bg-[hsl(var(--background))]">
        {/* Concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: rings }, (_, i) => {
            const size = holeSize + i * 60
            const delay = i * 0.2

            return (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: size,
                  height: size,
                  border: `2px solid ${color}`,
                  opacity: 0.3 - i * 0.05,
                }}
                animate={
                  animated
                    ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.3 - i * 0.05, 0.5 - i * 0.05, 0.3 - i * 0.05],
                      }
                    : {}
                }
                transition={{
                  duration: pulseSpeed,
                  delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )
          })}

          {/* Central hole with glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: holeSize,
              height: holeSize,
              background: `radial-gradient(circle, transparent 30%, ${color}10 70%, ${color}30 100%)`,
              boxShadow: `0 0 60px ${color}40, inset 0 0 60px ${color}20`,
            }}
            animate={
              animated
                ? {
                    boxShadow: [
                      `0 0 60px ${color}40, inset 0 0 60px ${color}20`,
                      `0 0 80px ${color}60, inset 0 0 80px ${color}30`,
                      `0 0 60px ${color}40, inset 0 0 60px ${color}20`,
                    ],
                  }
                : {}
            }
            transition={{
              duration: pulseSpeed * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    )
  },
  example: {
    name: 'Hole Background',
    description: 'Pulsing circular portal effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'hole-bg-example', root: 'bg-1' } },
      {
        updateComponents: {
          surfaceId: 'hole-bg-example',
          components: [
            { id: 'bg-1', component: { type: 'hole-background', id: 'bg-1', holeSize: 150, rings: 4, animated: true, pulseSpeed: 2 } },
          ],
        },
      },
    ],
  },
}
