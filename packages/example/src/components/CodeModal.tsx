import type { A2UIMessage } from '@a2ui/core'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@a2ui/shadcn'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CodeModalProps {
  componentName: string
  componentType: string
  messages: A2UIMessage[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CodeModal({
  componentName,
  componentType,
  messages,
  open,
  onOpenChange,
}: CodeModalProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const handleCopy = async (content: string, tabId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedTab(tabId)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const a2uiJson = JSON.stringify(messages, null, 2)

  const reactUsage = `import { A2UIProvider, A2UISurface } from 'a2ui-shadcn-ui'
import { shadcnRenderers } from 'a2ui-shadcn-ui'

// Define your messages
const messages = ${a2uiJson}

// Setup provider and render
function App() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      <A2UISurface
        surfaceId="my-surface"
        messages={messages}
      />
    </A2UIProvider>
  )
}`

  const customRenderer = `import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui'
import type { ${componentType}Component } from 'a2ui-shadcn-ui'

// Create a custom renderer for ${componentType}
export const Custom${componentType}Renderer: A2UIRenderer<${componentType}Component> = {
  type: '${componentType}',
  render: ({ component, children }: RendererProps<${componentType}Component>) => {
    // Access component props
    const { id, type, ...props } = component

    // Render your custom implementation
    return (
      <div className="my-custom-${componentType.toLowerCase()}">
        {/* Your custom ${componentType} implementation */}
        {children}
      </div>
    )
  },
}

// Register by adding to renderers array (last one wins)
import { A2UIProvider, shadcnRenderers } from 'a2ui-shadcn-ui'

<A2UIProvider renderers={[...shadcnRenderers, Custom${componentType}Renderer]}>
  {/* Your app */}
</A2UIProvider>`

  const tabs = [
    { id: 'a2ui', label: 'A2UI JSON', content: a2uiJson },
    { id: 'react', label: 'React Usage', content: reactUsage },
    { id: 'custom', label: 'Custom Renderer', content: customRenderer },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{componentName} - Code Examples</DialogTitle>
          <DialogDescription>
            Copy and use these code snippets in your application
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="a2ui" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="flex-1 overflow-hidden flex flex-col mt-4"
            >
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => handleCopy(tab.content, tab.id)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] transition-colors"
                >
                  {copiedTab === tab.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="flex-1 overflow-auto text-xs bg-[var(--color-bg-primary)] p-4 rounded border border-[var(--color-border)] font-mono">
                <code className="text-[var(--color-text-primary)]">{tab.content}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
