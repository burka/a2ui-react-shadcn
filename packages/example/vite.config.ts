import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const monorepoRoot = path.resolve(__dirname, '../..')

export default defineConfig({
  base: '/a2ui-react-shadcn/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Map package names to local source for development
      'a2ui-react': path.join(monorepoRoot, 'packages/shadcn/src'),
      'a2ui-react-core': path.join(monorepoRoot, 'packages/core/src'),
      'a2ui-react-react': path.join(monorepoRoot, 'packages/react/src'),
    },
  },
})
