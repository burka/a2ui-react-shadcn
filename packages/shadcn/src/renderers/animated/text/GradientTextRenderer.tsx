import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'

interface GradientTextComponent {
  type: 'GradientText'
  id: string
  content: string
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'caption'
  colors?: string[]
  animationDuration?: number
  direction?: 'horizontal' | 'vertical' | 'diagonal'
}

const styleClasses: Record<string, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
  body: 'leading-7',
  caption: 'text-sm',
}

const getGradientDirection = (direction: string) => {
  switch (direction) {
    case 'vertical':
      return '180deg'
    case 'diagonal':
      return '45deg'
    default:
      return '90deg'
  }
}

export const GradientTextRenderer: A2UIRenderer<GradientTextComponent> = {
  type: 'GradientText',
  render: ({ component }: RendererProps<GradientTextComponent>) => {
    const colors = component.colors || ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#667eea']
    const duration = component.animationDuration || 3
    const direction = getGradientDirection(component.direction || 'horizontal')

    const gradientColors = colors.join(', ')

    return (
      <motion.span
        className={styleClasses[component.style || 'body']}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        style={{
          background: `linear-gradient(${direction}, ${gradientColors})`,
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {component.content}
      </motion.span>
    )
  },
  example: {
    name: 'Gradient Text',
    description: 'Text with animated gradient colors',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'gradient-text-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'gradient-text-example',
          components: [
            {
              id: 'col-1',
              component: { type: 'Column', id: 'col-1', children: ['text-1', 'text-2'] },
            },
            {
              id: 'text-1',
              component: {
                type: 'GradientText',
                id: 'text-1',
                content: 'Animated Gradient',
                style: 'h1',
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'GradientText',
                id: 'text-2',
                content: 'Custom Colors',
                style: 'h3',
                colors: ['#00d9ff', '#00ff88', '#00d9ff'],
                animationDuration: 2,
              },
            },
          ],
        },
      },
    ],
  },
}
