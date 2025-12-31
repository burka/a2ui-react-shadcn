/**
 * A2UISurface Component
 * Main component for rendering an A2UI surface from messages or streams
 */

import type { A2UIMessage, ComponentUpdate } from 'a2ui-react-core'
import {
  createStreamParser,
  getComponentsArray,
  isBeginRenderingMessage,
  isCreateSurfaceMessage,
  isDataModelUpdateMessage,
  isDeleteSurfaceMessage,
  isSurfaceUpdateMessage,
  isUpdateComponentsMessage,
  isUpdateDataModelMessage,
  normalizeComponentUpdate,
} from 'a2ui-react-core'
import { useEffect, useRef, useState } from 'react'
import { useA2UI } from '../hooks/useA2UI.js'
import { useSurface } from '../hooks/useSurface.js'
import type { A2UIAction } from '../registry/types.js'
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
  /** Optional surface-scoped action handler. If provided, intercepts actions before global handler. */
  onAction?: (action: A2UIAction) => void
}

/**
 * Process a single A2UI message and update the store
 */
function processMessage(message: A2UIMessage, store: ReturnType<typeof useA2UI>['store']): void {
  // Handle create surface (v0.9) or begin rendering (v0.8)
  if (isCreateSurfaceMessage(message) || isBeginRenderingMessage(message)) {
    const payload = isCreateSurfaceMessage(message) ? message.createSurface : message.beginRendering
    const { surfaceId, root, catalogId, style } = payload
    store.setSurface(surfaceId, {
      id: surfaceId,
      root,
      catalogId,
      style,
      components: {},
      data: {},
    })
  }
  // Handle update components (v0.9) or surface update (v0.8)
  else if (isUpdateComponentsMessage(message) || isSurfaceUpdateMessage(message)) {
    const payload = isUpdateComponentsMessage(message)
      ? message.updateComponents
      : message.surfaceUpdate
    const surfaceId = payload.surfaceId
    // Support both 'components' (v0.9) and 'updates' (legacy) keys
    const componentUpdates = getComponentsArray(
      payload as { updates?: ComponentUpdate[]; components?: ComponentUpdate[] },
    )

    const surface = store.getSurface(surfaceId)
    if (!surface) {
      console.warn(`Surface not found for update: ${surfaceId}`)
      return
    }

    // Apply component updates, normalizing to internal format
    const updatedComponents = { ...surface.components }
    for (const update of componentUpdates) {
      // Normalize both v0.9 flat format and legacy nested format
      const component = normalizeComponentUpdate(update)
      updatedComponents[update.id] = component
    }
    surface.components = updatedComponents

    store.setSurface(surfaceId, { ...surface })
  }
  // Handle update data model (v0.9) or data model update (v0.8)
  else if (isUpdateDataModelMessage(message) || isDataModelUpdateMessage(message)) {
    if (isUpdateDataModelMessage(message)) {
      // v0.9 format - single value update with op
      const { surfaceId, path, value, op } = message.updateDataModel

      if (path) {
        if (op === 'remove') {
          // For remove operation, delete the data
          store.setData(surfaceId, path, undefined)
        } else {
          // For add/replace or no op, set the value
          store.setData(surfaceId, path, value)
        }
      }
    } else {
      // v0.8 format - array of values
      const { surfaceId, path, values } = message.dataModelUpdate
      const basePath = path ?? ''

      for (const { path: valuePath, value } of values) {
        const fullPath = basePath ? `${basePath}.${valuePath}` : valuePath
        store.setData(surfaceId, fullPath, value)
      }
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
export function A2UISurface({
  surfaceId,
  stream,
  messages,
  className,
  onAction,
}: A2UISurfaceProps) {
  const { store } = useA2UI()
  const surface = useSurface(surfaceId)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  // Track processed messages to prevent reprocessing on re-renders
  const processedMessagesRef = useRef<A2UIMessage[] | null>(null)

  // Process messages or stream
  useEffect(() => {
    // Process pre-parsed messages
    if (messages) {
      // Skip if we've already processed these exact messages
      if (messages === processedMessagesRef.current) {
        return
      }
      processedMessagesRef.current = messages

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
      <ComponentRenderer componentId={surface.root} surface={surface} onAction={onAction} />
    </div>
  )
}
