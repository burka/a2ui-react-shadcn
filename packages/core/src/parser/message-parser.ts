/**
 * A2UI Message Parser
 * Parses and validates A2UI protocol messages
 */

import type { A2UIMessage } from '../types/messages.js'

/**
 * Error thrown when a message fails validation
 */
export class MessageParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MessageParseError'
  }
}

/**
 * Validates that a value is a non-empty string
 */
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

/**
 * Validates that a value is an array
 */
function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * Validates that a value is an object
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Validates a beginRendering message
 */
function validateBeginRendering(msg: unknown): void {
  if (!isObject(msg)) {
    throw new MessageParseError('beginRendering must be an object')
  }

  if (!isNonEmptyString(msg.surfaceId)) {
    throw new MessageParseError('beginRendering.surfaceId must be a non-empty string')
  }

  if (!isNonEmptyString(msg.root)) {
    throw new MessageParseError('beginRendering.root must be a non-empty string')
  }

  if (msg.catalogId !== undefined && !isNonEmptyString(msg.catalogId)) {
    throw new MessageParseError('beginRendering.catalogId must be a string if provided')
  }

  if (msg.style !== undefined && !isObject(msg.style)) {
    throw new MessageParseError('beginRendering.style must be an object if provided')
  }
}

/**
 * Validates a surfaceUpdate message
 */
function validateSurfaceUpdate(msg: unknown): void {
  if (!isObject(msg)) {
    throw new MessageParseError('surfaceUpdate must be an object')
  }

  if (!isNonEmptyString(msg.surfaceId)) {
    throw new MessageParseError('surfaceUpdate.surfaceId must be a non-empty string')
  }

  if (!isArray(msg.updates)) {
    throw new MessageParseError('surfaceUpdate.updates must be an array')
  }

  for (const update of msg.updates) {
    if (!isObject(update)) {
      throw new MessageParseError('surfaceUpdate.updates[] must be objects')
    }
    if (!isNonEmptyString(update.id)) {
      throw new MessageParseError('surfaceUpdate.updates[].id must be a non-empty string')
    }
    if (!isObject(update.component)) {
      throw new MessageParseError('surfaceUpdate.updates[].component must be an object')
    }
  }
}

/**
 * Validates a dataModelUpdate message
 */
function validateDataModelUpdate(msg: unknown): void {
  if (!isObject(msg)) {
    throw new MessageParseError('dataModelUpdate must be an object')
  }

  if (!isNonEmptyString(msg.surfaceId)) {
    throw new MessageParseError('dataModelUpdate.surfaceId must be a non-empty string')
  }

  if (msg.path !== undefined && !isNonEmptyString(msg.path)) {
    throw new MessageParseError('dataModelUpdate.path must be a string if provided')
  }

  if (!isArray(msg.values)) {
    throw new MessageParseError('dataModelUpdate.values must be an array')
  }

  for (const value of msg.values) {
    if (!isObject(value)) {
      throw new MessageParseError('dataModelUpdate.values[] must be objects')
    }
    if (!isNonEmptyString(value.path)) {
      throw new MessageParseError('dataModelUpdate.values[].path must be a non-empty string')
    }
    if (!('value' in value)) {
      throw new MessageParseError('dataModelUpdate.values[].value is required')
    }
  }
}

/**
 * Validates a deleteSurface message
 */
function validateDeleteSurface(msg: unknown): void {
  if (!isObject(msg)) {
    throw new MessageParseError('deleteSurface must be an object')
  }

  if (!isNonEmptyString(msg.surfaceId)) {
    throw new MessageParseError('deleteSurface.surfaceId must be a non-empty string')
  }
}

/**
 * Parse and validate an A2UI message from JSON string
 * @param json - JSON string to parse
 * @returns Validated A2UI message
 * @throws MessageParseError if the message is invalid
 */
export function parseMessage(json: string): A2UIMessage {
  let parsed: unknown

  try {
    parsed = JSON.parse(json)
  } catch (error) {
    throw new MessageParseError(
      `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  if (!isObject(parsed)) {
    throw new MessageParseError('Message must be a JSON object')
  }

  // Check which message type this is
  if ('beginRendering' in parsed) {
    validateBeginRendering(parsed.beginRendering)
    return parsed as unknown as A2UIMessage
  }

  if ('surfaceUpdate' in parsed) {
    validateSurfaceUpdate(parsed.surfaceUpdate)
    return parsed as unknown as A2UIMessage
  }

  if ('dataModelUpdate' in parsed) {
    validateDataModelUpdate(parsed.dataModelUpdate)
    return parsed as unknown as A2UIMessage
  }

  if ('deleteSurface' in parsed) {
    validateDeleteSurface(parsed.deleteSurface)
    return parsed as unknown as A2UIMessage
  }

  throw new MessageParseError(
    'Unknown message type. Expected one of: beginRendering, surfaceUpdate, dataModelUpdate, deleteSurface',
  )
}
