# a2ui-shadcn-ui

[![npm version](https://img.shields.io/npm/v/a2ui-shadcn-ui.svg)](https://www.npmjs.com/package/a2ui-shadcn-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Beautiful [shadcn/ui](https://ui.shadcn.com/) components for rendering [A2UI protocol](https://a2ui.org/) messages in React.

> **Early Stage Project**: This library is in early development. We welcome feedback, bug reports, and contributions! Please [open an issue](https://github.com/burka/a2ui-shadcn-ui/issues) if you encounter any problems or have suggestions.

**[Live Demo](https://burka.github.io/a2ui-shadcn-ui/)** | **[GitHub](https://github.com/burka/a2ui-shadcn-ui)**

## Installation

```bash
npm install a2ui-shadcn-ui
# or
pnpm add a2ui-shadcn-ui
# or
yarn add a2ui-shadcn-ui
```

## Quick Start

```tsx
import { A2UIProvider, A2UISurface, shadcnRenderers } from 'a2ui-shadcn-ui'

const messages = [
  {
    beginRendering: {
      surfaceId: 'my-surface',
      root: 'root',
    },
  },
  {
    surfaceUpdate: {
      surfaceId: 'my-surface',
      updates: [
        {
          id: 'root',
          component: {
            type: 'Column',
            id: 'root',
            children: ['greeting'],
          },
        },
        {
          id: 'greeting',
          component: {
            type: 'Text',
            id: 'greeting',
            content: 'Hello, World!',
            style: 'h1',
          },
        },
      ],
    },
  },
]

function App() {
  return (
    <A2UIProvider renderers={shadcnRenderers}>
      <A2UISurface surfaceId="my-surface" messages={messages} />
    </A2UIProvider>
  )
}
```

## Features

- **Complete A2UI Protocol Support** - All component types from the A2UI specification
- **Beautiful shadcn/ui Components** - Modern, accessible, and customizable
- **Streaming Ready** - Process real-time streaming updates from AI models
- **Two-Way Data Binding** - Interactive components with automatic state management
- **Fully Typed** - Complete TypeScript support with exported types
- **Customizable Renderers** - Override any component with your own implementation

## Supported Components

### Layout
- `Row` - Horizontal flex container
- `Column` - Vertical flex container

### Display
- `Text` - Typography with styles (h1-h5, body, caption)
- `Image` - Images with loading states
- `Icon` - Lucide icons
- `Divider` - Horizontal/vertical separators

### Interactive
- `Button` - Clickable buttons with actions
- `TextField` - Text inputs (short, long, number, date, obscured)
- `Checkbox` - Boolean toggles
- `Select` - Dropdown selection
- `Slider` - Range input
- `DateTimeInput` - Date/time pickers
- `MultipleChoice` - Multi-select options

### Container
- `Card` - Content cards
- `Modal` - Dialog overlays
- `Tabs` - Tabbed content
- `List` - Data-driven lists

## Custom Renderers

Override any built-in renderer with your own:

```tsx
import type { A2UIRenderer, ButtonComponent } from 'a2ui-shadcn-ui'
import { motion } from 'framer-motion'

const AnimatedButton: A2UIRenderer<ButtonComponent> = {
  type: 'Button',
  render: ({ component, children, onAction }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => component.action && onAction({ type: component.action })}
    >
      {children}
    </motion.button>
  ),
}

// Add to renderers (last one wins for same type)
const customRenderers = [...shadcnRenderers, AnimatedButton]
```

## Streaming Integration

Parse and render streaming A2UI messages:

```tsx
import { createStore, parseJSONL, A2UIProvider, A2UISurface, shadcnRenderers } from 'a2ui-shadcn-ui'

const store = createStore()

// Process streaming response
async function handleStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
  for await (const message of parseJSONL(reader)) {
    store.processMessage(message)
  }
}

function App() {
  return (
    <A2UIProvider renderers={shadcnRenderers} store={store}>
      <A2UISurface surfaceId="stream-surface" />
    </A2UIProvider>
  )
}
```

## API Reference

### Components

- `A2UIProvider` - Context provider for renderers and store
- `A2UISurface` - Renders a surface by ID
- `ComponentRenderer` - Renders individual components

### Hooks

- `useA2UI()` - Access the A2UI context
- `useSurface(surfaceId)` - Subscribe to a surface
- `useDataBinding(dataPath)` - Two-way data binding
- `useAction()` - Access action handler

### Store

- `createStore()` - Create an A2UI store instance
- `store.processMessage(msg)` - Process incoming messages
- `store.getSurface(id)` - Get surface state
- `store.getData(surfaceId, path)` - Get data value
- `store.setData(surfaceId, path, value)` - Set data value

### Parser

- `parseMessage(json)` - Parse a single message
- `parseJSONL(reader)` - Async generator for streaming JSONL
- `createStreamParser()` - Create a stateful stream parser

## Requirements

- React 18.0.0+ or React 19.0.0+
- Tailwind CSS (for styling)

## License

MIT
