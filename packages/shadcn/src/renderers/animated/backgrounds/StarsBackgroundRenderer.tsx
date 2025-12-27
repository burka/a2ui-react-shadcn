'use client'

import type { StarsBackgroundComponent } from 'a2ui-react-core'
import type { A2UIRenderer } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

export const StarsBackgroundRenderer: A2UIRenderer<StarsBackgroundComponent> = {
  type: 'stars-background',
  render: ({ component, children }) => {
    const prefersReducedMotion = useReducedMotion()
    const {
      starCount = 100,
      minSize = 1,
      maxSize = 3,
      color = '#ffffff',
      twinkle = true,
      speed = 1,
    } = component

    const stars = useMemo<Star[]>(() => {
      return Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random() * 0.5 + 0.5,
        duration: (Math.random() * 2 + 1) / speed,
        delay: Math.random() * 2,
      }))
    }, [starCount, minSize, maxSize, speed])

    return (
      <div className="relative w-full h-full min-h-[300px] overflow-hidden bg-slate-950">
        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${star.size * 2}px ${color}`,
            }}
            animate={
              prefersReducedMotion || !twinkle
                ? {}
                : {
                    opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                    scale: [1, 0.8, 1],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: star.duration,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        ))}

        {/* Content */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    )
  },
  example: {
    name: 'Stars Background',
    description: 'Twinkling stars night sky effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'stars-bg-example', root: 'bg-1' } },
      {
        updateComponents: {
          surfaceId: 'stars-bg-example',
          components: [
            {
              id: 'bg-1',
              component: {
                type: 'stars-background',
                id: 'bg-1',
                starCount: 80,
                twinkle: true,
                speed: 1,
              },
            },
          ],
        },
      },
    ],
  },
}
