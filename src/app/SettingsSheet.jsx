// Shared settings bottom-sheet — used from the start screen and the live stage.
import React from 'react'
import { DS } from '../ds/index.js'
import { clearSessions } from './store.js'

export function SettingsSheet({ open, onClose, settings, setSettings, onCleared }) {
  const { Sheet, ListRow, Switch, TextSizeStepper, LanguageToggle } = DS
  const SIZE_TO_IDX = { md: 1, lg: 2, xl: 3 }
  const IDX_TO_SIZE = { 0: 'md', 1: 'md', 2: 'lg', 3: 'xl' }
  const sizeIdx = SIZE_TO_IDX[settings.size] ?? 2

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

        <ListRow title="Show translation line" meta="Display the second language below"
          trailing={<Switch checked={settings.translate} onChange={e=>setSettings(s=>({ ...s, translate:e.target.checked }))} />} />
        <ListRow title="High-contrast captions" meta="Maximum legibility on the stage"
          trailing={<Switch checked={settings.contrast} onChange={e=>setSettings(s=>({ ...s, contrast:e.target.checked }))} />} />
        <ListRow title="Save transcripts" meta="Keep a copy on this device"
          trailing={<Switch checked={settings.save} onChange={e=>setSettings(s=>({ ...s, save:e.target.checked }))} />} />
        <ListRow title="Sound & vibration" meta="Feedback when you start, stop and save"
          trailing={<Switch checked={settings.sound !== false} onChange={e=>setSettings(s=>({ ...s, sound:e.target.checked }))} />} />

        <button onClick={clearAll} style={clearBtn}>Clear saved transcripts</button>
      </div>
    </Sheet>
  )
}

const ssLabel = { margin:'0 0 10px', fontSize:'var(--text-label)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--text-muted)' }
const clearBtn = { marginTop:'8px', appearance:'none', cursor:'pointer', width:'100%', padding:'14px', borderRadius:'14px', border:'1px solid var(--border-default)', background:'var(--surface-card)', color:'var(--danger-600, #c13338)', fontFamily:'var(--font-sans)', fontWeight:700, fontSize:'var(--text-body-md)' }
