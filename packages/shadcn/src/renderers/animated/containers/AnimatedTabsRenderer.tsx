import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode, useState } from 'react'

interface TabItem {
  label: string
  content: string
}

interface AnimatedTabsComponent {
  type: 'AnimatedTabs'
  id: string
  tabs: TabItem[]
  defaultTab?: number
  animation?: 'slide' | 'fade' | 'scale'
}

const contentVariants = {
  slide: {
    initial: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
}

export const AnimatedTabsRenderer: A2UIRenderer<AnimatedTabsComponent> = {
  type: 'AnimatedTabs',
  render: ({ component, children }: RendererProps<AnimatedTabsComponent>) => {
    const [activeTab, setActiveTab] = useState(component.defaultTab || 0)
    const [direction, setDirection] = useState(0)
    const animation = component.animation || 'slide'
    const childArray = Array.isArray(children) ? children : [children]

    const handleTabChange = (index: number) => {
      setDirection(index > activeTab ? 1 : -1)
      setActiveTab(index)
    }

    const variants = contentVariants[animation]

    return (
      <div className="w-full">
        {/* Tab list */}
        <div className="relative flex border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          {component.tabs.map((tab, index) => (
            <motion.button
              key={`tab-${component.id}-${index}`}
              onClick={() => handleTabChange(index)}
              className="relative px-4 py-2 text-sm font-medium transition-colors"
              style={{
                color:
                  activeTab === index ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
              }}
              whileHover={{ backgroundColor: 'hsl(var(--accent) / 0.5)' }}
            >
              {tab.label}
              {activeTab === index && (
                <motion.div
                  layoutId={`tab-indicator-${component.id}`}
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <div className="relative overflow-hidden py-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {childArray[activeTab] as ReactNode}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  },
  example: {
    name: 'Animated Tabs',
    description: 'Tabs with animated indicator and content transitions',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'tabs-example', root: 'tabs-1' } },
      {
        updateComponents: {
          surfaceId: 'tabs-example',
          components: [
            {
              id: 'tabs-1',
              component: {
                type: 'AnimatedTabs',
                id: 'tabs-1',
                tabs: [
                  { label: 'Overview', content: 'tab-content-1' },
                  { label: 'Features', content: 'tab-content-2' },
                  { label: 'Settings', content: 'tab-content-3' },
                ],
                animation: 'slide',
              },
            },
            {
              id: 'tab-content-1',
              component: {
                type: 'Text',
                id: 'tab-content-1',
                content: 'Overview content with smooth transitions.',
              },
            },
            {
              id: 'tab-content-2',
              component: {
                type: 'Text',
                id: 'tab-content-2',
                content: 'Features content slides in beautifully.',
              },
            },
            {
              id: 'tab-content-3',
              component: {
                type: 'Text',
                id: 'tab-content-3',
                content: 'Settings content with spring physics.',
              },
            },
          ],
        },
      },
    ],
  },
}
