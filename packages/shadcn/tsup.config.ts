import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  // Only externalize React - bundle everything else including a2ui-shadcn-ui-core and a2ui-shadcn-ui-react
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  // Ensure internal packages are bundled
  noExternal: ['a2ui-shadcn-ui-core', 'a2ui-shadcn-ui-react'],
})
