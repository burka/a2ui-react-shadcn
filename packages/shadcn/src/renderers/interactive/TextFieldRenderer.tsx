import type { TextFieldComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Input } from '../../components/ui/input.js'
import { Label } from '../../components/ui/label.js'
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

    // @extension a2ui-shadcn-ui: Extended accessibility props
    const errorId = component.errorMessage ? `${id}-error` : undefined
    const helpId = component.helpText ? `${id}-help` : undefined
    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined

    const sharedProps = {
      id,
      disabled: component.disabled,
      required: component.required,
      'aria-required': component.required,
      'aria-invalid': !!component.errorMessage,
      'aria-describedby': describedBy,
    }

    if (inputType === 'longText') {
      return (
        <div className="grid gap-2">
          {component.label && (
            <Label htmlFor={id}>
              {component.label}
              {component.required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          <Textarea
            {...sharedProps}
            value={value}
            onChange={handleChange}
            placeholder={component.placeholder || component.label}
          />
          {component.helpText && (
            <p id={helpId} className="text-sm text-muted-foreground">
              {component.helpText}
            </p>
          )}
          {component.errorMessage && (
            <p id={errorId} className="text-sm text-destructive" role="alert">
              {component.errorMessage}
            </p>
          )}
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
      <div className="grid gap-2">
        {component.label && (
          <Label htmlFor={id}>
            {component.label}
            {component.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Input
          {...sharedProps}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={component.placeholder || component.label}
        />
        {component.helpText && (
          <p id={helpId} className="text-sm text-muted-foreground">
            {component.helpText}
          </p>
        )}
        {component.errorMessage && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {component.errorMessage}
          </p>
        )}
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
