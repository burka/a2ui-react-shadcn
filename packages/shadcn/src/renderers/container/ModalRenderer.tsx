import type { ModalComponent } from '@a2ui/core'
import type { A2UIRenderer, RendererProps } from '@a2ui/react'
import type { ReactNode } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog.js'

export const ModalRenderer: A2UIRenderer<ModalComponent> = {
  type: 'Modal',
  render: ({ children }: RendererProps<ModalComponent>) => {
    const childArray = Array.isArray(children) ? children : [children]
    const trigger = childArray[0]
    const content = childArray[1]

    return (
      <Dialog>
        <DialogTrigger asChild>{trigger as ReactNode}</DialogTrigger>
        <DialogContent>{content as ReactNode}</DialogContent>
      </Dialog>
    )
  },
  example: {
    name: 'Modal',
    description: 'Dialog modal with trigger and content',
    category: 'container',
    messages: [
      {
        beginRendering: {
          surfaceId: 'modal-example',
          root: 'modal-1',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'modal-example',
          updates: [
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
