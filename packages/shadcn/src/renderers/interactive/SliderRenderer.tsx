import type { SliderComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Slider } from '../../components/ui/slider.js'

export const SliderRenderer: A2UIRenderer<SliderComponent> = {
  type: 'Slider',
  render: ({ component, data }: RendererProps<SliderComponent>) => {
    const value = component.dataPath ? data.get<number>(component.dataPath) : component.min || 0

    const handleChange = (values: number[]) => {
      if (component.dataPath && values.length > 0) {
        data.set(component.dataPath, values[0])
      }
    }

    const min = component.min ?? 0
    const max = component.max ?? 100
    const step = component.step ?? 1

    return (
      <div className="space-y-2">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value || min]}
          onValueChange={handleChange}
          className="w-full"
        />
        <div className="text-sm text-muted-foreground text-center">
          {value !== undefined ? value : min}
        </div>
      </div>
    )
  },
  example: {
    name: 'Slider',
    description: 'Range slider for numeric input with min/max/step configuration',
    category: 'interactive',
    messages: [
      {
        beginRendering: {
          surfaceId: 'slider-example',
          root: 'col-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'slider-example',
          updates: [
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
