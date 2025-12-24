import type { ButtonComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactNode } from 'react'
import { Button } from '../../components/ui/button.js'

export const ButtonRenderer: A2UIRenderer<ButtonComponent> = {
  type: 'Button',
  render: ({ component, children, onAction }: RendererProps<ButtonComponent>) => {
    const handleClick = () => {
      if (component.action) {
        onAction({ type: component.action })
      }
    }

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
        beginRendering: {
          surfaceId: 'button-example',
          root: 'row-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'button-example',
          updates: [
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
