// On-device speech recognition hook — mirrors the useSpeechRecognition API but
// runs Whisper locally (see whisper.worker.js). Captures microphone audio,
// downsamples it to 16 kHz, and periodically asks the worker to transcribe the
// rolling buffer (interim) and to finalize a phrase on a pause.
//
// Trade-off vs. the online engine: a one-time model download (~tens of MB) and
// higher latency, but it works offline and keeps all audio on the device.
import React from 'react'

export function useOnDeviceRecognition(lang = 'en') {
  const supported =
    typeof Worker !== 'undefined' &&
    typeof navigator !== 'undefined' && !!navigator.mediaDevices &&
    (typeof AudioContext !== 'undefined' || typeof window !== 'undefined' && 'webkitAudioContext' in window)

  const [listening, setListening] = React.useState(false)
  const [finals, setFinals] = React.useState([])
  const [interim, setInterim] = React.useState('')
  const [status, setStatus] = React.useState('idle') // idle | loading | ready
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = React.useState(null)

  const workerRef = React.useRef(null)
  const ctxRef = React.useRef(null)
  const streamRef = React.useRef(null)
  const nodesRef = React.useRef(null)
  const bufRef = React.useRef([])         // accumulated Float32 frames at the context sample rate
  const inRateRef = React.useRef(16000)
  const lastVoiceRef = React.useRef(0)
  const busyRef = React.useRef(false)
  const tickRef = React.useRef(null)
  const fileProgRef = React.useRef({})
  const langRef = React.useRef(lang)
  langRef.current = lang

  const ensureWorker = () => {
    if (workerRef.current) return workerRef.current
    const w = new Worker(new URL('./whisper.worker.js', import.meta.url), { type: 'module' })
    w.onmessage = (e) => {
      const m = e.data
      if (m.type === 'progress') {
        const p = m.data
        if (p && p.status === 'progress' && p.file) {
          fileProgRef.current[p.file] = p.total ? p.loaded / p.total : 0
          const vals = Object.values(fileProgRef.current)
          setProgress(Math.round(100 * vals.reduce((a, b) => a + b, 0) / vals.length))
          setStatus('loading')
        }
      } else if (m.type === 'ready') {
        setStatus('ready'); setProgress(100)
      } else if (m.type === 'result') {
        if (m.finalize) { if (m.text) setFinals(f => [...f, m.text]); setInterim('') }
        else { setInterim(m.text) }
        busyRef.current = false
      } else if (m.type === 'error') {
        setError(m.error); busyRef.current = false
      }
    }
    workerRef.current = w
    return w
  }

  const downsampleTo16k = (frames, inRate) => {
    let len = 0
    for (const f of frames) len += f.length
    const flat = new Float32Array(len)
    let o = 0
    for (const f of frames) { flat.set(f, o); o += f.length }
    if (inRate === 16000) return flat
    const ratio = inRate / 16000
    const outLen = Math.floor(flat.length / ratio)
    const out = new Float32Array(outLen)
    for (let i = 0; i < outLen; i++) out[i] = flat[Math.floor(i * ratio)]
    return out
  }

  const sendTranscribe = (finalize) => {
    if (busyRef.current || !bufRef.current.length) { if (finalize) bufRef.current = []; return }
    const audio = downsampleTo16k(bufRef.current, inRateRef.current)
    if (audio.length < 16000 * 0.4) { if (finalize) bufRef.current = []; return } // ignore < 0.4s
    busyRef.current = true
    ensureWorker().postMessage({ type: 'transcribe', audio, lang: langRef.current, finalize }, [audio.buffer])
    if (finalize) bufRef.current = []
  }

  const teardownAudio = () => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
    try { nodesRef.current && nodesRef.current.proc.disconnect() } catch { /* noop */ }
    try { nodesRef.current && nodesRef.current.source.disconnect() } catch { /* noop */ }
    try { ctxRef.current && ctxRef.current.close() } catch { /* noop */ }
    try { streamRef.current && streamRef.current.getTracks().forEach(t => t.stop()) } catch { /* noop */ }
    nodesRef.current = null; ctxRef.current = null; streamRef.current = null
  }

  const start = async () => {
    if (ctxRef.current) return
    setError(null)
    const w = ensureWorker()
    setStatus(s => (s === 'ready' ? 'ready' : 'loading'))
    w.postMessage({ type: 'load' })
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const Ctx = window.AudioContext || window.webkitAudioContext
      const ctx = new Ctx()
      ctxRef.current = ctx
      inRateRef.current = ctx.sampleRate
      const source = ctx.createMediaStreamSource(stream)
      const proc = ctx.createScriptProcessor(4096, 1, 1)
      proc.onaudioprocess = (ev) => {
        const input = ev.inputBuffer.getChannelData(0)
        const copy = new Float32Array(input.length)
        copy.set(input)
        bufRef.current.push(copy)
        let sum = 0
        for (let i = 0; i < input.length; i++) sum += input[i] * input[i]
        const rms = Math.sqrt(sum / input.length)
        if (rms > 0.012) lastVoiceRef.current = performance.now()
        let total = 0
        for (const f of bufRef.current) total += f.length
        if (total > inRateRef.current * 25) sendTranscribe(true) // cap rolling buffer at ~25s
      }
      source.connect(proc)
      proc.connect(ctx.destination) // required for the processor to fire; output stays silent
      nodesRef.current = { source, proc }
      lastVoiceRef.current = performance.now()
      setListening(true)
      tickRef.current = setInterval(() => {
        const silentFor = performance.now() - lastVoiceRef.current
        let total = 0
        for (const f of bufRef.current) total += f.length
        const secs = total / inRateRef.current
        if (silentFor > 1100 && secs > 0.6) sendTranscribe(true)      // finalize on a pause
        else if (secs > 1.2) sendTranscribe(false)                    // live interim while speaking
      }, 1400)
    } catch (err) {
      setError(err && err.name === 'NotAllowedError' ? 'not-allowed' : String(err && err.message || err))
      teardownAudio()
      setListening(false)
    }
  }

  const stop = () => {
    setListening(false)
    sendTranscribe(true) // flush whatever's left as a final line
    teardownAudio()
  }

  const reset = () => { setFinals([]); setInterim('') }

  // Clean everything up on unmount.
  React.useEffect(() => () => {
    teardownAudio()
    try { workerRef.current && workerRef.current.terminate() } catch { /* noop */ }
    workerRef.current = null
  }, [])

  return { supported, listening, finals, interim, status, progress, error, start, stop, reset }
}
