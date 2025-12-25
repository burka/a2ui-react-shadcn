'use client'

import type { SelectComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select.js'

/**
 * Animated Select override - same type as standard Select but with animations.
 */
export const AnimatedSelectOverride: A2UIRenderer<SelectComponent> = {
  type: 'Select',
  render: ({ component, data }: RendererProps<SelectComponent>) => {
    const value = component.dataPath ? (data.get(component.dataPath) as string) || '' : ''

    const handleChange = (newValue: string) => {
      if (component.dataPath) {
        data.set(component.dataPath, newValue)
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Select value={value} onValueChange={handleChange}>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <SelectTrigger>
              <SelectValue placeholder={component.placeholder} />
            </SelectTrigger>
          </motion.div>
          <SelectContent>
            {component.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <SelectItem value={option.value}>{option.label}</SelectItem>
              </motion.div>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    )
  },
}
