import type { ModalComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { ReactElement, ReactNode } from 'react'
import { isValidElement, useId } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../components/ui/dialog.js'

export const ModalRenderer: A2UIRenderer<ModalComponent> = {
  type: 'Modal',
  render: ({ component, children, id }: RendererProps<ModalComponent>) => {
    const titleId = useId()
    const childArray = Array.isArray(children) ? children : [children]
    const triggerChild = childArray.find(
      (c): c is ReactElement => isValidElement(c) && c.key === component.trigger,
    )
    const contentChild = childArray.find(
      (c): c is ReactElement => isValidElement(c) && c.key === component.content,
    )

    return (
      <Dialog>
        <DialogTrigger asChild>{triggerChild as ReactNode}</DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <DialogTitle id={titleId} className="sr-only">
            {`Dialog ${id}`}
          </DialogTitle>
          {contentChild as ReactNode}
        </DialogContent>
      </Dialog>
    )
  },
  example: {
    name: 'Modal',
    description: 'Dialog modal with trigger and content',
    category: 'container',
    messages: [
      {
        createSurface: {
          surfaceId: 'modal-example',
          root: 'modal-1',
        },
      },
      {
        updateComponents: {
          surfaceId: 'modal-example',
          components: [
            {
              id: 'modal-1',
              component: {
                type: 'Modal',
                id: 'modal-1',
                trigger: 'trigger-btn',
                content: 'modal-content',
              },
            },
            {
              id: 'trigger-btn',
              component: {
                type: 'Button',
                id: 'trigger-btn',
                child: 'trigger-text',
                primary: true,
              },
            },
            {
              id: 'trigger-text',
              component: {
                type: 'Text',
                id: 'trigger-text',
                content: 'Open Modal',
              },
            },
            {
              id: 'modal-content',
              component: {
                type: 'Column',
                id: 'modal-content',
                children: ['modal-title', 'modal-body'],
              },
            },
            {
              id: 'modal-title',
              component: {
                type: 'Text',
                id: 'modal-title',
                content: 'Modal Title',
                style: 'h3',
              },
            },
            {
              id: 'modal-body',
              component: {
                type: 'Text',
                id: 'modal-body',
                content: 'This is the modal content. Click outside or the X button to close.',
              },
            },
          ],
        },
      },
    ],
  },
}
