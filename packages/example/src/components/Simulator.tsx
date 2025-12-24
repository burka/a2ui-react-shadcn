import { useState } from 'react'
import { ComponentShowcase } from './ComponentShowcase'
import { MessageEditor } from './MessageEditor'
import { LivePreview } from './LivePreview'
import { ComponentTree } from './ComponentTree'
import { DataModelViewer } from './DataModelViewer'
import type { A2UIMessage } from '@a2ui/core'

export function Simulator() {
  const [messages, setMessages] = useState<A2UIMessage[]>([])

  const handleSendMessages = (newMessages: A2UIMessage[]) => {
    setMessages(newMessages)
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] p-6 space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
          A2UI Simulator
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Interactive playground for testing A2UI protocol messages and
          components
        </p>
      </header>

      {/* Component Showcase Section */}
      <section>
        <ComponentShowcase />
      </section>

      {/* Interactive Playground Section */}
      <section>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          Interactive Playground
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Message Editor */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 h-[500px]">
            <MessageEditor onSend={handleSendMessages} onClear={handleClear} />
          </div>

          {/* Right Column: Live Preview */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 h-[500px] overflow-y-auto">
            <LivePreview messages={messages} />
          </div>
        </div>

        {/* Bottom Row: Component Tree and Data Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Component Tree */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 h-[400px] overflow-y-auto">
            <ComponentTree messages={messages} />
          </div>

          {/* Data Model Viewer */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 h-[400px] overflow-y-auto">
            <DataModelViewer messages={messages} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] pt-6 mt-12">
        <div className="text-center text-sm text-[var(--color-text-tertiary)]">
          <p>A2UI Simulator - Built with React 19, Vite, and TailwindCSS</p>
          <p className="mt-1">
            <a
              href="https://github.com/burka/a2ui-shadcn-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
