import type { A2UIMessage } from 'a2ui-react'
import { ChevronDown, ChevronRight, Database } from 'lucide-react'
import { useState } from 'react'

interface DataModelViewerProps {
  messages: A2UIMessage[]
}

type DataValue = string | number | boolean | null | DataValue[] | { [key: string]: DataValue }

export function DataModelViewer({ messages }: DataModelViewerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['state']))

  // Extract surface creation and state updates
  const surfaceStates = new Map<string, Record<string, DataValue>>()

  for (const msg of messages) {
    if ('beginRendering' in msg) {
      const { surfaceId } = msg.beginRendering
      if (!surfaceStates.has(surfaceId)) {
        surfaceStates.set(surfaceId, {})
      }
    } else if ('dataModelUpdate' in msg) {
      const { surfaceId, values } = msg.dataModelUpdate
      const currentState = surfaceStates.get(surfaceId) || {}

      // Apply data value updates
      for (const dataValue of values) {
        const pathParts = dataValue.path.split('.')
        let target: Record<string, DataValue> = currentState

        // Navigate to the parent object
        for (let i = 0; i < pathParts.length - 1; i++) {
          const part = pathParts[i]
          if (!part) continue
          if (!(part in target)) {
            target[part] = {}
          }
          target = target[part] as Record<string, DataValue>
        }

        // Set the final value
        const lastPart = pathParts[pathParts.length - 1]
        if (lastPart) {
          target[lastPart] = dataValue.value as DataValue
        }
      }

      surfaceStates.set(surfaceId, currentState)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const renderValue = (value: DataValue): React.ReactElement => {
    if (value === null) {
      return <span className="text-[var(--color-text-tertiary)]">null</span>
    }
    if (value === undefined) {
      return <span className="text-[var(--color-text-tertiary)]">undefined</span>
    }
    if (typeof value === 'boolean') {
      return <span className="text-purple-600 dark:text-purple-400">{String(value)}</span>
    }
    if (typeof value === 'number') {
      return <span className="text-blue-600 dark:text-blue-400">{value}</span>
    }
    if (typeof value === 'string') {
      return <span className="text-green-600 dark:text-green-400">"{value}"</span>
    }
    if (Array.isArray(value)) {
      return <span className="text-[var(--color-text-secondary)]">Array[{value.length}]</span>
    }
    if (typeof value === 'object') {
      const keys = Object.keys(value)
      return <span className="text-[var(--color-text-secondary)]">Object({keys.length})</span>
    }
    return <span>{String(value)}</span>
  }

  const renderObject = (
    obj: Record<string, DataValue>,
    depth: number = 0,
    parentKey?: string,
  ): React.ReactElement => {
    const entries = Object.entries(obj)
    if (entries.length === 0) {
      return <div className="text-[var(--color-text-tertiary)]">{'{}'}</div>
    }

    return (
      <div className="space-y-1">
        {entries.map(([key, value]) => {
          const fullKey = parentKey ? `${parentKey}.${key}` : key
          const isExpandable = typeof value === 'object' && value !== null && !Array.isArray(value)
          const isExpanded = expandedSections.has(fullKey)

          return (
            <div key={key}>
              <button
                type="button"
                className="flex items-center gap-2 py-0.5 px-2 hover:bg-[var(--color-bg-tertiary)] rounded cursor-pointer w-full text-left"
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={() => isExpandable && toggleSection(fullKey)}
              >
                {isExpandable ? (
                  isExpanded ? (
                    <ChevronDown className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                  )
                ) : (
                  <div className="w-3" />
                )}

                <span className="font-mono text-sm text-[var(--color-text-primary)]">{key}:</span>

                {(!isExpandable || !isExpanded) && (
                  <span className="font-mono text-sm">{renderValue(value)}</span>
                )}
              </button>

              {isExpandable &&
                isExpanded &&
                renderObject(value as Record<string, DataValue>, depth + 1, fullKey)}
            </div>
          )
        })}
      </div>
    )
  }

  if (surfaceStates.size === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Database className="w-12 h-12 text-[var(--color-text-tertiary)] mb-3" />
        <p className="text-[var(--color-text-secondary)]">No data model state</p>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
          Surface state will appear here once surfaces are created
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-[var(--color-border)]">
        <Database className="w-4 h-4 text-[var(--color-text-secondary)]" />
        <h3 className="font-semibold text-[var(--color-text-primary)]">Data Model</h3>
        <span className="text-xs text-[var(--color-text-tertiary)] ml-auto">
          {surfaceStates.size} surface{surfaceStates.size !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {Array.from(surfaceStates.entries()).map(([surfaceId, state]) => (
          <div key={surfaceId} className="space-y-1">
            <div className="font-mono text-sm font-semibold text-[var(--color-accent)] px-2">
              {surfaceId}
            </div>
            {renderObject(state, 1)}
          </div>
        ))}
      </div>
    </div>
  )
}
