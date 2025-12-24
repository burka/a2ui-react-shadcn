import type { TextComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ElementType } from 'react'
import { cn } from '../../lib/utils.js'

export const TextRenderer: A2UIRenderer<TextComponent> = {
  type: 'Text',
  render: ({ component }: RendererProps<TextComponent>) => {
    const { content, style = 'body' } = component

    const styleMap: Record<string, { tag: ElementType; className: string }> = {
      h1: { tag: 'h1', className: 'text-4xl font-bold' },
      h2: { tag: 'h2', className: 'text-3xl font-semibold' },
      h3: { tag: 'h3', className: 'text-2xl font-semibold' },
      h4: { tag: 'h4', className: 'text-xl font-medium' },
      h5: { tag: 'h5', className: 'text-lg font-medium' },
      caption: { tag: 'span', className: 'text-sm text-muted-foreground' },
      body: { tag: 'p', className: 'text-base' },
    }

    const styleConfig = styleMap[style] ?? styleMap.body
    const Tag = styleConfig!.tag
    const className = styleConfig!.className

    return <Tag className={cn(className)}>{content}</Tag>
  },
  example: {
    name: 'Text',
    description: 'Renders text with semantic styling (h1-h5, body, caption)',
    category: 'display',
    messages: [
      {
        beginRendering: {
          surfaceId: 'text-demo',
          root: 'root',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'text-demo',
          updates: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'packed',
                children: ['h1', 'h2', 'h3', 'h4', 'h5', 'body', 'caption'],
              },
            },
            {
              id: 'h1',
              component: {
                type: 'Text',
                id: 'h1',
                content: 'Heading 1 - Large Title',
                style: 'h1',
              },
            },
            {
              id: 'h2',
              component: {
                type: 'Text',
                id: 'h2',
                content: 'Heading 2 - Section Title',
                style: 'h2',
              },
            },
            {
              id: 'h3',
              component: {
                type: 'Text',
                id: 'h3',
                content: 'Heading 3 - Subsection',
                style: 'h3',
              },
            },
            {
              id: 'h4',
              component: {
                type: 'Text',
                id: 'h4',
                content: 'Heading 4 - Component Title',
                style: 'h4',
              },
            },
            {
              id: 'h5',
              component: {
                type: 'Text',
                id: 'h5',
                content: 'Heading 5 - Small Title',
                style: 'h5',
              },
            },
            {
              id: 'body',
              component: {
                type: 'Text',
                id: 'body',
                content: 'Body text paragraph with regular content and default styling.',
                style: 'body',
              },
            },
            {
              id: 'caption',
              component: {
                type: 'Text',
                id: 'caption',
                content: 'Caption text - muted and small',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
  },
}
