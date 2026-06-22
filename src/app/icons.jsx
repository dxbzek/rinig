// Shared inline stroke icons (2–2.4px, rounded) — Rinig product glyphs.
// Drawn in `currentColor` so they inherit Beam / ink / white from context.
const Icon = {
  Gear: () => (<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Clock: () => (<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Close: () => (<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>),
  Back: () => (<svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  Save: () => (<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h11l3 3v13H5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M8 4v5h7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>),
  Share: () => (<svg viewBox="0 0 24 24" fill="none"><path d="M12 15V4M8.5 7.5L12 4l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Search: () => (<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Hold: () => (<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="2.5" width="6" height="12" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
}

export default Icon
