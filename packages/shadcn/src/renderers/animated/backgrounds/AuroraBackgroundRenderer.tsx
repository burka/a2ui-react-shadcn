import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'

interface AuroraBackgroundComponent {
  type: 'AuroraBackground'
  id: string
  children?: string[]
  colors?: string[]
  speed?: number
  blur?: number
}

export const AuroraBackgroundRenderer: A2UIRenderer<AuroraBackgroundComponent> = {
  type: 'AuroraBackground',
  render: ({ component, children }: RendererProps<AuroraBackgroundComponent>) => {
    const prefersReducedMotion = useReducedMotion()
    const colors = component.colors || ['#00d4ff', '#7c3aed', '#f472b6', '#34d399']
    const speed = component.speed || 15
    const blur = component.blur || 80

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '300px',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Aurora blobs */}
        {colors.map((color, index) => {
          const offset = (index / colors.length) * 360
          return (
            <motion.div
              key={`aurora-${color}-${offset}`}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      x: [
                        `${20 + index * 15}%`,
                        `${50 + Math.sin(offset) * 30}%`,
                        `${80 - index * 10}%`,
                        `${20 + index * 15}%`,
                      ],
                      y: [
                        `${20 + index * 10}%`,
                        `${60 - index * 15}%`,
                        `${30 + index * 10}%`,
                        `${20 + index * 10}%`,
                      ],
                      scale: [1, 1.2, 0.8, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: speed + index * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }
              }
              style={{
                position: 'absolute',
                width: '40%',
                height: '40%',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(${blur}px)`,
                opacity: 0.6,
                zIndex: 0,
              }}
            />
          )
        })}

        {/* Overlay for better text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'hsl(var(--background) / 0.3)',
            zIndex: 1,
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
    name: 'Aurora Background',
    description: 'Beautiful aurora borealis-style animated background',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'aurora-example', root: 'aurora-1' } },
      {
        updateComponents: {
          surfaceId: 'aurora-example',
          components: [
            {
              id: 'aurora-1',
              component: {
                type: 'AuroraBackground',
                id: 'aurora-1',
                children: ['col-1'],
                colors: ['#00d4ff', '#7c3aed', '#f472b6'],
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
              component: { type: 'Text', id: 'text-1', content: 'Aurora Effect', style: 'h1' },
            },
            {
              id: 'text-2',
              component: {
                type: 'Text',
                id: 'text-2',
                content: 'Beautiful animated northern lights',
              },
            },
          ],
        },
      },
    ],
  },
}
