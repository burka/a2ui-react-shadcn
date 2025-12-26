import type { A2UIAction, A2UIMessage } from 'a2ui-shadcn-ui'
import { Beaker, Code2, Zap } from 'lucide-react'
import { useCallback, useState } from 'react'
import { CodeModal } from './CodeModal'
import { LivePreview } from './LivePreview'

type Category = 'layout' | 'display' | 'interactive' | 'container'

interface ComponentCardProps {
  name: string
  description: string
  category: Category
  messages: A2UIMessage[]
  rendererCode?: string
  earlyStage?: boolean
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

export function ComponentCard({
  name,
  description,
  category,
  messages,
  rendererCode,
  earlyStage,
}: ComponentCardProps) {
  const [codeModalOpen, setCodeModalOpen] = useState(false)
  const [lastAction, setLastAction] = useState<A2UIAction | null>(null)

  const handleAction = useCallback((action: A2UIAction) => {
    setLastAction(action)
    // Clear after 3 seconds
    setTimeout(() => setLastAction(null), 3000)
  }, [])

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-[var(--color-text-primary)]">{name}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded border ${CATEGORY_COLORS[category]}`}
            >
              {CATEGORY_LABELS[category]}
            </span>
            {earlyStage && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                <Beaker className="w-3 h-3" />
                Early Stage
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => setCodeModalOpen(true)}
          className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded transition-colors"
          title="View code"
        >
          <Code2 className="w-4 h-4 text-[var(--color-text-secondary)]" />
        </button>
      </div>

      <div className="border border-[var(--color-border)] rounded p-3 bg-[var(--color-bg-primary)] min-h-[120px] overflow-hidden relative">
        <LivePreview messages={messages} onAction={handleAction} />
      </div>

      {lastAction && (
        <div className="mt-2 flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded px-2 py-1">
          <Zap className="w-3 h-3" />
          <span>
            Action: <code className="font-mono">{lastAction.type}</code>
            {lastAction.payload && (
              <span className="text-[var(--color-text-tertiary)] ml-1">
                ({JSON.stringify(lastAction.payload)})
              </span>
            )}
          </span>
        </div>
      )}

      <CodeModal
        componentName={name}
        messages={messages}
        open={codeModalOpen}
        onOpenChange={setCodeModalOpen}
        customRendererCode={rendererCode}
      />
    </div>
  )
}
