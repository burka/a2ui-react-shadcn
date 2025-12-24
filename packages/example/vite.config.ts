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
      '@a2ui/core': path.join(monorepoRoot, 'packages/core/src'),
      '@a2ui/react': path.join(monorepoRoot, 'packages/react/src'),
      '@a2ui/shadcn': path.join(monorepoRoot, 'packages/shadcn/src'),
    },
  },
})
