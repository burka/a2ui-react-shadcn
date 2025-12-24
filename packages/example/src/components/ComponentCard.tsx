import type { A2UIMessage } from '@a2ui/core'
import { Code, Copy, Eye } from 'lucide-react'
import { useState } from 'react'
import { LivePreview } from './LivePreview'

type Category = 'layout' | 'display' | 'interactive' | 'container'

interface ComponentCardProps {
  name: string
  description: string
  category: Category
  messages: A2UIMessage[]
}

const CATEGORY_COLORS: Record<Category, string> = {
  layout: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  display: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  interactive: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  container: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
}

const CATEGORY_LABELS: Record<Category, string> = {
  layout: 'Layout',
  display: 'Display',
  interactive: 'Interactive',
  container: 'Container',
}

export function ComponentCard({ name, description, category, messages }: ComponentCardProps) {
  const [showJson, setShowJson] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(messages, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[var(--color-text-primary)]">{name}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded border ${CATEGORY_COLORS[category]}`}
            >
              {CATEGORY_LABELS[category]}
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
        </div>
        <div className="flex gap-1">
          {showJson && (
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded transition-colors"
              title={copied ? 'Copied!' : 'Copy JSON'}
            >
              <Copy
                className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-[var(--color-text-secondary)]'}`}
              />
            </button>
          )}
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
      </div>

      {showJson ? (
        <pre className="text-xs bg-[var(--color-bg-primary)] p-3 rounded overflow-x-auto border border-[var(--color-border)] max-h-[300px]">
          <code className="text-[var(--color-text-primary)]">
            {JSON.stringify(messages, null, 2)}
          </code>
        </pre>
      ) : (
        <div className="border border-[var(--color-border)] rounded p-3 bg-[var(--color-bg-primary)] min-h-[120px]">
          <LivePreview messages={messages} />
        </div>
      )}
    </div>
  )
}
