import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ShimmerButtonComponent {
  type: 'ShimmerButton'
  id: string
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  shimmerColor?: string
  shimmerDuration?: number
}

export const ShimmerButtonRenderer: A2UIRenderer<ShimmerButtonComponent> = {
  type: 'ShimmerButton',
  render: ({ component, children, data, onAction }: RendererProps<ShimmerButtonComponent>) => {
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

    const shimmerColor = component.shimmerColor || 'rgba(255,255,255,0.4)'
    const shimmerDuration = component.shimmerDuration || 2

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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={
          component.primary
            ? 'relative overflow-hidden bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
            : 'relative overflow-hidden border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
        }
        style={component.primary ? primaryStyle : secondaryStyle}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children as ReactNode}</span>
        <motion.span
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: shimmerDuration,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            transform: 'skewX(-20deg)',
          }}
        />
      </motion.button>
    )
  },
  example: {
    name: 'Shimmer Button',
    description: 'Button with a continuous shimmer/gleam effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'shimmer-btn-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'shimmer-btn-example',
          components: [
            { id: 'row-1', component: { type: 'Row', id: 'row-1', distribution: 'packed', children: ['btn-1', 'btn-2'] } },
            { id: 'btn-1', component: { type: 'ShimmerButton', id: 'btn-1', child: 'text-1', primary: true, action: 'submit' } },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Shimmer Primary' } },
            { id: 'btn-2', component: { type: 'ShimmerButton', id: 'btn-2', child: 'text-2', primary: false, shimmerColor: 'rgba(100,100,255,0.3)', action: 'submit' } },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Custom Shimmer' } },
          ],
        },
      },
    ],
  },
}
