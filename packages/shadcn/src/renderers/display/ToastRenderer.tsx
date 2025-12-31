'use client'

import type { ToastComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'
import { cn } from '../../lib/utils.js'

const variantStyles = {
  default: 'bg-background border-border',
  success: 'bg-success border-success-border text-success-foreground',
  error: 'bg-error border-error-border text-error-foreground',
  warning: 'bg-warning border-warning-border text-warning-foreground',
  info: 'bg-info border-info-border text-info-foreground',
}

const variantIcons = {
  default: null,
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

export const ToastRenderer: A2UIRenderer<ToastComponent> = {
  type: 'Toast',
  render: ({ component, id, onAction }: RendererProps<ToastComponent>) => {
    const variant = component.variant || 'default'
    const Icon = variantIcons[variant]

    return (
      <div
        id={id}
        data-a2ui-component="Toast"
        role="alert"
        aria-live="polite"
        className={cn(
          'pointer-events-auto relative flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg',
          variantStyles[variant],
        )}
      >
        {Icon && <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />}
        <div className="flex-1 space-y-1">
          {component.title && (
            <div className="text-sm font-semibold text-foreground">{component.title}</div>
          )}
          <div className="text-sm text-muted-foreground">{component.message}</div>
          {component.actionLabel && component.action && (
            <button
              type="button"
              onClick={() => onAction?.({ type: component.action!, payload: { id: component.id } })}
              className="text-sm font-medium text-primary hover:underline mt-2"
            >
              {component.actionLabel}
            </button>
          )}
        </div>
        {/* Close button - triggers dismiss action */}
        <button
          type="button"
          onClick={() => onAction?.({ type: 'toast.dismiss', payload: { id: component.id } })}
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  },
  example: {
    name: 'Toast',
    description: 'Notification toast with variants and optional action',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'toast-demo', root: 'root' } },
      {
        updateComponents: {
          surfaceId: 'toast-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                children: ['toast-success', 'toast-error', 'toast-info'],
              },
            },
            {
              id: 'toast-success',
              component: {
                type: 'Toast',
                id: 'toast-success',
                variant: 'success',
                title: 'Success!',
                message: 'Your changes have been saved.',
              },
            },
            {
              id: 'toast-error',
              component: {
                type: 'Toast',
                id: 'toast-error',
                variant: 'error',
                title: 'Error',
                message: 'Something went wrong. Please try again.',
                actionLabel: 'Retry',
                action: 'retry',
              },
            },
            {
              id: 'toast-info',
              component: {
                type: 'Toast',
                id: 'toast-info',
                variant: 'info',
                message: 'New version available!',
                actionLabel: 'Update',
                action: 'update',
              },
            },
          ],
        },
      },
    ],
  },
}
