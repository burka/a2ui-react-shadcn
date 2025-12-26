/**
 * Checkbox Component Renderer
 * Supports @extension a2ui-shadcn-ui accessibility props (required, disabled, errorMessage, helpText)
 */
import type { CheckboxComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Checkbox } from '../../components/ui/checkbox.js'
import { Label } from '../../components/ui/label.js'

export const CheckboxRenderer: A2UIRenderer<CheckboxComponent> = {
  type: 'Checkbox',
  render: ({ component, data, id }: RendererProps<CheckboxComponent>) => {
    const value = component.dataPath ? data.get<boolean>(component.dataPath) : false

    const handleChange = (checked: boolean) => {
      if (component.dataPath) {
        data.set(component.dataPath, checked)
      }
    }

    // @extension a2ui-shadcn-ui: Extended accessibility props
    const errorId = component.errorMessage ? `${id}-error` : undefined
    const helpId = component.helpText ? `${id}-help` : undefined
    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Checkbox
            id={id}
            checked={value || false}
            onCheckedChange={handleChange}
            disabled={component.disabled}
            required={component.required}
            aria-required={component.required}
            aria-invalid={!!component.errorMessage}
            aria-describedby={describedBy}
          />
          {component.label && (
            <Label htmlFor={id} className={component.disabled ? 'opacity-50' : ''}>
              {component.label}
              {component.required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
        </div>
        {/* @extension a2ui-shadcn-ui: Help text */}
        {component.helpText && (
          <p id={helpId} className="text-sm text-muted-foreground ml-7">
            {component.helpText}
          </p>
        )}
        {/* @extension a2ui-shadcn-ui: Error message */}
        {component.errorMessage && (
          <p id={errorId} className="text-sm text-destructive ml-7">
            {component.errorMessage}
          </p>
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
        createSurface: {
          surfaceId: 'checkbox-example',
          root: 'col-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'checkbox-example',
          components: [
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
