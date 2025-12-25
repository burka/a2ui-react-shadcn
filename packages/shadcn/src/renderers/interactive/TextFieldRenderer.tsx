import type { TextFieldComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { FieldLabel } from '../../components/ui/field-label.js'
import { Input } from '../../components/ui/input.js'
import { Textarea } from '../../components/ui/textarea.js'

export const TextFieldRenderer: A2UIRenderer<TextFieldComponent> = {
  type: 'TextField',
  render: ({ component, data, id }: RendererProps<TextFieldComponent>) => {
    const value = (component.dataPath ? data.get<string>(component.dataPath) : '') || ''

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (component.dataPath) {
        data.set(component.dataPath, e.target.value)
      }
    }

    const inputType = component.inputType || 'shortText'

    if (inputType === 'longText') {
      return (
        <div className="space-y-2">
          {component.label && (
            <FieldLabel htmlFor={id} variant="block">
              {component.label}
            </FieldLabel>
          )}
          <Textarea id={id} value={value} onChange={handleChange} placeholder={component.label} />
        </div>
      )
    }

    let type = 'text'
    switch (inputType) {
      case 'number':
        type = 'number'
        break
      case 'date':
        type = 'date'
        break
      case 'obscured':
        type = 'password'
        break
      default:
        type = 'text'
        break
    }

    return (
      <div className="space-y-2">
        {component.label && (
          <FieldLabel htmlFor={id} variant="block">
            {component.label}
          </FieldLabel>
        )}
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={component.label}
        />
      </div>
    )
  },
  example: {
    name: 'TextField',
    description:
      'Text input field with multiple input types (shortText, longText, number, date, obscured)',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'textfield-example',
          root: 'col-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'textfield-example',
          components: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                distribution: 'packed',
                children: ['tf-short', 'tf-long', 'tf-number', 'tf-date', 'tf-password'],
              },
            },
            {
              id: 'tf-short',
              component: {
                type: 'TextField',
                id: 'tf-short',
                label: 'Short Text',
                inputType: 'shortText',
                dataPath: 'form.name',
              },
            },
            {
              id: 'tf-long',
              component: {
                type: 'TextField',
                id: 'tf-long',
                label: 'Long Text',
                inputType: 'longText',
                dataPath: 'form.description',
              },
            },
            {
              id: 'tf-number',
              component: {
                type: 'TextField',
                id: 'tf-number',
                label: 'Number',
                inputType: 'number',
                dataPath: 'form.age',
              },
            },
            {
              id: 'tf-date',
              component: {
                type: 'TextField',
                id: 'tf-date',
                label: 'Date',
                inputType: 'date',
                dataPath: 'form.birthdate',
              },
            },
            {
              id: 'tf-password',
              component: {
                type: 'TextField',
                id: 'tf-password',
                label: 'Password',
                inputType: 'obscured',
                dataPath: 'form.password',
              },
            },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'textfield-example',
          values: [
            { path: 'form.name', value: 'John Doe' },
            { path: 'form.description', value: 'A sample description' },
            { path: 'form.age', value: 30 },
            { path: 'form.birthdate', value: '1994-01-01' },
            { path: 'form.password', value: 'secret123' },
          ],
        },
      },
    ],
  },
}
