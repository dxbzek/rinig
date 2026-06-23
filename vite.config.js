import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is '/rinig/' for production builds (served from a project path on
// GitHub Pages). Dev stays at '/'. Asset refs use import.meta.env.BASE_URL.
//
// The React plugin only transforms .jsx so the pre-compiled design-system
// bundle and the Whisper worker stay untouched.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/rinig/' : '/',
  plugins: [react({ include: /\.jsx$/ })],
  worker: { format: 'es' },
  // onnxruntime-web (via Transformers.js) ships wasm and doesn't pre-bundle
  // cleanly — load it as-is. It only loads on iPhones (on-device captions).
  optimizeDeps: { exclude: ['@huggingface/transformers'] },
}))
