import type { ListComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactNode } from 'react'
import { ScrollArea } from '../../components/ui/scroll-area.js'

export const ListRenderer: A2UIRenderer<ListComponent> = {
  type: 'List',
  render: ({ children }: RendererProps<ListComponent>) => (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <div className="space-y-2">{children as ReactNode}</div>
    </ScrollArea>
  ),
  example: {
    name: 'List',
    description: 'Scrollable list container for repeating items',
    category: 'container',
    messages: [
      {
        createSurface: {
          surfaceId: 'list-example',
          root: 'list-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'list-example',
          components: [
            {
              id: 'list-1',
              component: {
                type: 'List',
                id: 'list-1',
                template: 'list-item-template',
              },
            },
            {
              id: 'list-item-template',
              component: {
                type: 'Column',
                id: 'list-item-template',
                children: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'],
              },
            },
            {
              id: 'item-1',
              component: {
                type: 'Card',
                id: 'item-1',
                children: ['text-1'],
              },
            },
            {
              id: 'text-1',
              component: {
                type: 'Text',
                id: 'text-1',
                content: 'List Item 1',
              },
            },
            {
              id: 'item-2',
              component: {
                type: 'Card',
                id: 'item-2',
                children: ['text-2'],
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'Text',
                id: 'text-2',
                content: 'List Item 2',
              },
            },
            {
              id: 'item-3',
              component: {
                type: 'Card',
                id: 'item-3',
                children: ['text-3'],
              },
            },
            {
              id: 'text-3',
              component: {
                type: 'Text',
                id: 'text-3',
                content: 'List Item 3',
              },
            },
            {
              id: 'item-4',
              component: {
                type: 'Card',
                id: 'item-4',
                children: ['text-4'],
              },
            },
            {
              id: 'text-4',
              component: {
                type: 'Text',
                id: 'text-4',
                content: 'List Item 4',
              },
            },
            {
              id: 'item-5',
              component: {
                type: 'Card',
                id: 'item-5',
                children: ['text-5'],
              },
            },
            {
              id: 'text-5',
              component: {
                type: 'Text',
                id: 'text-5',
                content: 'List Item 5',
              },
            },
          ],
        },
      },
    ],
  },
}
