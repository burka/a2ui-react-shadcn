import type { DividerComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Separator } from '../../components/ui/separator.js'

export const DividerRenderer: A2UIRenderer<DividerComponent> = {
  type: 'Divider',
  render: ({ component }: RendererProps<DividerComponent>) => {
    const { orientation = 'horizontal' } = component

    return <Separator orientation={orientation} />
  },
  example: {
    name: 'Divider',
    description: 'Renders horizontal or vertical dividers using Separator component',
    category: 'display',
    messages: [
      {
        beginRendering: {
          surfaceId: 'divider-demo',
          root: 'root',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'divider-demo',
          updates: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'packed',
                children: ['title1', 'divider-h', 'title2', 'row-vertical', 'caption'],
              },
            },
            {
              id: 'title1',
              component: {
                type: 'Text',
                id: 'title1',
                content: 'Section 1',
                style: 'h4',
              },
            },
            {
              id: 'divider-h',
              component: {
                type: 'Divider',
                id: 'divider-h',
                orientation: 'horizontal',
              },
            },
            {
              id: 'title2',
              component: {
                type: 'Text',
                id: 'title2',
                content: 'Section 2',
                style: 'h4',
              },
            },
            {
              id: 'row-vertical',
              component: {
                type: 'Row',
                id: 'row-vertical',
                distribution: 'packed',
                children: ['text-left', 'divider-v', 'text-right'],
              },
            },
            {
              id: 'text-left',
              component: {
                type: 'Text',
                id: 'text-left',
                content: 'Left',
                style: 'body',
              },
            },
            {
              id: 'divider-v',
              component: {
                type: 'Divider',
                id: 'divider-v',
                orientation: 'vertical',
              },
            },
            {
              id: 'text-right',
              component: {
                type: 'Text',
                id: 'text-right',
                content: 'Right',
                style: 'body',
              },
            },
            {
              id: 'caption',
              component: {
                type: 'Text',
                id: 'caption',
                content: 'Divider with horizontal and vertical orientations',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
  },
}
