// Real speech-to-text via the browser's Web Speech API
// (SpeechRecognition / webkitSpeechRecognition).
//
// Returns finalized phrases plus the current interim ("live") text so the
// caption stage can render words as they are spoken. Supported in Chrome and
// Edge; `supported` is false elsewhere (e.g. Firefox), and the caller falls
// back to the scripted demo.
//
// NOTE: In Chrome this engine streams microphone audio to Google's servers —
// it is not on-device. Good for testing accuracy now; a private/offline build
// would swap in an on-device model later.
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
  const [finals, setFinals] = React.useState([]) // finalized phrases, oldest → newest
  const [interim, setInterim] = React.useState('') // live, not-yet-final text
  const [error, setError] = React.useState(null)

  const recRef = React.useRef(null)
  const wantOnRef = React.useRef(false) // should we be listening? (drives auto-restart)
  const langRef = React.useRef(lang)
  langRef.current = lang

  // Build (once) and keep a single recognition instance.
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
        if (res.isFinal) {
          setFinals((prev) => [...prev, text])
          live = ''
        } else {
          live += res[0].transcript
        }
      }
      setInterim(live)
    }

    rec.onerror = (e) => {
      // "no-speech" / "aborted" are routine; surface the rest.
      if (e.error && e.error !== 'no-speech' && e.error !== 'aborted') {
        setError(e.error)
      }
    }

    // The engine stops itself periodically; restart while the user still wants it.
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
    try { rec.lang = LANG_TAG[langRef.current] || 'en-US'; rec.start() }
    catch { /* start() throws if already started — ignore */ }
  }, [])

  const stop = React.useCallback(() => {
    const rec = recRef.current
    wantOnRef.current = false
    setListening(false)
    if (rec) { try { rec.stop() } catch { /* noop */ } }
  }, [])

  const reset = React.useCallback(() => { setFinals([]); setInterim('') }, [])

  return { supported, listening, finals, interim, error, start, stop, reset }
}
