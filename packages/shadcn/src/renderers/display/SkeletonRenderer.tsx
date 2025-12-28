import type { SkeletonComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { cn } from '../../lib/utils.js'

export const SkeletonRenderer: A2UIRenderer<SkeletonComponent> = {
  type: 'Skeleton',
  render: ({ component, id }: RendererProps<SkeletonComponent>) => {
    const variant = component.variant || 'rectangular'

    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    }

    return (
      <div
        id={id}
        role="status"
        aria-label="Loading content"
        className={cn(
          'animate-pulse bg-muted',
          variantClasses[variant],
        )}
        style={{
          width: component.width || '100%',
          height: component.height || (variant === 'text' ? '1rem' : '100px'),
        }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  },
  example: {
    name: 'Skeleton',
    description: 'Content placeholder while loading',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'skeleton-demo', root: 'root' } },
      {
        updateComponents: {
          surfaceId: 'skeleton-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                children: ['card-skeleton'],
              },
            },
            {
              id: 'card-skeleton',
              component: {
                type: 'Row',
                id: 'card-skeleton',
                children: ['avatar', 'content'],
                alignment: 'start',
              },
            },
            {
              id: 'avatar',
              component: {
                type: 'Skeleton',
                id: 'avatar',
                variant: 'circular',
                width: '48px',
                height: '48px',
              },
            },
            {
              id: 'content',
              component: {
                type: 'Column',
                id: 'content',
                children: ['line1', 'line2'],
              },
            },
            {
              id: 'line1',
              component: {
                type: 'Skeleton',
                id: 'line1',
                variant: 'text',
                width: '200px',
                height: '1rem',
              },
            },
            {
              id: 'line2',
              component: {
                type: 'Skeleton',
                id: 'line2',
                variant: 'text',
                width: '150px',
                height: '1rem',
              },
            },
          ],
        },
      },
    ],
  },
}
