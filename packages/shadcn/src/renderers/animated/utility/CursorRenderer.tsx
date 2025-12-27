'use client'

import type { CursorComponent } from 'a2ui-react-core'
import type { A2UIRenderer } from 'a2ui-react-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

export const CursorRenderer: A2UIRenderer<CursorComponent> = {
  type: 'cursor',
  render: ({ component, children }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const {
      size = 20,
      color = 'hsl(var(--primary))',
      trailLength = 5,
      smoothing = 0.15,
      showTrail = true,
      mixBlendMode = 'difference',
    } = component

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 200 * (1 / smoothing) }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    // Trail positions with increasing delay
    const trailConfigs = Array.from({ length: trailLength }, (_, i) => ({
      x: useSpring(mouseX, { damping: 20, stiffness: 150 - i * 20 }),
      y: useSpring(mouseY, { damping: 20, stiffness: 150 - i * 20 }),
      scale: 1 - (i + 1) * 0.15,
      opacity: 0.5 - i * 0.1,
    }))

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    const cursorSize = isHovering ? size * 1.5 : isClicking ? size * 0.8 : size

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: Decorative cursor tracking area, not interactive content
      // biome-ignore lint/a11y/useKeyWithMouseEvents: Cursor effects are purely visual and don't require keyboard alternatives
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-[120px] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* Content */}
        {children}

        {/* Trail */}
        {showTrail &&
          trailConfigs.map((trail, i) => (
            <motion.div
              key={`trail-${i}-${trailLength}`}
              className="absolute top-0 left-0 rounded-full pointer-events-none"
              style={{
                x: trail.x,
                y: trail.y,
                width: size * trail.scale,
                height: size * trail.scale,
                backgroundColor: color,
                opacity: trail.opacity,
                translateX: '-50%',
                translateY: '-50%',
                mixBlendMode: mixBlendMode as React.CSSProperties['mixBlendMode'],
              }}
            />
          ))}

        {/* Main cursor */}
        <motion.div
          className="absolute top-0 left-0 rounded-full pointer-events-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            mixBlendMode: mixBlendMode as React.CSSProperties['mixBlendMode'],
          }}
          animate={{
            width: cursorSize,
            height: cursorSize,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
        </motion.div>
      </div>
    )
  },
  example: {
    name: 'Custom Cursor',
    description: 'Animated custom cursor with trail effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'cursor-example', root: 'cursor-1' } },
      {
        updateComponents: {
          surfaceId: 'cursor-example',
          components: [
            {
              id: 'cursor-1',
              component: {
                type: 'cursor',
                id: 'cursor-1',
                size: 20,
                trailLength: 4,
                showTrail: true,
                smoothing: 0.15,
              },
            },
          ],
        },
      },
    ],
  },
}
