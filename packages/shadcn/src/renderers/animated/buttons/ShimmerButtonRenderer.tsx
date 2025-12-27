import type { ShimmerButtonComponent } from 'a2ui-shadcn-ui-core'
import { type A2UIRenderer, createActionHandler, type RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'
import { getButtonClassName, getButtonStyle } from '../../../utils/index.js'

export const ShimmerButtonRenderer: A2UIRenderer<ShimmerButtonComponent> = {
  type: 'ShimmerButton',
  render: ({ component, children, data, onAction }: RendererProps<ShimmerButtonComponent>) => {
    const prefersReducedMotion = useReducedMotion()
    const handleClick = createActionHandler(component, data, onAction)

    const shimmerColor = component.shimmerColor || 'rgba(255,255,255,0.4)'
    const shimmerDuration = component.shimmerDuration || 2

    return (
      <motion.button
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        onClick={handleClick}
        className={getButtonClassName(component.primary, 'relative overflow-hidden')}
        style={getButtonStyle(component.primary)}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children as ReactNode}</span>
        {!prefersReducedMotion && (
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
        )}
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
                type: 'ShimmerButton',
                id: 'btn-1',
                child: 'text-1',
                primary: true,
                action: 'submit',
              },
            },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Shimmer Primary' } },
            {
              id: 'btn-2',
              component: {
                type: 'ShimmerButton',
                id: 'btn-2',
                child: 'text-2',
                primary: false,
                shimmerColor: 'rgba(100,100,255,0.3)',
                action: 'submit',
              },
            },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Custom Shimmer' } },
          ],
        },
      },
    ],
  },
}
