import type { CheckboxComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Checkbox } from '../../components/ui/checkbox.js'
import { FieldLabel } from '../../components/ui/field-label.js'

export const CheckboxRenderer: A2UIRenderer<CheckboxComponent> = {
  type: 'Checkbox',
  render: ({ component, data, id }: RendererProps<CheckboxComponent>) => {
    const value = component.dataPath ? data.get<boolean>(component.dataPath) : false

    const handleChange = (checked: boolean) => {
      if (component.dataPath) {
        data.set(component.dataPath, checked)
      }
    }

    return (
      <div className="flex items-center space-x-2">
        <Checkbox id={id} checked={value || false} onCheckedChange={handleChange} />
        {component.label && (
          <FieldLabel htmlFor={id} variant="inline">
            {component.label}
          </FieldLabel>
        )}
      </div>
    )
  },
  example: {
    name: 'Checkbox',
    description: 'Checkbox with label and data binding',
    category: 'interactive',
    messages: [
      {
        beginRendering: {
          surfaceId: 'checkbox-example',
          root: 'col-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'checkbox-example',
          updates: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                distribution: 'packed',
                children: ['cb-1', 'cb-2', 'cb-3'],
              },
            },
            {
              id: 'cb-1',
              component: {
                type: 'Checkbox',
                id: 'cb-1',
                label: 'Accept terms and conditions',
                dataPath: 'form.acceptTerms',
              },
            },
            {
              id: 'cb-2',
              component: {
                type: 'Checkbox',
                id: 'cb-2',
                label: 'Subscribe to newsletter',
                dataPath: 'form.newsletter',
              },
            },
            {
              id: 'cb-3',
              component: {
                type: 'Checkbox',
                id: 'cb-3',
                label: 'Enable notifications',
                dataPath: 'form.notifications',
              },
            },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'checkbox-example',
          values: [
            { path: 'form.acceptTerms', value: true },
            { path: 'form.newsletter', value: false },
            { path: 'form.notifications', value: true },
          ],
        },
      },
    ],
  },
}
