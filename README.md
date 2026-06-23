# Rinig

> **Turn the room into words.** Real-time English and Tagalog captions for Deaf
> and hard-of-hearing users — accurate even when the speaker is across the room.
> Accessibility-first: big text, high contrast, one simple screen. _Rinig_ is
> Tagalog for "heard / audible."

This repository contains the Rinig caption app — a Vite + React project built
from the original design mockup and the Rinig design system.

## Live site

The app auto-deploys to **GitHub Pages** on every push to `main`:

**https://dxbzek.github.io/rinig/**

Anyone can open that link in a browser — no install needed. (The deploy is
handled by `.github/workflows/deploy.yml`; the first run also enables Pages.)

## Getting started (local development)

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

### Built for everyday use

- **Saves real transcripts** — the Save button stores the captioned conversation
  on the device; History and the transcript view read your real saved sessions.
- **Remembers your choices** — text size, language, and contrast persist, and the
  tutorial only shows on the first visit.
- **Keeps the screen awake** while captioning (Screen Wake Lock).
- **Share / copy** a transcript via the native share sheet or clipboard.
- **Installable** — add it to a phone's home screen and launch it like an app
  (PWA manifest + icons). Everything is stored locally; no account needed.

## Live transcription

Two engines, switchable in **Settings → Captioning engine**:

- **Online (default)** — the browser's
  [Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API).
  Fast and zero-download, but needs a connection and (in Chrome) streams audio
  to Google's servers. Works in Chrome/Edge.
- **On-device** — OpenAI **Whisper** running locally in the browser via
  [Transformers.js](https://huggingface.co/docs/transformers.js) (WebGPU where
  available, otherwise WASM). **Private and offline** — no audio leaves the
  device. Downloads the model once on first use, then caches it. Higher latency
  than the online engine; the heavy model code is lazy-loaded only when this
  engine is selected.

Language follows the toggle: English (`en-US` / `english`) or Tagalog/Filipino
(`fil-PH` / `tagalog`). Where neither engine is available the stage falls back
to a **scripted demo** (`src/app/captions-data.js`).

> The on-device engine is new and benefits from real-device testing — accuracy
> and latency depend on the phone and whether WebGPU is available.

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
