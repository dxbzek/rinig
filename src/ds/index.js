// Loads the Rinig design system and exposes its component namespace.
//
// Import order matters:
//   1. react-globals — puts `React` on `window` for the bundle to use.
//   2. styles.css     — design tokens + fonts (the bundle's components rely on
//                       the CSS custom properties these define).
//   3. ds-bundle.js   — the pre-compiled IIFE; populates
//                       `window.RinigDesignSystem_af960f`.
import './react-globals.js'
import './design-system/styles.css'
import './design-system/ds-bundle.js'

// The design-system namespace: { AppBar, ListRow, Sheet, Toast, Badge, Button,
// Card, IconButton, Input, Switch, CaptionLine, LanguageToggle, MicControl,
// TextSizeStepper }. Accessed lazily by consumers so it is always defined by
// the time a component renders.
export const DS = window.RinigDesignSystem_af960f
