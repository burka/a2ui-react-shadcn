import type { RippleButtonComponent } from 'a2ui-shadcn-ui-core'
import { type A2UIRenderer, buildActionPayload, type RendererProps } from 'a2ui-shadcn-ui-react'
import { AnimatePresence, motion } from 'framer-motion'
import { type MouseEvent, type ReactNode, useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'
import { getButtonClassName, getButtonStyle } from '../../../utils/index.js'

interface Ripple {
  id: number
  x: number
  y: number
}

export const RippleButtonRenderer: A2UIRenderer<RippleButtonComponent> = {
  type: 'RippleButton',
  render: ({ component, children, data, onAction }: RendererProps<RippleButtonComponent>) => {
    const [ripples, setRipples] = useState<Ripple[]>([])
    const prefersReducedMotion = useReducedMotion()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!prefersReducedMotion) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const rippleId = Date.now()

        setRipples((prev) => [...prev, { id: rippleId, x, y }])
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== rippleId))
        }, 600)
      }

      const action = buildActionPayload(component, data)
      if (action) {
        onAction(action)
      }
    }

    const rippleColor =
      component.rippleColor || (component.primary ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.1)')

    return (
      <motion.button
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 25 }
        }
        onClick={handleClick}
        className={getButtonClassName(component.primary, 'relative overflow-hidden')}
        style={getButtonStyle(component.primary)}
      >
        {children as ReactNode}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: rippleColor,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    )
  },
  example: {
    name: 'Ripple Button',
    description: 'Button with material design ripple effect on click',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'ripple-btn-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'ripple-btn-example',
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
                type: 'RippleButton',
                id: 'btn-1',
                child: 'text-1',
                primary: true,
                action: 'click',
              },
            },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Ripple Primary' } },
            {
              id: 'btn-2',
              component: {
                type: 'RippleButton',
                id: 'btn-2',
                child: 'text-2',
                primary: false,
                action: 'click',
              },
            },
            {
              id: 'text-2',
              component: { type: 'Text', id: 'text-2', content: 'Ripple Secondary' },
            },
          ],
        },
      },
    ],
  },
}
