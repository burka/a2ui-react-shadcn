import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, type ReactNode, type MouseEvent } from 'react'

interface RippleButtonComponent {
  type: 'RippleButton'
  id: string
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  rippleColor?: string
}

interface Ripple {
  id: number
  x: number
  y: number
}

export const RippleButtonRenderer: A2UIRenderer<RippleButtonComponent> = {
  type: 'RippleButton',
  render: ({ component, children, data, onAction }: RendererProps<RippleButtonComponent>) => {
    const [ripples, setRipples] = useState<Ripple[]>([])

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rippleId = Date.now()

      setRipples((prev) => [...prev, { id: rippleId, x, y }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId))
      }, 600)

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

    const rippleColor = component.rippleColor || (component.primary ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.1)')

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={handleClick}
        className={
          component.primary
            ? 'relative overflow-hidden bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
            : 'relative overflow-hidden border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
        }
        style={component.primary ? primaryStyle : secondaryStyle}
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
            { id: 'row-1', component: { type: 'Row', id: 'row-1', distribution: 'packed', children: ['btn-1', 'btn-2'] } },
            { id: 'btn-1', component: { type: 'RippleButton', id: 'btn-1', child: 'text-1', primary: true, action: 'click' } },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Ripple Primary' } },
            { id: 'btn-2', component: { type: 'RippleButton', id: 'btn-2', child: 'text-2', primary: false, action: 'click' } },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Ripple Secondary' } },
          ],
        },
      },
    ],
  },
}
