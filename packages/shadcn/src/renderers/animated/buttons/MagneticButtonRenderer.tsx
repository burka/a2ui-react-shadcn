import type { MagneticButtonComponent } from 'a2ui-shadcn-ui-core'
import { type A2UIRenderer, createActionHandler, type RendererProps } from 'a2ui-shadcn-ui-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { type MouseEvent, type ReactNode, useRef } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'
import { getButtonClassName, getButtonStyle } from '../../../utils/index.js'

export const MagneticButtonRenderer: A2UIRenderer<MagneticButtonComponent> = {
  type: 'MagneticButton',
  render: ({ component, children, data, onAction }: RendererProps<MagneticButtonComponent>) => {
    const ref = useRef<HTMLButtonElement>(null)
    const prefersReducedMotion = useReducedMotion()
    const strength = component.strength || 0.3
    const handleClick = createActionHandler(component, data, onAction)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 15 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const rotateX = useTransform(springY, [-20, 20], [10, -10])
    const rotateY = useTransform(springX, [-20, 20], [-10, 10])

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion || !ref.current) return
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

    return (
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          x: prefersReducedMotion ? 0 : springX,
          y: prefersReducedMotion ? 0 : springY,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          ...getButtonStyle(component.primary),
        }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
        className={getButtonClassName(component.primary)}
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
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'packed',
                children: ['btn-1', 'btn-2'],
              },
            },
            {
              id: 'btn-1',
              component: {
                type: 'MagneticButton',
                id: 'btn-1',
                child: 'text-1',
                primary: true,
                action: 'click',
              },
            },
            {
              id: 'text-1',
              component: { type: 'Text', id: 'text-1', content: 'Magnetic Primary' },
            },
            {
              id: 'btn-2',
              component: {
                type: 'MagneticButton',
                id: 'btn-2',
                child: 'text-2',
                primary: false,
                strength: 0.5,
                action: 'click',
              },
            },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Strong Magnetic' } },
          ],
        },
      },
    ],
  },
}
