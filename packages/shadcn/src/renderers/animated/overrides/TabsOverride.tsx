'use client'

import type { TabsComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs.js'

/**
 * Animated Tabs override - same type as standard Tabs but with smooth transitions.
 */
export const AnimatedTabsOverride: A2UIRenderer<TabsComponent> = {
  type: 'Tabs',
  render: ({ component, children }: RendererProps<TabsComponent>) => {
    const [activeTab, setActiveTab] = useState(component.tabs[0]?.label || '')
    const childArray = Array.isArray(children) ? children : children ? [children] : []

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {component.tabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.label} className="relative">
              {tab.label}
              {activeTab === tab.label && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-background rounded-md -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        <AnimatePresence mode="wait">
          {component.tabs.map((tab, index) => (
            activeTab === tab.label && (
              <TabsContent key={tab.label} value={tab.label} forceMount>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {childArray[index] as ReactNode}
                </motion.div>
              </TabsContent>
            )
          ))}
        </AnimatePresence>
      </Tabs>
    )
  },
}
