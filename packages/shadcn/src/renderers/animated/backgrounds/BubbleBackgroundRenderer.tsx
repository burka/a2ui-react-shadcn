'use client'

import type { BubbleBackgroundComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Bubble {
  id: number
  size: number
  x: number
  delay: number
  duration: number
  opacity: number
}

export const BubbleBackgroundRenderer: A2UIRenderer<BubbleBackgroundComponent> = {
  type: 'bubble-background',
  render: ({ component, children }) => {
    const {
      bubbleCount = 20,
      minSize = 10,
      maxSize = 60,
      color = 'hsl(var(--primary))',
      speed = 1,
    } = component

    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(300)

    useEffect(() => {
      const updateHeight = () => {
        if (containerRef.current) {
          setContainerHeight(containerRef.current.offsetHeight)
        }
      }
      updateHeight()
      const observer = new ResizeObserver(updateHeight)
      if (containerRef.current) {
        observer.observe(containerRef.current)
      }
      return () => observer.disconnect()
    }, [])

    const bubbles = useMemo<Bubble[]>(() => {
      return Array.from({ length: bubbleCount }, (_, i) => ({
        id: i,
        size: Math.random() * (maxSize - minSize) + minSize,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: (Math.random() * 10 + 10) / speed,
        opacity: Math.random() * 0.3 + 0.1,
      }))
    }, [bubbleCount, minSize, maxSize, speed])

    return (
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[300px] overflow-hidden bg-[hsl(var(--background))]"
      >
        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              bottom: -bubble.size,
              background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}20)`,
              border: `1px solid ${color}30`,
              opacity: bubble.opacity,
            }}
            animate={{
              y: [0, -(containerHeight + bubble.size * 2)],
              x: [0, Math.sin(bubble.id) * 50],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    )
  },
  example: {
    name: 'Bubble Background',
    description: 'Animated rising bubbles background effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'bubble-bg-example', root: 'bg-1' } },
      {
        updateComponents: {
          surfaceId: 'bubble-bg-example',
          components: [
            {
              id: 'bg-1',
              component: {
                type: 'bubble-background',
                id: 'bg-1',
                bubbleCount: 15,
                minSize: 10,
                maxSize: 40,
                speed: 1,
              },
            },
          ],
        },
      },
    ],
  },
}
