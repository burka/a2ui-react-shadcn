import { ChevronRight, ChevronDown, GitBranch } from 'lucide-react'
import { useState } from 'react'
import type { A2UIMessage } from '@a2ui/core'

interface ComponentTreeProps {
  messages: A2UIMessage[]
}

interface TreeNode {
  id: string
  type: string
  children: string[]
  expanded: boolean
}

export function ComponentTree({ messages }: ComponentTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  // Parse messages to build component tree
  const components = new Map<string, TreeNode>()

  messages.forEach((msg) => {
    if ('surfaceUpdate' in msg) {
      msg.surfaceUpdate.updates.forEach((update) => {
        if (update.component) {
          const comp = update.component as any
          components.set(update.id, {
            id: update.id,
            type: comp.type || 'unknown',
            children: comp.children || (comp.child ? [comp.child] : []),
            expanded: false,
          })
        }
      })
    }
  })

  // Find root components (not referenced as children)
  const allChildIds = new Set<string>()
  components.forEach((comp) => {
    comp.children.forEach((childId) => allChildIds.add(childId))
  })

  const rootIds = Array.from(components.keys()).filter(
    (id) => !allChildIds.has(id)
  )

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const renderNode = (
    nodeId: string,
    depth: number = 0
  ): React.ReactElement | null => {
    const node = components.get(nodeId)
    if (!node) return null

    const hasChildren = node.children.length > 0
    const isExpanded = expandedNodes.has(nodeId)

    return (
      <div key={nodeId}>
        <div
          className="flex items-center gap-2 py-1 px-2 hover:bg-[var(--color-bg-tertiary)] rounded cursor-pointer group"
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-[var(--color-text-tertiary)]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
            )
          ) : (
            <div className="w-4" />
          )}

          <GitBranch className="w-4 h-4 text-[var(--color-accent)]" />

          <span className="font-mono text-sm text-[var(--color-text-primary)]">
            {nodeId}
          </span>

          <span className="text-xs text-[var(--color-text-tertiary)] ml-auto">
            {node.type}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children.map((childId) => renderNode(childId, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  if (components.size === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <GitBranch className="w-12 h-12 text-[var(--color-text-tertiary)] mb-3" />
        <p className="text-[var(--color-text-secondary)]">
          No components in tree
        </p>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
          Add component.add messages to see the hierarchy
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-[var(--color-border)]">
        <GitBranch className="w-4 h-4 text-[var(--color-text-secondary)]" />
        <h3 className="font-semibold text-[var(--color-text-primary)]">
          Component Tree
        </h3>
        <span className="text-xs text-[var(--color-text-tertiary)] ml-auto">
          {components.size} component{components.size !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-0.5">
        {rootIds.map((rootId) => renderNode(rootId))}
      </div>
    </div>
  )
}
