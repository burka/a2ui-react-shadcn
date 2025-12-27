import type { A2UIMessage } from 'a2ui-react'
import { FileJson, Send, X } from 'lucide-react'
import { useState } from 'react'
import { templates } from '../templates/example-messages'

interface MessageEditorProps {
  onSend: (messages: A2UIMessage[]) => void
  onClear: () => void
}

export function MessageEditor({ onSend, onClear }: MessageEditorProps) {
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSend = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const messages = Array.isArray(parsed) ? parsed : [parsed]
      setError(null)
      onSend(messages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }

  const handleLoadTemplate = (templateIndex: number) => {
    const template = templates[templateIndex]
    if (template) {
      setJsonInput(JSON.stringify(template.messages, null, 2))
      setError(null)
    }
  }

  const handleClear = () => {
    setJsonInput('')
    setError(null)
    onClear()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          <FileJson className="w-5 h-5" />
          Message Editor
        </h3>
        <div className="flex gap-2">
          <select
            onChange={(e) => handleLoadTemplate(Number(e.target.value))}
            className="px-3 py-1.5 text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <option value="">Load Template...</option>
            {templates.map((template) => (
              <option key={template.name} value={templates.indexOf(template)}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter A2UI messages as JSON array, e.g.:\n[\n  {\n    "type": "surface.create",\n    "surfaceId": "demo-1"\n  },\n  {\n    "type": "component.add",\n    "surfaceId": "demo-1",\n    "componentId": "root",\n    "component": {\n      "type": "text",\n      "content": "Hello!"\n    }\n  }\n]'
        className="flex-1 p-3 font-mono text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded resize-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
        spellCheck={false}
      />

      {error && (
        <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={handleSend}
          disabled={!jsonInput.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          Send Messages
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded hover:bg-[var(--color-bg-tertiary)] transition-colors"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  )
}
