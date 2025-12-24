import { Button } from '@a2ui/shadcn'
import { motion } from 'framer-motion'

const customRendererCode = `import type { A2UIRenderer, RendererProps } from '@a2ui/react'
import type { ButtonComponent } from '@a2ui/core'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export const AnimatedButtonRenderer: A2UIRenderer<ButtonComponent> = {
  type: 'Button',
  render: ({ component, children, onAction }: RendererProps<ButtonComponent>) => {
    const handleClick = () => {
      if (component.action) {
        onAction({ type: component.action })
      }
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleClick}
        className={
          component.primary
            ? 'bg-[var(--color-accent)] text-white shadow hover:bg-[var(--color-accent-hover)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2'
            : 'border border-[var(--color-border)] bg-[var(--color-bg-primary)] shadow-sm hover:bg-[var(--color-bg-secondary)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2'
        }
      >
        {children as ReactNode}
      </motion.button>
    )
  },
}`

const registerCode = `import { A2UIProvider } from '@a2ui/react'
import { shadcnRenderers } from '@a2ui/shadcn'
import { AnimatedButtonRenderer } from './AnimatedButtonRenderer'

// Replace the default Button renderer with your custom one
const customRenderers = [
  ...shadcnRenderers.filter(r => r.type !== 'Button'),
  AnimatedButtonRenderer
]

function App() {
  return (
    <A2UIProvider renderers={customRenderers}>
      {/* Your app */}
    </A2UIProvider>
  )
}`

export function AnimatedButtonExample() {
  return (
    <div className="border border-[var(--color-border)] rounded-lg p-6 bg-[var(--color-bg-secondary)]">
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
        Custom Renderer Example: Animated Button
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        This example demonstrates how you can replace any built-in renderer with your own custom
        implementation. Here we use framer-motion to add smooth animations to buttons.
      </p>

      {/* Side by side demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Default Button */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--color-text-primary)]">Default Button</h4>
          <div className="flex items-center justify-center h-24 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg">
            <Button variant="default">Click me</Button>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">Standard shadcn/ui button</p>
        </div>

        {/* Animated Button */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--color-text-primary)]">Animated Button</h4>
          <div className="flex items-center justify-center h-24 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="bg-[var(--color-accent)] text-white shadow hover:bg-[var(--color-accent-hover)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
            >
              Click me
            </motion.button>
          </div>
          <p className="text-xs text-[var(--color-text-tertiary)]">With framer-motion animations</p>
        </div>
      </div>

      {/* Code examples */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
            Step 1: Create your custom renderer
          </h4>
          <pre className="text-xs bg-[var(--color-bg-primary)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
            <code className="text-[var(--color-text-primary)]">{customRendererCode}</code>
          </pre>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
            Step 2: Register it to replace the default
          </h4>
          <pre className="text-xs bg-[var(--color-bg-primary)] p-4 rounded border border-[var(--color-border)] overflow-x-auto">
            <code className="text-[var(--color-text-primary)]">{registerCode}</code>
          </pre>
        </div>

        <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            <strong className="text-[var(--color-text-primary)]">Note:</strong> This pattern works
            for any renderer type. You can customize layout components, display components,
            interactive components, or containers. The A2UI protocol remains the same while you have
            full control over the presentation layer.
          </p>
        </div>
      </div>
    </div>
  )
}
