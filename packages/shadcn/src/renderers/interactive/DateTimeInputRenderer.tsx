import type { DateTimeInputComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Input } from '../../components/ui/input.js'
import { Label } from '../../components/ui/label.js'

export const DateTimeInputRenderer: A2UIRenderer<DateTimeInputComponent> = {
  type: 'DateTimeInput',
  render: ({ component, data, id }: RendererProps<DateTimeInputComponent>) => {
    const value = (component.dataPath ? data.get<string>(component.dataPath) : '') || ''

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (component.dataPath) {
        data.set(component.dataPath, e.target.value)
      }
    }

    return (
      <div className="grid gap-2">
        {component.label && <Label htmlFor={id}>{component.label}</Label>}
        <Input
          id={id}
          type={component.inputType}
          value={value}
          onChange={handleChange}
          aria-label={component.label || `${component.inputType} input`}
        />
      </div>
    )
  },
  example: {
    name: 'DateTimeInput',
    description: 'Date, time, and datetime picker using native HTML5 inputs',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'datetime-example',
          root: 'col-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'datetime-example',
          components: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                distribution: 'packed',
                children: ['dt-date', 'dt-time', 'dt-datetime'],
              },
            },
            {
              id: 'dt-date',
              component: {
                type: 'DateTimeInput',
                id: 'dt-date',
                label: 'Date',
                inputType: 'date',
                dataPath: 'form.date',
              },
            },
            {
              id: 'dt-time',
              component: {
                type: 'DateTimeInput',
                id: 'dt-time',
                label: 'Time',
                inputType: 'time',
                dataPath: 'form.time',
              },
            },
            {
              id: 'dt-datetime',
              component: {
                type: 'DateTimeInput',
                id: 'dt-datetime',
                label: 'Date & Time',
                inputType: 'datetime-local',
                dataPath: 'form.datetime',
              },
            },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'datetime-example',
          values: [
            { path: 'form.date', value: '2024-01-15' },
            { path: 'form.time', value: '14:30' },
            { path: 'form.datetime', value: '2024-01-15T14:30' },
          ],
        },
      },
    ],
  },
}
