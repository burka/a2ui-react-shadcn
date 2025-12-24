import { useState } from 'react'
import { ComponentDemo } from './ComponentDemo'
import { LivePreview } from './LivePreview'

type Category = 'All' | 'Layout' | 'Display' | 'Interactive' | 'Container'

interface RendererExample {
  type: string
  name: string
  description: string
  category: Category
  messages: any[]
}

const CATEGORIES: Category[] = [
  'All',
  'Layout',
  'Display',
  'Interactive',
  'Container',
]

export function ComponentShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')

  // This will be populated once renderers are registered
  // For now, we show a placeholder
  const examples: RendererExample[] = []

  const filteredExamples =
    selectedCategory === 'All'
      ? examples
      : examples.filter((ex) => ex.category === selectedCategory)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Component Showcase
        </h2>
        <div className="flex gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredExamples.length === 0 ? (
        <div className="text-center py-16 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
          <p className="text-[var(--color-text-secondary)] mb-2">
            No components registered yet
          </p>
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
