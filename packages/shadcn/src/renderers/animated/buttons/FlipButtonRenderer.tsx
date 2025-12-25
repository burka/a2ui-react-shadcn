import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

interface FlipButtonComponent {
  type: 'FlipButton'
  id: string
  frontChild: string
  backChild: string
  primary?: boolean
  action?: string
  actionPayload?: Record<string, unknown>
  submitDataPaths?: string[]
}

export const FlipButtonRenderer: A2UIRenderer<FlipButtonComponent> = {
  type: 'FlipButton',
  render: ({ component, children, data, onAction }: RendererProps<FlipButtonComponent>) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const childArray = Array.isArray(children) ? children : [children]
    const frontContent = childArray[0]
    const backContent = childArray[1]

    const handleClick = () => {
      setIsFlipped((prev) => !prev)

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

    const baseClass = component.primary
      ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
      : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'

    return (
      <div style={{ perspective: 1000 }}>
        <motion.button
          onClick={handleClick}
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={baseClass}
          style={{
            ...component.primary ? primaryStyle : secondaryStyle,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.span
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{ opacity: isFlipped ? 0 : 1 }}
          >
            {frontContent as ReactNode}
          </motion.span>
          <motion.span
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{ opacity: isFlipped ? 1 : 0 }}
          >
            {backContent as ReactNode}
          </motion.span>
          {/* Invisible content for sizing */}
          <span style={{ visibility: 'hidden' }}>
            {frontContent as ReactNode}
          </span>
        </motion.button>
      </div>
    )
  },
  example: {
    name: 'Flip Button',
    description: 'Button that flips to reveal different content',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'flip-btn-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'flip-btn-example',
          components: [
            { id: 'row-1', component: { type: 'Row', id: 'row-1', distribution: 'packed', children: ['btn-1'] } },
            { id: 'btn-1', component: { type: 'FlipButton', id: 'btn-1', frontChild: 'front-text', backChild: 'back-text', primary: true, action: 'flip' } },
            { id: 'front-text', component: { type: 'Text', id: 'front-text', content: 'Click to Flip' } },
            { id: 'back-text', component: { type: 'Text', id: 'back-text', content: 'Flipped!' } },
          ],
        },
      },
    ],
  },
}
