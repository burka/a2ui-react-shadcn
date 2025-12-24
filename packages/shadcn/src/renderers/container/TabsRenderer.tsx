import type { TabsComponent } from '@a2ui/core'
import type { A2UIRenderer, RendererProps } from '@a2ui/react'
import type { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.js'

export const TabsRenderer: A2UIRenderer<TabsComponent> = {
  type: 'Tabs',
  render: ({ component, children }: RendererProps<TabsComponent>) => {
    const childArray = Array.isArray(children) ? children : children ? [children] : []

    return (
      <Tabs defaultValue={component.tabs[0]?.label}>
        <TabsList>
          {component.tabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {component.tabs.map((tab, index) => (
          <TabsContent key={tab.label} value={tab.label}>
            {childArray[index] as ReactNode}
          </TabsContent>
        ))}
      </Tabs>
    )
  },
  example: {
    name: 'Tabs',
    description: 'Tabbed interface with multiple panels',
    category: 'container',
    messages: [
      {
        beginRendering: {
          surfaceId: 'tabs-example',
          root: 'tabs-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'tabs-example',
          updates: [
            {
              id: 'tabs-1',
              component: {
                type: 'Tabs',
                id: 'tabs-1',
                tabs: [
                  { label: 'Overview', content: 'tab-content-1' },
                  { label: 'Details', content: 'tab-content-2' },
                  { label: 'Settings', content: 'tab-content-3' },
                ],
              },
            },
            {
              id: 'tab-content-1',
              component: {
                type: 'Text',
                id: 'tab-content-1',
                content: 'This is the Overview tab content.',
              },
            },
            {
              id: 'tab-content-2',
              component: {
                type: 'Text',
                id: 'tab-content-2',
                content: 'This is the Details tab content.',
              },
            },
            {
              id: 'tab-content-3',
              component: {
                type: 'Text',
                id: 'tab-content-3',
                content: 'This is the Settings tab content.',
              },
            },
          ],
        },
      },
    ],
  },
}
