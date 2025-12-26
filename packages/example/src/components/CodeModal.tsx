import type { A2UIMessage } from 'a2ui-shadcn-ui'
import { Check, Copy, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CodeModalProps {
  componentName: string
  messages: A2UIMessage[]
  open: boolean
  onOpenChange: (open: boolean) => void
  customRendererCode?: string
}

export function CodeModal({
  componentName,
  messages,
  open,
  onOpenChange,
  customRendererCode,
}: CodeModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  if (!open) return null

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

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-[90vw] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col rounded-lg p-6 shadow-xl backdrop:bg-black/50"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
      }}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) onOpenChange(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onOpenChange(false)
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {componentName} - Code
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Copy the JSON messages or React code to use this component
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="p-1 rounded transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {/* A2UI JSON Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              JSON Messages
            </h3>
            <CopyButton
              onClick={() => handleCopy(a2uiJson, 'json')}
              copied={copiedSection === 'json'}
            />
          </div>
          <pre
            className="text-xs p-4 rounded-lg border overflow-x-auto max-h-[200px]"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <code>{a2uiJson}</code>
          </pre>
        </section>

        {/* React Usage Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              React Code
            </h3>
            <CopyButton
              onClick={() => handleCopy(reactCode, 'react')}
              copied={copiedSection === 'react'}
            />
          </div>
          <pre
            className="text-xs p-4 rounded-lg border overflow-x-auto max-h-[200px]"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <code>{reactCode}</code>
          </pre>
        </section>

        {/* Custom Renderer Section */}
        {customRendererCode && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Custom Renderer
              </h3>
              <CopyButton
                onClick={() => handleCopy(customRendererCode, 'custom')}
                copied={copiedSection === 'custom'}
              />
            </div>
            <pre
              className="text-xs p-4 rounded-lg border overflow-x-auto max-h-[200px]"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              <code>{customRendererCode}</code>
            </pre>
          </section>
        )}
      </div>
    </dialog>
  )
}

function CopyButton({ onClick, copied }: { onClick: () => void; copied: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border)',
      }}
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
