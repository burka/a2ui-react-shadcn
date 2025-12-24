/**
 * @a2ui/core - Core A2UI protocol types and utilities
 *
 * This package provides:
 * - Type definitions for A2UI protocol messages and components
 * - Message parsing and validation
 * - JSONL stream parsing
 * - Pluggable store interface for managing surfaces and data
 * - Default in-memory store implementation
 *
 * Zero dependencies - pure TypeScript
 */

export const version = '0.1.0'

// Export parser functionality
export * from './parser/index.js'
// Export store functionality
export * from './store/index.js'
// Export all types and type guards
export * from './types/index.js'
