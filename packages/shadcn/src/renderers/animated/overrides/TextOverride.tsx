'use client'

import type { TextComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'

const styleClasses: Record<string, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  caption: 'text-sm text-muted-foreground',
  body: 'text-base',
}

/**
 * Animated Text override - same type as standard Text but with fade-in.
 */
export const AnimatedTextOverride: A2UIRenderer<TextComponent> = {
  type: 'Text',
  render: ({ component, data }: RendererProps<TextComponent>) => {
    const className = styleClasses[component.style || 'body'] || styleClasses.body

    // Support data binding
    let content = component.content
    if (component.dataPath) {
      const value = data.get(component.dataPath)
      if (value !== undefined) {
        content = String(value)
      }
    }

    return (
      <motion.p
        className={className}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {content}
      </motion.p>
    )
  },
}
