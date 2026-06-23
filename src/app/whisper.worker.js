// On-device speech recognition worker — runs OpenAI Whisper in the browser via
// Transformers.js. Uses the smallest model (whisper-tiny) and prefers WebGPU,
// so it stays light enough for phone browsers (incl. iPhone Safari) that can't
// use the real-time Web Speech engine.
import { pipeline, env } from '@huggingface/transformers'

env.allowLocalModels = false
env.useBrowserCache = true

let transcriber = null
let loadingPromise = null

async function load() {
  if (transcriber) return transcriber
  if (!loadingPromise) {
    const progress_callback = (p) => self.postMessage({ type: 'progress', data: p })
    loadingPromise = (async () => {
      try {
        // With WebGPU (iOS 18+, modern Android) the model runs on the GPU, so we
        // can afford the crisper "base" model without exhausting tab memory.
        return await pipeline('automatic-speech-recognition', 'onnx-community/whisper-base', { progress_callback, device: 'webgpu' })
      } catch {
        // No WebGPU — fall back to the tiny model on WASM to stay within a phone
        // browser's memory limit (a bigger model here crashes the tab).
        return await pipeline('automatic-speech-recognition', 'onnx-community/whisper-tiny', { progress_callback, device: 'wasm', dtype: 'q8' })
      }
    })()
  }
  transcriber = await loadingPromise
  self.postMessage({ type: 'ready' })
  return transcriber
}

self.onmessage = async (e) => {
  const msg = e.data
  if (msg.type === 'load') {
    try { await load() } catch (err) { self.postMessage({ type: 'error', error: String(err && err.message || err) }) }
    return
  }
  if (msg.type === 'transcribe') {
    try {
      const run = await load()
      const out = await run(msg.audio, {
        language: msg.lang === 'tl' ? 'tagalog' : 'english',
        task: 'transcribe',
        chunk_length_s: 30,
      })
      self.postMessage({ type: 'result', text: ((out && out.text) || '').trim(), finalize: !!msg.finalize })
    } catch (err) {
      self.postMessage({ type: 'error', error: String(err && err.message || err) })
    }
  }
}
