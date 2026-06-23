// Shared settings bottom-sheet — used from the start screen and the live stage.
import React from 'react'
import { DS } from '../ds/index.js'
import { clearSessions } from './store.js'

export function SettingsSheet({ open, onClose, settings, setSettings, onCleared }) {
  const { Sheet, ListRow, Switch, TextSizeStepper, LanguageToggle } = DS
  const SIZE_TO_IDX = { md: 1, lg: 2, xl: 3 }
  const IDX_TO_SIZE = { 0: 'md', 1: 'md', 2: 'lg', 3: 'xl' }
  const sizeIdx = SIZE_TO_IDX[settings.size] ?? 2
  const onDevice = settings.engine === 'ondevice'

  const clearAll = () => {
    if (typeof confirm === 'function' && !confirm('Delete all saved transcripts? This cannot be undone.')) return
    clearSessions()
    onCleared && onCleared()
  }

  return (
    <Sheet open={open} onClose={onClose} title="Caption settings">
      <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
        <div style={{ padding:'10px 8px 14px' }}>
          <p style={ssLabel}>Text size</p>
          <TextSizeStepper value={sizeIdx} onChange={(i)=>setSettings(s=>({ ...s, size: IDX_TO_SIZE[i] }))} />
        </div>
        <div style={{ padding:'4px 8px 14px' }}>
          <p style={ssLabel}>Language</p>
          <LanguageToggle value={settings.lang} onChange={(v)=>setSettings(s=>({ ...s, lang:v }))} />
        </div>

        {/* Captioning engine */}
        <div style={{ padding:'4px 8px 10px' }}>
          <p style={ssLabel}>Captioning engine</p>
          <div style={{ display:'flex', gap:'8px' }}>
            <EngineChip on={!onDevice} label="Online" sub="Fast" onClick={()=>setSettings(s=>({ ...s, engine:'online' }))} />
            <EngineChip on={onDevice} label="On-device" sub="Private · offline" onClick={()=>setSettings(s=>({ ...s, engine:'ondevice' }))} />
          </div>
          <p style={{ margin:'10px 2px 0', fontSize:'var(--text-body-sm)', color:'var(--text-muted)', lineHeight:1.4 }}>
            {onDevice
              ? 'Runs on your device — no internet needed and nothing is sent away. Downloads a model the first time.'
              : 'Uses the browser’s online recognition. Fast, but needs a connection.'}
          </p>
        </div>

        <ListRow title="Show translation line" meta="Display the second language below"
          trailing={<Switch checked={settings.translate} onChange={e=>setSettings(s=>({ ...s, translate:e.target.checked }))} />} />
        <ListRow title="High-contrast captions" meta="Maximum legibility on the stage"
          trailing={<Switch checked={settings.contrast} onChange={e=>setSettings(s=>({ ...s, contrast:e.target.checked }))} />} />
        <ListRow title="Save transcripts" meta="Keep a copy on this device"
          trailing={<Switch checked={settings.save} onChange={e=>setSettings(s=>({ ...s, save:e.target.checked }))} />} />

        <button onClick={clearAll} style={clearBtn}>Clear saved transcripts</button>
      </div>
    </Sheet>
  )
}

function EngineChip({ on, label, sub, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={on} style={{
      flex:1, appearance:'none', cursor:'pointer', textAlign:'left', padding:'12px 14px', borderRadius:'14px',
      border: on ? '2px solid var(--ink-900)' : '1px solid var(--border-default)',
      background: on ? 'var(--ink-900)' : 'var(--surface-card)',
      color: on ? '#fff' : 'var(--text-body)',
      fontFamily:'var(--font-sans)',
    }}>
      <span style={{ display:'block', fontWeight:800, fontSize:'var(--text-body-md)' }}>{label}</span>
      <span style={{ display:'block', fontSize:'var(--text-body-sm)', opacity:0.8 }}>{sub}</span>
    </button>
  )
}

const ssLabel = { margin:'0 0 10px', fontSize:'var(--text-label)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--text-muted)' }
const clearBtn = { marginTop:'8px', appearance:'none', cursor:'pointer', width:'100%', padding:'14px', borderRadius:'14px', border:'1px solid var(--border-default)', background:'var(--surface-card)', color:'var(--danger-600, #c13338)', fontFamily:'var(--font-sans)', fontWeight:700, fontSize:'var(--text-body-md)' }
