// Catches any runtime error in the app and shows a readable message (with a
// Reload button) instead of a blank/white screen — and surfaces what actually
// went wrong, which is otherwise invisible on a phone.
import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // Visible in the browser console for diagnosis.
    console.error('Rinig error:', error, info)
  }

  render() {
    if (this.state.error) {
      const msg = String((this.state.error && this.state.error.message) || this.state.error)
      return (
        <div style={{
          minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center', gap: '16px', padding: '32px',
          background: 'var(--surface-page, #fbf8f2)', fontFamily: 'var(--font-sans, system-ui)',
          color: 'var(--text-strong, #14110c)',
        }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display, system-ui)', fontWeight: 800, fontSize: '26px' }}>
            Something went wrong
          </p>
          <p style={{ margin: 0, maxWidth: '32ch', fontSize: '16px', color: 'var(--text-body, #342d22)', lineHeight: 1.5 }}>
            {msg}
          </p>
          <button
            onClick={() => { this.setState({ error: null }); if (typeof location !== 'undefined') location.reload() }}
            style={{
              appearance: 'none', border: 'none', cursor: 'pointer', padding: '14px 24px',
              borderRadius: '999px', background: 'var(--beam-500, #ffb81c)', color: 'var(--ink-900, #14110c)',
              fontFamily: 'inherit', fontWeight: 800, fontSize: '16px',
            }}>
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
