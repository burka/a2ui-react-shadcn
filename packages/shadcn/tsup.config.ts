import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  // Only externalize React - bundle everything else including @a2ui/core and @a2ui/react
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  // Ensure @a2ui packages are bundled
  noExternal: ['@a2ui/core', '@a2ui/react'],
})
