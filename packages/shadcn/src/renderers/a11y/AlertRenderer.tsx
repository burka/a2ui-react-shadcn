/**
 * @extension a2ui-react-shadcn
 * Alert Component Renderer
 * Renders accessible alert messages with role="alert" for screen readers.
 */

import type { AlertComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils.js'

const variantStyles = {
  info: 'bg-info border-info-border text-info-foreground',
  warning: 'bg-warning border-warning-border text-warning-foreground',
  error: 'bg-error border-error-border text-error-foreground',
  success: 'bg-success border-success-border text-success-foreground',
}

const variantIcons = {
  info: '💡',
  warning: '⚠️',
  error: '❌',
  success: '✓',
}

export const AlertRenderer: A2UIRenderer<AlertComponent> = {
  type: 'Alert',
  render: ({ component, children, id }: RendererProps<AlertComponent>) => {
    const variant = component.variant || 'info'

    return (
      <div
        id={id}
        data-a2ui-component="Alert"
        role="alert"
        className={cn('relative rounded-lg border p-4', variantStyles[variant])}
      >
        <div className="flex gap-3">
          <span className="flex-shrink-0" aria-hidden="true">
            {variantIcons[variant]}
          </span>
          <div className="flex-1">
            {component.title && <h5 className="font-medium mb-1">{component.title}</h5>}
            <div className="text-sm">{children as ReactNode}</div>
          </div>
        </div>
      </div>
    )
  },
  example: {
    name: 'Alert',
    description: 'Accessible alert component with screen reader announcement',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'alert-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'alert-example',
          components: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                children: ['alert-1', 'alert-2', 'alert-3', 'alert-4'],
              },
            },
            {
              id: 'alert-1',
              component: {
                type: 'Alert',
                id: 'alert-1',
                variant: 'info',
                title: 'Information',
                children: ['msg-1'],
              },
            },
            {
              id: 'msg-1',
              component: {
                type: 'Text',
                id: 'msg-1',
                content: 'This is an informational message.',
              },
            },
            {
              id: 'alert-2',
              component: {
                type: 'Alert',
                id: 'alert-2',
                variant: 'success',
                title: 'Success',
                children: ['msg-2'],
              },
            },
            {
              id: 'msg-2',
              component: {
                type: 'Text',
                id: 'msg-2',
                content: 'Operation completed successfully!',
              },
            },
            {
              id: 'alert-3',
              component: {
                type: 'Alert',
                id: 'alert-3',
                variant: 'warning',
                title: 'Warning',
                children: ['msg-3'],
              },
            },
            {
              id: 'msg-3',
              component: { type: 'Text', id: 'msg-3', content: 'Please review before continuing.' },
            },
            {
              id: 'alert-4',
              component: {
                type: 'Alert',
                id: 'alert-4',
                variant: 'error',
                title: 'Error',
                children: ['msg-4'],
              },
            },
            {
              id: 'msg-4',
              component: { type: 'Text', id: 'msg-4', content: 'Something went wrong.' },
            },
          ],
        },
      },
    ],
  },
}
