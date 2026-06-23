// On-device speech recognition worker — runs OpenAI Whisper entirely in the
// browser via Transformers.js (WebGPU where available, WASM otherwise). The
// model is fetched once from the Hugging Face CDN and cached, after which
// transcription is fully offline and private — no audio leaves the device.
import { pipeline, env } from '@huggingface/transformers'

env.allowLocalModels = false
env.useBrowserCache = true

// Model is chosen by the app:
//   standard → whisper-base  (faster, smaller download)
//   high     → whisper-small (more accurate, esp. Tagalog; bigger/slower)
const MODELS = {
  standard: 'onnx-community/whisper-base',
  high: 'onnx-community/whisper-small',
}

const cache = {}          // quality → loaded pipeline
const loading = {}        // quality → in-flight promise

async function load(quality) {
  const key = MODELS[quality] ? quality : 'standard'
  if (cache[key]) return cache[key]
  if (!loading[key]) {
    const progress_callback = (p) => self.postMessage({ type: 'progress', data: p })
    loading[key] = (async () => {
      try {
        return await pipeline('automatic-speech-recognition', MODELS[key], { progress_callback, device: 'webgpu' })
      } catch {
        return await pipeline('automatic-speech-recognition', MODELS[key], { progress_callback, device: 'wasm' })
      }
    })()
  }
  cache[key] = await loading[key]
  self.postMessage({ type: 'ready' })
  return cache[key]
}

self.onmessage = async (e) => {
  const msg = e.data
  if (msg.type === 'load') {
    try { await load(msg.quality) } catch (err) { self.postMessage({ type: 'error', error: String(err && err.message || err) }) }
    return
  }
  if (msg.type === 'transcribe') {
    try {
      const run = await load(msg.quality)
      const out = await run(msg.audio, {
        language: msg.lang === 'tl' ? 'tagalog' : 'english',
        task: 'transcribe',
        chunk_length_s: 30,
        // Greedy decoding is steadier for short, live utterances.
        temperature: 0,
        no_repeat_ngram_size: 3,
      })
      self.postMessage({ type: 'result', text: ((out && out.text) || '').trim(), finalize: !!msg.finalize })
    } catch (err) {
      self.postMessage({ type: 'error', error: String(err && err.message || err) })
    }
  }
}
