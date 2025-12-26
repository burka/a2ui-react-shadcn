import type { MultipleChoiceComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Checkbox } from '../../components/ui/checkbox.js'
import { FieldLabel } from '../../components/ui/field-label.js'

export const MultipleChoiceRenderer: A2UIRenderer<MultipleChoiceComponent> = {
  type: 'MultipleChoice',
  render: ({ component, data, id }: RendererProps<MultipleChoiceComponent>) => {
    const selectedValues = component.dataPath ? data.get<string[]>(component.dataPath) : []
    const currentSelection = Array.isArray(selectedValues) ? selectedValues : []

    const handleChange = (optionValue: string, checked: boolean) => {
      if (!component.dataPath) return

      let newSelection: string[]
      if (checked) {
        // Add the value
        newSelection = [...currentSelection, optionValue]
        // Enforce maxSelections if specified
        if (component.maxSelections && newSelection.length > component.maxSelections) {
          newSelection = newSelection.slice(-component.maxSelections)
        }
      } else {
        // Remove the value
        newSelection = currentSelection.filter((v) => v !== optionValue)
      }

      data.set(component.dataPath, newSelection)
    }

    return (
      <div className="space-y-2">
        {component.options.map((option) => {
          const isChecked = currentSelection.includes(option.value)
          const isDisabled =
            component.maxSelections !== undefined &&
            currentSelection.length >= component.maxSelections &&
            !isChecked

          return (
            <div
              key={option.value}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors cursor-pointer"
              style={{
                backgroundColor: isChecked ? 'hsl(var(--primary) / 0.08)' : 'transparent',
                border: `1px solid ${isChecked ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))'}`,
              }}
              onClick={() => !isDisabled && handleChange(option.value, !isChecked)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  !isDisabled && handleChange(option.value, !isChecked)
                }
              }}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
            >
              <Checkbox
                id={`${id}-${option.value}`}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={(checked) => handleChange(option.value, checked === true)}
                onClick={(e) => e.stopPropagation()}
              />
              <FieldLabel htmlFor={`${id}-${option.value}`} variant="inline" disabled={isDisabled}>
                {option.label}
              </FieldLabel>
            </div>
          )
        })}
        {component.maxSelections !== undefined && (
          <p className="text-xs mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {currentSelection.length} of {component.maxSelections} selected
          </p>
        )}
      </div>
    )
  },
  example: {
    name: 'MultipleChoice',
    description: 'Checkbox group for multi-select with optional max selections',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'multiplechoice-example',
          root: 'col-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'multiplechoice-example',
          components: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                distribution: 'packed',
                children: ['mc-1', 'mc-2'],
              },
            },
            {
              id: 'mc-1',
              component: {
                type: 'MultipleChoice',
                id: 'mc-1',
                options: [
                  { value: 'js', label: 'JavaScript' },
                  { value: 'ts', label: 'TypeScript' },
                  { value: 'py', label: 'Python' },
                  { value: 'go', label: 'Go' },
                  { value: 'rust', label: 'Rust' },
                ],
                dataPath: 'form.languages',
              },
            },
            {
              id: 'mc-2',
              component: {
                type: 'MultipleChoice',
                id: 'mc-2',
                options: [
                  { value: 'red', label: 'Red' },
                  { value: 'blue', label: 'Blue' },
                  { value: 'green', label: 'Green' },
                  { value: 'yellow', label: 'Yellow' },
                ],
                maxSelections: 2,
                dataPath: 'form.colors',
              },
            },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'multiplechoice-example',
          values: [
            { path: 'form.languages', value: ['js', 'ts'] },
            { path: 'form.colors', value: ['blue'] },
          ],
        },
      },
    ],
  },
}
