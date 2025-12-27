import type { AnimatedButtonComponent } from 'a2ui-react-core'
import { type A2UIRenderer, createActionHandler, type RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { getButtonClassName, getButtonStyle } from '../../utils/index.js'

export const AnimatedButtonRenderer: A2UIRenderer<AnimatedButtonComponent> = {
  type: 'AnimatedButton',
  render: ({ component, children, data, onAction }: RendererProps<AnimatedButtonComponent>) => {
    const handleClick = createActionHandler(component, data, onAction)

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleClick}
        className={getButtonClassName(component.primary)}
        style={getButtonStyle(component.primary)}
      >
        {children as ReactNode}
      </motion.button>
    )
  },
  example: {
    name: 'Animated Button',
    description: 'Button with spring animations using framer-motion',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'animated-button-example',
          root: 'row-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'animated-button-example',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'packed',
                children: ['btn-primary', 'btn-secondary'],
              },
            },
            {
              id: 'btn-primary',
              component: {
                type: 'AnimatedButton',
                id: 'btn-primary',
                child: 'text-primary',
                primary: true,
                action: 'submit',
              },
            },
            {
              id: 'text-primary',
              component: {
                type: 'Text',
                id: 'text-primary',
                content: 'Animated Primary',
              },
            },
            {
              id: 'btn-secondary',
              component: {
                type: 'AnimatedButton',
                id: 'btn-secondary',
                child: 'text-secondary',
                primary: false,
                action: 'cancel',
              },
            },
            {
              id: 'text-secondary',
              component: {
                type: 'Text',
                id: 'text-secondary',
                content: 'Animated Secondary',
              },
            },
          ],
        },
      },
    ],
  },
}
