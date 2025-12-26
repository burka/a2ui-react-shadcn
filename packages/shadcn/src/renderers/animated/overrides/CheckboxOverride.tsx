'use client'

import type { CheckboxComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Checkbox } from '../../../components/ui/checkbox.js'
import { Label } from '../../../components/ui/label.js'

/**
 * Animated Checkbox override - same type as standard Checkbox but with check animation.
 */
export const AnimatedCheckboxOverride: A2UIRenderer<CheckboxComponent> = {
  type: 'Checkbox',
  render: ({ component, data }: RendererProps<CheckboxComponent>) => {
    const value = component.dataPath ? data.get(component.dataPath) === true : false
    const id = `checkbox-${component.id}`

    const handleChange = (checked: boolean) => {
      if (component.dataPath) {
        data.set(component.dataPath, checked)
      }
    }

    return (
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Checkbox id={id} checked={value} onCheckedChange={handleChange} />
        </motion.div>
        {component.label && (
          <Label htmlFor={id}>
            <AnimatePresence mode="wait">
              <motion.span
                key={value ? 'checked' : 'unchecked'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {component.label}
              </motion.span>
            </AnimatePresence>
          </Label>
        )}
      </motion.div>
    )
  },
}
