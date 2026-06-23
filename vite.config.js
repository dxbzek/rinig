import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is '/rinig/' for production builds because the app is served from a
// project path on GitHub Pages (https://dxbzek.github.io/rinig/). Local dev
// stays at '/'. Asset references in components use import.meta.env.BASE_URL so
// they resolve correctly in both.
//
// The React plugin only transforms .jsx files — this leaves the pre-compiled
// design-system bundle and the plain-JS hooks/worker untouched (the Whisper
// worker in particular must not get React Fast Refresh injected).
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/rinig/' : '/',
  plugins: [react({ include: /\.jsx$/ })],
  worker: { format: 'es' },
  // onnxruntime-web (pulled in by Transformers.js) ships wasm and doesn't
  // pre-bundle cleanly; load it as-is instead.
  optimizeDeps: { exclude: ['@huggingface/transformers'] },
}))
