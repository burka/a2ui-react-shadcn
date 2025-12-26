import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { type MouseEvent, type ReactNode, useRef } from 'react'

interface SpotlightComponent {
  type: 'Spotlight'
  id: string
  children?: string[]
  spotlightColor?: string
  spotlightSize?: number
  intensity?: number
}

export const SpotlightRenderer: A2UIRenderer<SpotlightComponent> = {
  type: 'Spotlight',
  render: ({ component, children }: RendererProps<SpotlightComponent>) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const spotlightColor = component.spotlightColor || 'rgba(255, 255, 255, 0.15)'
    const spotlightSize = component.spotlightSize || 300
    const intensity = component.intensity || 0.15

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 20 }
    const spotlightX = useSpring(mouseX, springConfig)
    const spotlightY = useSpring(mouseY, springConfig)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const handleMouseLeave = () => {
      mouseX.set(-spotlightSize)
      mouseY.set(-spotlightSize)
    }

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '200px',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
        }}
      >
        {/* Spotlight effect */}
        <motion.div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: spotlightSize,
            height: spotlightSize,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
            x: spotlightX,
            y: spotlightY,
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        />

        {/* Border glow effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.75rem',
            opacity: intensity,
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.3), transparent 50%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '2rem',
          }}
        >
          {children as ReactNode}
        </div>
      </div>
    )
  },
  example: {
    name: 'Spotlight',
    description: 'Container with cursor-following spotlight effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'spotlight-example', root: 'spotlight-1' } },
      {
        updateComponents: {
          surfaceId: 'spotlight-example',
          components: [
            {
              id: 'spotlight-1',
              component: {
                type: 'Spotlight',
                id: 'spotlight-1',
                children: ['col-1'],
                spotlightColor: 'rgba(100, 130, 255, 0.2)',
              },
            },
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                alignment: 'center',
                children: ['text-1', 'text-2'],
              },
            },
            {
              id: 'text-1',
              component: { type: 'Text', id: 'text-1', content: 'Move your cursor', style: 'h2' },
            },
            {
              id: 'text-2',
              component: { type: 'Text', id: 'text-2', content: 'Watch the spotlight follow!' },
            },
          ],
        },
      },
    ],
  },
}
