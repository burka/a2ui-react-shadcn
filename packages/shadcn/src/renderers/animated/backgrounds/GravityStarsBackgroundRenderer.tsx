'use client'

import type { GravityStarsBackgroundComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  vx: number
  vy: number
}

export const GravityStarsBackgroundRenderer: A2UIRenderer<GravityStarsBackgroundComponent> = {
  type: 'gravity-stars-background',
  render: ({ component, children }) => {
    const {
      starCount = 50,
      minSize = 2,
      maxSize = 5,
      color = '#ffffff',
      gravity = 0.02,
      interactive = true,
    } = component

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

    const initialStars = useMemo<Star[]>(() => {
      return Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }))
    }, [starCount, minSize, maxSize])

    const [stars, setStars] = useState(initialStars)

    useEffect(() => {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
      if (!interactive) return

      const interval = setInterval(() => {
        setStars((prevStars) =>
          prevStars.map((star) => {
            const starX = (star.x / 100) * dimensions.width
            const starY = (star.y / 100) * dimensions.height

            const dx = mousePos.x - starX
            const dy = mousePos.y - starY
            const distance = Math.sqrt(dx * dx + dy * dy) || 1

            const force = Math.min((gravity * 1000) / distance, 0.5)
            const ax = (dx / distance) * force
            const ay = (dy / distance) * force

            let newVx = star.vx + ax
            let newVy = star.vy + ay

            // Damping
            newVx *= 0.98
            newVy *= 0.98

            let newX = star.x + newVx
            let newY = star.y + newVy

            // Wrap around edges
            if (newX < 0) newX = 100
            if (newX > 100) newX = 0
            if (newY < 0) newY = 100
            if (newY > 100) newY = 0

            return {
              ...star,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
            }
          }),
        )
      }, 16)

      return () => clearInterval(interval)
    }, [interactive, mousePos, gravity, dimensions])

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!interactive) return
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    return (
      <div
        className="relative w-full h-full min-h-[300px] overflow-hidden bg-slate-950"
        onMouseMove={handleMouseMove}
      >
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
              boxShadow: `0 0 ${star.size * 3}px ${color}`,
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.id * 0.02,
            }}
          />
        ))}

        {/* Mouse glow effect */}
        {interactive && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 100,
              height: 100,
              left: mousePos.x - 50,
              top: mousePos.y - 50,
              background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    )
  },
  example: {
    name: 'Gravity Stars',
    description: 'Stars attracted to cursor with gravity effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'gravity-stars-example', root: 'bg-1' } },
      {
        updateComponents: {
          surfaceId: 'gravity-stars-example',
          components: [
            {
              id: 'bg-1',
              component: {
                type: 'gravity-stars-background',
                id: 'bg-1',
                starCount: 40,
                interactive: true,
                gravity: 0.02,
              },
            },
          ],
        },
      },
    ],
  },
}
