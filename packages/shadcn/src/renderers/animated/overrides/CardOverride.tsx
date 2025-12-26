'use client'

import type { CardComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Card, CardContent } from '../../../components/ui/card.js'

/**
 * Animated Card override - same type as standard Card but with hover effects.
 */
export const AnimatedCardOverride: A2UIRenderer<CardComponent> = {
  type: 'Card',
  render: ({ children }: RendererProps<CardComponent>) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -4,
          boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card>
          <CardContent className="pt-6">{children as ReactNode}</CardContent>
        </Card>
      </motion.div>
    )
  },
}
