// The Rinig design-system bundle is a pre-compiled artifact that expects a
// global `React` (it calls `React.createElement` directly). Expose it before
// the bundle module evaluates. This module must be imported *before*
// `./design-system/ds-bundle.js` — ES module imports run in source order, so
// importing this first guarantees the global is in place.
import React from 'react'

window.React = window.React || React
