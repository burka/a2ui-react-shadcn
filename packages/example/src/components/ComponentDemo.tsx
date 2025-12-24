import type { A2UIMessage } from '@a2ui/core'
import { Code, Eye } from 'lucide-react'
import { useState } from 'react'

interface ComponentDemoProps {
  name: string
  description: string
  messages: A2UIMessage[]
  children: React.ReactNode
}

export function ComponentDemo({ name, description, messages, children }: ComponentDemoProps) {
  const [showJson, setShowJson] = useState(false)

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-secondary)]">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{name}</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded transition-colors"
          title={showJson ? 'Show preview' : 'Show JSON'}
        >
          {showJson ? (
            <Eye className="w-4 h-4 text-[var(--color-text-secondary)]" />
          ) : (
            <Code className="w-4 h-4 text-[var(--color-text-secondary)]" />
          )}
        </button>
      </div>

      {showJson ? (
        <pre className="text-xs bg-[var(--color-bg-primary)] p-3 rounded overflow-x-auto border border-[var(--color-border)]">
          <code className="text-[var(--color-text-primary)]">
            {JSON.stringify(messages, null, 2)}
          </code>
        </pre>
      ) : (
        <div className="border border-[var(--color-border)] rounded p-3 bg-[var(--color-bg-primary)] min-h-[100px]">
          {children}
        </div>
      )}
    </div>
  )
}
