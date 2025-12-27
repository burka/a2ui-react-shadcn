import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { type ReactNode, useState } from 'react'

interface AnimatedDialogComponent {
  type: 'AnimatedDialog'
  id: string
  trigger: string
  content: string
  title?: string
  description?: string
  animation?: 'scale' | 'slide' | 'flip' | 'rotate'
}

const animations = {
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  slide: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  },
  flip: {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
  },
  rotate: {
    initial: { rotate: -10, scale: 0.9, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 10, scale: 0.9, opacity: 0 },
  },
}

export const AnimatedDialogRenderer: A2UIRenderer<AnimatedDialogComponent> = {
  type: 'AnimatedDialog',
  render: ({ component, children }: RendererProps<AnimatedDialogComponent>) => {
    const [isOpen, setIsOpen] = useState(false)
    const animation = animations[component.animation || 'scale']
    const childArray = Array.isArray(children) ? children : [children]
    const triggerChild = childArray[0]
    const contentChild = childArray[1]

    return (
      <>
        <div onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
          {triggerChild as ReactNode}
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 50,
                }}
              />

              {/* Dialog */}
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 50,
                  perspective: 1000,
                }}
              >
                <motion.div
                  {...animation}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative w-full max-w-lg rounded-lg border p-6 shadow-lg"
                  style={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                >
                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>

                  {/* Title */}
                  {component.title && (
                    <h2
                      className="text-lg font-semibold leading-none tracking-tight"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {component.title}
                    </h2>
                  )}

                  {/* Description */}
                  {component.description && (
                    <p className="mt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {component.description}
                    </p>
                  )}

                  {/* Content */}
                  <div className="mt-4">{contentChild as ReactNode}</div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  },
  example: {
    name: 'Animated Dialog',
    description: 'Modal dialog with various animation styles',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'dialog-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'dialog-example',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'packed',
                children: ['dialog-1', 'dialog-2'],
              },
            },
            {
              id: 'dialog-1',
              component: {
                type: 'AnimatedDialog',
                id: 'dialog-1',
                trigger: 'btn-1',
                content: 'dialog-content-1',
                title: 'Scale Animation',
                description: 'This dialog scales in',
                animation: 'scale',
              },
            },
            {
              id: 'btn-1',
              component: { type: 'Button', id: 'btn-1', child: 'btn-text-1', primary: true },
            },
            {
              id: 'btn-text-1',
              component: { type: 'Text', id: 'btn-text-1', content: 'Open Scale' },
            },
            {
              id: 'dialog-content-1',
              component: { type: 'Text', id: 'dialog-content-1', content: 'Dialog content here!' },
            },
            {
              id: 'dialog-2',
              component: {
                type: 'AnimatedDialog',
                id: 'dialog-2',
                trigger: 'btn-2',
                content: 'dialog-content-2',
                title: 'Flip Animation',
                animation: 'flip',
              },
            },
            {
              id: 'btn-2',
              component: { type: 'Button', id: 'btn-2', child: 'btn-text-2', primary: false },
            },
            {
              id: 'btn-text-2',
              component: { type: 'Text', id: 'btn-text-2', content: 'Open Flip' },
            },
            {
              id: 'dialog-content-2',
              component: { type: 'Text', id: 'dialog-content-2', content: 'Flipping dialog!' },
            },
          ],
        },
      },
    ],
  },
}
