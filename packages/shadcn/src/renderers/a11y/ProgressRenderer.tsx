/**
 * @extension a2ui-react-shadcn
 * Progress Component Renderer
 * Renders an accessible progress indicator.
 */

import type { ProgressComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { cn } from '../../lib/utils.js'

export const ProgressRenderer: A2UIRenderer<ProgressComponent> = {
  type: 'Progress',
  render: ({ component, id }: RendererProps<ProgressComponent>) => {
    const max = component.max ?? 100
    const value = component.value
    const isIndeterminate = value === undefined
    const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div className="w-full space-y-1">
        {component.label && (
          <div className="flex justify-between text-sm">
            <span>{component.label}</span>
            {!isIndeterminate && <span>{Math.round(percentage)}%</span>}
          </div>
        )}
        <div
          id={id}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={component.label}
          aria-busy={isIndeterminate}
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className={cn(
              'h-full bg-primary transition-all duration-300',
              isIndeterminate && 'animate-progress-indeterminate w-1/3'
            )}
            style={isIndeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  },
  example: {
    name: 'Progress',
    description: 'Accessible progress indicator with determinate and indeterminate states',
    category: 'a11y',
    messages: [
      { createSurface: { surfaceId: 'progress-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'progress-example',
          components: [
            { id: 'col-1', component: { type: 'Column', id: 'col-1', children: ['progress-1', 'progress-2', 'progress-3'] } },
            { id: 'progress-1', component: { type: 'Progress', id: 'progress-1', label: 'Upload progress', value: 65 } },
            { id: 'progress-2', component: { type: 'Progress', id: 'progress-2', label: 'Almost done', value: 90 } },
            { id: 'progress-3', component: { type: 'Progress', id: 'progress-3', label: 'Loading...' } },
          ],
        },
      },
    ],
  },
}
