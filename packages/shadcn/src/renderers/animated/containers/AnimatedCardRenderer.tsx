import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedCardComponent {
  type: 'AnimatedCard'
  id: string
  children?: string[]
  animation?: 'hover-lift' | 'hover-glow' | 'hover-border' | 'tilt'
  delay?: number
}

export const AnimatedCardRenderer: A2UIRenderer<AnimatedCardComponent> = {
  type: 'AnimatedCard',
  render: ({ component, children }: RendererProps<AnimatedCardComponent>) => {
    const animation = component.animation || 'hover-lift'
    const delay = component.delay || 0

    const getAnimationProps = () => {
      switch (animation) {
        case 'hover-lift':
          return {
            whileHover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
            transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
          }
        case 'hover-glow':
          return {
            whileHover: { boxShadow: '0 0 30px hsl(var(--primary) / 0.3)' },
            transition: { duration: 0.3 },
          }
        case 'hover-border':
          return {
            whileHover: { borderColor: 'hsl(var(--primary))' },
            transition: { duration: 0.2 },
          }
        case 'tilt':
          return {
            whileHover: { rotateY: 5, rotateX: 5 },
            transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
          }
        default:
          return {}
      }
    }

    const animationProps = getAnimationProps()

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' as const }}
        {...animationProps}
        className="rounded-xl border p-6"
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
          color: 'hsl(var(--card-foreground))',
          perspective: animation === 'tilt' ? 1000 : undefined,
        }}
      >
        {children as ReactNode}
      </motion.div>
    )
  },
  example: {
    name: 'Animated Card',
    description: 'Card with various hover animation effects',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'card-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'card-example',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'equal',
                children: ['card-1', 'card-2', 'card-3'],
              },
            },
            {
              id: 'card-1',
              component: {
                type: 'AnimatedCard',
                id: 'card-1',
                children: ['card-text-1'],
                animation: 'hover-lift',
              },
            },
            {
              id: 'card-text-1',
              component: { type: 'Text', id: 'card-text-1', content: 'Hover Lift' },
            },
            {
              id: 'card-2',
              component: {
                type: 'AnimatedCard',
                id: 'card-2',
                children: ['card-text-2'],
                animation: 'hover-glow',
                delay: 0.1,
              },
            },
            {
              id: 'card-text-2',
              component: { type: 'Text', id: 'card-text-2', content: 'Hover Glow' },
            },
            {
              id: 'card-3',
              component: {
                type: 'AnimatedCard',
                id: 'card-3',
                children: ['card-text-3'],
                animation: 'tilt',
                delay: 0.2,
              },
            },
            {
              id: 'card-text-3',
              component: { type: 'Text', id: 'card-text-3', content: '3D Tilt' },
            },
          ],
        },
      },
    ],
  },
}
