import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@a2ui/core': '/packages/core/src',
      '@a2ui/react': '/packages/react/src',
      '@a2ui/shadcn': '/packages/shadcn/src',
    },
  },
})
