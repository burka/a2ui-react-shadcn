import type { AnimatedButtonComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export const AnimatedButtonRenderer: A2UIRenderer<AnimatedButtonComponent> = {
  type: 'AnimatedButton',
  render: ({ component, children, data, onAction }: RendererProps<AnimatedButtonComponent>) => {
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

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleClick}
        className={
          component.primary
            ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
            : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2'
        }
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
