/**
 * A2UISurface Component
 * Main component for rendering an A2UI surface from messages or streams
 */

import type { A2UIComponent, A2UIMessage } from 'a2ui-shadcn-ui-core'
import {
  createStreamParser,
  isBeginRenderingMessage,
  isDataModelUpdateMessage,
  isDeleteSurfaceMessage,
  isSurfaceUpdateMessage,
} from 'a2ui-shadcn-ui-core'
import { useEffect, useState } from 'react'
import { useA2UI } from '../hooks/useA2UI.js'
import { useSurface } from '../hooks/useSurface.js'
import { ComponentRenderer } from './ComponentRenderer.js'

/**
 * Props for A2UISurface
 */
export interface A2UISurfaceProps {
  /** ID of the surface to render */
  surfaceId: string
  /** Optional JSONL stream (async iterable or array of strings) */
  stream?: AsyncIterable<string> | string[]
  /** Optional pre-parsed messages */
  messages?: A2UIMessage[]
  /** Optional className for the root element */
  className?: string
}

/**
 * Process a single A2UI message and update the store
 */
function processMessage(message: A2UIMessage, store: ReturnType<typeof useA2UI>['store']): void {
  if (isBeginRenderingMessage(message)) {
    const { surfaceId, root, catalogId, style } = message.beginRendering
    store.setSurface(surfaceId, {
      id: surfaceId,
      root,
      catalogId,
      style,
      components: {},
      data: {},
    })
  } else if (isSurfaceUpdateMessage(message)) {
    const { surfaceId, updates } = message.surfaceUpdate
    const surface = store.getSurface(surfaceId)
    if (!surface) {
      console.warn(`Surface not found for update: ${surfaceId}`)
      return
    }

    // Apply component updates
    const updatedComponents = { ...surface.components }
    for (const update of updates) {
      // Store the component directly - types are validated at parse time
      updatedComponents[update.id] = update.component as unknown as A2UIComponent
    }
    surface.components = updatedComponents

    store.setSurface(surfaceId, { ...surface })
  } else if (isDataModelUpdateMessage(message)) {
    const { surfaceId, path, values } = message.dataModelUpdate
    const basePath = path ?? ''

    for (const { path: valuePath, value } of values) {
      const fullPath = basePath ? `${basePath}.${valuePath}` : valuePath
      store.setData(surfaceId, fullPath, value)
    }
  } else if (isDeleteSurfaceMessage(message)) {
    store.deleteSurface(message.deleteSurface.surfaceId)
  }
}

/**
 * A2UISurface - Renders an A2UI surface
 *
 * Accepts either:
 * - Pre-parsed messages (messages prop)
 * - JSONL stream (stream prop) - can be AsyncIterable or array of strings
 *
 * Processes messages to build the surface in the store, then renders it
 * using registered component renderers.
 *
 * @example
 * ```tsx
 * // With pre-parsed messages
 * <A2UISurface
 *   surfaceId="main"
 *   messages={messages}
 * />
 *
 * // With JSONL stream
 * <A2UISurface
 *   surfaceId="main"
 *   stream={jsonlStream}
 * />
 * ```
 */
export function A2UISurface({ surfaceId, stream, messages, className }: A2UISurfaceProps) {
  const { store } = useA2UI()
  const surface = useSurface(surfaceId)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Process messages or stream
  useEffect(() => {
    // Process pre-parsed messages
    if (messages) {
      try {
        for (const message of messages) {
          processMessage(message, store)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
      return
    }

    // Process JSONL stream
    if (stream) {
      setLoading(true)
      setError(null)

      const parser = createStreamParser()

      parser.onMessage((message: A2UIMessage) => {
        try {
          processMessage(message, store)
        } catch (err: unknown) {
          setError(err instanceof Error ? err : new Error(String(err)))
        }
      })

      parser.onError((err: Error) => {
        setError(err)
      })

      // Handle both AsyncIterable and array
      const processStream = async () => {
        try {
          if (Symbol.asyncIterator in stream) {
            // AsyncIterable
            for await (const chunk of stream as AsyncIterable<string>) {
              parser.push(chunk)
            }
          } else {
            // Array
            for (const chunk of stream as string[]) {
              parser.push(chunk)
            }
          }
        } catch (err: unknown) {
          setError(err instanceof Error ? err : new Error(String(err)))
        } finally {
          setLoading(false)
        }
      }

      processStream()
    }
  }, [stream, messages, store])

  // Error state
  if (error) {
    return (
      <div className={className} style={{ color: 'red', padding: '16px' }}>
        <strong>Error rendering surface:</strong>
        <pre>{error.message}</pre>
      </div>
    )
  }

  // Loading state
  if (loading && !surface) {
    return <div className={className}>Loading surface...</div>
  }

  // Surface not found
  if (!surface) {
    return null
  }

  // Render the root component
  return (
    <div className={className}>
      <ComponentRenderer componentId={surface.root} surface={surface} />
    </div>
  )
}
