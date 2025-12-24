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
    description: 'Arranges children vertically with configurable distribution',
    category: 'layout',
    messages: [
      {
        surfaceUpdate: {
          surfaceId: 'demo',
          updates: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'spaceBetween',
                children: ['a', 'b', 'c'],
              },
            },
            { id: 'a', component: { type: 'Text', id: 'a', content: 'Top' } },
            {
              id: 'b',
              component: { type: 'Text', id: 'b', content: 'Middle' },
            },
            {
              id: 'c',
              component: { type: 'Text', id: 'c', content: 'Bottom' },
            },
          ],
        },
      },
      {
        beginRendering: { surfaceId: 'demo', root: 'root' },
      },
    ],
  },
}
