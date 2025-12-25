'use client'

import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import type { FireworksBackgroundComponent } from 'a2ui-shadcn-ui-core'
import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

interface Particle {
  id: string
  x: number
  y: number
  color: string
  angle: number
  speed: number
  size: number
}

interface Firework {
  id: string
  x: number
  y: number
  particles: Particle[]
  startTime: number
}

export const FireworksBackgroundRenderer: A2UIRenderer<FireworksBackgroundComponent> = {
  type: 'fireworks-background',
  render: ({ component, children }) => {
    const [fireworks, setFireworks] = useState<Firework[]>([])

    const {
      frequency = 2000,
      particleCount = 30,
      colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      autoPlay = true,
    } = component

    const createFirework = useMemo(() => {
      return () => {
        const x = 20 + Math.random() * 60
        const y = 20 + Math.random() * 40
        const color = colors[Math.floor(Math.random() * colors.length)] || '#ffffff'

        const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
          id: `p-${i}`,
          x: 0,
          y: 0,
          color,
          angle: (360 / particleCount) * i + Math.random() * 10,
          speed: 50 + Math.random() * 100,
          size: 2 + Math.random() * 4,
        }))

        return {
          id: `fw-${Date.now()}-${Math.random()}`,
          x,
          y,
          particles,
          startTime: Date.now(),
        }
      }
    }, [colors, particleCount])

    useEffect(() => {
      if (!autoPlay) return

      const interval = setInterval(() => {
        setFireworks((prev) => {
          const now = Date.now()
          const filtered = prev.filter((fw) => now - fw.startTime < 2000)
          return [...filtered, createFirework()]
        })
      }, frequency)

      return () => clearInterval(interval)
    }, [autoPlay, frequency, createFirework])

    return (
      <div className="relative w-full h-full min-h-[300px] overflow-hidden bg-[hsl(var(--background))]">
        {/* Fireworks */}
        {fireworks.map((firework) => (
          <div
            key={firework.id}
            className="absolute pointer-events-none"
            style={{
              left: `${firework.x}%`,
              top: `${firework.y}%`,
            }}
          >
            {firework.particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((particle.angle * Math.PI) / 180) * particle.speed,
                  y: Math.sin((particle.angle * Math.PI) / 180) * particle.speed,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    )
  },
  example: {
    name: 'Fireworks Background',
    description: 'Animated fireworks explosion effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'fireworks-bg-example', root: 'bg-1' } },
      {
        updateComponents: {
          surfaceId: 'fireworks-bg-example',
          components: [
            { id: 'bg-1', component: { type: 'fireworks-background', id: 'bg-1', frequency: 1500, particleCount: 25, autoPlay: true } },
          ],
        },
      },
    ],
  },
}
