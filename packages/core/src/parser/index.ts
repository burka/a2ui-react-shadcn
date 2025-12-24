/**
 * A2UI Parser
 * Export all parser functionality
 */

export { MessageParseError, parseMessage } from './message-parser.js'
// Type guards are exported from types/messages.js
export {
  createStreamParser,
  type ErrorCallback,
  type MessageCallback,
  parseJSONL,
  type StreamParser,
} from './stream-parser.js'
