// Live caption stage.
//
// When the browser supports the Web Speech API, captions are produced by REAL
// speech recognition from the microphone. Otherwise the stage falls back to a
// scripted demo (RINIG_SCRIPT) that streams word-by-word.
//
// mode 'tap'  = continuous listening (tap mic to pause/resume).
// mode 'hold' = caption only while the mic is held.
// `vis` carries the visual-variation tweaks (alignment, stage theme, speaker labels).
import React from 'react'
import { DS } from '../ds/index.js'
import Icon from './icons.jsx'
import { RINIG_SCRIPT } from './captions-data.js'
import { useSpeechRecognition } from './useSpeechRecognition.js'

export function CaptionStage({ settings, setSettings, vis, mode, onExit, onOpenSettings, onSave }) {
  const { CaptionLine, LanguageToggle, Badge, IconButton, AppBar } = DS
  const I = Icon
  const holdMode = mode === 'hold'
  const sr = useSpeechRecognition(settings.lang)

  // ── Demo fallback (only runs when real recognition is unavailable) ──────────
  const [demoListening, setDemoListening] = React.useState(true)
  const [seg, setSeg] = React.useState(0)
  const [nWords, setNWords] = React.useState(2)
  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    if (sr.supported || !demoListening) return
    const cur = RINIG_SCRIPT[seg]
    const id = setInterval(() => {
      setNWords(w => {
        if (w >= cur.words.length) { setSeg(s => (s + 1) % RINIG_SCRIPT.length); return 2 }
        return w + 1
      })
    }, 340)
    return () => clearInterval(id)
  }, [sr.supported, demoListening, seg])

  // ── Unify the two sources into what the view renders ────────────────────────
  let listening, historyLines, settled, live, activeSpeaker, translation
  if (sr.supported) {
    listening = sr.listening
    historyLines = sr.finals.slice(-2).map(text => ({ text }))
    settled = ''
    live = sr.interim
    activeSpeaker = undefined           // real STT has no speaker diarization yet
    translation = undefined             // no live translation yet
  } else {
    listening = demoListening
    const cur = RINIG_SCRIPT[seg]
    settled = cur.words.slice(0, Math.max(0, nWords - 2)).join(' ')
    live = demoListening ? cur.words.slice(Math.max(0, nWords - 2), nWords).join(' ') : ''
    historyLines = []
    for (let i = 1; i <= 2; i++) {
      const h = RINIG_SCRIPT[(seg - i + RINIG_SCRIPT.length) % RINIG_SCRIPT.length]
      historyLines.unshift({ speaker: vis.showSpeaker ? h.speaker : undefined, text: h.words.join(' ') })
    }
    activeSpeaker = vis.showSpeaker ? cur.speaker : undefined
    translation = settings.translate ? cur.translation : undefined
  }

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [seg, nWords, live, historyLines.length])

  const theme = settings.contrast ? '#000'
    : vis.stageTheme === 'black' ? '#000'
    : vis.stageTheme === 'graphite' ? '#1a1712'
    : 'var(--caption-stage)'
  const align = vis.align === 'center' ? 'center' : 'flex-start'
  const textAlign = vis.align === 'center' ? 'center' : 'left'

  const toggleDemo = () => setDemoListening(v => !v)

  const emptyHint = sr.supported
    ? (listening ? 'Listening… start speaking' : 'Tap the mic to start')
    : null

  // Friendly, actionable wording for the common recognition errors.
  const errMsg =
    sr.error === 'network' ? "Can't reach the speech service. Chrome's live captions run in Google's cloud — check your internet, or this network may be blocking it."
    : (sr.error === 'not-allowed' || sr.error === 'service-not-allowed') ? 'Microphone is blocked. Allow mic access for this site, then tap the mic again.'
    : sr.error === 'audio-capture' ? 'No microphone found. Plug one in and tap the mic again.'
    : sr.error ? `Mic error: ${sr.error}` : null

  return (
    <div style={{ position:'absolute', inset:0, background:theme, display:'flex', flexDirection:'column' }}>
      {/* soft amber listening bloom */}
      {listening && vis.stageTheme !== 'black' && !settings.contrast && (
        <div aria-hidden="true" style={{ position:'absolute', top:'-12%', left:'50%', transform:'translateX(-50%)', width:'150%', height:'46%',
          background:'radial-gradient(60% 100% at 50% 0%, rgba(255,184,28,0.16), transparent 70%)', pointerEvents:'none' }}/>
      )}

      <div style={{ paddingTop:'14px', position:'relative', zIndex:2 }}>
        <AppBar dark
          leading={<Badge tone={listening ? 'live' : 'neutral'}>{listening ? 'Captioning' : 'Paused'}</Badge>}
          trailing={<>
            <LanguageToggle value={settings.lang} onChange={(v)=>setSettings(s=>({ ...s, lang:v }))} dark />
            <IconButton aria-label="End captioning" variant="ghost" onClick={onExit} style={{ color:'#fff' }}><I.Close/></IconButton>
          </>} />
      </div>

      <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding:'8px 22px', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:align, textAlign, gap:'18px', position:'relative', zIndex:1 }}>
        {historyLines.map((h, i) => (
          <CaptionLine key={'h'+i+h.text.slice(0,8)} size="md" state="history" speaker={h.speaker} text={h.text} style={{ textAlign }} />
        ))}
        {(settled || live) ? (
          <CaptionLine
            size={settings.size} state="active" speaker={activeSpeaker}
            text={settled} live={listening ? live : ''} showCursor={listening}
            translation={translation}
            style={{ textAlign }}
          />
        ) : emptyHint ? (
          <p style={{ margin:0, color:'var(--caption-dim, rgba(255,255,255,0.42))', fontFamily:'var(--font-sans)', fontSize:'var(--text-body-lg)' }}>{emptyHint}</p>
        ) : null}
      </div>

      {/* control bar */}
      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', padding:'14px 18px 28px',
                    background:'linear-gradient(to top, rgba(0,0,0,0.62), transparent)' }}>
        {errMsg && (
          <p style={{ margin:0, maxWidth:'34ch', textAlign:'center', fontFamily:'var(--font-sans)', fontSize:'13px', lineHeight:1.4, color:'var(--danger-500, #e5484d)' }}>
            {errMsg}
          </p>
        )}
        {!sr.supported && (
          <p style={{ margin:0, fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)' }}>
            Demo mode — live transcription needs Chrome or Edge
          </p>
        )}
        {holdMode && sr.supported && (
          <p style={{ margin:0, fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'0.08em', textTransform:'uppercase', color: listening ? 'var(--beam-400)' : 'rgba(255,255,255,0.6)' }}>
            {listening ? 'Listening — release to pause' : 'Hold the mic to caption'}
          </p>
        )}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'28px' }}>
          <IconButton aria-label="Caption settings" variant="soft" size="lg" onClick={onOpenSettings} style={{ background:'rgba(255,255,255,0.12)', color:'#fff' }}><I.Gear/></IconButton>
          <StageMic holdMode={holdMode} listening={listening}
            onToggle={sr.supported ? (()=> listening ? sr.stop() : sr.start()) : toggleDemo}
            onHoldStart={sr.supported ? sr.start : (()=>setDemoListening(true))}
            onHoldEnd={sr.supported ? sr.stop : (()=>setDemoListening(false))} />
          <IconButton aria-label="Save transcript" variant="soft" size="lg" onClick={onSave} style={{ background:'rgba(255,255,255,0.12)', color:'#fff' }}><I.Save/></IconButton>
        </div>
      </div>
    </div>
  )
}

// Stage mic: tap-toggle in continuous mode, press-and-hold in hold mode.
function StageMic({ holdMode, listening, onToggle, onHoldStart, onHoldEnd }) {
  const { MicControl } = DS
  if (!holdMode) {
    return <MicControl listening={listening} onToggle={onToggle} label={listening ? 'Pause' : 'Tap to listen'} />
  }
  const down = (e)=>{ e.preventDefault(); onHoldStart() }
  const up = ()=> onHoldEnd()
  return (
    <MicControl listening={listening} label={listening ? 'Listening…' : 'Hold to caption'}
      onPointerDown={down} onPointerUp={up} onPointerLeave={up} onClick={(e)=>e.preventDefault()} />
  )
}
