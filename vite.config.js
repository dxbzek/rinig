import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is '/rinig/' for production builds (served from a project path on
// GitHub Pages). Dev stays at '/'. Asset refs use import.meta.env.BASE_URL.
//
// The React plugin only transforms .jsx files, leaving the pre-compiled
// design-system bundle untouched.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/rinig/' : '/',
  plugins: [react({ include: /\.jsx$/ })],
}))
