import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { type ReactNode, useMemo } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'

interface ParticlesBackgroundComponent {
  type: 'ParticlesBackground'
  id: string
  children?: string[]
  particleCount?: number
  particleColor?: string
  particleSize?: number
  speed?: number
  connected?: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export const ParticlesBackgroundRenderer: A2UIRenderer<ParticlesBackgroundComponent> = {
  type: 'ParticlesBackground',
  render: ({ component, children }: RendererProps<ParticlesBackgroundComponent>) => {
    const prefersReducedMotion = useReducedMotion()
    const count = component.particleCount || 30
    const color = component.particleColor || 'hsl(var(--primary))'
    const size = component.particleSize || 4
    const speed = component.speed || 20

    const particles: Particle[] = useMemo(() => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: size * (0.5 + Math.random() * 0.5),
        duration: speed * (0.5 + Math.random()),
        delay: Math.random() * speed,
      }))
    }, [count, size, speed])

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '200px',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {/* Particles */}
        {!prefersReducedMotion &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                opacity: 0,
              }}
              animate={{
                y: [`${particle.y}%`, `${particle.y - 30}%`, `${particle.y}%`],
                x: [
                  `${particle.x}%`,
                  `${particle.x + (Math.random() - 0.5) * 20}%`,
                  `${particle.x}%`,
                ],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: `0 0 ${particle.size * 2}px ${color}`,
                zIndex: 0,
              }}
            />
          ))}

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '2rem',
          }}
        >
          {children as ReactNode}
        </div>
      </div>
    )
  },
  example: {
    name: 'Particles Background',
    description: 'Animated floating particles background',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'particles-example', root: 'particles-1' } },
      {
        updateComponents: {
          surfaceId: 'particles-example',
          components: [
            {
              id: 'particles-1',
              component: {
                type: 'ParticlesBackground',
                id: 'particles-1',
                children: ['text-1'],
                particleCount: 40,
                particleColor: '#667eea',
              },
            },
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Floating particles!',
                style: 'h2',
              },
            },
          ],
        },
      },
    ],
  },
}
