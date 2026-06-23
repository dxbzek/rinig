// App shell — onboarding (+tutorial) → start → history search / live stage,
// with transcript detail, a shared settings sheet, and a save toast.
import React from 'react'
import { DS } from '../ds/index.js'
import { Onboarding } from './Onboarding.jsx'
import { StartScreen } from './StartScreen.jsx'
import { HistorySearch } from './HistorySearch.jsx'
import { CaptionStage } from './CaptionStage.jsx'
import { TranscriptDetail } from './TranscriptDetail.jsx'
import { SettingsSheet } from './SettingsSheet.jsx'
import { usePersistentState, addSession, renameSession, deleteSession } from './store.js'

// Default caption presentation. (In the design mockup these were live-editable
// "tweaks"; here they are the app's shipped defaults.)
const DEFAULTS = {
  captionSize: 'xl',
  stageTheme: 'ink',
  align: 'left',
  speakerLabels: true,
  translation: true,
  highContrast: false,
}

export function RinigApp() {
  const { Toast } = DS

  // Skip onboarding on return visits (persisted once the tour is finished).
  const [onboarded, setOnboarded] = usePersistentState('rinig.onboarded.v1', false)
  const [screen, setScreen] = React.useState(onboarded ? 'start' : 'onboard') // onboard | start | history | live | detail
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [session, setSession] = React.useState(null)
  const [mode, setMode] = React.useState('tap') // tap | hold
  const [toast, setToast] = React.useState(null)

  // Caption preferences persist on the device so they're remembered next time.
  const [lang, setLang] = usePersistentState('rinig.lang.v1', 'en')
  const [prefs, setPrefs] = usePersistentState('rinig.prefs.v2', {
    size: DEFAULTS.captionSize,
    translate: DEFAULTS.translation,
    contrast: DEFAULTS.highContrast,
    save: true,
    engine: 'online', // 'online' (Web Speech) | 'ondevice' (Whisper)
    quality: 'standard', // on-device model: 'standard' (base) | 'high' (small)
  })
  const [, forceRefresh] = React.useReducer(x => x + 1, 0)

  const settings = { lang, ...prefs }
  const setSettings = (updater) => {
    const next = typeof updater === 'function' ? updater(settings) : updater
    if (next.lang !== undefined) setLang(next.lang)
    setPrefs(p => ({
      size: next.size ?? p.size,
      translate: next.translate ?? p.translate,
      contrast: next.contrast ?? p.contrast,
      save: next.save ?? p.save,
      engine: next.engine ?? p.engine,
      quality: next.quality ?? p.quality,
    }))
  }

  const vis = { align: DEFAULTS.align, stageTheme: DEFAULTS.stageTheme, showSpeaker: DEFAULTS.speakerLabels, accent: 'var(--beam-500)' }

  const toastTimer = React.useRef(null)
  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }
  const startLive = (m) => { setMode(m); setScreen('live') }
  const finishOnboarding = () => { setOnboarded(true); setScreen('start') }

  // Persist a captured transcript and confirm. `s` is null when there's nothing
  // worth saving yet.
  const handleSave = (s) => {
    if (!s || !settings.save) { showToast(s ? 'Saving is turned off' : 'Nothing to save yet'); return }
    addSession(s)
    showToast('Transcript saved')
  }

  return (
    <div className="rinig-shell">
      <div style={{ position:'relative', width:'100%', height:'100%' }}>
        {screen === 'onboard' && <Onboarding onDone={finishOnboarding} accent={vis.accent} />}

        {screen === 'start' && (
          <StartScreen
            settings={settings} setSettings={setSettings}
            onStart={startLive}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenHistory={() => setScreen('history')}
            onOpenSession={(s) => { setSession(s); setScreen('detail') }}
          />
        )}

        {screen === 'history' && (
          <HistorySearch
            onBack={() => setScreen('start')}
            onOpenSession={(s) => { setSession(s); setScreen('detail') }}
          />
        )}

        {screen === 'live' && (
          <CaptionStage
            settings={settings} setSettings={setSettings} vis={vis} mode={mode}
            onExit={() => setScreen('start')}
            onOpenSettings={() => setSettingsOpen(true)}
            onSave={handleSave}
          />
        )}

        {screen === 'detail' && session && (
          <TranscriptDetail session={session}
            onBack={() => setScreen('start')}
            onShare={(msg) => showToast(msg)}
            onRename={(title) => { renameSession(session.id, title); setSession(s => ({ ...s, title })); showToast('Renamed') }}
            onDelete={() => { deleteSession(session.id); forceRefresh(); setScreen('start'); showToast('Transcript deleted') }} />
        )}

        <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} settings={settings} setSettings={setSettings}
          onCleared={() => { forceRefresh(); showToast('Saved transcripts cleared') }} />
        {toast && <Toast tone="success" hosted>{toast}</Toast>}
      </div>
    </div>
  )
}
