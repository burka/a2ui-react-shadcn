import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const monorepoRoot = path.resolve(__dirname, '../..')

export default defineConfig({
  base: '/a2ui-shadcn-ui/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Map the published package name to local source for development
      'a2ui-shadcn-ui': path.join(monorepoRoot, 'packages/shadcn/src'),
    },
  },
})
