// First-run flow: mic permission → a short 3-card tutorial → start screen.
import React from 'react'
import { DS } from '../ds/index.js'

export function Onboarding({ onDone, accent }) {
  const { Button } = DS
  const [step, setStep] = React.useState('permit') // permit | tour
  const [card, setCard] = React.useState(0)

  const Logo = (
    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <img src={`${import.meta.env.BASE_URL}assets/rinig-mark.svg`} alt="" width="34" height="34" style={{ borderRadius:'9px' }}/>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'22px', letterSpacing:'-0.02em', color:'var(--text-strong)' }}>
        Rinig<span style={{ color:'var(--beam-500)' }}>.</span>
      </span>
    </div>
  )

  if (step === 'permit') {
    return (
      <div style={screenPad}>
        {Logo}
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', gap:'26px' }}>
          <img src={`${import.meta.env.BASE_URL}assets/illustration-listening.svg`} alt="" width="232" />
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'36px', lineHeight:1.06, letterSpacing:'-0.02em', color:'var(--text-strong)', margin:0 }}>
            Turn the room<br/>into words
          </h1>
          <p style={{ fontSize:'var(--text-body-lg)', lineHeight:1.5, color:'var(--text-body)', margin:0, maxWidth:'30ch' }}>
            Rinig listens with your microphone and shows large, real-time captions in English and Tagalog.
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <Button variant="primary" size="lg" fullWidth onClick={()=>setStep('tour')}>Allow microphone</Button>
          <p style={{ textAlign:'center', fontSize:'var(--text-body-sm)', color:'var(--text-muted)', margin:0 }}>
            Audio is processed on your device. Nothing is recorded unless you save it.
          </p>
        </div>
      </div>
    )
  }

  // ── 3-card tutorial ──────────────────────────────────────────────
  const cards = [
    {
      art: <TourGlyph kind="tap" accent={accent}/>,
      title: 'Tap once to start',
      body: 'One big button. Tap it and captions begin streaming the moment someone speaks.',
    },
    {
      art: <TourGlyph kind="hold" accent={accent}/>,
      title: 'Press and hold to catch a moment',
      body: 'In a noisy room? Press and hold the mic to caption just while you hold — let go to pause.',
    },
    {
      art: <TourGlyph kind="size" accent={accent}/>,
      title: 'Make the text yours',
      body: 'Tap A− / A+ any time to resize captions, or switch the language with one toggle.',
    },
  ]
  const last = card === cards.length - 1
  const c = cards[card]

  return (
    <div style={{ ...screenPad, paddingTop:'24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {Logo}
        <button onClick={onDone} style={skipBtn}>Skip</button>
      </div>

      <div key={card} className="rin-tour-card" style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', gap:'30px' }}>
        {c.art}
        <div style={{ display:'flex', flexDirection:'column', gap:'14px', maxWidth:'30ch' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'29px', lineHeight:1.1, letterSpacing:'-0.02em', color:'var(--text-strong)', margin:0 }}>{c.title}</h2>
          <p style={{ fontSize:'var(--text-body-lg)', lineHeight:1.5, color:'var(--text-body)', margin:0 }}>{c.body}</p>
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'22px' }}>
        {cards.map((_, i) => (
          <span key={i} style={{
            width: i===card ? '26px' : '8px', height:'8px', borderRadius:'4px',
            background: i===card ? 'var(--beam-500)' : 'var(--ink-200)', transition:'all 200ms ease-out',
          }}/>
        ))}
      </div>

      <Button variant={last ? 'primary' : 'outline'} size="lg" fullWidth
        onClick={()=> last ? onDone() : setCard(card+1)}>
        {last ? 'Start captioning' : 'Next'}
      </Button>
    </div>
  )
}

// Geometric tour illustrations built from the Rinig bar motif — no stock art.
function TourGlyph({ kind, accent }) {
  const beam = accent || 'var(--beam-500)'
  const box = { width:200, height:160, display:'grid', placeItems:'center' }
  if (kind === 'tap') {
    return (
      <div style={box}>
        <svg viewBox="0 0 200 160" width="200" height="160" fill="none">
          <circle cx="100" cy="80" r="52" stroke="var(--ink-200)" strokeWidth="2" strokeDasharray="4 7"/>
          <circle cx="100" cy="80" r="36" fill={beam}/>
          <rect x="95" y="66" width="10" height="20" rx="5" fill="var(--ink-900)"/>
          <path d="M89 80a11 11 0 0 0 22 0M100 91v7M93 98h14" stroke="var(--ink-900)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M138 36l8 8M150 30v11M158 38l-8 6" stroke={beam} strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    )
  }
  if (kind === 'hold') {
    return (
      <div style={box}>
        <svg viewBox="0 0 200 160" width="200" height="160" fill="none">
          <circle cx="100" cy="74" r="40" fill="var(--ink-100)"/>
          <circle cx="100" cy="74" r="40" stroke={beam} strokeWidth="4" strokeDasharray="180 80" strokeLinecap="round" transform="rotate(-90 100 74)"/>
          <rect x="95" y="60" width="10" height="20" rx="5" fill="var(--ink-900)"/>
          <path d="M89 74a11 11 0 0 0 22 0M100 85v7M93 92h14" stroke="var(--ink-900)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M86 120h28a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H86a6 6 0 0 1-6-6v-6a6 6 0 0 1 6-6z" fill="var(--ink-900)"/>
          <text x="100" y="136" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#fff" letterSpacing="0.5">HOLD</text>
        </svg>
      </div>
    )
  }
  return (
    <div style={box}>
      <svg viewBox="0 0 200 160" width="200" height="160" fill="none">
        <rect x="34" y="62" width="44" height="44" rx="12" fill="var(--ink-100)"/>
        <text x="56" y="91" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="22" fill="var(--ink-900)">A−</text>
        <rect x="122" y="48" width="58" height="58" rx="14" fill={beam}/>
        <text x="151" y="86" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="30" fill="var(--ink-900)">A+</text>
        <path d="M86 84h28" stroke="var(--ink-300)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7"/>
      </svg>
    </div>
  )
}

const screenPad = { position:'absolute', inset:0, background:'var(--surface-page)', display:'flex', flexDirection:'column', padding:'32px 24px 28px', boxSizing:'border-box' }
const skipBtn = { appearance:'none', border:'none', background:'transparent', cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:'var(--text-body-md)', fontWeight:700, color:'var(--text-muted)', padding:'8px' }
