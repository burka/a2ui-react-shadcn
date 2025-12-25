import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, type ReactNode } from 'react'

interface AnimatedTooltipComponent {
  type: 'AnimatedTooltip'
  id: string
  trigger: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  animation?: 'scale' | 'slide' | 'fade'
}

const positionStyles = {
  top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
  bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
  left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
  right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
}

const animations = {
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  slide: {
    top: { initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 10, opacity: 0 } },
    bottom: { initial: { y: -10, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 } },
    left: { initial: { x: 10, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 10, opacity: 0 } },
    right: { initial: { x: -10, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -10, opacity: 0 } },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
}

export const AnimatedTooltipRenderer: A2UIRenderer<AnimatedTooltipComponent> = {
  type: 'AnimatedTooltip',
  render: ({ component, children }: RendererProps<AnimatedTooltipComponent>) => {
    const [isVisible, setIsVisible] = useState(false)
    const position = component.position || 'top'
    const animationType = component.animation || 'scale'
    const childArray = Array.isArray(children) ? children : [children]
    const triggerChild = childArray[0]
    const tooltipContent = childArray[1]

    const getAnimation = () => {
      if (animationType === 'slide') {
        return animations.slide[position]
      }
      return animations[animationType]
    }

    const animation = getAnimation()

    return (
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {triggerChild as ReactNode}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              {...animation}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                position: 'absolute',
                ...positionStyles[position],
                zIndex: 50,
                whiteSpace: 'nowrap',
              }}
            >
              <div
                className="rounded-md px-3 py-1.5 text-sm shadow-md"
                style={{
                  backgroundColor: 'hsl(var(--popover))',
                  color: 'hsl(var(--popover-foreground))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                {tooltipContent as ReactNode}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
  example: {
    name: 'Animated Tooltip',
    description: 'Tooltip with various animation styles',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'tooltip-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'tooltip-example',
          components: [
            { id: 'row-1', component: { type: 'Row', id: 'row-1', distribution: 'spaceAround', children: ['tooltip-1', 'tooltip-2', 'tooltip-3'] } },
            { id: 'tooltip-1', component: { type: 'AnimatedTooltip', id: 'tooltip-1', trigger: 'btn-1', content: 'tip-1', position: 'top', animation: 'scale' } },
            { id: 'btn-1', component: { type: 'Button', id: 'btn-1', child: 'btn-text-1', primary: true } },
            { id: 'btn-text-1', component: { type: 'Text', id: 'btn-text-1', content: 'Scale' } },
            { id: 'tip-1', component: { type: 'Text', id: 'tip-1', content: 'Scale animation tooltip' } },
            { id: 'tooltip-2', component: { type: 'AnimatedTooltip', id: 'tooltip-2', trigger: 'btn-2', content: 'tip-2', position: 'bottom', animation: 'slide' } },
            { id: 'btn-2', component: { type: 'Button', id: 'btn-2', child: 'btn-text-2' } },
            { id: 'btn-text-2', component: { type: 'Text', id: 'btn-text-2', content: 'Slide' } },
            { id: 'tip-2', component: { type: 'Text', id: 'tip-2', content: 'Slide animation tooltip' } },
            { id: 'tooltip-3', component: { type: 'AnimatedTooltip', id: 'tooltip-3', trigger: 'btn-3', content: 'tip-3', position: 'right', animation: 'fade' } },
            { id: 'btn-3', component: { type: 'Button', id: 'btn-3', child: 'btn-text-3' } },
            { id: 'btn-text-3', component: { type: 'Text', id: 'btn-text-3', content: 'Fade' } },
            { id: 'tip-3', component: { type: 'Text', id: 'tip-3', content: 'Fade animation tooltip' } },
          ],
        },
      },
    ],
  },
}
