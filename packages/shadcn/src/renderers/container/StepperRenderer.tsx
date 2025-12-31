import type { StepperComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { Check, Circle, X } from 'lucide-react'
import { cn } from '../../lib/utils.js'

export const StepperRenderer: A2UIRenderer<StepperComponent> = {
  type: 'Stepper',
  render: ({ component, id }: RendererProps<StepperComponent>) => {
    const orientation = component.orientation || 'horizontal'
    const activeStep = component.activeStep ?? 0

    const getStepStatus = (index: number, step: (typeof component.steps)[0]) => {
      if (step.status) return step.status
      if (index < activeStep) return 'completed'
      if (index === activeStep) return 'current'
      return 'pending'
    }

    const statusStyles = {
      pending: 'border-muted-foreground/30 bg-background text-muted-foreground',
      current: 'border-primary bg-primary text-primary-foreground',
      completed: 'border-primary bg-primary text-primary-foreground',
      error: 'border-destructive bg-destructive text-destructive-foreground',
    }

    const StatusIcon = ({ status }: { status: string }) => {
      switch (status) {
        case 'completed':
          return <Check className="h-4 w-4" />
        case 'error':
          return <X className="h-4 w-4" />
        default:
          return <Circle className="h-2 w-2 fill-current" />
      }
    }

    return (
      <div
        id={id}
        data-a2ui-component="Stepper"
        className={cn('flex', orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col')}
        role="list"
        aria-label="Progress steps"
      >
        {component.steps.map((step, index) => {
          const status = getStepStatus(index, step)
          const isLast = index === component.steps.length - 1

          return (
            <div
              key={step.id}
              className={cn(
                'flex',
                orientation === 'horizontal'
                  ? 'flex-1 flex-col items-center'
                  : 'flex-row items-start',
              )}
              role="listitem"
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <div
                className={cn(
                  'flex items-center',
                  orientation === 'horizontal' ? 'flex-col' : 'flex-row',
                )}
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                    statusStyles[status],
                  )}
                >
                  <StatusIcon status={status} />
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div
                    className={cn(
                      'transition-colors',
                      orientation === 'horizontal'
                        ? 'mt-4 h-0.5 w-full min-w-[40px]'
                        : 'ml-4 h-full min-h-[40px] w-0.5',
                      index < activeStep ? 'bg-primary' : 'bg-muted-foreground/30',
                    )}
                  />
                )}
              </div>

              {/* Step content */}
              <div className={cn('text-center', orientation === 'horizontal' ? 'mt-2' : 'ml-4')}>
                <div
                  className={cn(
                    'text-sm font-medium',
                    status === 'current' ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">{step.description}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
  example: {
    name: 'Stepper',
    description: 'Step-by-step progress indicator for wizards and multi-step forms',
    category: 'container',
    messages: [
      { createSurface: { surfaceId: 'stepper-demo', root: 'root' } },
      {
        updateComponents: {
          surfaceId: 'stepper-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                children: ['stepper'],
              },
            },
            {
              id: 'stepper',
              component: {
                type: 'Stepper',
                id: 'stepper',
                activeStep: 1,
                steps: [
                  { id: 'step1', label: 'Account', description: 'Create your account' },
                  { id: 'step2', label: 'Profile', description: 'Set up your profile' },
                  { id: 'step3', label: 'Review', description: 'Review and submit' },
                ],
              },
            },
          ],
        },
      },
    ],
  },
}
