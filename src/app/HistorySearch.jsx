// History search — live-filter saved sessions by text + category chip.
import React from 'react'
import { DS } from '../ds/index.js'
import Icon from './icons.jsx'
import { RINIG_RECENTS, RINIG_FILTERS } from './captions-data.js'

export function HistorySearch({ onBack, onOpenSession }) {
  const { AppBar, IconButton, ListRow } = DS
  const I = Icon
  const all = RINIG_RECENTS
  const filters = RINIG_FILTERS
  const [q, setQ] = React.useState('')
  const [filter, setFilter] = React.useState('All')
  const inputRef = React.useRef(null)

  React.useEffect(() => { const t = setTimeout(()=> inputRef.current && inputRef.current.focus(), 350); return ()=>clearTimeout(t) }, [])

  const ql = q.trim().toLowerCase()
  const results = all.filter(s => {
    const inCat = filter === 'All' || (s.tags||[]).includes(filter.toLowerCase())
    if (!inCat) return false
    if (!ql) return true
    const hay = (s.title + ' ' + s.meta + ' ' + s.lines.map(l=>l.text+' '+l.speaker).join(' ')).toLowerCase()
    return hay.includes(ql)
  })

  return (
    <div style={{ position:'absolute', inset:0, background:'var(--surface-page)', display:'flex', flexDirection:'column' }}>
      <div style={{ paddingTop:'14px' }}>
        <AppBar title="History"
          leading={<IconButton aria-label="Back" variant="ghost" onClick={onBack}><I.Back/></IconButton>} />
      </div>

      {/* search field */}
      <div style={{ padding:'4px 18px 12px' }}>
        <div style={searchWrap}>
          <span className="rin-slot" style={{ color:'var(--text-muted)', display:'grid', placeItems:'center', width:'22px', height:'22px' }}><I.Search/></span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search transcripts" style={searchInput} />
          {q && <button aria-label="Clear" className="rin-slot-sm" onClick={()=>setQ('')} style={clearBtn}><I.Close/></button>}
        </div>
      </div>

      {/* filter chips */}
      <div style={{ display:'flex', gap:'8px', padding:'0 18px 10px', overflowX:'auto', flexWrap:'nowrap' }}>
        {filters.map(f => {
          const on = f === filter
          return (
            <button key={f} onClick={()=>setFilter(f)} style={{
              flex:'none', appearance:'none', cursor:'pointer', fontFamily:'var(--font-sans)',
              fontSize:'var(--text-body-sm)', fontWeight:700, padding:'8px 16px', borderRadius:'999px',
              border: on ? '2px solid var(--ink-900)' : '1px solid var(--border-default)',
              background: on ? 'var(--ink-900)' : 'var(--surface-card)',
              color: on ? '#fff' : 'var(--text-body)',
            }}>{f}</button>
          )
        })}
      </div>

      {/* results */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 16px 24px' }}>
        {results.length === 0 ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'18px', padding:'48px 24px' }}>
            <img src={`${import.meta.env.BASE_URL}assets/illustration-empty.svg`} alt="" width="160" />
            <div>
              <p style={{ margin:'0 0 6px', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'22px', color:'var(--text-strong)' }}>No matches</p>
              <p style={{ margin:0, fontSize:'var(--text-body-md)', color:'var(--text-muted)', maxWidth:'26ch' }}>Try a different word, speaker name, or category.</p>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <p style={{ margin:'6px 12px 4px', fontSize:'var(--text-label)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--text-muted)' }}>
              {results.length} {results.length === 1 ? 'session' : 'sessions'}
            </p>
            {results.map(r => (
              <ListRow key={r.id} icon={<I.Clock/>} title={highlight(r.title, ql)} meta={`${r.meta} · ${r.when}`} chevron onClick={()=>onOpenSession(r)} />
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

// Wrap matched substring in a beam highlight.
function highlight(text, ql) {
  if (!ql) return text
  const i = text.toLowerCase().indexOf(ql)
  if (i < 0) return text
  return (<>
    {text.slice(0, i)}
    <mark style={{ background:'var(--beam-200)', color:'inherit', borderRadius:'3px', padding:'0 2px' }}>{text.slice(i, i+ql.length)}</mark>
    {text.slice(i+ql.length)}
  </>)
}

const searchWrap = { display:'flex', alignItems:'center', gap:'10px', height:'52px', padding:'0 16px', borderRadius:'14px', background:'var(--surface-card)', border:'1px solid var(--border-default)', boxShadow:'var(--shadow-sm)' }
const searchInput = { flex:1, minWidth:0, appearance:'none', border:'none', outline:'none', background:'transparent', fontFamily:'var(--font-sans)', fontSize:'var(--text-body-lg)', color:'var(--text-strong)' }
const clearBtn = { appearance:'none', border:'none', background:'var(--surface-strong)', cursor:'pointer', width:'26px', height:'26px', borderRadius:'50%', display:'grid', placeItems:'center', color:'var(--text-muted)', padding:0 }
