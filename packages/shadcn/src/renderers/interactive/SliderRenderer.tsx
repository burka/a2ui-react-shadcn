/**
 * Slider Component Renderer
 * Supports @extension a2ui-react-shadcn accessibility props (required, disabled, errorMessage, helpText)
 */
import type { SliderComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { Label } from '../../components/ui/label.js'
import { Slider } from '../../components/ui/slider.js'

export const SliderRenderer: A2UIRenderer<SliderComponent> = {
  type: 'Slider',
  render: ({ component, data, id }: RendererProps<SliderComponent>) => {
    const value = component.dataPath ? data.get<number>(component.dataPath) : component.min || 0

    const handleChange = (values: number[]) => {
      if (component.dataPath && values.length > 0) {
        data.set(component.dataPath, values[0])
      }
    }

    const min = component.min ?? 0
    const max = component.max ?? 100
    const step = component.step ?? 1

    // @extension a2ui-react-shadcn: Extended accessibility props
    const errorId = component.errorMessage ? `${id}-error` : undefined
    const helpId = component.helpText ? `${id}-help` : undefined
    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined

    return (
      <div className="space-y-2 w-full min-w-[200px]">
        {component.label && (
          <Label htmlFor={id} className={component.disabled ? 'opacity-50' : ''}>
            {component.label}
            {component.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Slider
          id={id}
          min={min}
          max={max}
          step={step}
          value={[value ?? min]}
          onValueChange={handleChange}
          disabled={component.disabled}
          aria-label={component.label || 'Slider'}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value ?? min}
          aria-required={component.required}
          aria-invalid={!!component.errorMessage}
          aria-describedby={describedBy}
          className="w-full"
        />
        <div
          className="text-sm text-center font-medium"
          style={{ color: 'hsl(var(--foreground))' }}
          aria-hidden="true"
        >
          {value ?? min}
        </div>
        {/* @extension a2ui-react-shadcn: Help text */}
        {component.helpText && (
          <p id={helpId} className="text-sm text-muted-foreground">
            {component.helpText}
          </p>
        )}
        {/* @extension a2ui-react-shadcn: Error message */}
        {component.errorMessage && (
          <p id={errorId} className="text-sm text-destructive">
            {component.errorMessage}
          </p>
        )}
      </div>
    )
  },
  example: {
    name: 'Slider',
    description: 'Range slider for numeric input with min/max/step configuration',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'slider-example',
          root: 'col-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'slider-example',
          components: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                distribution: 'packed',
                children: ['slider-1', 'slider-2', 'slider-3'],
              },
            },
            {
              id: 'slider-1',
              component: {
                type: 'Slider',
                id: 'slider-1',
                min: 0,
                max: 100,
                step: 1,
                dataPath: 'form.volume',
              },
            },
            {
              id: 'slider-2',
              component: {
                type: 'Slider',
                id: 'slider-2',
                min: 0,
                max: 10,
                step: 0.5,
                dataPath: 'form.rating',
              },
            },
            {
              id: 'slider-3',
              component: {
                type: 'Slider',
                id: 'slider-3',
                min: 18,
                max: 120,
                step: 1,
                dataPath: 'form.age',
              },
            },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'slider-example',
          values: [
            { path: 'form.volume', value: 50 },
            { path: 'form.rating', value: 7.5 },
            { path: 'form.age', value: 30 },
          ],
        },
      },
    ],
  },
}
