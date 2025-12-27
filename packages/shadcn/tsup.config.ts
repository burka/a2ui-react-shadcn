import { copyFileSync } from 'node:fs'
import { defineConfig } from 'tsup'

const isWatch = process.argv.includes('--watch')

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: !isWatch,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  // In watch mode, externalize workspace deps to avoid race conditions with parallel rebuilds
  // In build mode, bundle them for the final publishable package
  external: isWatch
    ? ['react', 'react-dom', 'react/jsx-runtime', 'a2ui-react-core', 'a2ui-react-react']
    : ['react', 'react-dom', 'react/jsx-runtime'],
  // Only bundle internal packages in production build, not in watch mode
  noExternal: isWatch ? [] : ['a2ui-react-core', 'a2ui-react-react'],
  onSuccess: async () => {
    copyFileSync('src/theme.css', 'dist/theme.css')
  },
})
