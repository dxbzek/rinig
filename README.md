# Rinig

> **Turn the room into words.** Real-time English and Tagalog captions for Deaf
> and hard-of-hearing users — accurate even when the speaker is across the room.
> Accessibility-first: big text, high contrast, one simple screen. _Rinig_ is
> Tagalog for "heard / audible."

This repository contains the Rinig caption app — a Vite + React project built
from the original design mockup and the Rinig design system.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

Then open the URL Vite prints (default http://localhost:5173).

## What's here

The app is a mobile-first captioning flow, rendered inside a simple Android
device frame:

- **Onboarding** — microphone permission + a 3-card tutorial.
- **Start screen** — one big mic. Tap to caption continuously, or press-and-hold
  to catch just a moment. Plus recent sessions and search.
- **Live caption stage** — streams captions word-by-word on a near-black stage
  with a yellow live-highlight, an optional translation line, and speaker labels.
- **History search** — live-filter saved transcripts by text and category.
- **Transcript detail** — read and share a saved session.
- **Settings sheet** — text size, language, translation, high contrast, saving.

> The transcript data is **simulated** (`src/app/captions-data.js`) — this is the
> UI shell. Wiring up real speech recognition is the next step.

## Project layout

```
index.html                 Vite entry HTML
src/
  main.jsx                 App entry — loads the design system, mounts <RinigApp>
  app/                     Product screens + app shell
    App.jsx                Screen router / state
    Onboarding.jsx
    StartScreen.jsx
    HistorySearch.jsx
    CaptionStage.jsx
    TranscriptDetail.jsx
    SettingsSheet.jsx
    AndroidFrame.jsx       Material-3 device frame, repaletted to Rinig
    icons.jsx              Inline stroke product glyphs
    captions-data.js       Simulated transcript script + saved sessions
    app.css                Page shell + raw-icon helpers
  ds/
    index.js               Loads tokens, fonts, and the component bundle
    react-globals.js       Exposes global `React` for the pre-compiled bundle
    design-system/         Rinig design system — tokens, styles, component bundle
public/assets/             Logo marks + spot illustrations
```

## Design system

The Rinig design system (tokens, foundations, and the component bundle —
`AppBar`, `Button`, `CaptionLine`, `MicControl`, `LanguageToggle`, etc.) lives
under `src/ds/design-system/`. See its
[`readme.md`](src/ds/design-system/readme.md) for the brand voice, color, type,
and accessibility guidelines. Fonts (Atkinson Hyperlegible, Hanken Grotesk,
Spline Sans Mono) load from Google Fonts.

---

for my dad
