import type { A2UIMessage } from 'a2ui-react'
import { useA2UI } from 'a2ui-react'
import { useMemo, useState } from 'react'
import { ComponentDemo } from './ComponentDemo'
import { LivePreview } from './LivePreview'

type Category = 'All' | 'layout' | 'display' | 'interactive' | 'container' | 'animated'

interface RendererExample {
  type: string
  name: string
  description: string
  category: Category
  messages: A2UIMessage[]
}

const CATEGORIES: Category[] = ['All', 'layout', 'display', 'interactive', 'container', 'animated']

const CATEGORY_LABELS: Record<Category, string> = {
  All: 'All',
  layout: 'Layout',
  display: 'Display',
  interactive: 'Interactive',
  container: 'Container',
  animated: 'Animated',
}

export function ComponentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const { registry } = useA2UI()

  // Get examples from registered renderers
  const examples: RendererExample[] = useMemo(() => {
    return registry
      .getAll()
      .filter((r) => r.example)
      .map((r) => ({
        type: r.type,
        name: r.example!.name,
        description: r.example!.description,
        category: r.example!.category as Category,
        messages: r.example!.messages,
      }))
  }, [registry])

  const filteredExamples =
    selectedCategory === 'All'
      ? examples
      : examples.filter((ex) => ex.category === selectedCategory)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Component Showcase</h2>
        <div className="flex gap-2">
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </div>

      {filteredExamples.length === 0 ? (
        <div className="text-center py-16 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
          <p className="text-[var(--color-text-secondary)] mb-2">No components registered yet</p>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Component examples will appear here once shadcn renderers are added
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExamples.map((example) => (
            <ComponentDemo
              key={example.type}
              name={example.name}
              description={example.description}
              messages={example.messages}
            >
              <LivePreview messages={example.messages} />
            </ComponentDemo>
          ))}
        </div>
      )}
    </div>
  )
}
