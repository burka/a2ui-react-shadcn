import type { RowComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
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
    description: 'Horizontal layout - toolbar with icon, text, and button',
    category: 'layout',
    messages: [
      {
        createSurface: { surfaceId: 'row-demo', root: 'toolbar' },
      },
      {
        updateComponents: {
          surfaceId: 'row-demo',
          components: [
            {
              id: 'toolbar',
              component: {
                type: 'Row',
                id: 'toolbar',
                distribution: 'spaceBetween',
                alignment: 'center',
                children: ['left-group', 'action-btn'],
              },
            },
            {
              id: 'left-group',
              component: {
                type: 'Row',
                id: 'left-group',
                distribution: 'packed',
                alignment: 'center',
                children: ['star-icon', 'label'],
              },
            },
            {
              id: 'star-icon',
              component: { type: 'Icon', id: 'star-icon', name: 'star' },
            },
            {
              id: 'label',
              component: { type: 'Text', id: 'label', content: 'Featured Item' },
            },
            {
              id: 'action-btn',
              component: {
                type: 'Button',
                id: 'action-btn',
                child: 'btn-text',
                primary: true,
                action: 'view',
              },
            },
            {
              id: 'btn-text',
              component: { type: 'Text', id: 'btn-text', content: 'View Details' },
            },
          ],
        },
      },
    ],
  },
}
