import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'

interface MagneticButtonComponent {
  type: 'MagneticButton'
  id: string
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  strength?: number
}

export const MagneticButtonRenderer: A2UIRenderer<MagneticButtonComponent> = {
  type: 'MagneticButton',
  render: ({ component, children, data, onAction }: RendererProps<MagneticButtonComponent>) => {
    const ref = useRef<HTMLButtonElement>(null)
    const strength = component.strength || 0.3

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 15 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const rotateX = useTransform(springY, [-20, 20], [10, -10])
    const rotateY = useTransform(springX, [-20, 20], [-10, 10])

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = (e.clientX - centerX) * strength
      const distanceY = (e.clientY - centerY) * strength
      x.set(distanceX)
      y.set(distanceY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    const handleClick = () => {
      if (component.action) {
        const payload: Record<string, unknown> = component.actionPayload
          ? { ...component.actionPayload }
          : {}

        if (component.submitDataPaths) {
          for (const path of component.submitDataPaths) {
            const value = data.get(path)
            if (value !== undefined) {
              payload[path] = value
            }
          }
        }

        onAction({
          type: component.action,
          payload: Object.keys(payload).length > 0 ? payload : undefined,
        })
      }
    }

    const primaryStyle = {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
    }

    const secondaryStyle = {
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      borderColor: 'hsl(var(--input))',
    }

    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          ...component.primary ? primaryStyle : secondaryStyle,
        }}
        whileTap={{ scale: 0.95 }}
        className={
          component.primary
            ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
            : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
        }
      >
        {children as ReactNode}
      </motion.button>
    )
  },
  example: {
    name: 'Magnetic Button',
    description: 'Button that follows the cursor with magnetic attraction',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'magnetic-btn-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'magnetic-btn-example',
          components: [
            { id: 'row-1', component: { type: 'Row', id: 'row-1', distribution: 'packed', children: ['btn-1', 'btn-2'] } },
            { id: 'btn-1', component: { type: 'MagneticButton', id: 'btn-1', child: 'text-1', primary: true, action: 'click' } },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Magnetic Primary' } },
            { id: 'btn-2', component: { type: 'MagneticButton', id: 'btn-2', child: 'text-2', primary: false, strength: 0.5, action: 'click' } },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Strong Magnetic' } },
          ],
        },
      },
    ],
  },
}
