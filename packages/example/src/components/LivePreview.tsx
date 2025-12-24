import type { A2UIMessage } from '@a2ui/core'
import { AlertCircle, Eye } from 'lucide-react'
import { Component, type ErrorInfo } from 'react'

interface LivePreviewProps {
  messages: A2UIMessage[]
  surfaceId?: string
}

interface LivePreviewState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, LivePreviewState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): LivePreviewState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LivePreview error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Render Error</span>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400">
            {this.state.error?.message || 'Unknown error'}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export function LivePreview({ messages, surfaceId }: LivePreviewProps) {
  // Extract surface ID from messages if not provided
  const beginMsg = messages.find((m) => 'beginRendering' in m)
  const activeSurfaceId =
    surfaceId ||
    (beginMsg && 'beginRendering' in beginMsg ? beginMsg.beginRendering.surfaceId : 'preview')

  // TODO: Once @a2ui/react exports A2UISurface, render it here
  // For now, show placeholder

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Eye className="w-12 h-12 text-[var(--color-text-tertiary)] mb-3" />
        <p className="text-[var(--color-text-secondary)]">No messages to preview</p>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
          Send messages to see them rendered here
        </p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] mb-3">
          <Eye className="w-4 h-4" />
          <span>Surface: {activeSurfaceId}</span>
        </div>

        {/* Placeholder until A2UISurface is available */}
        <div className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded">
          <p className="text-[var(--color-text-secondary)] text-sm mb-2">
            Preview rendering placeholder
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)]">
            {messages.length} message{messages.length !== 1 ? 's' : ''} loaded
          </p>
          <div className="mt-3 text-xs text-[var(--color-text-tertiary)]">
            <p>Message types:</p>
            <ul className="list-disc list-inside mt-1">
              {Array.from(
                new Set(
                  messages.map((m) => {
                    if ('beginRendering' in m) return 'beginRendering'
                    if ('surfaceUpdate' in m) return 'surfaceUpdate'
                    if ('dataModelUpdate' in m) return 'dataModelUpdate'
                    if ('deleteSurface' in m) return 'deleteSurface'
                    return 'unknown'
                  }),
                ),
              ).map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* TODO: Replace with actual A2UISurface rendering:
        <A2UISurface
          surfaceId={activeSurfaceId}
          messages={messages}
        />
        */}
      </div>
    </ErrorBoundary>
  )
}
