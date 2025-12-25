import type { CardComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactNode } from 'react'
import { Card, CardContent } from '../../components/ui/card.js'

export const CardRenderer: A2UIRenderer<CardComponent> = {
  type: 'Card',
  render: ({ children }: RendererProps<CardComponent>) => (
    <Card>
      <CardContent className="p-4">{children as ReactNode}</CardContent>
    </Card>
  ),
  example: {
    name: 'Card',
    description: 'Container card with content area',
    category: 'container',
    messages: [
      {
        createSurface: {
          surfaceId: 'card-example',
          root: 'card-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'card-example',
          components: [
            {
              id: 'card-1',
              component: {
                type: 'Card',
                id: 'card-1',
                children: ['col-1'],
              },
            },
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                children: ['title', 'content'],
              },
            },
            {
              id: 'title',
              component: {
                type: 'Text',
                id: 'title',
                content: 'Card Title',
                style: 'h3',
              },
            },
            {
              id: 'content',
              component: {
                type: 'Text',
                id: 'content',
                content: 'This is card content inside a Card component.',
              },
            },
          ],
        },
      },
    ],
  },
}
