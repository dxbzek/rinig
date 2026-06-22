import React from 'react'
import ReactDOM from 'react-dom/client'

// Load the design system (tokens, fonts, component bundle) before the app —
// `src/ds/index.js` sets up the global `React` the bundle needs and imports the
// stylesheet, so the design-system namespace is ready by first render.
import './ds/index.js'
import './app/app.css'
import { RinigApp } from './app/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RinigApp />
  </React.StrictMode>,
)
