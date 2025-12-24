/**
 * A2UI Stream Parser
 * Parses JSONL (JSON Lines) streams of A2UI messages
 */

import type { A2UIMessage } from '../types/messages.js'
import { MessageParseError, parseMessage } from './message-parser.js'

/**
 * Callback function for parsed messages
 */
export type MessageCallback = (_message: A2UIMessage) => void

/**
 * Callback function for parse errors
 */
export type ErrorCallback = (_error: MessageParseError, _line: string) => void

/**
 * Stream parser for A2UI JSONL messages
 */
export interface StreamParser {
  /**
   * Push a line of JSON to parse
   * @param line - A single line of JSON
   */
  push(_line: string): void

  /**
   * Set the callback for successfully parsed messages
   */
  onMessage(_callback: MessageCallback): void

  /**
   * Set the callback for parse errors
   */
  onError(_callback: ErrorCallback): void

  /**
   * Reset the parser state
   */
  reset(): void
}

/**
 * Create a new JSONL stream parser
 * @returns A new StreamParser instance
 */
export function createStreamParser(): StreamParser {
  let messageCallback: MessageCallback | undefined
  let errorCallback: ErrorCallback | undefined

  return {
    push(line: string): void {
      // Skip empty lines
      const trimmed = line.trim()
      if (trimmed === '') {
        return
      }

      try {
        const message = parseMessage(trimmed)
        if (messageCallback) {
          messageCallback(message)
        }
      } catch (error) {
        if (error instanceof MessageParseError && errorCallback) {
          errorCallback(error, trimmed)
        } else if (error instanceof MessageParseError) {
          // If no error callback, throw the error
          throw error
        } else {
          // Unexpected error type
          throw error
        }
      }
    },

    onMessage(callback: MessageCallback): void {
      messageCallback = callback
    },

    onError(callback: ErrorCallback): void {
      errorCallback = callback
    },

    reset(): void {
      messageCallback = undefined
      errorCallback = undefined
    },
  }
}

/**
 * Parse a complete JSONL string synchronously
 * @param jsonl - JSONL string (multiple JSON objects separated by newlines)
 * @returns Array of parsed messages
 * @throws MessageParseError if any line fails to parse
 */
export function parseJSONL(jsonl: string): A2UIMessage[] {
  const messages: A2UIMessage[] = []
  const lines = jsonl.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '') {
      continue
    }

    messages.push(parseMessage(trimmed))
  }

  return messages
}
