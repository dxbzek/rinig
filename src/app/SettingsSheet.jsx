// Shared settings bottom-sheet — used from the start screen and the live stage.
import React from 'react'
import { DS } from '../ds/index.js'

export function SettingsSheet({ open, onClose, settings, setSettings }) {
  const { Sheet, ListRow, Switch, TextSizeStepper, LanguageToggle } = DS
  const SIZE_TO_IDX = { md: 1, lg: 2, xl: 3 }
  const IDX_TO_SIZE = { 0: 'md', 1: 'md', 2: 'lg', 3: 'xl' }
  const sizeIdx = SIZE_TO_IDX[settings.size] ?? 2
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
      </div>
    </Sheet>
  )
}

const ssLabel = { margin:'0 0 10px', fontSize:'var(--text-label)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--text-muted)' }
