// Real-time speech-to-text via the browser's Web Speech API
// (SpeechRecognition / webkitSpeechRecognition). This streams words as they're
// spoken — the fast, real-time engine. Supported in Chrome/Edge.
//
// Note: in Chrome this sends microphone audio to Google's servers to
// transcribe, so it needs a connection and isn't on-device. The on-device
// Whisper engine is the private/offline alternative.
import React from 'react'

const SpeechRecognitionImpl =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined

// App language code → BCP-47 tag the recognizer expects.
const LANG_TAG = { en: 'en-US', tl: 'fil-PH' }

export function useSpeechRecognition(lang = 'en') {
  const supported = !!SpeechRecognitionImpl

  const [listening, setListening] = React.useState(false)
  const [finals, setFinals] = React.useState([])
  const [interim, setInterim] = React.useState('')
  const [error, setError] = React.useState(null)
  // Online engine has no model download; expose a matching shape for the caller.
  const status = 'ready'
  const progress = 100

  const recRef = React.useRef(null)
  const wantOnRef = React.useRef(false)
  const langRef = React.useRef(lang)
  langRef.current = lang

  React.useEffect(() => {
    if (!supported) return
    const rec = new SpeechRecognitionImpl()
    rec.continuous = true
    rec.interimResults = true

    rec.onresult = (e) => {
      let live = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i]
        const text = res[0].transcript.trim()
        if (!text) continue
        if (res.isFinal) { setFinals(prev => [...prev, text]); live = '' }
        else live += res[0].transcript
      }
      setInterim(live)
    }

    const FATAL = new Set(['not-allowed', 'service-not-allowed', 'audio-capture', 'network'])
    rec.onerror = (e) => {
      const err = e.error
      if (!err || err === 'no-speech' || err === 'aborted') return
      if (FATAL.has(err)) wantOnRef.current = false
      setError(err)
    }

    // The engine stops itself periodically; restart while the user wants it on.
    rec.onend = () => {
      if (wantOnRef.current) {
        try { rec.lang = LANG_TAG[langRef.current] || 'en-US'; rec.start() } catch { /* already starting */ }
      } else {
        setListening(false)
        setInterim('')
      }
    }

    recRef.current = rec
    return () => {
      wantOnRef.current = false
      try { rec.onend = null; rec.stop() } catch { /* noop */ }
      recRef.current = null
    }
  }, [supported])

  const start = React.useCallback(() => {
    const rec = recRef.current
    if (!rec || wantOnRef.current) return
    wantOnRef.current = true
    setError(null)
    setListening(true)
    try { rec.lang = LANG_TAG[langRef.current] || 'en-US'; rec.start() } catch { /* already started */ }
  }, [])

  const stop = React.useCallback(() => {
    const rec = recRef.current
    wantOnRef.current = false
    setListening(false)
    if (rec) { try { rec.stop() } catch { /* noop */ } }
  }, [])

  const reset = React.useCallback(() => { setFinals([]); setInterim('') }, [])

  return { supported, listening, finals, interim, status, progress, error, start, stop, reset }
}
