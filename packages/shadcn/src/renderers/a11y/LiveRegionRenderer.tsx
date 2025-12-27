/**
 * @extension a2ui-react-shadcn
 * LiveRegion Component Renderer
 * Renders ARIA live regions for dynamic content announcements.
 */

import type { LiveRegionComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import type { ReactNode } from 'react'

export const LiveRegionRenderer: A2UIRenderer<LiveRegionComponent> = {
  type: 'LiveRegion',
  render: ({ component, children, id }: RendererProps<LiveRegionComponent>) => {
    const politeness = component.politeness || 'polite'

    return (
      <div
        id={id}
        aria-live={politeness}
        aria-atomic={component.atomic}
      >
        {children as ReactNode}
      </div>
    )
  },
  example: {
    name: 'LiveRegion',
    description: 'ARIA live region for dynamic content announcements',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'live-example', root: 'live-1' } },
      {
        updateComponents: {
          surfaceId: 'live-example',
          components: [
            { id: 'live-1', component: { type: 'LiveRegion', id: 'live-1', politeness: 'polite', atomic: true, children: ['status'] } },
            { id: 'status', component: { type: 'Text', id: 'status', content: 'Status updates will be announced here', dataPath: 'status.message' } },
          ],
        },
      },
    ],
  },
}
