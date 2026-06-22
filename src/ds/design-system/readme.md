# Rinig Design System

> **Rinig turns the room into words.** Real-time English and Tagalog captions for
> Deaf and hard-of-hearing users — accurate even when the speaker is across the
> room. Accessibility-first: big text, high contrast, one simple screen.
> _Rinig_ is Tagalog for "heard / audible."

This project is the Rinig design system — tokens, foundations, components, and
full-screen UI kits. Consumers link one file: **`styles.css`** (root).

---

## Sources

- **`uploads/DESIGN-elevenlabs.md`** — an ElevenLabs brand analysis supplied as the
  aesthetic north star. Rinig borrows its editorial restraint (warm off-white canvas,
  warm near-black ink, ink-pill primary action, a single atmospheric accent moment,
  96px section rhythm) but **deliberately diverges** where accessibility demands it:
  Rinig is high-contrast, large-type, and bold where ElevenLabs is soft and low-weight.
- No codebase, Figma, or production assets were provided. The brand identity here
  (palette, logo mark, type pairing, components) was **created from scratch** for the
  product brief and should be treated as a v1 proposal to react to.

---

## Content fundamentals

**Voice: plain, warm, confident, never clinical.** Rinig speaks the way you'd want a
caption to read — short, concrete, immediately understood.

- **Tone:** calm and human. We are an accessibility tool, not a gadget. No hype, no
  exclamation-mark energy, no jargon ("AI-powered", "leverage", "seamless").
- **Person:** address the user as **you**; refer to the product as **Rinig** or **we**.
  ("Tap once and read." / "Captions stay on your device.")
- **Casing:** sentence case everywhere — headlines, buttons, labels. The only
  uppercase is the small tracked eyebrow label (e.g. `ACCESSIBILITY-FIRST`).
- **Length:** ruthlessly short. Headlines are 2–5 words ("Turn the room into words.",
  "Heard, in real time."). Body stays under ~25 words per sentence.
- **Tagline:** _"Turn the room into words."_ Secondary: _"Heard, in real time."_
- **Bilingual by nature:** English and Tagalog are equal citizens. Show both naturally
  (e.g. "Magsisimula ang miting" / "The meeting will begin"). Never treat Tagalog as a
  novelty or afterthought.
- **Emoji:** none. They reduce legibility and clutter the one screen that matters.
- **Numbers & units:** spell out spoken-style where it aids reading ("ten in the
  morning"), use digits for metadata ("14 min", "9:02 AM").
- **Buttons are verbs:** "Download free", "Tap to start captioning", "See it live".

**Examples**
- Hero: *"Turn the room into words."* + *"Real-time captions for everything spoken
  around you — accurate even when the speaker is across the room."*
- Empty/ready state: *"Ready"* · *"Tap to start captioning"*
- Feature: *"Captions stay accurate even when the speaker is far away or facing the
  other direction."*

---

## Visual foundations

**Overall vibe:** clean, warm, and high-contrast — a **white** canvas carrying ink
text and a single **yellow** (Beam) accent. White and yellow are the brand. The one
dark moment is the **caption stage** (the product heart), where huge white captions and
a yellow live-highlight sit on near-black for maximum legibility.

- **Color:** a near-white warm canvas (`--surface-page`, white cards) + ink text +
  **one** accent, **Beam** yellow (`#ffb81c`). **Yellow is the primary action** (yellow
  pill, ink text) and the live-caption highlight; the **dark ink pill** is the strong
  alternate. Amber **text** on white must use `--text-accent`/`--beam-700` for contrast.
  Borders are ink hairlines. No second hue, no gradients-as-brand. Dark surfaces appear
  only as the caption stage and the occasional inverted band.
- **Type:** **Atkinson Hyperlegible** (Braille Institute, built for low-vision reading)
  carries all UI, body, and captions — it _is_ the brand soul. **Hanken Grotesk** at
  weight 800 with tight negative tracking is the bold display/marketing voice. **Spline
  Sans Mono** for timestamps and technical metadata. Body minimum is **17px**, preferred
  reading size **20px**; captions are deliberately huge (36–64px).
- **Backgrounds:** mostly flat warm surfaces. The one atmospheric moment is a soft
  **amber radial bloom** behind the hero (the "listening glow") — used sparingly, never
  behind body copy, never as a card fill. No photography supplied yet; no textures,
  no full-bleed imagery in v1.
- **Animation:** calm and functional. Captions _appear_, they never bounce. Word reveal
  is ~80ms (must feel instant); UI transitions 120–200ms on a gentle ease-out. A
  breathing ring + amber glow signals "listening." Everything collapses to 0ms under
  `prefers-reduced-motion` (honored globally in `tokens/effects.css`).
- **Hover:** ink actions darken (`--action-hover`); accent lightens (`--accent-hover`);
  neutral surfaces gain a subtle fill; cards lift with a soft shadow + 2px translate.
- **Press:** buttons translate 1px down; the mic control scales to 0.96. No color
  inversion.
- **Borders:** 1px hairlines (`--border-subtle/-default`) on light; 2px ink borders for
  outline buttons and focused inputs. Focus is **always** a visible 3px Beam ring —
  never removed.
- **Shadows:** warm-tinted, low-spread, single soft tier (`--shadow-sm/md/lg`). Plus
  `--glow-beam` — the amber listening glow. No murky blue shadows.
- **Radii:** soft but confident — 8 (inputs) → 12 → 18 (cards) → 28 → 40 (hero panels);
  **pill** for every button, badge, and toggle. Cards = hairline border + generous
  radius + optional soft drop.
- **Transparency / blur:** used only on the caption stage — a bottom protection gradient
  behind the control bar and translucent white plates (`rgba(255,255,255,0.12)`) for
  secondary controls so they read on any background.
- **Layout:** 4px spacing grid, 96px section rhythm, content capped at 1200px (prose
  720px). Touch targets never below 48px; primary in-app controls 64px+.
- **Imagery vibe (when added):** warm, human, real rooms and faces — never cold or
  clinical stock. To be supplied.

---

## Iconography

- **System:** Rinig uses **inline stroke SVG icons** at a **2–2.4px stroke weight**,
  rounded caps and joins, sized to match text. They are drawn in `currentColor` so they
  inherit Beam / ink / white from context. This matches the hand-tuned product glyphs
  (mic, pause, waveform, language, save) used in `MicControl` and the UI kits.
- **No icon font, no sprite, no PNG icons** — keep them as inline SVG so they stay crisp
  and recolorable at the large sizes accessibility demands.
- **Substitution guidance:** if you need a broader icon set than the hand-drawn product
  glyphs, use **Lucide** (https://lucide.dev) from CDN — its 2px rounded stroke matches
  Rinig's exactly. _Flagged: Lucide is a substitute, not an original Rinig set._
- **Emoji:** never used. **Unicode glyphs** are not used as UI icons.
- **Logo mark:** `assets/rinig-mark.svg` (ink tile) and `assets/rinig-mark-amber.svg`
  (amber tile) — three stacked rounded bars reading as a live transcript, the middle
  (active) bar in Beam. Wordmark is set live in Hanken Grotesk 800 with a Beam period.

---

## Index / manifest

**Root**
- `styles.css` — entry point; `@import`s every token + font file.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `assets/` — `rinig-mark.svg`, `rinig-mark-amber.svg`, `illustration-listening.svg`,
  `illustration-empty.svg` (original geometric spot-illustrations from the bar motif).
- `SKILL.md` — Agent-Skills-compatible entry for downloading this system.

**Components** (`window.RinigDesignSystem_af960f.<Name>`)
- `components/core/` — `Button`, `IconButton`, `Badge`, `Card`, `Input`, `Switch`.
- `components/app/` — `AppBar`, `ListRow`, `Sheet` (bottom sheet), `Toast` (app chrome).
- `components/rinig/` — `LanguageToggle`, `CaptionLine`, `MicControl`, `TextSizeStepper`
  (the product primitives). Each has `.jsx` + `.d.ts` + `.prompt.md` and a directory `@dsCard`.

**Foundation cards** (`guidelines/*.card.html`) — Colors, Type, Spacing, Brand specimens
rendered in the Design System tab.

**Templates** (consumers copy these to start)
- `templates/caption-app/` — the live caption stage in an iPhone frame, composed from
  the components above (`CaptionApp.dc.html` + `ds-base.js`). Tweaks: caption size,
  translation line.

**UI kits**
- `ui_kits/app/` — the interactive caption app: onboarding / mic-permission → start
  screen → live caption stage, plus a settings bottom-sheet, transcript-detail view,
  and a save toast.
- `ui_kits/marketing/` — the editorial landing page.

## Contrast pairings (WCAG)

All product text clears WCAG AA; captions clear AAA. Safe pairings:
- `--text-strong` (#14110c) on `--surface-page` / `--surface-card` — AAA.
- `--text-body` (#342d22) on light surfaces — AAA.
- `--caption-text` (#fff) and `--caption-active` (#ffc94d) on `--caption-stage` — AAA.
- `--text-on-accent` (ink) on `--accent` (Beam) — AA for large/bold (use on pills/labels).
- Amber **text** on light must use `--text-accent` / `--beam-700` (#9a5b00), never `--beam-500`.

---

## Known substitutions / caveats

- **Fonts** are loaded from **Google Fonts** (Atkinson Hyperlegible, Hanken Grotesk,
  Spline Sans Mono) via `@import` in `tokens/fonts.css` — not self-hosted binaries. To
  ship offline, swap for self-hosted `@font-face` rules.
- **Icons** beyond the product glyphs default to **Lucide** (substitute).
- All brand decisions (Beam accent, logo mark, type pairing) are a from-scratch v1.
