import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GradientBackgroundComponent {
  type: 'GradientBackground'
  id: string
  children?: string[]
  colors?: string[]
  speed?: number
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'radial'
  blur?: number
}

export const GradientBackgroundRenderer: A2UIRenderer<GradientBackgroundComponent> = {
  type: 'GradientBackground',
  render: ({ component, children }: RendererProps<GradientBackgroundComponent>) => {
    const colors = component.colors || ['#667eea', '#764ba2', '#f093fb', '#f5576c']
    const speed = component.speed || 10
    const direction = component.direction || 'diagonal'
    const blur = component.blur || 0

    const getGradientAngle = () => {
      switch (direction) {
        case 'horizontal':
          return '90deg'
        case 'vertical':
          return '180deg'
        case 'diagonal':
          return '45deg'
        case 'radial':
          return 'circle'
        default:
          return '45deg'
      }
    }

    const gradientAngle = getGradientAngle()
    const isRadial = direction === 'radial'
    const colorString = colors.join(', ')

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '200px',
          overflow: 'hidden',
          borderRadius: '0.75rem',
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: isRadial ? undefined : ['0% 0%', '100% 100%', '0% 0%'],
            scale: isRadial ? [1, 1.1, 1] : undefined,
          }}
          transition={{
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            inset: blur ? -blur : 0,
            background: isRadial
              ? `radial-gradient(${gradientAngle}, ${colorString})`
              : `linear-gradient(${gradientAngle}, ${colorString})`,
            backgroundSize: isRadial ? '100% 100%' : '400% 400%',
            filter: blur ? `blur(${blur}px)` : undefined,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '2rem',
          }}
        >
          {children as ReactNode}
        </div>
      </div>
    )
  },
  example: {
    name: 'Gradient Background',
    description: 'Animated gradient background with customizable colors',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'gradient-bg-example', root: 'gradient-1' } },
      {
        updateComponents: {
          surfaceId: 'gradient-bg-example',
          components: [
            {
              id: 'gradient-1',
              component: {
                type: 'GradientBackground',
                id: 'gradient-1',
                children: ['text-1'],
                colors: ['#667eea', '#764ba2', '#f093fb'],
                speed: 8,
              },
            },
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'Beautiful animated gradient!',
                style: 'h2',
              },
            },
          ],
        },
      },
    ],
  },
}
