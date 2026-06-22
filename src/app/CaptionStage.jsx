// Live caption stage — streams the script word-by-word.
// mode 'tap' = continuous listening; mode 'hold' = caption only while the mic is held.
// `vis` carries the visual-variation tweaks (alignment, stage theme, speaker labels).
import React from 'react'
import { DS } from '../ds/index.js'
import Icon from './icons.jsx'
import { RINIG_SCRIPT } from './captions-data.js'

export function CaptionStage({ settings, setSettings, vis, mode, onExit, onOpenSettings, onSave }) {
  const { CaptionLine, LanguageToggle, Badge, IconButton, AppBar } = DS
  const I = Icon
  const SCRIPT = RINIG_SCRIPT
  const holdMode = mode === 'hold'

  const [listening, setListening] = React.useState(true)
  const [seg, setSeg] = React.useState(0)
  const [nWords, setNWords] = React.useState(2)
  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    if (!listening) return
    const cur = SCRIPT[seg]
    const id = setInterval(() => {
      setNWords(w => {
        if (w >= cur.words.length) { setSeg(s => (s + 1) % SCRIPT.length); return 2 }
        return w + 1
      })
    }, 340)
    return () => clearInterval(id)
  }, [listening, seg])

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [seg, nWords])

  const cur = SCRIPT[seg]
  const settled = cur.words.slice(0, Math.max(0, nWords - 2)).join(' ')
  const live = cur.words.slice(Math.max(0, nWords - 2), nWords).join(' ')
  const history = []
  for (let i = 1; i <= 2; i++) history.unshift(SCRIPT[(seg - i + SCRIPT.length) % SCRIPT.length])

  const theme = settings.contrast ? '#000'
    : vis.stageTheme === 'black' ? '#000'
    : vis.stageTheme === 'graphite' ? '#1a1712'
    : 'var(--caption-stage)'
  const align = vis.align === 'center' ? 'center' : 'flex-start'
  const textAlign = vis.align === 'center' ? 'center' : 'left'

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
        {history.map((h, i) => (
          <CaptionLine key={'h'+seg+i} size="md" state="history" speaker={vis.showSpeaker ? h.speaker : undefined} text={h.words.join(' ')} style={{ textAlign }} />
        ))}
        <CaptionLine
          size={settings.size} state="active" speaker={vis.showSpeaker ? cur.speaker : undefined}
          text={settled} live={listening ? live : ''} showCursor={listening}
          translation={settings.translate ? cur.translation : undefined}
          style={{ textAlign }}
        />
      </div>

      {/* control bar */}
      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', padding:'14px 18px 28px',
                    background:'linear-gradient(to top, rgba(0,0,0,0.62), transparent)' }}>
        {holdMode && (
          <p style={{ margin:0, fontFamily:'var(--font-mono)', fontSize:'13px', letterSpacing:'0.08em', textTransform:'uppercase', color: listening ? 'var(--beam-400)' : 'rgba(255,255,255,0.6)' }}>
            {listening ? 'Listening — release to pause' : 'Hold the mic to caption'}
          </p>
        )}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'28px' }}>
          <IconButton aria-label="Caption settings" variant="soft" size="lg" onClick={onOpenSettings} style={{ background:'rgba(255,255,255,0.12)', color:'#fff' }}><I.Gear/></IconButton>
          <StageMic holdMode={holdMode} listening={listening} setListening={setListening} accent={vis.accent} />
          <IconButton aria-label="Save transcript" variant="soft" size="lg" onClick={onSave} style={{ background:'rgba(255,255,255,0.12)', color:'#fff' }}><I.Save/></IconButton>
        </div>
      </div>
    </div>
  )
}

// Stage mic: tap-toggle in continuous mode, press-and-hold in hold mode.
function StageMic({ holdMode, listening, setListening }) {
  const { MicControl } = DS
  if (!holdMode) {
    return <MicControl listening={listening} onToggle={()=>setListening(v=>!v)} label={listening ? 'Pause' : 'Tap to listen'} />
  }
  const down = (e)=>{ e.preventDefault(); setListening(true) }
  const up = ()=> setListening(false)
  return (
    <MicControl listening={listening} label={listening ? 'Listening…' : 'Hold to caption'}
      onPointerDown={down} onPointerUp={up} onPointerLeave={up} onClick={(e)=>e.preventDefault()} />
  )
}
