/**
 * MultipleChoice Component Renderer
 * Supports @extension a2ui-react-shadcn accessibility props (required, disabled, errorMessage, helpText)
 */
import type { MultipleChoiceComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { Checkbox } from '../../components/ui/checkbox.js'

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

    // @extension a2ui-react-shadcn: Extended accessibility props
    const errorId = component.errorMessage ? `${id}-error` : undefined
    const helpId = component.helpText ? `${id}-help` : undefined
    const isGroupDisabled = component.disabled

    const content = (
      <>
        {component.options.map((option) => {
          const isChecked = currentSelection.includes(option.value)
          const isDisabled =
            isGroupDisabled ||
            (component.maxSelections !== undefined &&
              currentSelection.length >= component.maxSelections &&
              !isChecked)

          return (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer select-none"
              style={{
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <Checkbox
                id={`${id}-${option.value}`}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={(checked) => handleChange(option.value, checked === true)}
              />
              <span
                className="text-sm font-medium leading-none"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {option.label}
              </span>
            </label>
          )
        })}
        {component.maxSelections !== undefined && (
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {currentSelection.length} of {component.maxSelections} selected
          </p>
        )}
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
      </>
    )

    // Use fieldset/legend for proper accessibility grouping when label is provided
    if (component.label) {
      return (
        <fieldset
          className="flex flex-col gap-3 border-0 p-0 m-0"
          aria-required={component.required}
          aria-invalid={!!component.errorMessage}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        >
          <legend
            className="text-sm font-medium mb-2"
            style={{ color: 'hsl(var(--foreground))', opacity: isGroupDisabled ? 0.5 : 1 }}
          >
            {component.label}
            {component.required && <span className="text-destructive ml-1">*</span>}
          </legend>
          {content}
        </fieldset>
      )
    }

    return (
      <div
        className="flex flex-col gap-3"
        role="group"
        aria-label="Options"
        aria-required={component.required}
        aria-invalid={!!component.errorMessage}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
      >
        {content}
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
