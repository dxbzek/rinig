import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Rinig design-system bundle (src/ds/design-system/ds-bundle.js) is a
// pre-compiled IIFE that reads a global `React`. We don't want Vite's React
// plugin trying to transform it, so we scope JSX handling to our own source.
export default defineConfig({
  plugins: [react({ include: /src\/(app|main)\.?.*\.(jsx|js)$/ })],
})
