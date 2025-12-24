import type { A2UIMessage, A2UIComponent } from '@a2ui/core'

export interface MessageTemplate {
  name: string
  description: string
  messages: A2UIMessage[]
  catalog?: Record<string, A2UIComponent>
}

export const templates: MessageTemplate[] = [
  {
    name: 'Simple Chat',
    description: 'Basic chat interface with messages',
    messages: [
      {
        beginRendering: {
          surfaceId: 'chat-1',
          root: 'root',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'chat-1',
          updates: [
            {
              id: 'root',
              component: {
                id: 'root',
                type: 'Column',
                children: ['header', 'messages', 'input'],
              },
            },
            {
              id: 'header',
              component: {
                id: 'header',
                type: 'Text',
                content: 'Chat Room',
                style: 'h1',
              },
            },
            {
              id: 'messages',
              component: {
                id: 'messages',
                type: 'Column',
                children: ['msg-1', 'msg-2'],
              },
            },
            {
              id: 'msg-1',
              component: {
                id: 'msg-1',
                type: 'Text',
                content: 'Hello there!',
              },
            },
            {
              id: 'msg-2',
              component: {
                id: 'msg-2',
                type: 'Text',
                content: 'How can I help you today?',
              },
            },
            {
              id: 'input',
              component: {
                id: 'input',
                type: 'TextField',
                label: 'Type a message...',
                inputType: 'shortText',
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Form Example',
    description: 'Interactive form with multiple input types',
    messages: [
      {
        beginRendering: {
          surfaceId: 'form-1',
          root: 'root',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'form-1',
          updates: [
            {
              id: 'root',
              component: {
                id: 'root',
                type: 'Column',
                children: ['title', 'name-input', 'email-input', 'submit-btn'],
              },
            },
            {
              id: 'title',
              component: {
                id: 'title',
                type: 'Text',
                content: 'User Registration',
                style: 'h2',
              },
            },
            {
              id: 'name-input',
              component: {
                id: 'name-input',
                type: 'TextField',
                label: 'Name',
                inputType: 'shortText',
                dataPath: 'name',
              },
            },
            {
              id: 'email-input',
              component: {
                id: 'email-input',
                type: 'TextField',
                label: 'Email',
                inputType: 'shortText',
                dataPath: 'email',
              },
            },
            {
              id: 'submit-btn',
              component: {
                id: 'submit-btn',
                type: 'Button',
                child: 'submit-text',
                primary: true,
                action: 'submit',
              },
            },
            {
              id: 'submit-text',
              component: {
                id: 'submit-text',
                type: 'Text',
                content: 'Submit',
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Dashboard',
    description: 'Dashboard with multiple sections',
    messages: [
      {
        beginRendering: {
          surfaceId: 'dashboard-1',
          root: 'root',
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'dashboard-1',
          values: [
            { path: 'stats.users', value: 1234 },
            { path: 'stats.revenue', value: 56789 },
            { path: 'stats.growth', value: 12.5 },
          ],
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'dashboard-1',
          updates: [
            {
              id: 'root',
              component: {
                id: 'root',
                type: 'Column',
                children: ['header', 'stats', 'content'],
              },
            },
            {
              id: 'header',
              component: {
                id: 'header',
                type: 'Text',
                content: 'Analytics Dashboard',
                style: 'h1',
              },
            },
            {
              id: 'stats',
              component: {
                id: 'stats',
                type: 'Row',
                distribution: 'spaceBetween',
                children: ['stat-1', 'stat-2', 'stat-3'],
              },
            },
            {
              id: 'stat-1',
              component: {
                id: 'stat-1',
                type: 'Text',
                content: 'Users: 1,234',
              },
            },
            {
              id: 'stat-2',
              component: {
                id: 'stat-2',
                type: 'Text',
                content: 'Revenue: $56,789',
              },
            },
            {
              id: 'stat-3',
              component: {
                id: 'stat-3',
                type: 'Text',
                content: 'Growth: +12.5%',
              },
            },
            {
              id: 'content',
              component: {
                id: 'content',
                type: 'Text',
                content: 'Chart placeholder - data visualization coming soon',
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: 'All Components',
    description: 'Showcase of all available component types',
    messages: [
      {
        beginRendering: {
          surfaceId: 'showcase-1',
          root: 'root',
        },
      },
      {
        surfaceUpdate: {
          surfaceId: 'showcase-1',
          updates: [
            {
              id: 'root',
              component: {
                id: 'root',
                type: 'Column',
                children: [
                  'heading',
                  'text',
                  'divider',
                  'button',
                  'input',
                  'checkbox',
                  'nested-container',
                ],
              },
            },
            {
              id: 'heading',
              component: {
                id: 'heading',
                type: 'Text',
                content: 'Component Showcase',
                style: 'h1',
              },
            },
            {
              id: 'text',
              component: {
                id: 'text',
                type: 'Text',
                content: 'This is a text component',
              },
            },
            {
              id: 'divider',
              component: {
                id: 'divider',
                type: 'Divider',
                orientation: 'horizontal',
              },
            },
            {
              id: 'button',
              component: {
                id: 'button',
                type: 'Button',
                child: 'button-text',
                primary: true,
                action: 'click',
              },
            },
            {
              id: 'button-text',
              component: {
                id: 'button-text',
                type: 'Text',
                content: 'Click Me',
              },
            },
            {
              id: 'input',
              component: {
                id: 'input',
                type: 'TextField',
                label: 'Input Field',
                inputType: 'shortText',
              },
            },
            {
              id: 'checkbox',
              component: {
                id: 'checkbox',
                type: 'Checkbox',
                label: 'Accept terms',
                dataPath: 'accepted',
              },
            },
            {
              id: 'nested-container',
              component: {
                id: 'nested-container',
                type: 'Row',
                distribution: 'spaceBetween',
                children: ['child-1', 'child-2'],
              },
            },
            {
              id: 'child-1',
              component: {
                id: 'child-1',
                type: 'Text',
                content: 'Left column',
              },
            },
            {
              id: 'child-2',
              component: {
                id: 'child-2',
                type: 'Text',
                content: 'Right column',
              },
            },
          ],
        },
      },
    ],
  },
]
