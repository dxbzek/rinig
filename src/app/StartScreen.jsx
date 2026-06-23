// Start screen — calm, light, one obvious action. Mic supports tap OR press-and-hold.
import React from 'react'
import { DS } from '../ds/index.js'
import Icon from './icons.jsx'
import { getSessions } from './store.js'
import { RINIG_GREETING } from './captions-data.js'

export function StartScreen({ settings, setSettings, onStart, onOpenSettings, onOpenHistory, onOpenSession }) {
  const { LanguageToggle, AppBar, ListRow, IconButton } = DS
  const I = Icon
  const recents = getSessions().slice(0, 3)

  const Logo = (
    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <img src={`${import.meta.env.BASE_URL}assets/rinig-mark.svg`} alt="" width="32" height="32" style={{ borderRadius:'8px' }}/>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'22px', letterSpacing:'-0.02em', color:'var(--text-strong)' }}>
        Rinig<span style={{ color:'var(--beam-500)' }}>.</span>
      </span>
    </div>
  )

  return (
    <div style={{ position:'absolute', inset:0, background:'var(--surface-page)', display:'flex', flexDirection:'column', overflowY:'auto' }}>
      <div style={{ paddingTop:'14px' }}>
        <AppBar leading={Logo}
          trailing={<div style={{ display:'flex', gap:'6px' }}>
            <IconButton aria-label="Search history" variant="soft" onClick={onOpenHistory}><I.Search/></IconButton>
            <IconButton aria-label="Settings" variant="soft" onClick={onOpenSettings}><I.Gear/></IconButton>
          </div>} />
      </div>

      {/* hero action */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', padding:'18px 20px 22px' }}>
        <p style={{ margin:0, textAlign:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'30px', lineHeight:1.1, letterSpacing:'-0.02em', color:'var(--text-strong)' }}>
          {RINIG_GREETING}
        </p>
        <LanguageToggle value={settings.lang} onChange={(v)=>setSettings(s=>({ ...s, lang:v }))} />
        <HoldMic listening={false} onTap={()=>onStart('tap')} onHoldStart={()=>onStart('hold')} idleLabel="Tap to start · hold to catch a moment" />
      </div>

      {/* recents */}
      <div style={{ padding:'4px 16px 28px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', margin:'0 12px 6px' }}>
          <p style={{ margin:0, fontSize:'var(--text-label)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--text-muted)' }}>Recent sessions</p>
          <button onClick={onOpenHistory} style={seeAllBtn}>See all</button>
        </div>
        {recents.map((r)=>(
          <ListRow key={r.id} icon={<I.Clock/>} title={r.title} meta={r.meta} chevron onClick={()=>onOpenSession(r)} />
        ))}
      </div>
    </div>
  )
}

// Tap OR press-and-hold mic. Hold >280ms → push-to-caption; a quick tap → continuous.
export function HoldMic({ onTap, onHoldStart, idleLabel, listening, onHoldEnd }) {
  const { MicControl } = DS
  const timer = React.useRef(null)
  const heldRef = React.useRef(false)
  const [pressing, setPressing] = React.useState(false)

  const down = (e) => {
    e.preventDefault()
    heldRef.current = false
    setPressing(true)
    timer.current = setTimeout(() => { heldRef.current = true; onHoldStart && onHoldStart() }, 280)
  }
  const up = () => {
    clearTimeout(timer.current)
    setPressing(false)
    if (heldRef.current) { onHoldEnd && onHoldEnd() }
    else { onTap && onTap() }
  }
  const leave = () => { clearTimeout(timer.current); setPressing(false) }

  const label = listening ? 'Listening…' : (pressing ? 'Hold to caption…' : idleLabel)
  return (
    <MicControl listening={listening || pressing} label={label}
      onPointerDown={down} onPointerUp={up} onPointerLeave={leave} onClick={(e)=>e.preventDefault()} />
  )
}

const seeAllBtn = { appearance:'none', border:'none', background:'transparent', cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:'var(--text-body-sm)', fontWeight:700, color:'var(--text-accent)', padding:'4px 2px' }
