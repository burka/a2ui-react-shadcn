import type { ButtonComponent } from 'a2ui-react-core'
import { type A2UIRenderer, createActionHandler, type RendererProps } from 'a2ui-react-react'
import type { ReactNode } from 'react'
import { Button } from '../../components/ui/button.js'

export const ButtonRenderer: A2UIRenderer<ButtonComponent> = {
  type: 'Button',
  render: ({ component, children, data, onAction }: RendererProps<ButtonComponent>) => {
    const handleClick = createActionHandler(component, data, onAction)

    return (
      <Button variant={component.primary ? 'default' : 'outline'} onClick={handleClick}>
        {children as ReactNode}
      </Button>
    )
  },
  example: {
    name: 'Button',
    description: 'Clickable button with primary/secondary variants',
    category: 'interactive',
    messages: [
      {
        createSurface: {
          surfaceId: 'button-example',
          root: 'row-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'button-example',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'packed',
                children: ['btn-primary', 'btn-secondary'],
              },
            },
            {
              id: 'btn-primary',
              component: {
                type: 'Button',
                id: 'btn-primary',
                child: 'text-primary',
                primary: true,
                action: 'submit',
              },
            },
            {
              id: 'text-primary',
              component: {
                type: 'Text',
                id: 'text-primary',
                content: 'Primary Button',
              },
            },
            {
              id: 'btn-secondary',
              component: {
                type: 'Button',
                id: 'btn-secondary',
                child: 'text-secondary',
                primary: false,
                action: 'cancel',
              },
            },
            {
              id: 'text-secondary',
              component: {
                type: 'Text',
                id: 'text-secondary',
                content: 'Secondary Button',
              },
            },
          ],
        },
      },
    ],
  },
}
