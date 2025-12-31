import type { A2UIMessage } from 'a2ui-react'
import { useA2UI } from 'a2ui-react'
import { Beaker, Github, MessageSquare, Terminal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedCopyButton } from '../components/AnimatedCopyButton'
import { ComponentCard } from '../components/ComponentCard'
import { ThemeCustomizer } from '../components/ThemeCustomizer'
import { ThemeToggle } from '../components/ThemeToggle'

const SHOW_STAGING_KEY = 'a2ui-show-staging'

// Code snippets for Quick Start section
const INSTALL_COMMAND = 'npm install a2ui-react'

const TAILWIND_CONFIG_CODE = `@import 'tailwindcss';
@source "../node_modules/a2ui-react/dist";`

const IMPORT_THEME_CODE = `import 'a2ui-react/theme.css'`

const SETUP_PROVIDER_CODE = `import { A2UIProvider, shadcnRenderers } from 'a2ui-react'

function App() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      {/* Your app */}
    </A2UIProvider>
  )
}`

const RENDER_COMPONENTS_CODE = `import { A2UISurface } from 'a2ui-react'

function MyComponent({ messages }) {
  return (
    <A2UISurface
      surfaceId="my-surface"
      messages={messages}
    />
  )
}`

const USE_HOOKS_CODE = `import { useA2UI } from 'a2ui-react'

function MyComponent() {
  const { registry } = useA2UI()

  // Access registered renderers
  const button = registry.get('Button')
}`

// Combined quickstart for LLM consumption
const FULL_QUICKSTART = `# A2UI + shadcn/ui Quick Start

## Installation
\`\`\`bash
${INSTALL_COMMAND}
\`\`\`

## 1. Configure Tailwind v4 (Critical)
Add the @source directive so Tailwind scans the component classes:

\`\`\`css
${TAILWIND_CONFIG_CODE}
\`\`\`

Without this, components render unstyled.

## 2. Import Theme
Import the theme CSS in your app entry point:

\`\`\`tsx
${IMPORT_THEME_CODE}
\`\`\`

## 3. Setup Provider
Wrap your app with A2UIProvider and pass shadcn renderers:

\`\`\`tsx
${SETUP_PROVIDER_CODE}
\`\`\`

## 4. Render Components
Use A2UISurface to render protocol messages:

\`\`\`tsx
${RENDER_COMPONENTS_CODE}
\`\`\`

## 5. Use Hooks
Access A2UI context with useA2UI hook:

\`\`\`tsx
${USE_HOOKS_CODE}
\`\`\`
`

type BaseCategory = 'layout' | 'display' | 'interactive' | 'container'
type Category = 'All' | BaseCategory

interface RendererExample {
  type: string
  name: string
  description: string
  category: BaseCategory
  messages: A2UIMessage[]
  rendererCode?: string
}

const CATEGORIES: Category[] = ['All', 'layout', 'display', 'interactive', 'container']

const CATEGORY_LABELS: Record<Category, string> = {
  All: 'All',
  layout: 'Layout',
  display: 'Display',
  interactive: 'Interactive',
  container: 'Container',
}

// Components that are still being developed (hidden by default)
const EARLY_STAGE_COMPONENTS = new Set([
  'bubble-background',
  'fireworks-background',
  'stars-background',
  'hexagon-background',
  'hole-background',
  'gravity-stars-background',
  'ParticlesBackground',
  'cursor',
  'AnimatedTooltip',
  'AnimatedAccordion',
  'AnimatedDialog',
  'FlipButton',
  'FlipCard',
  'liquid-button',
  'Spotlight',
])

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [showStaging, setShowStaging] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SHOW_STAGING_KEY) === 'true'
    }
    return false
  })
  const { registry } = useA2UI()

  // Persist staging toggle to localStorage
  useEffect(() => {
    localStorage.setItem(SHOW_STAGING_KEY, showStaging.toString())
  }, [showStaging])

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
        rendererCode: (r as { rendererCode?: string }).rendererCode,
      }))
  }, [registry])

  // Filter by category and optionally hide early stage components
  const filteredExamples = useMemo(() => {
    let filtered = examples

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((ex) => ex.category === selectedCategory)
    }

    // Hide early stage components unless toggle is on
    if (!showStaging) {
      filtered = filtered.filter((ex) => !EARLY_STAGE_COMPONENTS.has(ex.type))
    }

    return filtered
  }, [examples, selectedCategory, showStaging])

  const stagingCount = examples.filter((ex) => EARLY_STAGE_COMPONENTS.has(ex.type)).length

  return (
    <div className="min-h-screen bg-[var(--color-a2ui-bg-primary)]">
      {/* Hero Section */}
      <header className="border-b border-[var(--color-a2ui-border)] bg-[var(--color-a2ui-bg-secondary)]">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-a2ui-text-primary)] mb-4">
              A2UI + shadcn/ui
            </h1>
            <p className="text-xl text-[var(--color-a2ui-text-secondary)] mb-2">
              Server-driven UI for React
            </p>
            <p className="text-base text-[var(--color-a2ui-text-secondary)] mb-8 max-w-2xl mx-auto">
              Build dynamic interfaces controlled by your backend. A2UI is a protocol for
              server-driven UI, and this library provides beautiful shadcn/ui component renderers.
            </p>
            <div className="flex items-center justify-center gap-3 bg-[var(--color-a2ui-bg-primary)] border border-[var(--color-a2ui-border)] rounded-lg p-4 max-w-md mx-auto mb-3">
              <Terminal className="w-5 h-5 text-[var(--color-a2ui-text-tertiary)]" />
              <code className="flex-1 text-sm text-[var(--color-a2ui-text-primary)] font-mono">
                {INSTALL_COMMAND}
              </code>
              <AnimatedCopyButton text={INSTALL_COMMAND} variant="icon" />
            </div>
            <p className="text-sm text-[var(--color-a2ui-text-tertiary)] italic">
              (Coming soon to npm. For now, install from GitHub)
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-a2ui-text-primary)] mb-6">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
              <div className="text-2xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold text-[var(--color-a2ui-text-primary)] mb-2">
                Server-Driven
              </h3>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)]">
                Your backend sends JSON, the UI renders automatically
              </p>
            </div>

            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
              <div className="text-2xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold text-[var(--color-a2ui-text-primary)] mb-2">
                Beautiful
              </h3>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)]">
                Built on shadcn/ui with full Tailwind CSS theming
              </p>
            </div>

            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-[var(--color-a2ui-text-primary)] mb-2">
                Composable
              </h3>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)]">
                Replace any component with your own implementation
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[var(--color-a2ui-text-primary)]">
              Quick Start
            </h2>
            <AnimatedCopyButton
              text={FULL_QUICKSTART}
              label="Copy All"
              copiedLabel="Copied!"
              variant="outline"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)] md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-[var(--color-a2ui-text-primary)]">
                  1. Tailwind v4
                </h3>
                <AnimatedCopyButton text={TAILWIND_CONFIG_CODE} variant="icon" />
              </div>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)] mb-4">
                Add @source so Tailwind scans component classes (critical!):
              </p>
              <pre className="text-xs bg-[var(--color-a2ui-bg-primary)] p-4 rounded border border-[var(--color-a2ui-border)] overflow-x-auto">
                <code className="text-[var(--color-a2ui-text-primary)]">
                  {TAILWIND_CONFIG_CODE}
                </code>
              </pre>
            </div>

            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-[var(--color-a2ui-text-primary)]">
                  2. Import Theme
                </h3>
                <AnimatedCopyButton text={IMPORT_THEME_CODE} variant="icon" />
              </div>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)] mb-4">
                Import the theme CSS in your app entry point:
              </p>
              <pre className="text-xs bg-[var(--color-a2ui-bg-primary)] p-4 rounded border border-[var(--color-a2ui-border)] overflow-x-auto">
                <code className="text-[var(--color-a2ui-text-primary)]">{IMPORT_THEME_CODE}</code>
              </pre>
            </div>

            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-[var(--color-a2ui-text-primary)]">
                  3. Setup Provider
                </h3>
                <AnimatedCopyButton text={SETUP_PROVIDER_CODE} variant="icon" />
              </div>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)] mb-4">
                Wrap your app with A2UIProvider:
              </p>
              <pre className="text-xs bg-[var(--color-a2ui-bg-primary)] p-4 rounded border border-[var(--color-a2ui-border)] overflow-x-auto">
                <code className="text-[var(--color-a2ui-text-primary)]">{SETUP_PROVIDER_CODE}</code>
              </pre>
            </div>

            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-[var(--color-a2ui-text-primary)]">
                  4. Render Components
                </h3>
                <AnimatedCopyButton text={RENDER_COMPONENTS_CODE} variant="icon" />
              </div>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)] mb-4">
                Use A2UISurface to render messages:
              </p>
              <pre className="text-xs bg-[var(--color-a2ui-bg-primary)] p-4 rounded border border-[var(--color-a2ui-border)] overflow-x-auto">
                <code className="text-[var(--color-a2ui-text-primary)]">
                  {RENDER_COMPONENTS_CODE}
                </code>
              </pre>
            </div>

            <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)] md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-[var(--color-a2ui-text-primary)]">
                  5. Use Hooks
                </h3>
                <AnimatedCopyButton text={USE_HOOKS_CODE} variant="icon" />
              </div>
              <p className="text-sm text-[var(--color-a2ui-text-secondary)] mb-4">
                Access A2UI context with useA2UI hook:
              </p>
              <pre className="text-xs bg-[var(--color-a2ui-bg-primary)] p-4 rounded border border-[var(--color-a2ui-border)] overflow-x-auto">
                <code className="text-[var(--color-a2ui-text-primary)]">{USE_HOOKS_CODE}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Interactive Simulator Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-a2ui-text-primary)] mb-6">
            Interactive Simulator
          </h2>
          <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
            <p className="text-[var(--color-a2ui-text-secondary)] mb-4">
              Experiment with the A2UI protocol in real-time. Send messages, see components render
              live, and understand how the protocol works.
            </p>
            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-a2ui-accent)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Open Simulator
            </Link>
          </div>
        </section>

        {/* Customization Section */}
        <section className="mb-12">
          <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-[var(--color-a2ui-bg-secondary)]">
            <h2 className="text-2xl font-bold text-[var(--color-a2ui-text-primary)] mb-2">
              Customize Any Component
            </h2>
            <p className="text-[var(--color-a2ui-text-secondary)]">
              A2UI's registry pattern lets you replace any built-in renderer with your own
              implementation. Check out the <strong>Animated Button</strong> in the gallery below
              for a working example with full source code.
            </p>
          </div>
        </section>

        {/* Theme Customizer Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-a2ui-text-primary)] mb-6">
            Theme Playground
          </h2>
          <p className="text-[var(--color-a2ui-text-secondary)] mb-6">
            Customize the look and feel of A2UI components. Adjust colors and border radius, then
            copy the CSS to use in your project.
          </p>
          <ThemeCustomizer />
        </section>

        {/* Feedback CTA */}
        <section className="mb-12">
          <div className="border border-[var(--color-a2ui-border)] rounded-lg p-6 bg-gradient-to-r from-[var(--color-a2ui-bg-secondary)] to-[var(--color-a2ui-bg-tertiary)]">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-a2ui-text-primary)] mb-1 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[var(--color-a2ui-accent)]" />
                  Help Us Improve
                </h3>
                <p className="text-[var(--color-a2ui-text-secondary)]">
                  Try out these components and let us know what you think! Found a bug or have ideas
                  for making them better? We'd love to hear from you.
                </p>
              </div>
              <a
                href="https://github.com/anthropics/claude-code/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-a2ui-accent)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap"
              >
                <Github className="w-4 h-4" />
                Open an Issue
              </a>
            </div>
          </div>
        </section>

        {/* Component Gallery */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-a2ui-text-primary)] mb-2">
                Component Gallery
              </h2>
              <p className="text-[var(--color-a2ui-text-secondary)]">
                Explore {filteredExamples.length} interactive components powered by A2UI protocol
                {!showStaging && stagingCount > 0 && (
                  <span className="text-[var(--color-a2ui-text-tertiary)]">
                    {' '}
                    ({stagingCount} staging hidden)
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-[var(--color-a2ui-accent)] text-white'
                        : 'bg-[var(--color-a2ui-bg-secondary)] text-[var(--color-a2ui-text-secondary)] hover:bg-[var(--color-a2ui-bg-tertiary)] border border-[var(--color-a2ui-border)]'
                    }`}
                  >
                    {CATEGORY_LABELS[category]}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowStaging(!showStaging)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  showStaging
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    : 'bg-[var(--color-a2ui-bg-secondary)] text-[var(--color-a2ui-text-tertiary)] hover:bg-[var(--color-a2ui-bg-tertiary)] border border-[var(--color-a2ui-border)]'
                }`}
              >
                <Beaker className="w-4 h-4" />
                {showStaging ? 'Hide' : 'Show'} Staging ({stagingCount})
              </button>
            </div>
          </div>

          {filteredExamples.length === 0 ? (
            <div className="text-center py-16 bg-[var(--color-a2ui-bg-secondary)] rounded-lg border border-[var(--color-a2ui-border)]">
              <p className="text-[var(--color-a2ui-text-secondary)] mb-2">
                No components in this category
              </p>
              <p className="text-sm text-[var(--color-a2ui-text-tertiary)]">
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
                  messages={example.messages}
                  rendererCode={example.rendererCode}
                  earlyStage={EARLY_STAGE_COMPONENTS.has(example.type)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-a2ui-border)] bg-[var(--color-a2ui-bg-secondary)] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-a2ui-text-secondary)]">
              Built with A2UI Protocol • shadcn/ui • React • TypeScript
            </p>
            <a
              href="https://github.com/burka/a2ui-react-shadcn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-a2ui-text-secondary)] hover:text-[var(--color-a2ui-text-primary)] transition-colors"
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
