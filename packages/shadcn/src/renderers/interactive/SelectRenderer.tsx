import type { SelectComponent } from '@a2ui/core'
import type { A2UIRenderer, RendererProps } from '@a2ui/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.js'

export const SelectRenderer: A2UIRenderer<SelectComponent> = {
  type: 'Select',
  render: ({ component, data }: RendererProps<SelectComponent>) => {
    const value = component.dataPath ? data.get<string>(component.dataPath) : ''

    const handleChange = (newValue: string) => {
      if (component.dataPath) {
        data.set(component.dataPath, newValue)
      }
    }

    return (
      <Select value={value || undefined} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={component.placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent>
          {component.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  },
  example: {
    name: 'Select',
    description: 'Dropdown select with options and data binding',
    category: 'interactive',
    messages: [
      {
        beginRendering: {
          surfaceId: 'select-example',
          root: 'col-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'select-example',
          updates: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                distribution: 'packed',
                children: ['select-1', 'select-2'],
              },
            },
            {
              id: 'select-1',
              component: {
                type: 'Select',
                id: 'select-1',
                placeholder: 'Choose a country',
                options: [
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'de', label: 'Germany' },
                  { value: 'fr', label: 'France' },
                  { value: 'es', label: 'Spain' },
                ],
                dataPath: 'form.country',
              },
            },
            {
              id: 'select-2',
              component: {
                type: 'Select',
                id: 'select-2',
                placeholder: 'Select a category',
                options: [
                  { value: 'tech', label: 'Technology' },
                  { value: 'design', label: 'Design' },
                  { value: 'business', label: 'Business' },
                  { value: 'marketing', label: 'Marketing' },
                ],
                dataPath: 'form.category',
              },
            },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'select-example',
          values: [
            { path: 'form.country', value: 'us' },
            { path: 'form.category', value: 'tech' },
          ],
        },
      },
    ],
  },
}
