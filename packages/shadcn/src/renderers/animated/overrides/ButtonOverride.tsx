'use client'

import type { ButtonComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/button.js'

/**
 * Animated Button override - same type as standard Button but with animations.
 * When registered after the standard ButtonRenderer, this replaces it.
 */
export const AnimatedButtonOverride: A2UIRenderer<ButtonComponent> = {
  type: 'Button',
  render: ({ component, children, data, onAction }: RendererProps<ButtonComponent>) => {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Button variant={component.primary ? 'default' : 'outline'} onClick={handleClick}>
          {children as ReactNode}
        </Button>
      </motion.div>
    )
  },
}
