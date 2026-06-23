// Saved-transcript detail view.
import React from 'react'
import { DS } from '../ds/index.js'
import Icon from './icons.jsx'

export function TranscriptDetail({ session, onBack, onShare, onRename, onDelete }) {
  const { AppBar, IconButton, Badge } = DS
  const I = Icon

  // Share via the native share sheet where available, otherwise copy to clipboard.
  const handleShare = async () => {
    const text = session.lines.map(l => (l.speaker ? l.speaker + ': ' : '') + l.text).join('\n')
    try {
      if (navigator.share) { await navigator.share({ title: session.title, text }); return }
      await navigator.clipboard.writeText(text)
      onShare('Copied to clipboard')
    } catch { /* user cancelled the share, or clipboard blocked */ }
  }

  const handleRename = () => {
    const next = typeof prompt === 'function' ? prompt('Rename transcript', session.title) : null
    const trimmed = next && next.trim()
    if (trimmed && trimmed !== session.title) onRename && onRename(trimmed)
  }

  const handleDelete = () => {
    if (typeof confirm === 'function' && !confirm('Delete this transcript?')) return
    onDelete && onDelete()
  }

  return (
    <div style={{ position:'absolute', inset:0, background:'var(--surface-page)', display:'flex', flexDirection:'column' }}>
      <div style={{ paddingTop:'14px' }}>
        <AppBar
          title={session.title}
          leading={<IconButton aria-label="Back" variant="ghost" onClick={onBack}><I.Back/></IconButton>}
          trailing={<IconButton aria-label="Share transcript" variant="soft" onClick={handleShare}><I.Share/></IconButton>}
        />
      </div>
      <div style={{ padding:'14px 24px 10px', display:'flex', alignItems:'center', gap:'10px' }}>
        <Badge tone="neutral">{session.meta}</Badge>
        <span style={{ fontSize:'var(--text-body-sm)', color:'var(--text-muted)' }}>{session.when}</span>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'8px 24px 20px', display:'flex', flexDirection:'column', gap:'18px' }}>
        {session.lines.map((l, i) => (
          <div key={i}>
            {l.speaker && <span style={{ display:'block', fontSize:'var(--text-label)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--text-muted)', marginBottom:'4px' }}>{l.speaker}</span>}
            <p style={{ margin:0, fontSize:'var(--text-body-lg)', lineHeight:1.5, color:'var(--text-strong)' }}>{l.text}</p>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:'10px', padding:'8px 24px 26px' }}>
        <button onClick={handleRename} style={actionBtn}>Rename</button>
        <button onClick={handleDelete} style={{ ...actionBtn, color:'var(--danger-600, #c13338)' }}>Delete</button>
      </div>
    </div>
  )
}

const actionBtn = { flex:1, appearance:'none', cursor:'pointer', padding:'14px', borderRadius:'14px', border:'1px solid var(--border-default)', background:'var(--surface-card)', color:'var(--text-strong)', fontFamily:'var(--font-sans)', fontWeight:700, fontSize:'var(--text-body-md)' }
