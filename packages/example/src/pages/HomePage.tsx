import type { A2UIMessage } from '@a2ui/core'
import { useA2UI } from '@a2ui/react'
import { Copy, Github, Terminal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedButtonExample } from '../components/AnimatedButtonExample'
import { ComponentCard } from '../components/ComponentCard'
import { ThemeToggle } from '../components/ThemeToggle'

type BaseCategory = 'layout' | 'display' | 'interactive' | 'container'
type Category = 'All' | BaseCategory

interface RendererExample {
  type: string
  name: string
  description: string
  category: BaseCategory
  messages: A2UIMessage[]
}

const CATEGORIES: Category[] = ['All', 'layout', 'display', 'interactive', 'container']

const CATEGORY_LABELS: Record<Category, string> = {
  All: 'All',
  layout: 'Layout',
  display: 'Display',
  interactive: 'Interactive',
  container: 'Container',
}

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [copied, setCopied] = useState(false)
  const { registry } = useA2UI()

  const installCommand = 'npm install @a2ui/shadcn'

  const examples: RendererExample[] = useMemo(() => {
    return registry
      .getAll()
      .filter((r) => r.example)
      .map((r) => ({
        type: r.type,
        name: r.example!.name,
        description: r.example!.description,
        category: r.example!.category as BaseCategory,
        messages: r.example!.messages,
      }))
  }, [registry])

  const filteredExamples =
    selectedCategory === 'All'
      ? examples
      : examples.filter((ex) => ex.category === selectedCategory)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Section */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              A2UI + shadcn/ui
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] mb-2">
              Server-driven UI for React
            </p>
            <p className="text-base text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              Build dynamic interfaces controlled by your backend. A2UI is a protocol for
              server-driven UI, and this library provides beautiful shadcn/ui component renderers.
            </p>
            <div className="flex items-center justify-center gap-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg p-4 max-w-md mx-auto mb-3">
              <Terminal className="w-5 h-5 text-[var(--color-text-tertiary)]" />
              <code className="flex-1 text-sm text-[var(--color-text-primary)] font-mono">
                {installCommand}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 hover:bg-[var(--color-bg-secondary)] rounded transition-colors"
                title={copied ? 'Copied!' : 'Copy command'}
              >
                <Copy
                  className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-[var(--color-text-secondary)]'}`}
                />
              </button>
            </div>
            <p className="text-sm text-[var(--color-text-tertiary)] italic">
              (Coming soon to npm. For now, install from GitHub)
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <div className="text-2xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                Server-Driven
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Your backend sends JSON, the UI renders automatically
              </p>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <div className="text-2xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                Beautiful
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Built on shadcn/ui with full Tailwind CSS theming
              </p>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                Composable
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Replace any component with your own implementation
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                1. Setup Provider
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Wrap your app with A2UIProvider and pass shadcn renderers:
              </p>
              <pre className="text-xs bg-[var(--color-bg-primary)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
                <code className="text-[var(--color-text-primary)]">
                  {`import { A2UIProvider } from '@a2ui/react'
import { shadcnRenderers } from '@a2ui/shadcn'

function App() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      {/* Your app */}
    </A2UIProvider>
  )
}`}
                </code>
              </pre>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                2. Render Components
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Use A2UISurface to render protocol messages:
              </p>
              <pre className="text-xs bg-[var(--color-bg-primary)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
                <code className="text-[var(--color-text-primary)]">
                  {`import { A2UISurface } from '@a2ui/react'

function MyComponent({ messages }) {
  return (
    <A2UISurface
      surfaceId="my-surface"
      messages={messages}
    />
  )
}`}
                </code>
              </pre>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                3. Use Hooks
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Access A2UI context with useA2UI hook:
              </p>
              <pre className="text-xs bg-[var(--color-bg-primary)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
                <code className="text-[var(--color-text-primary)]">
                  {`import { useA2UI } from '@a2ui/react'

function MyComponent() {
  const { registry } = useA2UI()

  // Access registered renderers
  const button = registry.get('Button')
}`}
                </code>
              </pre>
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                4. Try the Simulator
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Experiment with the interactive protocol simulator:
              </p>
              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Open Simulator
              </Link>
            </div>
          </div>
        </section>

        {/* Customization Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
            Customize Any Component
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            A2UI's registry pattern lets you replace any built-in renderer
          </p>
          <AnimatedButtonExample />
        </section>

        {/* Component Gallery */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                Component Gallery
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Explore {examples.length} interactive components powered by A2UI protocol
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]'
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              ))}
            </div>
          </div>

          {filteredExamples.length === 0 ? (
            <div className="text-center py-16 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
              <p className="text-[var(--color-text-secondary)] mb-2">
                No components in this category
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExamples.map((example) => (
                <ComponentCard
                  key={example.type}
                  name={example.name}
                  description={example.description}
                  category={example.category}
                  componentType={example.type}
                  messages={example.messages}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Built with A2UI Protocol • shadcn/ui • React • TypeScript
            </p>
            <a
              href="https://github.com/flob/a2ui-shadcn-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
