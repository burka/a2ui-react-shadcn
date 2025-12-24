/**
 * Data model types for A2UI protocol
 */

/**
 * Data value type for dataModelUpdate messages
 */
export interface DataValue {
  /** Path to the data value in the data model */
  path: string
  /** The value to set at the given path */
  value: unknown
}

/**
 * Data model for a surface
 * Stores arbitrary data that can be referenced by components
 */
export type DataModel = Record<string, unknown>

/**
 * Get a value from a data model by path
 * Path uses dot notation: "user.name" or "items.0.title"
 */
export function getDataByPath(data: DataModel, path: string): unknown | undefined {
  const parts = path.split('.')
  let current: unknown = data

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined
    }
    if (typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }

  return current
}

/**
 * Set a value in a data model by path
 * Path uses dot notation: "user.name" or "items.0.title"
 * Creates intermediate objects/arrays as needed
 */
export function setDataByPath(data: DataModel, path: string, value: unknown): void {
  const parts = path.split('.')
  let current: Record<string, unknown> = data

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!part) continue

    if (!(part in current)) {
      // Create intermediate object or array based on next key
      const nextPart = parts[i + 1]
      current[part] = /^\d+$/.test(nextPart ?? '') ? [] : {}
    }

    const next = current[part]
    if (typeof next !== 'object' || next === null) {
      // Overwrite non-object values with object/array
      const nextPart = parts[i + 1]
      current[part] = /^\d+$/.test(nextPart ?? '') ? [] : {}
    }

    current = current[part] as Record<string, unknown>
  }

  const lastPart = parts[parts.length - 1]
  if (lastPart) {
    current[lastPart] = value
  }
}
