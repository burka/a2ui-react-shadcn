'use client'

import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import type { CopyButtonComponent } from 'a2ui-shadcn-ui-core'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export const CopyButtonRenderer: A2UIRenderer<CopyButtonComponent> = {
  type: 'copy-button',
  render: ({ component, onAction }) => {
    const [copied, setCopied] = useState(false)

    const {
      text,
      label = 'Copy',
      copiedLabel = 'Copied!',
      variant = 'default',
      showIcon = true,
      duration = 2000,
    } = component

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        onAction?.({ type: 'copy', payload: { text } })
        setTimeout(() => setCopied(false), duration)
      } catch {
        onAction?.({ type: 'error', payload: { message: 'Failed to copy' } })
      }
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'outline':
          return 'border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--accent))]'
        case 'ghost':
          return 'bg-transparent hover:bg-[hsl(var(--accent))]'
        case 'secondary':
          return 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/80'
        default:
          return 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90'
      }
    }

    return (
      <motion.button
        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${getVariantStyles()}`}
        onClick={handleCopy}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {showIcon && (
            <motion.span
              key={copied ? 'check' : 'copy'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={copied ? 'copied' : 'copy'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? copiedLabel : label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    )
  },
  example: {
    name: 'Copy Button',
    description: 'Button that copies text with animated feedback',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'copy-btn-example', root: 'btn-1' } },
      {
        updateComponents: {
          surfaceId: 'copy-btn-example',
          components: [
            { id: 'btn-1', component: { type: 'copy-button', id: 'btn-1', text: 'npm install a2ui-shadcn-ui', label: 'Copy', copiedLabel: 'Copied!', variant: 'outline', showIcon: true } },
          ],
        },
      },
    ],
  },
}
