// Keep the screen awake while captioning — essential so the phone doesn't sleep
// mid-conversation. No-op where the Screen Wake Lock API is unavailable.
import React from 'react'

export function useWakeLock(active) {
  React.useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !('wakeLock' in navigator)) return

    let lock = null
    let cancelled = false

    const acquire = async () => {
      try {
        lock = await navigator.wakeLock.request('screen')
      } catch { /* denied or not allowed right now */ }
    }

    // Re-acquire when the tab becomes visible again (the lock drops on hide).
    const onVisible = () => {
      if (!cancelled && document.visibilityState === 'visible') acquire()
    }

    acquire()
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      try { lock && lock.release() } catch { /* noop */ }
    }
  }, [active])
}
