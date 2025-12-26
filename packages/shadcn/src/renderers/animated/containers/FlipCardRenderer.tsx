import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import { type ReactNode, useState } from 'react'

interface FlipCardComponent {
  type: 'FlipCard'
  id: string
  front: string
  back: string
  trigger?: 'hover' | 'click'
  direction?: 'horizontal' | 'vertical'
  height?: string
}

export const FlipCardRenderer: A2UIRenderer<FlipCardComponent> = {
  type: 'FlipCard',
  render: ({ component, children }: RendererProps<FlipCardComponent>) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const trigger = component.trigger || 'hover'
    const direction = component.direction || 'horizontal'
    const height = component.height || '200px'
    const childArray = Array.isArray(children) ? children : [children]
    const frontChild = childArray[0]
    const backChild = childArray[1]

    const flipAxis = direction === 'horizontal' ? 'rotateY' : 'rotateX'

    const handleInteraction = () => {
      if (trigger === 'click') {
        setIsFlipped((prev) => !prev)
      }
    }

    const handleHoverStart = () => {
      if (trigger === 'hover') {
        setIsFlipped(true)
      }
    }

    const handleHoverEnd = () => {
      if (trigger === 'hover') {
        setIsFlipped(false)
      }
    }

    return (
      <div
        style={{
          perspective: 1000,
          height,
          width: '100%',
        }}
      >
        <motion.div
          onClick={handleInteraction}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          animate={{ [flipAxis]: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            cursor: trigger === 'click' ? 'pointer' : 'default',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-xl border p-6"
            style={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--card-foreground))',
              backfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {frontChild as ReactNode}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-xl border p-6"
            style={{
              backgroundColor: 'hsl(var(--primary))',
              borderColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              backfaceVisibility: 'hidden',
              transform: direction === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {backChild as ReactNode}
          </div>
        </motion.div>
      </div>
    )
  },
  example: {
    name: 'Flip Card',
    description: '3D card that flips to reveal back content',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'flip-card-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'flip-card-example',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'equal',
                children: ['card-1', 'card-2'],
              },
            },
            {
              id: 'card-1',
              component: {
                type: 'FlipCard',
                id: 'card-1',
                front: 'front-1',
                back: 'back-1',
                trigger: 'hover',
                height: '150px',
              },
            },
            {
              id: 'front-1',
              component: { type: 'Text', id: 'front-1', content: 'Hover me!', style: 'h3' },
            },
            {
              id: 'back-1',
              component: { type: 'Text', id: 'back-1', content: 'Flipped!', style: 'h3' },
            },
            {
              id: 'card-2',
              component: {
                type: 'FlipCard',
                id: 'card-2',
                front: 'front-2',
                back: 'back-2',
                trigger: 'click',
                direction: 'vertical',
                height: '150px',
              },
            },
            {
              id: 'front-2',
              component: { type: 'Text', id: 'front-2', content: 'Click me!', style: 'h3' },
            },
            {
              id: 'back-2',
              component: { type: 'Text', id: 'back-2', content: 'Vertical flip!', style: 'h3' },
            },
          ],
        },
      },
    ],
  },
}
