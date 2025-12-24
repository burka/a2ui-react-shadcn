import type { RowComponent } from '@a2ui/core'
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

export const RowRenderer: A2UIRenderer<RowComponent> = {
  type: 'Row',
  render: ({ component, children }: RendererProps<RowComponent>) => {
    const distribution = distributionMap[component.distribution ?? 'packed']
    const alignment = alignmentMap[component.alignment ?? 'start']

    return (
      <div className={cn('flex flex-row gap-2', distribution, alignment)}>
        {children as ReactNode}
      </div>
    )
  },
  example: {
    name: 'Row',
    description: 'Arranges children horizontally with configurable distribution',
    category: 'layout',
    messages: [
      {
        surfaceUpdate: {
          surfaceId: 'demo',
          updates: [
            {
              id: 'root',
              component: {
                type: 'Row',
                id: 'root',
                distribution: 'spaceBetween',
                children: ['a', 'b', 'c'],
              },
            },
            { id: 'a', component: { type: 'Text', id: 'a', content: 'Left' } },
            {
              id: 'b',
              component: { type: 'Text', id: 'b', content: 'Center' },
            },
            { id: 'c', component: { type: 'Text', id: 'c', content: 'Right' } },
          ],
        },
      },
      {
        beginRendering: { surfaceId: 'demo', root: 'root' },
      },
    ],
  },
}
