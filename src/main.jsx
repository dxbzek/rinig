import React from 'react'
import ReactDOM from 'react-dom/client'

// Load the design system (tokens, fonts, component bundle) before the app —
// `src/ds/index.js` sets up the global `React` the bundle needs and imports the
// stylesheet, so the design-system namespace is ready by first render.
import './ds/index.js'
import './app/app.css'
import { RinigApp } from './app/App.jsx'
import { ErrorBoundary } from './app/ErrorBoundary.jsx'

// Ask the browser to keep our storage (so the downloaded offline-captions model
// isn't evicted and re-downloaded every visit). No-op where unsupported.
if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
  navigator.storage.persisted()
    .then((already) => { if (!already) return navigator.storage.persist() })
    .catch(() => { /* ignore */ })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RinigApp />
    </ErrorBoundary>
  </React.StrictMode>,
)
