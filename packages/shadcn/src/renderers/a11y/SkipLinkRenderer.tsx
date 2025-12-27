/**
 * @extension a2ui-react-shadcn
 * SkipLink Component Renderer
 * Renders a skip navigation link for keyboard users.
 */

import type { SkipLinkComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'

export const SkipLinkRenderer: A2UIRenderer<SkipLinkComponent> = {
  type: 'SkipLink',
  render: ({ component, id }: RendererProps<SkipLinkComponent>) => {
    const label = component.label || 'Skip to main content'

    return (
      <a
        id={id}
        href={`#${component.targetId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {label}
      </a>
    )
  },
  example: {
    name: 'SkipLink',
    description: 'Skip navigation link for keyboard accessibility',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'skiplink-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'skiplink-example',
          components: [
            {
              id: 'col-1',
              component: { type: 'Column', id: 'col-1', children: ['skip', 'nav', 'main'] },
            },
            {
              id: 'skip',
              component: {
                type: 'SkipLink',
                id: 'skip',
                targetId: 'main',
                label: 'Skip to main content',
              },
            },
            {
              id: 'nav',
              component: {
                type: 'Text',
                id: 'nav',
                content: 'Navigation area (press Tab to reveal skip link)',
              },
            },
            { id: 'main', component: { type: 'Main', id: 'main', children: ['content'] } },
            {
              id: 'content',
              component: { type: 'Text', id: 'content', content: 'Main content area' },
            },
          ],
        },
      },
    ],
  },
}
