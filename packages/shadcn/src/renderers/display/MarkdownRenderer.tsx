import type { MarkdownComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import ReactMarkdown from 'react-markdown'
import { cn } from '../../lib/utils.js'

export const MarkdownRenderer: A2UIRenderer<MarkdownComponent> = {
  type: 'Markdown',
  render: ({ component, data }: RendererProps<MarkdownComponent>) => {
    // Support data binding
    const content = component.dataPath
      ? (data.get<string>(component.dataPath) ?? component.text)
      : component.text

    return (
      <div
        className={cn(
          'prose prose-sm dark:prose-invert max-w-none',
          // Headings
          'prose-headings:font-semibold prose-headings:tracking-tight',
          'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl',
          // Links
          'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
          // Code
          'prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
          'prose-pre:bg-muted prose-pre:border prose-pre:border-border',
          // Lists
          'prose-ul:my-2 prose-ol:my-2 prose-li:my-0',
          // Blockquotes
          'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
        )}
      >
        <ReactMarkdown>{content || ''}</ReactMarkdown>
      </div>
    )
  },
  example: {
    name: 'Markdown',
    description: 'Renders markdown content with full formatting support',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'markdown-demo', root: 'root' } },
      {
        updateComponents: {
          surfaceId: 'markdown-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                children: ['md'],
              },
            },
            {
              id: 'md',
              component: {
                type: 'Markdown',
                id: 'md',
                text: `# Markdown Demo

This is a **bold** and *italic* text example.

## Features

- Headings (h1-h6)
- **Bold** and *italic* text
- [Links](https://example.com)
- Lists (ordered and unordered)

### Code

Inline \`code\` and code blocks:

\`\`\`javascript
const hello = "world";
\`\`\`

> Blockquotes are also supported!
`,
              },
            },
          ],
        },
      },
    ],
  },
}
