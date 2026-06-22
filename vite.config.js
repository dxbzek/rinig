import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Rinig design-system bundle (src/ds/design-system/ds-bundle.js) is a
// pre-compiled IIFE that reads a global `React`, so we scope JSX handling to
// our own source and leave the bundle untouched.
//
// `base` is '/rinig/' for production builds because the app is served from a
// project path on GitHub Pages (https://dxbzek.github.io/rinig/). Local dev
// stays at '/'. Asset references in components use import.meta.env.BASE_URL so
// they resolve correctly in both.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/rinig/' : '/',
  plugins: [react({ include: /src\/(app|main)\.?.*\.(jsx|js)$/ })],
}))
