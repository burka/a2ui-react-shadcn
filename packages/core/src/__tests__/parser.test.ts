/**
 * Parser tests
 * Tests for message parsing and stream parsing
 */

import { describe, expect, it } from 'vitest'
import { createStreamParser, MessageParseError, parseJSONL, parseMessage } from '../parser/index.js'
import type { A2UIMessage } from '../types/messages.js'

describe('parseMessage', () => {
  describe('beginRendering', () => {
    it('should parse valid beginRendering message', () => {
      const json = JSON.stringify({
        beginRendering: {
          surfaceId: 'surface-1',
          root: 'root-component',
        },
      })

      const message = parseMessage(json)
      expect('beginRendering' in message).toBe(true)
      if ('beginRendering' in message) {
        expect(message.beginRendering.surfaceId).toBe('surface-1')
        expect(message.beginRendering.root).toBe('root-component')
      }
    })

    it('should parse beginRendering with optional fields', () => {
      const json = JSON.stringify({
        beginRendering: {
          surfaceId: 'surface-1',
          root: 'root-component',
          catalogId: 'catalog-1',
          style: { theme: 'dark' },
        },
      })

      const message = parseMessage(json)
      expect('beginRendering' in message).toBe(true)
      if ('beginRendering' in message) {
        expect(message.beginRendering.catalogId).toBe('catalog-1')
        expect(message.beginRendering.style).toEqual({ theme: 'dark' })
      }
    })

    it('should throw on missing surfaceId', () => {
      const json = JSON.stringify({
        beginRendering: {
          root: 'root-component',
        },
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('surfaceId')
    })

    it('should throw on missing root', () => {
      const json = JSON.stringify({
        beginRendering: {
          surfaceId: 'surface-1',
        },
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('root')
    })
  })

  describe('surfaceUpdate', () => {
    it('should parse valid surfaceUpdate message', () => {
      const json = JSON.stringify({
        surfaceUpdate: {
          surfaceId: 'surface-1',
          updates: [
            {
              id: 'component-1',
              component: { type: 'Text', content: 'Hello' },
            },
          ],
        },
      })

      const message = parseMessage(json)
      expect('surfaceUpdate' in message).toBe(true)
      if ('surfaceUpdate' in message) {
        expect(message.surfaceUpdate.surfaceId).toBe('surface-1')
        expect(message.surfaceUpdate.updates).toHaveLength(1)
        expect(message.surfaceUpdate.updates[0]?.id).toBe('component-1')
      }
    })

    it('should throw on invalid updates array', () => {
      const json = JSON.stringify({
        surfaceUpdate: {
          surfaceId: 'surface-1',
          updates: 'not-an-array',
        },
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('updates must be an array')
    })

    it('should throw on missing component ID', () => {
      const json = JSON.stringify({
        surfaceUpdate: {
          surfaceId: 'surface-1',
          updates: [
            {
              component: { type: 'Text' },
            },
          ],
        },
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('id')
    })
  })

  describe('dataModelUpdate', () => {
    it('should parse valid dataModelUpdate message', () => {
      const json = JSON.stringify({
        dataModelUpdate: {
          surfaceId: 'surface-1',
          values: [
            { path: 'user.name', value: 'John' },
            { path: 'user.age', value: 30 },
          ],
        },
      })

      const message = parseMessage(json)
      expect('dataModelUpdate' in message).toBe(true)
      if ('dataModelUpdate' in message) {
        expect(message.dataModelUpdate.surfaceId).toBe('surface-1')
        expect(message.dataModelUpdate.values).toHaveLength(2)
        expect(message.dataModelUpdate.values[0]?.path).toBe('user.name')
        expect(message.dataModelUpdate.values[0]?.value).toBe('John')
      }
    })

    it('should parse dataModelUpdate with base path', () => {
      const json = JSON.stringify({
        dataModelUpdate: {
          surfaceId: 'surface-1',
          path: 'user',
          values: [{ path: 'name', value: 'John' }],
        },
      })

      const message = parseMessage(json)
      expect('dataModelUpdate' in message).toBe(true)
      if ('dataModelUpdate' in message) {
        expect(message.dataModelUpdate.path).toBe('user')
      }
    })

    it('should throw on invalid values array', () => {
      const json = JSON.stringify({
        dataModelUpdate: {
          surfaceId: 'surface-1',
          values: 'not-an-array',
        },
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('values must be an array')
    })

    it('should throw on missing path in value', () => {
      const json = JSON.stringify({
        dataModelUpdate: {
          surfaceId: 'surface-1',
          values: [{ value: 'test' }],
        },
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('path')
    })
  })

  describe('deleteSurface', () => {
    it('should parse valid deleteSurface message', () => {
      const json = JSON.stringify({
        deleteSurface: {
          surfaceId: 'surface-1',
        },
      })

      const message = parseMessage(json)
      expect('deleteSurface' in message).toBe(true)
      if ('deleteSurface' in message) {
        expect(message.deleteSurface.surfaceId).toBe('surface-1')
      }
    })

    it('should throw on missing surfaceId', () => {
      const json = JSON.stringify({
        deleteSurface: {},
      })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('surfaceId')
    })
  })

  describe('error handling', () => {
    it('should throw on invalid JSON', () => {
      expect(() => parseMessage('not valid json')).toThrow(MessageParseError)
      expect(() => parseMessage('not valid json')).toThrow('Invalid JSON')
    })

    it('should throw on non-object JSON', () => {
      expect(() => parseMessage('"string"')).toThrow(MessageParseError)
      expect(() => parseMessage('"string"')).toThrow('must be a JSON object')
    })

    it('should throw on unknown message type', () => {
      const json = JSON.stringify({ unknownType: {} })

      expect(() => parseMessage(json)).toThrow(MessageParseError)
      expect(() => parseMessage(json)).toThrow('Unknown message type')
    })
  })
})

describe('createStreamParser', () => {
  it('should parse multiple messages from stream', () => {
    const parser = createStreamParser()
    const messages: A2UIMessage[] = []

    parser.onMessage((msg) => messages.push(msg))

    parser.push(
      JSON.stringify({
        beginRendering: { surfaceId: 's1', root: 'r1' },
      }),
    )
    parser.push(
      JSON.stringify({
        deleteSurface: { surfaceId: 's1' },
      }),
    )

    expect(messages).toHaveLength(2)
    expect('beginRendering' in messages[0]!).toBe(true)
    expect('deleteSurface' in messages[1]!).toBe(true)
  })

  it('should skip empty lines', () => {
    const parser = createStreamParser()
    const messages: A2UIMessage[] = []

    parser.onMessage((msg) => messages.push(msg))

    parser.push('')
    parser.push('   ')
    parser.push(
      JSON.stringify({
        deleteSurface: { surfaceId: 's1' },
      }),
    )

    expect(messages).toHaveLength(1)
  })

  it('should call error callback on parse error', () => {
    const parser = createStreamParser()
    let errorCaught = false

    parser.onError((error, line) => {
      errorCaught = true
      expect(error).toBeInstanceOf(MessageParseError)
      expect(line).toBe('invalid json')
    })

    parser.push('invalid json')
    expect(errorCaught).toBe(true)
  })

  it('should throw if no error callback registered', () => {
    const parser = createStreamParser()

    expect(() => parser.push('invalid json')).toThrow(MessageParseError)
  })

  it('should reset callbacks', () => {
    const parser = createStreamParser()
    const messages: A2UIMessage[] = []

    parser.onMessage((msg) => messages.push(msg))
    parser.reset()

    parser.push(
      JSON.stringify({
        deleteSurface: { surfaceId: 's1' },
      }),
    )

    expect(messages).toHaveLength(0)
  })
})

describe('parseJSONL', () => {
  it('should parse multiple lines of JSON', () => {
    const jsonl = [
      JSON.stringify({ beginRendering: { surfaceId: 's1', root: 'r1' } }),
      JSON.stringify({ deleteSurface: { surfaceId: 's1' } }),
    ].join('\n')

    const messages = parseJSONL(jsonl)

    expect(messages).toHaveLength(2)
    expect('beginRendering' in messages[0]!).toBe(true)
    expect('deleteSurface' in messages[1]!).toBe(true)
  })

  it('should skip empty lines', () => {
    const jsonl = [
      JSON.stringify({ deleteSurface: { surfaceId: 's1' } }),
      '',
      JSON.stringify({ deleteSurface: { surfaceId: 's2' } }),
    ].join('\n')

    const messages = parseJSONL(jsonl)

    expect(messages).toHaveLength(2)
  })

  it('should throw on invalid line', () => {
    const jsonl = ['invalid json'].join('\n')

    expect(() => parseJSONL(jsonl)).toThrow(MessageParseError)
  })
})
