import type { A2UIMessage } from 'a2ui-shadcn-ui'
import { Check, Copy, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface CodeModalProps {
  componentName: string
  messages: A2UIMessage[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CodeModal({ componentName, messages, open, onOpenChange }: CodeModalProps) {
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
      className="fixed inset-0 z-50 m-auto max-w-3xl max-h-[85vh] overflow-hidden flex flex-col rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl backdrop:bg-black/50"
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
          <h2 className="text-lg font-semibold">{componentName} - Code</h2>
          <p className="text-sm text-gray-500">
            Copy the JSON messages or React code to use this component
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {/* A2UI JSON Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">JSON Messages</h3>
            <CopyButton
              onClick={() => handleCopy(a2uiJson, 'json')}
              copied={copiedSection === 'json'}
            />
          </div>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border overflow-x-auto max-h-[200px]">
            <code>{a2uiJson}</code>
          </pre>
        </section>

        {/* React Usage Section */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">React Code</h3>
            <CopyButton
              onClick={() => handleCopy(reactCode, 'react')}
              copied={copiedSection === 'react'}
            />
          </div>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border overflow-x-auto max-h-[200px]">
            <code>{reactCode}</code>
          </pre>
        </section>
      </div>
    </dialog>
  )
}

function CopyButton({ onClick, copied }: { onClick: () => void; copied: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
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
