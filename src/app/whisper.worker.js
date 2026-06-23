// On-device speech recognition worker — runs OpenAI Whisper entirely in the
// browser via Transformers.js (WebGPU where available, WASM otherwise). The
// model is fetched once from the Hugging Face CDN and cached, after which
// transcription is fully offline and private — no audio leaves the device.
import { pipeline, env } from '@huggingface/transformers'

env.allowLocalModels = false
env.useBrowserCache = true

// whisper-base is multilingual, so it covers both English and Tagalog/Filipino.
const MODEL = 'onnx-community/whisper-base'

let transcriber = null
let loadingPromise = null

async function load() {
  if (transcriber) return transcriber
  if (!loadingPromise) {
    const progress_callback = (p) => self.postMessage({ type: 'progress', data: p })
    loadingPromise = (async () => {
      try {
        return await pipeline('automatic-speech-recognition', MODEL, { progress_callback, device: 'webgpu' })
      } catch {
        // WebGPU unavailable (most phones / Firefox) — fall back to CPU/WASM.
        return await pipeline('automatic-speech-recognition', MODEL, { progress_callback, device: 'wasm' })
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
