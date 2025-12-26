import type { SelectComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Label } from '../../components/ui/label.js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.js'

export const SelectRenderer: A2UIRenderer<SelectComponent> = {
  type: 'Select',
  render: ({ component, data, id }: RendererProps<SelectComponent>) => {
    const value = component.dataPath ? data.get<string>(component.dataPath) : ''

    const handleChange = (newValue: string) => {
      if (component.dataPath) {
        data.set(component.dataPath, newValue)
      }
    }

    return (
      <div className="grid gap-2">
        {component.label && <Label htmlFor={id}>{component.label}</Label>}
        <Select value={value || undefined} onValueChange={handleChange}>
          <SelectTrigger
            id={id}
            className="w-full"
            aria-label={component.label || component.placeholder || 'Select an option'}
          >
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
      </div>
    )
  },
  example: {
    name: 'Select',
    description: 'Dropdown select with options and data binding',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'select-example',
          root: 'col-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'select-example',
          components: [
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
