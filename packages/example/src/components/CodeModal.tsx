import {
  A2UIProvider,
  A2UISurface,
  type A2UIMessage,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  shadcnRenderers,
} from 'a2ui-shadcn-ui'
import { Check, Copy } from 'lucide-react'
import { useMemo, useState } from 'react'

interface CodeModalProps {
  componentName: string
  messages: A2UIMessage[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CodeModal({ componentName, messages, open, onOpenChange }: CodeModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const handleCopy = async (content: string, section: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedSection(section)
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const a2uiJson = JSON.stringify(messages, null, 2)

  const reactCode = `import { A2UIProvider, A2UISurface, shadcnRenderers } from 'a2ui-shadcn-ui'

const messages = ${a2uiJson}

function MyComponent() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      <A2UISurface surfaceId="my-surface" messages={messages} />
    </A2UIProvider>
  )
}`

  // Create A2UI messages for the modal content - dogfooding our own library!
  // Note: beginRendering MUST come before surfaceUpdate
  const modalMessages: A2UIMessage[] = useMemo(
    () => [
      { beginRendering: { surfaceId: 'code-modal', root: 'root' } },
      {
        surfaceUpdate: {
          surfaceId: 'code-modal',
          updates: [
            {
              id: 'root',
              component: {
                type: 'Column',
                children: ['json-card', 'react-card'],
              },
            },
            {
              id: 'json-card',
              component: {
                type: 'Card',
                child: 'json-content',
              },
            },
            {
              id: 'json-content',
              component: {
                type: 'Column',
                children: ['json-title', 'json-text'],
              },
            },
            {
              id: 'json-title',
              component: {
                type: 'Text',
                content: 'A2UI Messages (JSON)',
                style: 'h4',
              },
            },
            {
              id: 'json-text',
              component: {
                type: 'Text',
                content: `This component is rendered from ${messages.length} A2UI message(s). Click the copy button below to get the JSON.`,
                style: 'caption',
              },
            },
            {
              id: 'react-card',
              component: {
                type: 'Card',
                child: 'react-content',
              },
            },
            {
              id: 'react-content',
              component: {
                type: 'Column',
                children: ['react-title', 'react-text'],
              },
            },
            {
              id: 'react-title',
              component: {
                type: 'Text',
                content: 'React Usage',
                style: 'h4',
              },
            },
            {
              id: 'react-text',
              component: {
                type: 'Text',
                content:
                  'Use the A2UIProvider and A2UISurface components to render these messages in your React app.',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
    [messages.length],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-[var(--color-bg-primary)] border-[var(--color-border)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-text-primary)]">
            {componentName} - Code
          </DialogTitle>
          <DialogDescription className="text-[var(--color-text-secondary)]">
            Copy the JSON messages or React code to use this component
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-4 pr-2">
          {/* A2UI-rendered intro cards */}
          <A2UIProvider renderers={shadcnRenderers}>
            <A2UISurface surfaceId="code-modal" messages={modalMessages} />
          </A2UIProvider>

          {/* A2UI JSON Section */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                JSON Messages
              </h3>
              <CopyButton
                onClick={() => handleCopy(a2uiJson, 'json')}
                copied={copiedSection === 'json'}
              />
            </div>
            <pre className="text-xs bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border)] overflow-x-auto max-h-[200px]">
              <code className="text-[var(--color-text-primary)]">{a2uiJson}</code>
            </pre>
          </section>

          {/* React Usage Section */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                React Code
              </h3>
              <CopyButton
                onClick={() => handleCopy(reactCode, 'react')}
                copied={copiedSection === 'react'}
              />
            </div>
            <pre className="text-xs bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border)] overflow-x-auto max-h-[200px]">
              <code className="text-[var(--color-text-primary)]">{reactCode}</code>
            </pre>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CopyButton({ onClick, copied }: { onClick: () => void; copied: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-500" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </button>
  )
}
