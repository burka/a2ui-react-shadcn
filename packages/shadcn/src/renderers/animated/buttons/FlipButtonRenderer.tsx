import type { FlipButtonComponent } from 'a2ui-react-core'
import { type A2UIRenderer, buildActionPayload, type RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { type ReactNode, useState } from 'react'
import { getButtonClassName, getButtonStyle } from '../../../utils/index.js'

export const FlipButtonRenderer: A2UIRenderer<FlipButtonComponent> = {
  type: 'FlipButton',
  render: ({ component, children, data, onAction }: RendererProps<FlipButtonComponent>) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const childArray = Array.isArray(children) ? children : [children]
    const frontContent = childArray[0]
    const backContent = childArray[1]

    const handleClick = () => {
      setIsFlipped((prev) => !prev)
      const action = buildActionPayload(component, data)
      if (action) {
        onAction(action)
      }
    }

    return (
      <div style={{ perspective: 1000 }}>
        <motion.button
          onClick={handleClick}
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={getButtonClassName(component.primary)}
          style={{
            ...getButtonStyle(component.primary),
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
          <span style={{ visibility: 'hidden' }}>{frontContent as ReactNode}</span>
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
            {
              id: 'row-1',
              component: { type: 'Row', id: 'row-1', distribution: 'packed', children: ['btn-1'] },
            },
            {
              id: 'btn-1',
              component: {
                type: 'FlipButton',
                id: 'btn-1',
                frontChild: 'front-text',
                backChild: 'back-text',
                primary: true,
                action: 'flip',
              },
            },
            {
              id: 'front-text',
              component: { type: 'Text', id: 'front-text', content: 'Click to Flip' },
            },
            { id: 'back-text', component: { type: 'Text', id: 'back-text', content: 'Flipped!' } },
          ],
        },
      },
    ],
  },
}
