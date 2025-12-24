import type { ColumnComponent } from '@a2ui/core'
import type { A2UIRenderer, RendererProps } from '@a2ui/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils.js'

// Map A2UI distribution to Tailwind classes
const distributionMap = {
  packed: 'justify-start',
  equal: 'justify-evenly',
  spaceBetween: 'justify-between',
  spaceAround: 'justify-around',
} as const

const alignmentMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const

export const ColumnRenderer: A2UIRenderer<ColumnComponent> = {
  type: 'Column',
  render: ({ component, children }: RendererProps<ColumnComponent>) => {
    const distribution = distributionMap[component.distribution ?? 'packed']
    const alignment = alignmentMap[component.alignment ?? 'start']

    return (
      <div className={cn('flex flex-col gap-2', distribution, alignment)}>
        {children as ReactNode}
      </div>
    )
  },
  example: {
    name: 'Column',
    description: 'Vertical layout - form with heading, input, and button',
    category: 'layout',
    messages: [
      {
        beginRendering: { surfaceId: 'column-demo', root: 'form' },
      },
      {
        surfaceUpdate: {
          surfaceId: 'column-demo',
          updates: [
            {
              id: 'form',
              component: {
                type: 'Column',
                id: 'form',
                distribution: 'packed',
                alignment: 'stretch',
                children: ['heading', 'email-field', 'subscribe-btn'],
              },
            },
            {
              id: 'heading',
              component: {
                type: 'Text',
                id: 'heading',
                content: 'Subscribe to Newsletter',
                style: 'h4',
              },
            },
            {
              id: 'email-field',
              component: {
                type: 'TextField',
                id: 'email-field',
                label: 'Email Address',
                dataPath: 'email',
              },
            },
            {
              id: 'subscribe-btn',
              component: {
                type: 'Button',
                id: 'subscribe-btn',
                child: 'btn-text',
                primary: true,
                action: 'subscribe',
              },
            },
            {
              id: 'btn-text',
              component: { type: 'Text', id: 'btn-text', content: 'Subscribe' },
            },
          ],
        },
      },
    ],
  },
}
