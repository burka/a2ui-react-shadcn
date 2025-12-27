'use client'

import type { HexagonBackgroundComponent } from 'a2ui-react-core'
import type { A2UIRenderer } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Hexagon {
  id: number
  row: number
  col: number
  delay: number
}

export const HexagonBackgroundRenderer: A2UIRenderer<HexagonBackgroundComponent> = {
  type: 'hexagon-background',
  render: ({ component, children }) => {
    const {
      rows = 8,
      cols = 12,
      color = 'hsl(var(--primary))',
      hoverEffect = true,
      animated = true,
      gap = 4,
    } = component

    const hexagons = useMemo<Hexagon[]>(() => {
      const result: Hexagon[] = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          result.push({
            id: row * cols + col,
            row,
            col,
            delay: (row + col) * 0.05,
          })
        }
      }
      return result
    }, [rows, cols])

    const hexSize = 40
    const hexHeight = hexSize * 0.866

    // Calculate total SVG dimensions
    const svgWidth = cols * (hexSize + gap) + (hexSize + gap) / 2
    const svgHeight = rows * (hexHeight * 0.75 + gap) + hexHeight / 2

    return (
      <div className="relative w-full h-full min-h-[300px] overflow-hidden bg-[hsl(var(--background))]">
        {/* Hexagon grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {hexagons.map((hex) => {
              const xOffset = hex.row % 2 === 0 ? 0 : (hexSize + gap) / 2
              const x = hex.col * (hexSize + gap) + xOffset + hexSize / 2
              const y = hex.row * (hexHeight * 0.75 + gap) + hexHeight / 2

              const points = Array.from({ length: 6 }, (_, i) => {
                const angle = (60 * i - 30) * (Math.PI / 180)
                const px = x + (hexSize / 2) * Math.cos(angle)
                const py = y + (hexSize / 2) * Math.sin(angle)
                return `${px},${py}`
              }).join(' ')

              return (
                <motion.polygon
                  key={hex.id}
                  points={points}
                  fill="transparent"
                  stroke={color}
                  strokeWidth="1"
                  style={{ opacity: 0.3 }}
                  initial={animated ? { opacity: 0, scale: 0 } : {}}
                  animate={
                    animated
                      ? {
                          opacity: [0.2, 0.4, 0.2],
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    delay: hex.delay,
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={
                    hoverEffect
                      ? {
                          fill: `${color}40`,
                          opacity: 1,
                          transition: { duration: 0.2 },
                        }
                      : {}
                  }
                  className={hoverEffect ? 'cursor-pointer' : ''}
                />
              )
            })}
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    )
  },
  example: {
    name: 'Hexagon Background',
    description: 'Animated hexagonal grid pattern',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'hexagon-bg-example', root: 'bg-1' } },
      {
        updateComponents: {
          surfaceId: 'hexagon-bg-example',
          components: [
            {
              id: 'bg-1',
              component: {
                type: 'hexagon-background',
                id: 'bg-1',
                rows: 6,
                cols: 10,
                hoverEffect: true,
                animated: true,
              },
            },
          ],
        },
      },
    ],
  },
}
