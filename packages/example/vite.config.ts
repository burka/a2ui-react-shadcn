import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@a2ui/core': '/packages/core/src',
      '@a2ui/react': '/packages/react/src',
      '@a2ui/shadcn': '/packages/shadcn/src',
    },
  },
})
