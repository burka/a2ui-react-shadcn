import type { A2UIComponent, A2UIMessage } from 'a2ui-react'

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
                  'display-section',
                  'interactive-section',
                  'layout-section',
                  'container-section',
                ],
              },
            },
            {
              id: 'heading',
              component: {
                id: 'heading',
                type: 'Text',
                content: 'Component Showcase - All 13 Components',
                style: 'h1',
              },
            },

            // Display Components Section
            {
              id: 'display-section',
              component: {
                id: 'display-section',
                type: 'Column',
                children: [
                  'display-heading',
                  'text-h1',
                  'text-body',
                  'divider-h',
                  'image-demo',
                  'icon-row',
                ],
              },
            },
            {
              id: 'display-heading',
              component: {
                id: 'display-heading',
                type: 'Text',
                content: 'Display Components',
                style: 'h2',
              },
            },
            {
              id: 'text-h1',
              component: {
                id: 'text-h1',
                type: 'Text',
                content: 'Text - Heading Style',
                style: 'h1',
              },
            },
            {
              id: 'text-body',
              component: {
                id: 'text-body',
                type: 'Text',
                content: 'Text - Body Style',
                style: 'body',
              },
            },
            {
              id: 'divider-h',
              component: {
                id: 'divider-h',
                type: 'Divider',
                orientation: 'horizontal',
              },
            },
            {
              id: 'image-demo',
              component: {
                id: 'image-demo',
                type: 'Image',
                url: 'https://via.placeholder.com/400x200',
                alt: 'Placeholder image',
              },
            },
            {
              id: 'icon-row',
              component: {
                id: 'icon-row',
                type: 'Row',
                distribution: 'packed',
                children: ['icon-home', 'icon-search', 'icon-heart'],
              },
            },
            {
              id: 'icon-home',
              component: {
                id: 'icon-home',
                type: 'Icon',
                name: 'Home',
              },
            },
            {
              id: 'icon-search',
              component: {
                id: 'icon-search',
                type: 'Icon',
                name: 'Search',
              },
            },
            {
              id: 'icon-heart',
              component: {
                id: 'icon-heart',
                type: 'Icon',
                name: 'Heart',
              },
            },

            // Interactive Components Section
            {
              id: 'interactive-section',
              component: {
                id: 'interactive-section',
                type: 'Column',
                children: ['interactive-heading', 'button-demo', 'textfield-demo', 'checkbox-demo'],
              },
            },
            {
              id: 'interactive-heading',
              component: {
                id: 'interactive-heading',
                type: 'Text',
                content: 'Interactive Components',
                style: 'h2',
              },
            },
            {
              id: 'button-demo',
              component: {
                id: 'button-demo',
                type: 'Button',
                child: 'button-text',
                primary: true,
                action: 'demo-action',
              },
            },
            {
              id: 'button-text',
              component: {
                id: 'button-text',
                type: 'Text',
                content: 'Primary Button',
              },
            },
            {
              id: 'textfield-demo',
              component: {
                id: 'textfield-demo',
                type: 'TextField',
                label: 'Text Field',
                inputType: 'shortText',
                dataPath: 'userInput',
              },
            },
            {
              id: 'checkbox-demo',
              component: {
                id: 'checkbox-demo',
                type: 'Checkbox',
                label: 'Checkbox Label',
                dataPath: 'checked',
              },
            },

            // Layout Components Section
            {
              id: 'layout-section',
              component: {
                id: 'layout-section',
                type: 'Column',
                children: ['layout-heading', 'row-demo', 'column-demo'],
              },
            },
            {
              id: 'layout-heading',
              component: {
                id: 'layout-heading',
                type: 'Text',
                content: 'Layout Components',
                style: 'h2',
              },
            },
            {
              id: 'row-demo',
              component: {
                id: 'row-demo',
                type: 'Row',
                distribution: 'spaceBetween',
                children: ['row-item-1', 'row-item-2', 'row-item-3'],
              },
            },
            {
              id: 'row-item-1',
              component: {
                id: 'row-item-1',
                type: 'Text',
                content: 'Row Item 1',
              },
            },
            {
              id: 'row-item-2',
              component: {
                id: 'row-item-2',
                type: 'Text',
                content: 'Row Item 2',
              },
            },
            {
              id: 'row-item-3',
              component: {
                id: 'row-item-3',
                type: 'Text',
                content: 'Row Item 3',
              },
            },
            {
              id: 'column-demo',
              component: {
                id: 'column-demo',
                type: 'Column',
                children: ['column-item-1', 'column-item-2'],
              },
            },
            {
              id: 'column-item-1',
              component: {
                id: 'column-item-1',
                type: 'Text',
                content: 'Column Item 1',
              },
            },
            {
              id: 'column-item-2',
              component: {
                id: 'column-item-2',
                type: 'Text',
                content: 'Column Item 2',
              },
            },

            // Container Components Section
            {
              id: 'container-section',
              component: {
                id: 'container-section',
                type: 'Column',
                children: [
                  'container-heading',
                  'card-demo',
                  'modal-demo',
                  'tabs-demo',
                  'list-demo',
                ],
              },
            },
            {
              id: 'container-heading',
              component: {
                id: 'container-heading',
                type: 'Text',
                content: 'Container Components',
                style: 'h2',
              },
            },
            {
              id: 'card-demo',
              component: {
                id: 'card-demo',
                type: 'Card',
                children: ['card-title', 'card-content'],
              },
            },
            {
              id: 'card-title',
              component: {
                id: 'card-title',
                type: 'Text',
                content: 'Card Title',
                style: 'h3',
              },
            },
            {
              id: 'card-content',
              component: {
                id: 'card-content',
                type: 'Text',
                content: 'This is the content inside a Card component.',
              },
            },
            {
              id: 'modal-demo',
              component: {
                id: 'modal-demo',
                type: 'Modal',
                trigger: 'modal-trigger',
                content: 'modal-content',
              },
            },
            {
              id: 'modal-trigger',
              component: {
                id: 'modal-trigger',
                type: 'Button',
                child: 'modal-trigger-text',
                primary: false,
                action: 'open-modal',
              },
            },
            {
              id: 'modal-trigger-text',
              component: {
                id: 'modal-trigger-text',
                type: 'Text',
                content: 'Open Modal',
              },
            },
            {
              id: 'modal-content',
              component: {
                id: 'modal-content',
                type: 'Column',
                children: ['modal-title', 'modal-body'],
              },
            },
            {
              id: 'modal-title',
              component: {
                id: 'modal-title',
                type: 'Text',
                content: 'Modal Dialog',
                style: 'h3',
              },
            },
            {
              id: 'modal-body',
              component: {
                id: 'modal-body',
                type: 'Text',
                content: 'This is the content inside the Modal.',
              },
            },
            {
              id: 'tabs-demo',
              component: {
                id: 'tabs-demo',
                type: 'Tabs',
                tabs: [
                  { label: 'Tab 1', content: 'tab1-content' },
                  { label: 'Tab 2', content: 'tab2-content' },
                  { label: 'Tab 3', content: 'tab3-content' },
                ],
              },
            },
            {
              id: 'tab1-content',
              component: {
                id: 'tab1-content',
                type: 'Text',
                content: 'Content for Tab 1',
              },
            },
            {
              id: 'tab2-content',
              component: {
                id: 'tab2-content',
                type: 'Text',
                content: 'Content for Tab 2',
              },
            },
            {
              id: 'tab3-content',
              component: {
                id: 'tab3-content',
                type: 'Text',
                content: 'Content for Tab 3',
              },
            },
            {
              id: 'list-demo',
              component: {
                id: 'list-demo',
                type: 'List',
                template: 'list-item-template',
                dataPath: 'items',
              },
            },
            {
              id: 'list-item-template',
              component: {
                id: 'list-item-template',
                type: 'Text',
                content: 'List Item',
              },
            },
          ],
        },
      },
    ],
  },
]
