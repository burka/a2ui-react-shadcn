# a2ui-react

[![npm version](https://img.shields.io/npm/v/a2ui-react.svg)](https://www.npmjs.com/package/a2ui-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Work in Progress](https://img.shields.io/badge/Status-Work%20in%20Progress-orange.svg)](https://github.com/burka/a2ui-react-shadcn)

Render [A2UI protocol](https://a2ui.org/) messages using [shadcn/ui](https://ui.shadcn.com/) components.

> **Work in Progress**: This library is under active development and APIs may change. We welcome feedback, bug reports, and contributions! Please [open an issue](https://github.com/burka/a2ui-react-shadcn/issues) if you encounter any problems or have suggestions.

A2UI is an open-source protocol that enables AI agents to generate rich, interactive user interfaces safely across platforms. This library provides React components to render A2UI messages with beautiful, accessible shadcn/ui components.

**[Live Demo](https://burka.github.io/a2ui-react-shadcn/)** | **[npm Package](https://www.npmjs.com/package/a2ui-react)**

## Features

- **13 Component Renderers**: Row, Column, Text, Image, Icon, Divider, Button, TextField, Checkbox, Card, Modal, Tabs, List
- **Streaming Support**: Parse JSONL streams for real-time UI updates
- **Data Binding**: Two-way data binding with reactive updates
- **Pluggable Store**: Bring your own state management (Zustand, Jotai, Redux) or use the default
- **Type-Safe**: Full TypeScript support with comprehensive types
- **Accessible**: Built on Radix UI primitives with ARIA support
- **Themeable**: Full shadcn/ui theming with Tailwind CSS

## Installation

```bash
npm install a2ui-react
```

## Setup

Import the default theme CSS in your app entry point:

```tsx
import 'a2ui-react/theme.css'
```

Or if using your own Tailwind setup, ensure your CSS includes the [shadcn/ui theme variables](https://ui.shadcn.com/docs/theming).

## Quick Start

```tsx
import { A2UIProvider, A2UISurface, shadcnRenderers } from 'a2ui-react'

function App() {
  const messages = [
    {
      surfaceUpdate: {
        surfaceId: 'main',
        updates: [
          { id: 'root', component: { type: 'Column', children: ['title', 'button'] } },
          { id: 'title', component: { type: 'Text', content: 'Hello A2UI!', style: 'h1' } },
          { id: 'button', component: { type: 'Button', primary: true, child: 'btn-text' } },
          { id: 'btn-text', component: { type: 'Text', content: 'Click Me' } },
        ],
      },
    },
    { beginRendering: { surfaceId: 'main', root: 'root' } },
  ]

  return (
    <A2UIProvider renderers={shadcnRenderers}>
      <A2UISurface surfaceId="main" messages={messages} />
    </A2UIProvider>
  )
}
```

## Package

The `a2ui-react` package includes everything you need:
- Core A2UI types, message parser, and store interface
- React bindings, hooks, and component registry
- shadcn/ui component renderers

## Component Renderers

### Layout
- **Row**: Horizontal flex container with distribution/alignment
- **Column**: Vertical flex container with distribution/alignment

### Display
- **Text**: Semantic text (h1-h5, body, caption)
- **Image**: Images with loading state
- **Icon**: lucide-react icons
- **Divider**: Horizontal/vertical separators

### Interactive
- **Button**: Primary/outline variants with action handlers
- **TextField**: Text, number, date, password, textarea inputs
- **Checkbox**: Boolean with label and data binding

### Container
- **Card**: Styled card container
- **Modal**: Dialog with trigger/content
- **Tabs**: Tabbed interface
- **List**: Scrollable list container

## Custom Renderers

Create custom renderers by implementing the `A2UIRenderer` interface:

```tsx
import type { A2UIRenderer } from 'a2ui-react'

const CustomRenderer: A2UIRenderer = {
  type: 'CustomComponent',
  render: ({ component, children, data, onAction }) => {
    return <div>{children}</div>
  },
  example: {
    name: 'Custom',
    description: 'My custom component',
    category: 'display',
    messages: [...],
  },
}
```

Register with the provider:

```tsx
<A2UIProvider renderers={[...shadcnRenderers, CustomRenderer]}>
  {/* ... */}
</A2UIProvider>
```

## Hooks

```tsx
import { useDataBinding, useAction, useSurface } from 'a2ui-react'

// Two-way data binding
const { value, setValue } = useDataBinding('surfaceId', 'user.name')

// Dispatch actions
const dispatch = useAction()
dispatch({ type: 'submit', payload: { ... } })

// Subscribe to surface updates
const surface = useSurface('surfaceId')
```

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Start example app
npm run dev

# Lint and format
npm run lint
npm run format
```

## Architecture

```
packages/
├── core/      # Zero-dependency types and parser
├── react/     # React bindings and hooks
├── shadcn/    # shadcn/ui renderers
└── example/   # Interactive simulator app
```

## Tech Stack

- **React** 19.2.3
- **TypeScript** 5.9.3
- **Vite** 7.3.0
- **TailwindCSS** 4.1.18
- **Radix UI** primitives
- **lucide-react** icons
- **Vitest** for testing
- **Biome** for linting/formatting
- **Turborepo** for monorepo management

## License

MIT

## Links

- [A2UI Protocol](https://a2ui.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [GitHub Repository](https://github.com/burka/a2ui-react-shadcn)
