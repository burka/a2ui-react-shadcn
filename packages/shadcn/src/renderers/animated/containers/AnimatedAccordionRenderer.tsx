import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  trigger: string
  content: string
}

interface AnimatedAccordionComponent {
  type: 'AnimatedAccordion'
  id: string
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: number[]
}

export const AnimatedAccordionRenderer: A2UIRenderer<AnimatedAccordionComponent> = {
  type: 'AnimatedAccordion',
  render: ({ component, children }: RendererProps<AnimatedAccordionComponent>) => {
    const [openItems, setOpenItems] = useState<number[]>(component.defaultOpen || [])
    const childArray = Array.isArray(children) ? children : [children]

    const toggleItem = (index: number) => {
      setOpenItems((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index)
        }
        if (component.allowMultiple) {
          return [...prev, index]
        }
        return [index]
      })
    }

    // Children are ordered: trigger1, content1, trigger2, content2, ...
    return (
      <div
        className="w-full divide-y rounded-lg border"
        style={{
          borderColor: 'hsl(var(--border))',
          backgroundColor: 'hsl(var(--background))',
        }}
      >
        {component.items.map((_, index) => {
          const isOpen = openItems.includes(index)
          const triggerChild = childArray[index * 2]
          const contentChild = childArray[index * 2 + 1]
          return (
            <div key={`accordion-${component.id}-${index}`}>
              <motion.button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between px-4 py-4 text-left font-medium transition-colors hover:bg-accent/50"
                style={{ color: 'hsl(var(--foreground))' }}
                whileHover={{ backgroundColor: 'hsl(var(--accent) / 0.5)' }}
              >
                <span>{triggerChild as ReactNode}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <ChevronDown className="h-4 w-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="px-4 pb-4 pt-0"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      {contentChild as ReactNode}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    )
  },
  example: {
    name: 'Animated Accordion',
    description: 'Collapsible accordion with smooth spring animations',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'accordion-example', root: 'accordion-1' } },
      {
        updateComponents: {
          surfaceId: 'accordion-example',
          components: [
            {
              id: 'accordion-1',
              component: {
                type: 'AnimatedAccordion',
                id: 'accordion-1',
                items: [
                  { trigger: 'trigger-1', content: 'content-1' },
                  { trigger: 'trigger-2', content: 'content-2' },
                ],
                defaultOpen: [0],
              },
            },
            { id: 'trigger-1', component: { type: 'Text', id: 'trigger-1', content: 'What is this?' } },
            { id: 'content-1', component: { type: 'Text', id: 'content-1', content: 'This is an animated accordion component.' } },
            { id: 'trigger-2', component: { type: 'Text', id: 'trigger-2', content: 'How does it work?' } },
            { id: 'content-2', component: { type: 'Text', id: 'content-2', content: 'It uses spring animations for smooth transitions.' } },
          ],
        },
      },
    ],
  },
}
