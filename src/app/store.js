// On-device persistence for Rinig — settings and saved transcripts, backed by
// localStorage so nothing leaves the device.
import React from 'react'
import { RINIG_RECENTS } from './captions-data.js'

// ── Generic persistent React state ──────────────────────────────────────────
export function usePersistentState(key, initial) {
  const [value, setValue] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw != null ? JSON.parse(raw) : initial
    } catch { return initial }
  })
  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage full / blocked */ }
  }, [key, value])
  return [value, setValue]
}

// ── Saved transcripts ───────────────────────────────────────────────────────
const SESSIONS_KEY = 'rinig.sessions.v1'

export function getSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* fall through to seed */ }
  // First run: seed with example sessions so History isn't empty.
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(RINIG_RECENTS)) } catch { /* noop */ }
  return RINIG_RECENTS
}

export function addSession(session) {
  const next = [session, ...getSessions()]
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(next)) } catch { /* noop */ }
  return next
}

export function deleteSession(id) {
  const next = getSessions().filter(s => s.id !== id)
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(next)) } catch { /* noop */ }
  return next
}

export function renameSession(id, title) {
  const next = getSessions().map(s => s.id === id ? { ...s, title } : s)
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(next)) } catch { /* noop */ }
  return next
}

export function clearSessions() {
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify([])) } catch { /* noop */ }
  return []
}

// Light cleanup for a finalized caption line: collapse whitespace, capitalize
// the first letter, and add a closing period if it has no end punctuation —
// speech recognition usually returns neither, which makes saved transcripts
// hard to read. Only ever apply to *finalized* text, never the live interim.
export function tidyLine(text) {
  let t = (text || '').trim().replace(/\s+/g, ' ')
  if (!t) return t
  t = t.charAt(0).toUpperCase() + t.slice(1)
  if (!/[.!?…]$/.test(t)) t += '.'
  return t
}

// Build a saved-session record from captured lines.
export function buildSession(lines, lang) {
  const now = new Date()
  // Tidy each line's text for a clean, readable saved transcript.
  lines = lines.map(l => ({ ...l, text: tidyLine(l.text) }))
  const n = lines.length
  return {
    id: 's-' + now.getTime(),
    title: 'Session · ' + now.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    meta: (lang === 'tl' ? 'Tagalog' : 'English') + ' · ' + n + ' ' + (n === 1 ? 'line' : 'lines'),
    when: 'Just now',
    tags: [],
    lines,
    saved: true,
  }
}
