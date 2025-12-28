import type { SpinnerComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils.js'

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

export const SpinnerRenderer: A2UIRenderer<SpinnerComponent> = {
  type: 'Spinner',
  render: ({ component, id }: RendererProps<SpinnerComponent>) => {
    const size = component.size || 'md'

    return (
      <div
        id={id}
        data-a2ui-component="Spinner"
        role="status"
        aria-label={component.label || 'Loading'}
        className="inline-flex items-center justify-center"
      >
        <Loader2
          className={cn('animate-spin text-muted-foreground', sizeClasses[size])}
          aria-hidden="true"
        />
        {component.label && <span className="sr-only">{component.label}</span>}
      </div>
    )
  },
  example: {
    name: 'Spinner',
    description: 'Loading indicator with different sizes',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'spinner-demo', root: 'root' } },
      {
        updateComponents: {
          surfaceId: 'spinner-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Row',
                id: 'root',
                children: ['spinner-sm', 'spinner-md', 'spinner-lg'],
                distribution: 'spaceAround',
                alignment: 'center',
              },
            },
            {
              id: 'spinner-sm',
              component: {
                type: 'Spinner',
                id: 'spinner-sm',
                size: 'sm',
                label: 'Loading small',
              },
            },
            {
              id: 'spinner-md',
              component: {
                type: 'Spinner',
                id: 'spinner-md',
                size: 'md',
                label: 'Loading medium',
              },
            },
            {
              id: 'spinner-lg',
              component: {
                type: 'Spinner',
                id: 'spinner-lg',
                size: 'lg',
                label: 'Loading large',
              },
            },
          ],
        },
      },
    ],
  },
}
