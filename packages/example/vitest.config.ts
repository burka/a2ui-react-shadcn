import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const monorepoRoot = path.resolve(__dirname, '../..')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map package names to local source for development
      'a2ui-react': path.join(monorepoRoot, 'packages/shadcn/src'),
      'a2ui-react-core': path.join(monorepoRoot, 'packages/core/src'),
      'a2ui-react-react': path.join(monorepoRoot, 'packages/react/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: ['./src/test-setup.ts'],
    deps: {
      optimizer: {
        web: {
          include: ['@testing-library/jest-dom'],
        },
      },
    },
  },
})
