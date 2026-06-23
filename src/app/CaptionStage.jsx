// Live caption stage — light "white & yellow" theme.
//
// Captions come from real speech recognition (Web Speech API online, or the
// optional on-device Whisper engine). Otherwise the stage falls back to a
// scripted demo (RINIG_SCRIPT) that streams word-by-word.
//
// mode 'tap'  = continuous listening (tap mic to pause/resume).
// mode 'hold' = caption only while the mic is held.
import React from 'react'
import { DS } from '../ds/index.js'
import Icon from './icons.jsx'
import { RINIG_SCRIPT, RINIG_PROMPTS } from './captions-data.js'
import { useSpeechRecognition } from './useSpeechRecognition.js'
import { useOnDeviceRecognition } from './useOnDeviceRecognition.js'
import { useWakeLock } from './useWakeLock.js'
import { buildSession, tidyLine } from './store.js'

export function CaptionStage({ settings, setSettings, vis, mode, onExit, onOpenSettings, onSave }) {
  const { CaptionLine, LanguageToggle, Badge, IconButton, AppBar } = DS
  const I = Icon
  const holdMode = mode === 'hold'

  // Two engines: real-time online (fast, default) and on-device Whisper
  // (private/offline). Use the lighter 'standard' model on-device — the larger
  // one exhausts phone-browser memory and crashes the tab. Both inert until start().
  const online = useSpeechRecognition(settings.lang)
  const ondevice = useOnDeviceRecognition(settings.lang, 'standard')
  const onDeviceMode = settings.engine === 'ondevice'
  const eng = onDeviceMode ? ondevice : online
  const supported = eng.supported

  // ── Demo fallback (only runs when the chosen engine is unavailable) ──────────
  const [demoListening, setDemoListening] = React.useState(true)
  const [seg, setSeg] = React.useState(0)
  const [nWords, setNWords] = React.useState(2)
  const scrollRef = React.useRef(null)
  const stickRef = React.useRef(true)
  // A friendly, personalized prompt picked once when the stage opens.
  const promptRef = React.useRef(RINIG_PROMPTS[Math.floor(Math.random() * RINIG_PROMPTS.length)])

  React.useEffect(() => {
    if (supported || !demoListening) return
    const cur = RINIG_SCRIPT[seg]
    const id = setInterval(() => {
      setNWords(w => {
        if (w >= cur.words.length) { setSeg(s => (s + 1) % RINIG_SCRIPT.length); return 2 }
        return w + 1
      })
    }, 340)
    return () => clearInterval(id)
  }, [supported, demoListening, seg])

  // ── Unify the chosen source into what the view renders ──────────────────────
  let listening, finalizedLines, settled, live, activeSpeaker, translation
  if (supported) {
    listening = eng.listening
    finalizedLines = eng.finals.map(text => ({ text: tidyLine(text) }))
    settled = ''
    live = eng.interim
    activeSpeaker = undefined
    translation = undefined
  } else {
    listening = demoListening
    const cur = RINIG_SCRIPT[seg]
    settled = cur.words.slice(0, Math.max(0, nWords - 2)).join(' ')
    live = demoListening ? cur.words.slice(Math.max(0, nWords - 2), nWords).join(' ') : ''
    finalizedLines = []
    for (let i = 2; i >= 1; i--) {
      const h = RINIG_SCRIPT[(seg - i + RINIG_SCRIPT.length) % RINIG_SCRIPT.length]
      finalizedLines.push({ speaker: vis.showSpeaker ? h.speaker : undefined, text: h.words.join(' ') })
    }
    activeSpeaker = vis.showSpeaker ? cur.speaker : undefined
    translation = settings.translate ? cur.translation : undefined
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }
  React.useEffect(() => {
    const el = scrollRef.current
    if (el && stickRef.current) el.scrollTop = el.scrollHeight
  }, [finalizedLines.length, live, seg, nWords])

  const align = vis.align === 'center' ? 'center' : 'flex-start'
  const textAlign = vis.align === 'center' ? 'center' : 'left'

  useWakeLock(listening)

  const toggleDemo = () => setDemoListening(v => !v)

  const handleSave = () => {
    const lines = supported
      ? eng.finals.map(text => ({ text }))
      : RINIG_SCRIPT.map(s => ({ speaker: s.speaker, text: s.words.join(' ') }))
    onSave(lines.length ? buildSession(lines, settings.lang) : null)
  }

  const loadingModel = onDeviceMode && eng.status === 'loading'
  const emptyHint = supported
    ? (loadingModel ? `Preparing offline captions… ${eng.progress || 0}%`
      : listening ? (onDeviceMode ? 'Listening… (offline can lag a little)' : 'Listening… start speaking')
      : promptRef.current)
    : null

  const errMsg =
    eng.error === 'service-not-allowed' ? "Real-time captions aren’t available in this browser (common on iPhone)."
    : eng.error === 'not-allowed' ? "Microphone permission is needed. If you already allowed it, try Offline captions."
    : eng.error === 'network' ? "Can’t reach real-time captions — check your connection."
    : eng.error === 'audio-capture' ? 'No microphone found.'
    : eng.error ? `Mic error: ${eng.error}` : null
  // Offer a one-tap escape to the reliable on-device engine when the online one
  // fails (especially on iPhone, where real-time web speech is flaky).
  const showOfflineSwitch = !onDeviceMode && !!eng.error && eng.error !== 'audio-capture'

  // Light "white & yellow" stage. Caption text stays dark ink for legibility
  // (essential for a captioning tool); the live phrase gets a soft yellow
  // highlight. High-contrast mode just darkens the ink further.
  const stageStyle = {
    position: 'absolute', inset: 0, background: 'var(--surface-card)',
    display: 'flex', flexDirection: 'column',
    '--caption-text': 'var(--ink-900)',
    '--caption-dim': settings.contrast ? 'rgba(20,17,12,0.55)' : 'rgba(20,17,12,0.40)',
    '--caption-active': 'var(--beam-700)',
    '--caption-meta': 'var(--ink-500)',
  }

  return (
    <div style={stageStyle}>
      {/* soft amber listening glow */}
      {listening && (
        <div aria-hidden="true" style={{ position:'absolute', top:'-12%', left:'50%', transform:'translateX(-50%)', width:'150%', height:'46%',
          background:'radial-gradient(60% 100% at 50% 0%, rgba(255,184,28,0.18), transparent 70%)', pointerEvents:'none' }}/>
      )}

      <div style={{ paddingTop:'14px', position:'relative', zIndex:2 }}>
        <AppBar
          leading={<Badge tone={listening ? 'live' : 'neutral'}>{listening ? 'Captioning' : 'Paused'}</Badge>}
          trailing={<>
            <LanguageToggle value={settings.lang} onChange={(v)=>setSettings(s=>({ ...s, lang:v }))} />
            <IconButton aria-label="End captioning" variant="ghost" onClick={onExit}><I.Close/></IconButton>
          </>} />
      </div>

      <div ref={scrollRef} onScroll={onScroll} style={{ flex:1, overflowY:'auto', padding:'8px 22px', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:align, textAlign, gap:'18px', position:'relative', zIndex:1 }}>
        {finalizedLines.map((h, i) => (
          <CaptionLine key={'h'+i} size="md" state="history" speaker={h.speaker} text={h.text} style={{ textAlign }} />
        ))}
        {(settled || live) ? (
          <div style={{ background: listening ? 'var(--beam-100)' : 'transparent', borderRadius:'16px', padding: '6px 14px', boxShadow: listening ? 'inset 0 0 0 1px var(--beam-200)' : 'none' }}>
            <CaptionLine
              size={settings.size} state="active" speaker={activeSpeaker}
              text={settled} live={listening ? live : ''} showCursor={listening}
              translation={translation}
              style={{ textAlign }}
            />
          </div>
        ) : emptyHint ? (
          <p style={{ margin:0, color:'var(--text-muted)', fontFamily:'var(--font-sans)', fontSize:'var(--text-body-lg)' }}>{emptyHint}</p>
        ) : null}
      </div>

      {/* control bar */}
      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', padding:'14px 18px 28px',
                    borderTop:'1px solid var(--border-subtle)' }}>
        {errMsg && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
            <p style={{ margin:0, maxWidth:'34ch', textAlign:'center', fontFamily:'var(--font-sans)', fontSize:'13px', lineHeight:1.4, color:'var(--danger-600, #c13338)' }}>
              {errMsg}
            </p>
            {showOfflineSwitch && (
              <button onClick={()=>setSettings(s=>({ ...s, engine:'ondevice' }))} style={offlineBtn}>
                Switch to Offline captions
              </button>
            )}
          </div>
        )}
        {loadingModel && (
          <p style={{ margin:0, fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.06em', color:'var(--text-accent)' }}>
            Loading on-device model {eng.progress || 0}% — first time only
          </p>
        )}
        {!supported && (
          <p style={{ margin:0, fontFamily:'var(--font-mono)', fontSize:'12px', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-muted)' }}>
            Demo mode — captioning isn’t supported in this browser
          </p>
        )}
        {holdMode && supported && (
          <p style={{ margin:0, fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'0.08em', textTransform:'uppercase', color: listening ? 'var(--text-accent)' : 'var(--text-muted)' }}>
            {listening ? 'Listening — release to pause' : 'Hold the mic to caption'}
          </p>
        )}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'28px' }}>
          <IconButton aria-label="Caption settings" variant="soft" size="lg" onClick={onOpenSettings}><I.Gear/></IconButton>
          <StageMic holdMode={holdMode} listening={listening}
            onToggle={supported ? (()=> listening ? eng.stop() : eng.start()) : toggleDemo}
            onHoldStart={supported ? eng.start : (()=>setDemoListening(true))}
            onHoldEnd={supported ? eng.stop : (()=>setDemoListening(false))} />
          <IconButton aria-label="Save transcript" variant="soft" size="lg" onClick={handleSave}><I.Save/></IconButton>
        </div>
      </div>
    </div>
  )
}

const offlineBtn = { appearance:'none', border:'none', cursor:'pointer', padding:'10px 18px', borderRadius:'999px', background:'var(--beam-500)', color:'var(--ink-900)', fontFamily:'var(--font-sans)', fontWeight:800, fontSize:'var(--text-body-sm)' }

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
