'use client'

import type { ModalComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../../../components/ui/dialog.js'

/**
 * Animated Modal override - same type as standard Modal but with smooth open/close.
 */
export const AnimatedModalOverride: A2UIRenderer<ModalComponent> = {
  type: 'Modal',
  render: ({ children }: RendererProps<ModalComponent>) => {
    const [open, setOpen] = useState(false)
    const childArray = Array.isArray(children) ? children : children ? [children] : []
    const trigger = childArray[0]
    const content = childArray[1]

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {trigger as ReactNode}
          </motion.div>
        </DialogTrigger>
        <AnimatePresence>
          {open && (
            <DialogContent forceMount asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-background border rounded-lg p-6 shadow-lg"
              >
                {content as ReactNode}
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    )
  },
}
