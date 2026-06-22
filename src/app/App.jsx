// App shell — onboarding (+tutorial) → start → history search / live stage,
// with transcript detail, a shared settings sheet, and a save toast.
import React from 'react'
import { DS } from '../ds/index.js'
import { AndroidDevice } from './AndroidFrame.jsx'
import { Onboarding } from './Onboarding.jsx'
import { StartScreen } from './StartScreen.jsx'
import { HistorySearch } from './HistorySearch.jsx'
import { CaptionStage } from './CaptionStage.jsx'
import { TranscriptDetail } from './TranscriptDetail.jsx'
import { SettingsSheet } from './SettingsSheet.jsx'

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

  const [screen, setScreen] = React.useState('onboard') // onboard | start | history | live | detail
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [session, setSession] = React.useState(null)
  const [mode, setMode] = React.useState('tap') // tap | hold
  const [lang, setLang] = React.useState('en')
  const [toast, setToast] = React.useState(null)

  // settings derived from defaults + local language; writable for in-app controls.
  const [override, setOverride] = React.useState({})
  const settings = {
    lang,
    size: override.size ?? DEFAULTS.captionSize,
    translate: override.translate ?? DEFAULTS.translation,
    contrast: override.contrast ?? DEFAULTS.highContrast,
    save: override.save ?? true,
  }
  const setSettings = (updater) => {
    const next = typeof updater === 'function' ? updater(settings) : updater
    if (next.lang !== undefined) setLang(next.lang)
    setOverride(o => ({ ...o, size: next.size, translate: next.translate, contrast: next.contrast, save: next.save }))
  }

  const vis = { align: DEFAULTS.align, stageTheme: DEFAULTS.stageTheme, showSpeaker: DEFAULTS.speakerLabels, accent: 'var(--beam-500)' }

  const toastTimer = React.useRef(null)
  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }
  const startLive = (m) => { setMode(m); setScreen('live') }

  return (
    <AndroidDevice dark={screen === 'live'}>
      <div style={{ position:'relative', width:'100%', height:'100%' }}>
        {screen === 'onboard' && <Onboarding onDone={() => setScreen('start')} accent={vis.accent} />}

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
            onSave={() => showToast('Transcript saved')}
          />
        )}

        {screen === 'detail' && session && (
          <TranscriptDetail session={session}
            onBack={() => setScreen('start')}
            onShare={() => showToast('Share link copied')} />
        )}

        <SettingsSheet open={settingsOpen} onClose={() => setSettingsOpen(false)} settings={settings} setSettings={setSettings} />
        {toast && <Toast tone="success" hosted>{toast}</Toast>}
      </div>
    </AndroidDevice>
  )
}
