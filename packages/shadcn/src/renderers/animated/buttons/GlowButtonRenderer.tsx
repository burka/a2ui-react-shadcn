import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

interface GlowButtonComponent {
  type: 'GlowButton'
  id: string
  child: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
  glowColor?: string
  glowIntensity?: number
}

export const GlowButtonRenderer: A2UIRenderer<GlowButtonComponent> = {
  type: 'GlowButton',
  render: ({ component, children, data, onAction }: RendererProps<GlowButtonComponent>) => {
    const [isHovered, setIsHovered] = useState(false)

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

    const glowColor = component.glowColor || (component.primary ? 'hsl(var(--primary))' : 'hsl(var(--accent))')
    const glowIntensity = component.glowIntensity || 20

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
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: isHovered
            ? `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor}, 0 0 ${glowIntensity * 3}px ${glowColor}`
            : `0 0 0px transparent`,
        }}
        transition={{ duration: 0.3 }}
        className={
          component.primary
            ? 'bg-primary text-primary-foreground shadow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
            : 'border border-input bg-background inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
        }
        style={component.primary ? primaryStyle : secondaryStyle}
      >
        {children as ReactNode}
      </motion.button>
    )
  },
  example: {
    name: 'Glow Button',
    description: 'Button with a glowing aura effect on hover',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'glow-btn-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'glow-btn-example',
          components: [
            { id: 'row-1', component: { type: 'Row', id: 'row-1', distribution: 'packed', children: ['btn-1', 'btn-2'] } },
            { id: 'btn-1', component: { type: 'GlowButton', id: 'btn-1', child: 'text-1', primary: true, action: 'glow' } },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Glow Primary' } },
            { id: 'btn-2', component: { type: 'GlowButton', id: 'btn-2', child: 'text-2', primary: false, glowColor: '#ff6b6b', glowIntensity: 15, action: 'glow' } },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Red Glow' } },
          ],
        },
      },
    ],
  },
}
