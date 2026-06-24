// Auto-update: makes the app always run the newest deployed version, so a stale
// browser/CDN cache can never strand someone on an old build again.
//
// How: the running bundle knows its own hashed filename (import.meta.url). We
// fetch the live index.html (bypassing cache) and read which bundle it points
// at. If it's a newer hash, we reload once with a cache-busting query so the
// fresh index.html — and the new bundle — actually load.
export function startAutoUpdate() {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return

  // Tidy the one-time cache-bust param out of the address bar after a reload.
  try {
    const u = new URL(window.location.href)
    if (u.searchParams.has('u')) {
      u.searchParams.delete('u')
      window.history.replaceState(null, '', u.pathname + u.search + u.hash)
    }
  } catch { /* ignore */ }

  const runningHash = (String(import.meta.url).match(/index-([A-Za-z0-9_-]+)\.js/) || [])[1]
  if (!runningHash) return // dev build (un-hashed) — nothing to update against

  let reloading = false
  const check = async () => {
    if (reloading || document.visibilityState === 'hidden') return
    try {
      const res = await fetch('./index.html', { cache: 'no-store' })
      if (!res.ok) return
      const html = await res.text()
      const latest = (html.match(/index-([A-Za-z0-9_-]+)\.js/) || [])[1]
      if (latest && latest !== runningHash) {
        reloading = true
        window.location.replace(window.location.pathname + '?u=' + Date.now())
      }
    } catch { /* offline or blocked — try again later */ }
  }

  // Check a few seconds after load, and whenever the app is reopened/refocused.
  setTimeout(check, 4000)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check()
  })
}
