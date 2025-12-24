import type { A2UIMessage } from '@a2ui/core'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@a2ui/shadcn'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

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

  const reactCode = `import { A2UIProvider, A2UISurface } from 'a2ui-shadcn-ui'
import { shadcnRenderers } from 'a2ui-shadcn-ui'

const messages = ${a2uiJson}

function MyComponent() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      <A2UISurface surfaceId="my-surface" messages={messages} />
    </A2UIProvider>
  )
}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-[var(--color-bg-primary)] border-[var(--color-border)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-text-primary)]">
            {componentName} - Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-6 pr-2">
          {/* A2UI JSON Section */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                A2UI Messages (JSON)
              </h3>
              <CopyButton
                onClick={() => handleCopy(a2uiJson, 'json')}
                copied={copiedSection === 'json'}
              />
            </div>
            <pre className="text-xs bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border)] overflow-x-auto">
              <code className="text-[var(--color-text-primary)]">{a2uiJson}</code>
            </pre>
          </section>

          {/* React Usage Section */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                React Usage
              </h3>
              <CopyButton
                onClick={() => handleCopy(reactCode, 'react')}
                copied={copiedSection === 'react'}
              />
            </div>
            <pre className="text-xs bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border)] overflow-x-auto">
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
