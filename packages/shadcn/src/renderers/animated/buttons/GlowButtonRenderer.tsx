import type { GlowButtonComponent } from 'a2ui-react-core'
import { type A2UIRenderer, createActionHandler, type RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { type ReactNode, useState } from 'react'
import { getButtonClassName, getButtonStyle } from '../../../utils/index.js'

export const GlowButtonRenderer: A2UIRenderer<GlowButtonComponent> = {
  type: 'GlowButton',
  render: ({ component, children, data, onAction }: RendererProps<GlowButtonComponent>) => {
    const [isHovered, setIsHovered] = useState(false)
    const handleClick = createActionHandler(component, data, onAction)

    const glowColor =
      component.glowColor || (component.primary ? 'hsl(var(--primary))' : 'hsl(var(--accent))')
    const glowIntensity = component.glowIntensity || 20

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
        className={getButtonClassName(component.primary)}
        style={getButtonStyle(component.primary)}
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
                type: 'GlowButton',
                id: 'btn-1',
                child: 'text-1',
                primary: true,
                action: 'glow',
              },
            },
            { id: 'text-1', component: { type: 'Text', id: 'text-1', content: 'Glow Primary' } },
            {
              id: 'btn-2',
              component: {
                type: 'GlowButton',
                id: 'btn-2',
                child: 'text-2',
                primary: false,
                glowColor: '#ff6b6b',
                glowIntensity: 15,
                action: 'glow',
              },
            },
            { id: 'text-2', component: { type: 'Text', id: 'text-2', content: 'Red Glow' } },
          ],
        },
      },
    ],
  },
}
