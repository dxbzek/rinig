/* @ds-bundle: {"format":3,"namespace":"RinigDesignSystem_af960f","components":[{"name":"AppBar","sourcePath":"components/app/AppBar.jsx"},{"name":"ListRow","sourcePath":"components/app/ListRow.jsx"},{"name":"Sheet","sourcePath":"components/app/Sheet.jsx"},{"name":"Toast","sourcePath":"components/app/Toast.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"},{"name":"CaptionLine","sourcePath":"components/rinig/CaptionLine.jsx"},{"name":"LanguageToggle","sourcePath":"components/rinig/LanguageToggle.jsx"},{"name":"MicControl","sourcePath":"components/rinig/MicControl.jsx"},{"name":"TextSizeStepper","sourcePath":"components/rinig/TextSizeStepper.jsx"}],"sourceHashes":{"components/app/AppBar.jsx":"ade155eef788","components/app/ListRow.jsx":"f1518b39a4d1","components/app/Sheet.jsx":"784543f52918","components/app/Toast.jsx":"b9923f1fecc7","components/core/Badge.jsx":"76aa790fdf59","components/core/Button.jsx":"641b318aaad5","components/core/Card.jsx":"599077f3c46a","components/core/IconButton.jsx":"309a5fcc938f","components/core/Input.jsx":"f5e0730a7d22","components/core/Switch.jsx":"2bb70cb0297e","components/core/inject.js":"2631df09a034","components/rinig/CaptionLine.jsx":"81d4f4d96707","components/rinig/LanguageToggle.jsx":"16216f34125d","components/rinig/MicControl.jsx":"d5b9b8367e97","components/rinig/TextSizeStepper.jsx":"d182de799c44","ui_kits/app/App.jsx":"245edd10c6a0","ui_kits/app/CaptionStage.jsx":"a69da2138ce5","ui_kits/app/Onboarding.jsx":"1f6b58dcd512","ui_kits/app/SettingsSheet.jsx":"0632503f85e5","ui_kits/app/StartScreen.jsx":"0f28deb19e21","ui_kits/app/TranscriptDetail.jsx":"e36885bf452a","ui_kits/app/captions-data.js":"89632b5dd6e5","ui_kits/marketing/MarketingSite.jsx":"1bfc23babe91"},"inlinedExternals":[],"unexposedExports":[{"name":"injectOnce","sourcePath":"components/core/inject.js"}]} */

(() => {

const __ds_ns = (window.RinigDesignSystem_af960f = window.RinigDesignSystem_af960f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/inject.js
try { (() => {
// Injects a stylesheet once per id. Lets components ship real :hover/:focus-visible/
// :active/:disabled states (which inline styles can't express) while still
// referencing the design-system CSS custom properties. React-only, no deps.
function injectOnce(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
Object.assign(__ds_scope, { injectOnce });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/inject.js", error: String((e && e.message) || e) }); }

// components/app/AppBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-appbar {
  display: flex; align-items: center; gap: var(--space-3);
  min-height: 64px; padding: 0 var(--space-4);
  font-family: var(--font-sans); background: var(--surface-page);
  border-bottom: 1px solid var(--border-subtle); box-sizing: border-box;
}
.rin-appbar__lead, .rin-appbar__trail { display: flex; align-items: center; gap: var(--space-2); flex: none; }
.rin-appbar__title {
  flex: 1; min-width: 0; font-weight: var(--weight-bold);
  font-size: var(--text-title-md); color: var(--text-strong);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rin-appbar--center .rin-appbar__title { text-align: center; }
.rin-appbar--dark {
  background: transparent; border-bottom-color: transparent; color: var(--text-on-dark);
}
.rin-appbar--dark .rin-appbar__title { color: var(--text-on-dark); }
`;

/**
 * Top app bar with leading / trailing slots. `dark` variant for the caption stage.
 */
function AppBar({
  title,
  leading = null,
  trailing = null,
  center = false,
  dark = false,
  className = '',
  ...rest
}) {
  __ds_scope.injectOnce('rin-appbar-css', CSS);
  const cls = ['rin-appbar', center ? 'rin-appbar--center' : '', dark ? 'rin-appbar--dark' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("header", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "rin-appbar__lead"
  }, leading), /*#__PURE__*/React.createElement("span", {
    className: "rin-appbar__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "rin-appbar__trail"
  }, trailing));
}
Object.assign(__ds_scope, { AppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/AppBar.jsx", error: String((e && e.message) || e) }); }

// components/app/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-listrow {
  display: flex; align-items: center; gap: var(--space-4);
  width: 100%; box-sizing: border-box;
  min-height: var(--tap-min); padding: var(--space-3) var(--space-2);
  font-family: var(--font-sans); text-align: left;
  background: transparent; border: none; border-radius: var(--radius-md);
  color: var(--text-body); cursor: default;
}
button.rin-listrow { cursor: pointer; }
button.rin-listrow:hover { background: var(--surface-sunken); }
button.rin-listrow:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.rin-listrow__icon {
  flex: none; width: 44px; height: 44px; border-radius: 12px;
  display: grid; place-items: center;
  background: var(--surface-strong); color: var(--text-strong);
}
.rin-listrow__icon svg { width: 22px; height: 22px; }
.rin-listrow__body { flex: 1; min-width: 0; }
.rin-listrow__title { display: block; font-size: var(--text-title-md); font-weight: var(--weight-bold); color: var(--text-strong); }
.rin-listrow__meta { display: block; margin-top: 2px; font-size: var(--text-body-md); color: var(--text-muted); }
.rin-listrow__trail { flex: none; display: flex; align-items: center; gap: var(--space-2); color: var(--text-muted); }
`;
const Chevron = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  width: "22",
  height: "22",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9 6l6 6-6 6",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/**
 * List row: optional leading icon plate, title + meta, trailing slot.
 * Renders as a button (with hover/focus) when `onClick` is supplied.
 */
function ListRow({
  icon = null,
  title,
  meta,
  trailing,
  chevron = false,
  onClick,
  className = '',
  ...rest
}) {
  __ds_scope.injectOnce('rin-listrow-css', CSS);
  const As = onClick ? 'button' : 'div';
  return /*#__PURE__*/React.createElement(As, _extends({
    className: ['rin-listrow', className].filter(Boolean).join(' '),
    onClick: onClick,
    type: onClick ? 'button' : undefined
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "rin-listrow__icon"
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: "rin-listrow__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rin-listrow__title"
  }, title), meta != null && /*#__PURE__*/React.createElement("span", {
    className: "rin-listrow__meta"
  }, meta)), (trailing || chevron) && /*#__PURE__*/React.createElement("span", {
    className: "rin-listrow__trail"
  }, trailing, chevron && Chevron));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/app/Sheet.jsx
try { (() => {
const CSS = `
.rin-sheet__scrim {
  position: absolute; inset: 0; z-index: 60;
  background: rgba(10, 9, 8, 0.5);
  opacity: 0; pointer-events: none;
  transition: opacity var(--dur-base) var(--ease-out);
}
.rin-sheet__scrim--open { opacity: 1; pointer-events: auto; }
.rin-sheet {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 61;
  background: var(--surface-card); color: var(--text-body);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  box-shadow: var(--shadow-lg);
  transform: translateY(100%);
  transition: transform var(--dur-base) var(--ease-out);
  max-height: 88%; display: flex; flex-direction: column;
}
.rin-sheet__scrim--open .rin-sheet { transform: translateY(0); }
.rin-sheet__grip { width: 40px; height: 5px; border-radius: 999px; background: var(--border-default); margin: 10px auto 2px; flex: none; }
.rin-sheet__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-3) var(--space-5) var(--space-2);
}
.rin-sheet__title { font-family: var(--font-display); font-weight: var(--weight-display); font-size: var(--text-display-sm); letter-spacing: -0.02em; color: var(--text-strong); margin: 0; }
.rin-sheet__body { padding: var(--space-2) var(--space-5) var(--space-8); overflow-y: auto; }
@media (prefers-reduced-motion: reduce) { .rin-sheet, .rin-sheet__scrim { transition: none; } }
`;

/**
 * Bottom sheet with scrim + drag grip. Positions itself absolutely, so the
 * nearest positioned ancestor (your phone screen) clips it. `open` controlled.
 */
function Sheet({
  open,
  onClose,
  title,
  children,
  className = ''
}) {
  __ds_scope.injectOnce('rin-sheet-css', CSS);
  return /*#__PURE__*/React.createElement("div", {
    className: ['rin-sheet__scrim', open ? 'rin-sheet__scrim--open' : ''].join(' '),
    onClick: onClose,
    "aria-hidden": !open
  }, /*#__PURE__*/React.createElement("div", {
    className: ['rin-sheet', className].filter(Boolean).join(' '),
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("span", {
    className: "rin-sheet__grip",
    "aria-hidden": "true"
  }), title != null && /*#__PURE__*/React.createElement("div", {
    className: "rin-sheet__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "rin-sheet__title"
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "rin-sheet__body"
  }, children)));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/app/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-toast {
  display: inline-flex; align-items: center; gap: var(--space-3);
  max-width: 92%; box-sizing: border-box;
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-sans); font-size: var(--text-body-md); font-weight: var(--weight-bold);
  background: var(--ink-900); color: var(--text-on-dark);
  border-radius: var(--radius-pill); box-shadow: var(--shadow-lg);
}
.rin-toast__icon { flex: none; display: grid; place-items: center; }
.rin-toast__icon svg { width: 20px; height: 20px; }
.rin-toast--success .rin-toast__icon { color: var(--success-500); }
.rin-toast--danger  .rin-toast__icon { color: var(--danger-500); }
.rin-toast--accent  .rin-toast__icon { color: var(--beam-400); }

/* optional auto-positioning host */
.rin-toast__host {
  position: absolute; left: 0; right: 0; bottom: var(--space-12); z-index: 70;
  display: flex; justify-content: center; pointer-events: none;
}
.rin-toast__host .rin-toast { pointer-events: auto; animation: rin-toast-in var(--dur-base) var(--ease-out); }
@keyframes rin-toast-in { from { transform: translateY(12px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .rin-toast__host .rin-toast { animation: none; } }
`;
const ICONS = {
  success: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5l4.5 4.5L19 7",
    stroke: "currentColor",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  danger: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 7v6M12 16.5v.5",
    stroke: "currentColor",
    strokeWidth: "2.6",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeWidth: "2"
  })),
  accent: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v3M12 18v3M5 12H2M22 12h-3",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4",
    fill: "currentColor"
  }))
};

/**
 * Snackbar pill. Pass `hosted` to drop it in an auto-centered bottom host
 * (inside the nearest positioned ancestor); otherwise place it yourself.
 */
function Toast({
  tone = 'neutral',
  icon,
  hosted = false,
  children,
  className = '',
  ...rest
}) {
  __ds_scope.injectOnce('rin-toast-css', CSS);
  const glyph = icon !== undefined ? icon : ICONS[tone];
  const pill = /*#__PURE__*/React.createElement("div", _extends({
    className: ['rin-toast', `rin-toast--${tone}`, className].filter(Boolean).join(' '),
    role: "status"
  }, rest), glyph && /*#__PURE__*/React.createElement("span", {
    className: "rin-toast__icon"
  }, glyph), /*#__PURE__*/React.createElement("span", null, children));
  return hosted ? /*#__PURE__*/React.createElement("div", {
    className: "rin-toast__host"
  }, pill) : pill;
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/Toast.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-badge {
  display: inline-flex; align-items: center; gap: var(--space-2);
  height: 28px; padding: 0 var(--space-3);
  font-family: var(--font-sans); font-size: var(--text-body-sm);
  font-weight: var(--weight-bold); line-height: 1;
  border-radius: var(--radius-pill); white-space: nowrap;
}
.rin-badge--label { text-transform: uppercase; letter-spacing: var(--tracking-label); font-size: var(--text-label); }
.rin-badge--neutral { background: var(--surface-strong); color: var(--text-strong); }
.rin-badge--accent  { background: var(--beam-200); color: var(--beam-700); }
.rin-badge--success { background: var(--success-100); color: var(--success-600); }
.rin-badge--danger  { background: var(--danger-100); color: var(--danger-600); }
.rin-badge--info    { background: var(--info-100); color: var(--info-600); }
.rin-badge--live    { background: var(--ink-900); color: var(--white); }
.rin-badge--live .rin-badge__dot {
  width: 8px; height: 8px; border-radius: 50%; background: var(--danger-500);
  animation: rin-pulse 1.4s var(--ease-in-out) infinite;
}
@keyframes rin-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
@media (prefers-reduced-motion: reduce) { .rin-badge--live .rin-badge__dot { animation: none; } }
`;

/**
 * Small pill label. The `live` tone carries a pulsing dot for the
 * "captioning now" indicator.
 */
function Badge({
  tone = 'neutral',
  uppercase = false,
  className = '',
  children,
  ...rest
}) {
  __ds_scope.injectOnce('rin-badge-css', CSS);
  const cls = ['rin-badge', `rin-badge--${tone}`, uppercase ? 'rin-badge--label' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), tone === 'live' && /*#__PURE__*/React.createElement("span", {
    className: "rin-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-btn {
  --_h: var(--control-md);
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2);
  min-height: var(--_h); height: var(--_h);
  padding: 0 var(--space-6);
  font-family: var(--font-sans);
  font-size: var(--text-body-md);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-normal);
  line-height: 1;
  border: 2px solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.rin-btn:active { transform: translateY(1px); }
.rin-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.rin-btn[disabled] { cursor: not-allowed; opacity: 0.45; transform: none; }
.rin-btn--full { width: 100%; }

/* sizes */
.rin-btn--sm { --_h: var(--control-sm); font-size: var(--text-body-sm); padding: 0 var(--space-4); }
.rin-btn--lg { --_h: var(--control-lg); font-size: var(--text-body-lg); padding: 0 var(--space-8); }

/* primary — YELLOW pill, ink text (the brand action) */
.rin-btn--primary { background: var(--action); color: var(--text-on-action); }
.rin-btn--primary:hover:not([disabled]) { background: var(--action-hover); }
.rin-btn--primary:active:not([disabled]) { background: var(--action-active); }

/* accent — INK (dark) solid pill, white text (the strong alternate) */
.rin-btn--accent { background: var(--surface-inverse); color: var(--text-on-dark); }
.rin-btn--accent:hover:not([disabled]) { background: var(--ink-800); }
.rin-btn--accent:active:not([disabled]) { background: var(--ink-950); }

/* outline — ink border */
.rin-btn--outline { background: transparent; color: var(--text-strong); border-color: var(--border-strong); }
.rin-btn--outline:hover:not([disabled]) { background: var(--surface-strong); }

/* ghost — quiet text action */
.rin-btn--ghost { background: transparent; color: var(--text-strong); }
.rin-btn--ghost:hover:not([disabled]) { background: var(--surface-strong); }
`;

/**
 * Rinig primary button. Pill geometry always; ink is the primary action,
 * Beam (accent) is reserved for the single most important call to action.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  as: As = 'button',
  className = '',
  children,
  ...rest
}) {
  __ds_scope.injectOnce('rin-btn-css', CSS);
  const cls = ['rin-btn', `rin-btn--${variant}`, size !== 'md' ? `rin-btn--${size}` : '', fullWidth ? 'rin-btn--full' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(As, _extends({
    className: cls
  }, rest), iconLeft, children != null && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-card {
  background: var(--surface-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  color: var(--text-body);
  overflow: clip;
}
.rin-card--pad { padding: var(--space-6); }
.rin-card--flat { box-shadow: none; }
.rin-card--raised { box-shadow: var(--shadow-md); border-color: transparent; }
.rin-card--interactive { cursor: pointer; transition: box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
.rin-card--interactive:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.rin-card--inverse { background: var(--surface-inverse); color: var(--text-on-dark); border-color: transparent; }
`;

/**
 * Surface container. Hairline + optional soft drop, generous radius.
 */
function Card({
  elevation = 'flat',
  padded = true,
  interactive = false,
  inverse = false,
  as: As = 'div',
  className = '',
  children,
  ...rest
}) {
  __ds_scope.injectOnce('rin-card-css', CSS);
  const cls = ['rin-card', `rin-card--${elevation}`, padded ? 'rin-card--pad' : '', interactive ? 'rin-card--interactive' : '', inverse ? 'rin-card--inverse' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(As, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-iconbtn {
  --_s: var(--control-md);
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--_s); height: var(--_s);
  padding: 0; border: 2px solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer; color: var(--text-strong);
  background: transparent;
  transition: background-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.rin-iconbtn svg { width: 45%; height: 45%; display: block; }
.rin-iconbtn:active { transform: translateY(1px); }
.rin-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.rin-iconbtn[disabled] { cursor: not-allowed; opacity: 0.4; }
.rin-iconbtn--sm { --_s: var(--control-sm); }
.rin-iconbtn--lg { --_s: var(--control-lg); }

.rin-iconbtn--solid  { background: var(--action); color: var(--text-on-action); }
.rin-iconbtn--solid:hover:not([disabled])  { background: var(--action-hover); }
.rin-iconbtn--accent { background: var(--accent); color: var(--text-on-accent); }
.rin-iconbtn--accent:hover:not([disabled]) { background: var(--accent-hover); }
.rin-iconbtn--soft   { background: var(--surface-strong); color: var(--text-strong); }
.rin-iconbtn--soft:hover:not([disabled])   { background: var(--border-default); }
.rin-iconbtn--ghost:hover:not([disabled])  { background: var(--surface-strong); }
`;

/**
 * Icon-only button. Always pass `aria-label` — there is no visible text.
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  __ds_scope.injectOnce('rin-iconbtn-css', CSS);
  const cls = ['rin-iconbtn', `rin-iconbtn--${variant}`, size !== 'md' ? `rin-iconbtn--${size}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-field { display: flex; flex-direction: column; gap: var(--space-2); font-family: var(--font-sans); }
.rin-field__label { font-size: var(--text-body-md); font-weight: var(--weight-bold); color: var(--text-strong); }
.rin-field__hint { font-size: var(--text-body-sm); color: var(--text-muted); }
.rin-field__hint--error { color: var(--danger-600); font-weight: var(--weight-bold); }
.rin-input {
  width: 100%; box-sizing: border-box;
  min-height: var(--control-md);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans); font-size: var(--text-body-lg);
  color: var(--text-strong); background: var(--surface-card);
  border: 2px solid var(--border-default); border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.rin-input::placeholder { color: var(--text-disabled); }
.rin-input:hover:not(:disabled) { border-color: var(--ink-300); }
.rin-input:focus { outline: none; border-color: var(--ink-900); box-shadow: var(--focus-ring); }
.rin-input:disabled { background: var(--surface-sunken); cursor: not-allowed; opacity: 0.7; }
.rin-input--error { border-color: var(--danger-500); }
.rin-input--error:focus { box-shadow: 0 0 0 3px var(--danger-100); }
`;

/**
 * Labeled text input. Large (20px) text by default for low-vision legibility.
 */
function Input({
  label,
  hint,
  error,
  id,
  className = '',
  ...rest
}) {
  __ds_scope.injectOnce('rin-input-css', CSS);
  const inputId = id || `rin-input-${Math.random().toString(36).slice(2, 8)}`;
  const describedBy = hint || error ? `${inputId}-hint` : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: "rin-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "rin-field__label",
    htmlFor: inputId
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: ['rin-input', error ? 'rin-input--error' : '', className].filter(Boolean).join(' '),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy
  }, rest)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    id: describedBy,
    className: `rin-field__hint ${error ? 'rin-field__hint--error' : ''}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-switch { display: inline-flex; align-items: center; gap: var(--space-3); cursor: pointer; font-family: var(--font-sans); }
.rin-switch__input { position: absolute; opacity: 0; width: 0; height: 0; }
.rin-switch__track {
  position: relative; flex: none;
  width: 60px; height: 34px; border-radius: var(--radius-pill);
  background: var(--ink-300); transition: background-color var(--dur-base) var(--ease-out);
}
.rin-switch__thumb {
  position: absolute; top: 3px; left: 3px;
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--white); box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-out);
}
.rin-switch__input:checked + .rin-switch__track { background: var(--success-500); }
.rin-switch__input:checked + .rin-switch__track .rin-switch__thumb { transform: translateX(26px); }
.rin-switch__input:focus-visible + .rin-switch__track { box-shadow: var(--focus-ring); }
.rin-switch__input:disabled + .rin-switch__track { opacity: 0.45; }
.rin-switch__label { font-size: var(--text-body-md); font-weight: var(--weight-bold); color: var(--text-strong); }
`;

/**
 * Accessible on/off switch. 60×34 track — comfortably above 44px tap zone
 * with its label.
 */
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled,
  id,
  ...rest
}) {
  __ds_scope.injectOnce('rin-switch-css', CSS);
  const sid = id || `rin-switch-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("label", {
    className: "rin-switch",
    htmlFor: sid
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: sid,
    type: "checkbox",
    role: "switch",
    className: "rin-switch__input",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "rin-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rin-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "rin-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

// components/rinig/CaptionLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-caption { font-family: var(--font-sans); margin: 0; }
.rin-caption__speaker {
  display: block; font-size: var(--text-body-md); font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--caption-meta); margin-bottom: var(--space-2);
}
.rin-caption__text {
  font-weight: var(--weight-bold); line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight); text-wrap: pretty;
}
/* size steps map to how far the speaker is / room mode */
.rin-caption--xl .rin-caption__text { font-size: var(--text-caption-xl); }
.rin-caption--lg .rin-caption__text { font-size: var(--text-caption-lg); }
.rin-caption--md .rin-caption__text { font-size: var(--text-caption-md); }
.rin-caption--sm .rin-caption__text { font-size: var(--text-caption-sm); }
/* state: settled (full white), active (current phrase = beam), history (dim) */
.rin-caption--settled .rin-caption__text { color: var(--caption-text); }
.rin-caption--history .rin-caption__text { color: var(--caption-dim); }
.rin-caption--active .rin-caption__text { color: var(--caption-text); }
.rin-caption__live { color: var(--caption-active); }
/* the in-progress word gets a soft underline cursor */
.rin-caption__cursor {
  display: inline-block; width: 0.5ch; height: 1em; margin-left: 2px;
  background: var(--caption-active); vertical-align: -0.12em; border-radius: 2px;
  animation: rin-caret 1s steps(2) infinite;
}
@keyframes rin-caret { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .rin-caption__cursor { animation: none; } }
/* optional translation line under the primary */
.rin-caption__translation {
  display: block; margin-top: var(--space-2);
  font-size: var(--text-caption-md); font-weight: var(--weight-regular);
  color: var(--caption-meta); line-height: var(--leading-snug);
}
`;

/**
 * One line of live transcript on the caption stage. `live` text (the phrase
 * currently being spoken) renders in Beam; settled text is white; history dims.
 */
function CaptionLine({
  size = 'xl',
  state = 'settled',
  speaker,
  text,
  live,
  showCursor = false,
  translation,
  className = '',
  ...rest
}) {
  __ds_scope.injectOnce('rin-caption-css', CSS);
  const cls = ['rin-caption', `rin-caption--${size}`, `rin-caption--${state}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("p", _extends({
    className: cls,
    "aria-live": state === 'active' ? 'polite' : undefined
  }, rest), speaker && /*#__PURE__*/React.createElement("span", {
    className: "rin-caption__speaker"
  }, speaker), /*#__PURE__*/React.createElement("span", {
    className: "rin-caption__text"
  }, text, live && /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("span", {
    className: "rin-caption__live"
  }, live)), showCursor && /*#__PURE__*/React.createElement("span", {
    className: "rin-caption__cursor",
    "aria-hidden": "true"
  })), translation && /*#__PURE__*/React.createElement("span", {
    className: "rin-caption__translation"
  }, translation));
}
Object.assign(__ds_scope, { CaptionLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/rinig/CaptionLine.jsx", error: String((e && e.message) || e) }); }

// components/rinig/LanguageToggle.jsx
try { (() => {
const CSS = `
.rin-langtoggle {
  display: inline-flex; padding: 4px; gap: 4px;
  background: var(--surface-strong); border-radius: var(--radius-pill);
}
.rin-langtoggle--dark { background: rgba(255,255,255,0.1); }
.rin-langtoggle__opt {
  appearance: none; border: none; cursor: pointer;
  min-height: 44px; padding: 0 var(--space-5);
  font-family: var(--font-sans); font-size: var(--text-body-md); font-weight: var(--weight-bold);
  color: var(--text-muted); background: transparent;
  border-radius: var(--radius-pill);
  display: inline-flex; align-items: center; gap: var(--space-2);
  transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.rin-langtoggle--dark .rin-langtoggle__opt { color: var(--text-on-dark-muted); }
.rin-langtoggle__opt:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.rin-langtoggle__opt[aria-pressed="true"] {
  background: var(--surface-card); color: var(--text-strong); box-shadow: var(--shadow-xs);
}
.rin-langtoggle--dark .rin-langtoggle__opt[aria-pressed="true"] {
  background: var(--beam-500); color: var(--ink-900); box-shadow: none;
}
.rin-langtoggle__code { font-family: var(--font-mono); font-size: var(--text-body-sm); opacity: 0.7; }
`;
const DEFAULT = [{
  value: 'en',
  label: 'English',
  code: 'EN'
}, {
  value: 'tl',
  label: 'Tagalog',
  code: 'TL'
}];

/**
 * Segmented language selector. Defaults to Rinig's core pair: English ⇄ Tagalog.
 * `dark` variant for placement on the caption stage.
 */
function LanguageToggle({
  value,
  onChange,
  options = DEFAULT,
  dark = false,
  className = ''
}) {
  __ds_scope.injectOnce('rin-langtoggle-css', CSS);
  return /*#__PURE__*/React.createElement("div", {
    className: ['rin-langtoggle', dark ? 'rin-langtoggle--dark' : '', className].filter(Boolean).join(' '),
    role: "group",
    "aria-label": "Caption language"
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.value,
    type: "button",
    className: "rin-langtoggle__opt",
    "aria-pressed": value === opt.value,
    onClick: () => onChange && onChange(opt.value)
  }, opt.label, opt.code && /*#__PURE__*/React.createElement("span", {
    className: "rin-langtoggle__code",
    "aria-hidden": "true"
  }, opt.code))));
}
Object.assign(__ds_scope, { LanguageToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/rinig/LanguageToggle.jsx", error: String((e && e.message) || e) }); }

// components/rinig/MicControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.rin-mic { display: inline-flex; flex-direction: column; align-items: center; gap: var(--space-3); font-family: var(--font-sans); }
.rin-mic__btn {
  position: relative; appearance: none; border: none; cursor: pointer;
  width: 112px; height: 112px; border-radius: 50%;
  display: grid; place-items: center;
  background: var(--beam-500); color: var(--ink-900);
  transition: background-color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.rin-mic__btn svg { width: 44px; height: 44px; }
.rin-mic__btn:active { transform: scale(0.96); }
.rin-mic__btn:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--caption-stage, #0a0908), 0 0 0 8px var(--beam-500); }
.rin-mic--sm .rin-mic__btn { width: 72px; height: 72px; }
.rin-mic--sm .rin-mic__btn svg { width: 30px; height: 30px; }

/* listening: amber glow + breathing ring */
.rin-mic--listening .rin-mic__btn { box-shadow: var(--glow-beam); }
.rin-mic--listening .rin-mic__ring {
  position: absolute; inset: -10px; border-radius: 50%;
  border: 3px solid var(--beam-400); opacity: 0;
  animation: rin-mic-pulse 1.8s var(--ease-out) infinite;
}
@keyframes rin-mic-pulse { 0% { transform: scale(0.92); opacity: 0.7; } 100% { transform: scale(1.25); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .rin-mic__ring { animation: none !important; display: none; } }

/* paused: neutral plate */
.rin-mic--paused .rin-mic__btn { background: var(--surface-strong); color: var(--text-strong); }

.rin-mic__label { font-size: var(--text-body-md); font-weight: var(--weight-bold); color: var(--caption-meta, var(--text-muted)); }
`;
const MicGlyph = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("rect", {
  x: "9",
  y: "2.5",
  width: "6",
  height: "12",
  rx: "3",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}));
const PauseGlyph = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1.5"
}));

/**
 * The big in-app listen control. Beam amber when listening (with a breathing
 * ring + glow); neutral plate when paused. The single most prominent action
 * in the caption app.
 */
function MicControl({
  listening = false,
  onToggle,
  size = 'lg',
  label,
  className = '',
  ...rest
}) {
  __ds_scope.injectOnce('rin-mic-css', CSS);
  const state = listening ? 'listening' : 'paused';
  const auto = listening ? 'Pause' : 'Tap to listen';
  return /*#__PURE__*/React.createElement("div", {
    className: ['rin-mic', `rin-mic--${state}`, size === 'sm' ? 'rin-mic--sm' : '', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "rin-mic__btn",
    "aria-pressed": listening,
    "aria-label": listening ? 'Pause captioning' : 'Start captioning',
    onClick: onToggle
  }, rest), listening && /*#__PURE__*/React.createElement("span", {
    className: "rin-mic__ring",
    "aria-hidden": "true"
  }), listening ? PauseGlyph : MicGlyph), /*#__PURE__*/React.createElement("span", {
    className: "rin-mic__label"
  }, label != null ? label : auto));
}
Object.assign(__ds_scope, { MicControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/rinig/MicControl.jsx", error: String((e && e.message) || e) }); }

// components/rinig/TextSizeStepper.jsx
try { (() => {
const CSS = `
.rin-stepper { display: inline-flex; align-items: center; gap: var(--space-3); font-family: var(--font-sans); }
.rin-stepper__btn {
  appearance: none; border: 2px solid var(--border-strong); background: var(--surface-card);
  color: var(--text-strong); cursor: pointer;
  width: var(--tap-min); height: var(--tap-min); border-radius: var(--radius-pill);
  display: grid; place-items: center; font-family: var(--font-display); font-weight: var(--weight-display);
  transition: background-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.rin-stepper__btn:hover:not(:disabled) { background: var(--surface-strong); }
.rin-stepper__btn:active:not(:disabled) { transform: translateY(1px); }
.rin-stepper__btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.rin-stepper__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.rin-stepper__a-sm { font-size: 15px; }
.rin-stepper__a-lg { font-size: 24px; }
.rin-stepper__value {
  min-width: 84px; text-align: center; font-family: var(--font-mono);
  font-size: var(--text-body-md); font-weight: var(--weight-medium); color: var(--text-muted);
}
/* dark caption-stage treatment */
.rin-stepper--dark .rin-stepper__btn { background: rgba(255,255,255,0.12); border-color: transparent; color: var(--text-on-dark); }
.rin-stepper--dark .rin-stepper__btn:hover:not(:disabled) { background: rgba(255,255,255,0.2); }
.rin-stepper--dark .rin-stepper__value { color: var(--caption-meta); }
`;
const STEPS = ['Small', 'Medium', 'Large', 'Huge'];

/**
 * Accessible text-size stepper (A− / A+). Controlled by `value` = index into
 * the step labels. The single most-used accessibility control in the app.
 */
function TextSizeStepper({
  value = 1,
  onChange,
  steps = STEPS,
  dark = false,
  className = ''
}) {
  __ds_scope.injectOnce('rin-stepper-css', CSS);
  const set = next => {
    if (next >= 0 && next < steps.length && onChange) onChange(next);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: ['rin-stepper', dark ? 'rin-stepper--dark' : '', className].filter(Boolean).join(' '),
    role: "group",
    "aria-label": "Caption text size"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rin-stepper__btn",
    "aria-label": "Smaller text",
    disabled: value <= 0,
    onClick: () => set(value - 1)
  }, /*#__PURE__*/React.createElement("span", {
    className: "rin-stepper__a-sm"
  }, "A")), /*#__PURE__*/React.createElement("span", {
    className: "rin-stepper__value",
    "aria-live": "polite"
  }, steps[value]), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rin-stepper__btn",
    "aria-label": "Larger text",
    disabled: value >= steps.length - 1,
    onClick: () => set(value + 1)
  }, /*#__PURE__*/React.createElement("span", {
    className: "rin-stepper__a-lg"
  }, "A")));
}
Object.assign(__ds_scope, { TextSizeStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/rinig/TextSizeStepper.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/App.jsx
try { (() => {
// App shell — onboarding → start → live stage, with transcript detail,
// a shared settings sheet, and a save toast.
function RinigApp() {
  const {
    Toast
  } = window.RinigDesignSystem_af960f;
  const [screen, setScreen] = React.useState('onboard'); // onboard | start | live | detail
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [session, setSession] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [settings, setSettings] = React.useState({
    lang: 'en',
    size: 'xl',
    translate: true,
    contrast: false,
    save: true
  });
  const toastTimer = React.useRef(null);
  const showToast = msg => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, screen === 'onboard' && /*#__PURE__*/React.createElement(Onboarding, {
    onAllow: () => setScreen('start')
  }), screen === 'start' && /*#__PURE__*/React.createElement(StartScreen, {
    settings: settings,
    setSettings: setSettings,
    onStart: () => setScreen('live'),
    onOpenSettings: () => setSettingsOpen(true),
    onOpenSession: s => {
      setSession(s);
      setScreen('detail');
    }
  }), screen === 'live' && /*#__PURE__*/React.createElement(CaptionStage, {
    settings: settings,
    setSettings: setSettings,
    onExit: () => setScreen('start'),
    onOpenSettings: () => setSettingsOpen(true),
    onSave: () => showToast('Transcript saved')
  }), screen === 'detail' && session && /*#__PURE__*/React.createElement(TranscriptDetail, {
    session: session,
    onBack: () => setScreen('start'),
    onShare: () => showToast('Share link copied')
  }), /*#__PURE__*/React.createElement(SettingsSheet, {
    open: settingsOpen,
    onClose: () => setSettingsOpen(false),
    settings: settings,
    setSettings: setSettings
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    hosted: true
  }, toast));
}
window.RinigApp = RinigApp;
(function mount() {
  const el = document.getElementById('app-root');
  if (el && window.RinigApp) ReactDOM.createRoot(el).render(React.createElement(window.RinigApp));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CaptionStage.jsx
try { (() => {
// Rinig caption stage — the live screen. Streams the script word-by-word.
function CaptionStage({
  settings,
  setSettings,
  onExit,
  onOpenSettings,
  onSave
}) {
  const {
    CaptionLine,
    LanguageToggle,
    MicControl,
    Badge,
    IconButton,
    AppBar
  } = window.RinigDesignSystem_af960f;
  const SCRIPT = window.RINIG_SCRIPT;
  const [listening, setListening] = React.useState(true);
  const [seg, setSeg] = React.useState(0);
  const [nWords, setNWords] = React.useState(2);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (!listening) return;
    const cur = SCRIPT[seg];
    const id = setInterval(() => {
      setNWords(w => {
        if (w >= cur.words.length) {
          setSeg(s => (s + 1) % SCRIPT.length);
          return 2;
        }
        return w + 1;
      });
    }, 360);
    return () => clearInterval(id);
  }, [listening, seg]);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [seg, nWords]);
  const cur = SCRIPT[seg];
  const settled = cur.words.slice(0, Math.max(0, nWords - 2)).join(' ');
  const live = cur.words.slice(Math.max(0, nWords - 2), nWords).join(' ');
  const history = [];
  for (let i = 1; i <= 2; i++) history.unshift(SCRIPT[(seg - i + SCRIPT.length) % SCRIPT.length]);
  const Close = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }));
  const Gear = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3.2",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
  const Save = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 4h11l3 3v13H5z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 4v5h7",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }));
  const stageBg = settings.contrast ? '#000' : 'var(--caption-stage)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: stageBg,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '18px'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    dark: true,
    leading: /*#__PURE__*/React.createElement(Badge, {
      tone: "live"
    }, "Captioning"),
    trailing: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LanguageToggle, {
      value: settings.lang,
      onChange: v => setSettings(s => ({
        ...s,
        lang: v
      })),
      dark: true
    }), /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "End captioning",
      variant: "ghost",
      onClick: onExit,
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Close, null)))
  })), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 22px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: '18px'
    }
  }, history.map((h, i) => /*#__PURE__*/React.createElement(CaptionLine, {
    key: 'h' + seg + i,
    size: "md",
    state: "history",
    speaker: h.speaker,
    text: h.words.join(' ')
  })), /*#__PURE__*/React.createElement(CaptionLine, {
    size: settings.size,
    state: "active",
    speaker: cur.speaker,
    text: settled,
    live: listening ? live : '',
    showCursor: listening,
    translation: settings.translate ? cur.translation : undefined
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '28px',
      padding: '18px 18px 30px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Caption settings",
    variant: "soft",
    size: "lg",
    onClick: onOpenSettings,
    style: {
      background: 'rgba(255,255,255,0.12)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(Gear, null)), /*#__PURE__*/React.createElement(MicControl, {
    listening: listening,
    onToggle: () => setListening(v => !v)
  }), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Save transcript",
    variant: "soft",
    size: "lg",
    onClick: onSave,
    style: {
      background: 'rgba(255,255,255,0.12)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(Save, null))));
}
window.CaptionStage = CaptionStage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CaptionStage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Onboarding.jsx
try { (() => {
// First-run / mic-permission screen.
function Onboarding({
  onAllow
}) {
  const {
    Button
  } = window.RinigDesignSystem_af960f;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-page)',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 24px 28px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/rinig-mark.svg",
    alt: "",
    width: "34",
    height: "34",
    style: {
      borderRadius: '9px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '22px',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Rinig", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--beam-500)'
    }
  }, "."))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: '24px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustration-listening.svg",
    alt: "",
    width: "240"
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '34px',
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: 0
    }
  }, "Turn the room", /*#__PURE__*/React.createElement("br", null), "into words"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.5,
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: '30ch'
    }
  }, "Rinig listens with your microphone and shows large, real-time captions in English and Tagalog.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    onClick: onAllow
  }, "Allow microphone"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Audio is processed on your device. Nothing is recorded unless you save it.")));
}
window.Onboarding = Onboarding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/SettingsSheet.jsx
try { (() => {
// Shared settings bottom-sheet — used from the start screen and the live stage.
function SettingsSheet({
  open,
  onClose,
  settings,
  setSettings
}) {
  const {
    Sheet,
    ListRow,
    Switch,
    TextSizeStepper,
    LanguageToggle
  } = window.RinigDesignSystem_af960f;
  const SIZE_TO_IDX = {
    lg: 2,
    xl: 3
  };
  const IDX_TO_SIZE = {
    0: 'md',
    1: 'md',
    2: 'lg',
    3: 'xl'
  };
  const sizeIdx = SIZE_TO_IDX[settings.size] ?? 2;
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    title: "Caption settings"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 8px 14px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: labelStyle
  }, "Text size"), /*#__PURE__*/React.createElement(TextSizeStepper, {
    value: sizeIdx,
    onChange: i => setSettings(s => ({
      ...s,
      size: IDX_TO_SIZE[i]
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 8px 14px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: labelStyle
  }, "Language"), /*#__PURE__*/React.createElement(LanguageToggle, {
    value: settings.lang,
    onChange: v => setSettings(s => ({
      ...s,
      lang: v
    }))
  })), /*#__PURE__*/React.createElement(ListRow, {
    title: "Show translation line",
    meta: "Display the second language below",
    trailing: /*#__PURE__*/React.createElement(Switch, {
      checked: settings.translate,
      onChange: e => setSettings(s => ({
        ...s,
        translate: e.target.checked
      }))
    })
  }), /*#__PURE__*/React.createElement(ListRow, {
    title: "High-contrast captions",
    meta: "Maximum legibility on the stage",
    trailing: /*#__PURE__*/React.createElement(Switch, {
      checked: settings.contrast,
      onChange: e => setSettings(s => ({
        ...s,
        contrast: e.target.checked
      }))
    })
  }), /*#__PURE__*/React.createElement(ListRow, {
    title: "Save transcripts",
    meta: "Keep a copy on this device",
    trailing: /*#__PURE__*/React.createElement(Switch, {
      checked: settings.save,
      onChange: e => setSettings(s => ({
        ...s,
        save: e.target.checked
      }))
    })
  })));
}
const labelStyle = {
  margin: '0 0 10px',
  fontSize: 'var(--text-label)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--text-muted)'
};
window.SettingsSheet = SettingsSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/SettingsSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/StartScreen.jsx
try { (() => {
// Rinig start screen — calm, light, one obvious action.
function StartScreen({
  settings,
  setSettings,
  onStart,
  onOpenSettings,
  onOpenSession
}) {
  const {
    MicControl,
    LanguageToggle,
    AppBar,
    ListRow,
    IconButton,
    Badge
  } = window.RinigDesignSystem_af960f;
  const recents = window.RINIG_RECENTS;
  const Gear = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3.2",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
  const Clock = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
  const Logo = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/rinig-mark.svg",
    alt: "",
    width: "32",
    height: "32",
    style: {
      borderRadius: '8px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '22px',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Rinig", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--beam-500)'
    }
  }, ".")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-page)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '18px'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    leading: Logo,
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "Settings",
      variant: "soft",
      onClick: onOpenSettings
    }, /*#__PURE__*/React.createElement(Gear, null))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '22px',
      padding: '24px 20px 26px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '30px',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Turn the room", /*#__PURE__*/React.createElement("br", null), "into words"), /*#__PURE__*/React.createElement(LanguageToggle, {
    value: settings.lang,
    onChange: v => setSettings(s => ({
      ...s,
      lang: v
    }))
  }), /*#__PURE__*/React.createElement(MicControl, {
    listening: false,
    onToggle: onStart,
    label: "Tap to start captioning"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 28px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 12px 6px',
      fontSize: 'var(--text-label)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)'
    }
  }, "Recent sessions"), recents.map(r => /*#__PURE__*/React.createElement(ListRow, {
    key: r.id,
    icon: /*#__PURE__*/React.createElement(Clock, null),
    title: r.title,
    meta: r.meta,
    chevron: true,
    onClick: () => onOpenSession(r)
  }))));
}
window.StartScreen = StartScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/StartScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/TranscriptDetail.jsx
try { (() => {
// Saved-transcript detail view.
function TranscriptDetail({
  session,
  onBack,
  onShare
}) {
  const {
    AppBar,
    IconButton,
    Badge
  } = window.RinigDesignSystem_af960f;
  const Back = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 6l-6 6 6 6",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  const Share = () => /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 15V4M8.5 7.5L12 4l3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-page)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '18px'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    title: session.title,
    leading: /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "Back",
      variant: "ghost",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Back, null)),
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "Share transcript",
      variant: "soft",
      onClick: onShare
    }, /*#__PURE__*/React.createElement(Share, null))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 24px 10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, session.meta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, session.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }
  }, session.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-label)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)',
      marginBottom: '4px'
    }
  }, l.speaker), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.5,
      color: 'var(--text-strong)'
    }
  }, l.text)))));
}
window.TranscriptDetail = TranscriptDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/TranscriptDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/captions-data.js
try { (() => {
// Simulated live-transcript script for the Rinig app UI kit.
// Each segment streams in word-by-word to mimic real-time captioning.
window.RINIG_SCRIPT = [{
  speaker: 'Ana',
  lang: 'en',
  words: 'Good morning everyone, thanks so much for being here today.'.split(' '),
  translation: 'Magandang umaga sa lahat, salamat sa pagpunta ngayon.'
}, {
  speaker: 'Ana',
  lang: 'en',
  words: 'So the meeting will start at ten in the morning.'.split(' '),
  translation: 'Magsisimula ang miting nang alas-diyes ng umaga.'
}, {
  speaker: 'Marco',
  lang: 'en',
  words: 'Can everyone see the slides on the screen okay?'.split(' '),
  translation: 'Nakikita ba ng lahat ang slides sa screen?'
}, {
  speaker: 'Ana',
  lang: 'en',
  words: 'We will keep captions running for the whole session.'.split(' '),
  translation: 'Patuloy na tatakbo ang captions sa buong sesyon.'
}];
window.RINIG_RECENTS = [{
  id: 'standup',
  title: 'Team standup',
  meta: 'English → Tagalog · 14 min',
  when: 'Today, 9:02 AM',
  lines: [{
    speaker: 'Ana',
    text: 'Good morning everyone, thanks so much for being here today.'
  }, {
    speaker: 'Ana',
    text: 'So the meeting will start at ten in the morning.'
  }, {
    speaker: 'Marco',
    text: 'Can everyone see the slides on the screen okay?'
  }, {
    speaker: 'Ana',
    text: 'We will keep captions running for the whole session.'
  }]
}, {
  id: 'clinic',
  title: 'Clinic visit',
  meta: 'Tagalog → English · 32 min',
  when: 'Yesterday',
  lines: [{
    speaker: 'Doktor',
    text: 'Kumusta po kayo ngayong umaga?'
  }, {
    speaker: 'Ikaw',
    text: 'Mabuti naman po, salamat.'
  }, {
    speaker: 'Doktor',
    text: 'Inumin po ang gamot dalawang beses sa isang araw.'
  }]
}, {
  id: 'service',
  title: 'Sunday service',
  meta: 'English · 1 hr 6 min',
  when: 'Mar 16',
  lines: [{
    speaker: 'Pastor',
    text: 'Let us begin this morning with a moment of quiet.'
  }, {
    speaker: 'Pastor',
    text: 'Thank you all for coming, near and far.'
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/captions-data.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing/MarketingSite.jsx
try { (() => {
// Rinig marketing landing — composed from design-system primitives.
function MarketingSite() {
  const {
    Button,
    Badge,
    Card,
    CaptionLine,
    LanguageToggle
  } = window.RinigDesignSystem_af960f;
  const [lang, setLang] = React.useState('en');
  const Wordmark = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/rinig-mark-amber.svg",
    alt: "",
    width: "32",
    height: "32",
    style: {
      borderRadius: '8px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '22px',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Rinig", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--beam-500)'
    }
  }, ".")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '20px 32px'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '28px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#how",
    style: navLink
  }, "How it works"), /*#__PURE__*/React.createElement("a", {
    href: "#access",
    style: navLink
  }, "Accessibility"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    style: navLink
  }, "Pricing"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Get the app"))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '72px 32px 56px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '-80px',
      right: '-60px',
      width: '420px',
      height: '420px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(255,184,28,0.35), rgba(255,184,28,0) 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: '40px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    uppercase: true
  }, "English \xB7 Tagalog"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-2xl)',
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '18px 0 0'
    }
  }, "Turn the room", /*#__PURE__*/React.createElement("br", null), "into words."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.5,
      color: 'var(--text-body)',
      maxWidth: '30ch',
      margin: '22px 0 28px'
    }
  }, "Real-time captions for everything spoken around you \u2014 accurate even when the speaker is across the room."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg"
  }, "Download free"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg"
  }, "See it live"))), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'center',
      width: '320px',
      background: 'var(--caption-stage)',
      borderRadius: 'var(--radius-2xl)',
      padding: '24px 22px',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "live"
  }, "Captioning"), /*#__PURE__*/React.createElement(LanguageToggle, {
    value: lang,
    onChange: setLang,
    dark: true
  })), /*#__PURE__*/React.createElement(CaptionLine, {
    size: "md",
    state: "history",
    text: "Thanks so much for being here today."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '14px'
    }
  }), /*#__PURE__*/React.createElement(CaptionLine, {
    size: "lg",
    state: "active",
    text: "The meeting will start at",
    live: "ten",
    showCursor: true
  })))), /*#__PURE__*/React.createElement("section", {
    id: "how",
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '40px 32px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px'
    }
  }, FEATURES.map((f, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padded: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      borderRadius: '14px',
      background: 'var(--beam-100)',
      color: 'var(--beam-700)',
      display: 'grid',
      placeItems: 'center',
      marginBottom: '16px'
    }
  }, f.icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-sm)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '0 0 8px'
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-md)',
      lineHeight: 1.5,
      color: 'var(--text-body)',
      margin: 0
    }
  }, f.body))))), /*#__PURE__*/React.createElement("section", {
    id: "access",
    style: {
      background: '#17130d',
      color: '#fff',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '80px 32px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-label)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--beam-400)',
      margin: '0 0 14px'
    }
  }, "Accessibility-first"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-lg)',
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: '0 0 18px'
    }
  }, "Built for Deaf and hard-of-hearing readers."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.55,
      color: 'var(--text-on-dark-muted)',
      margin: 0,
      maxWidth: '42ch'
    }
  }, "Type set in Atkinson Hyperlegible \u2014 drawn to make every letter unmistakable. High-contrast by default. One screen, large controls, nothing in the way.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, ACCESS.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      padding: '18px 20px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--beam-400)',
      flex: 'none',
      marginTop: '2px'
    }
  }, CheckIcon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-title-md)',
      display: 'block',
      marginBottom: '2px'
    }
  }, a.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-md)',
      color: 'var(--text-on-dark-muted)'
    }
  }, a.body))))))), /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '88px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-display-xl)',
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '0 0 16px'
    }
  }, "Free to read the room."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-body)',
      margin: '0 auto 28px',
      maxWidth: '40ch'
    }
  }, "Rinig is free for personal use. Captions stay on your device."), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg"
  }, "Download Rinig")), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '40px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, "Rinig \u2014 heard, in real time. \xA9 2026"))));
}
const navLink = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-body-md)',
  fontWeight: 700,
  color: 'var(--text-strong)',
  textDecoration: 'none'
};
const CheckIcon = /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12.5l4.5 4.5L19 7",
  stroke: "currentColor",
  strokeWidth: "2.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const FEATURES = [{
  title: 'Across the room',
  body: 'Captions stay accurate even when the speaker is far away or facing the other direction.',
  icon: /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))
}, {
  title: 'Two languages',
  body: 'Spoken English and Tagalog, transcribed in real time — switch with one tap.',
  icon: /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 7h9M8.5 4v3c0 5-2.5 8-5 9M6 12c1.5 3 4 4.5 6 5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 20l4-9 4 9M14.5 17h5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
}, {
  title: 'Large & clear',
  body: 'Big high-contrast type by default — readable at a glance, with no clutter.',
  icon: /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 18V6h9M7 12h4M16 18l3-7 3 7M17 15.5h4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
}];
const ACCESS = [{
  title: 'Hyperlegible type',
  body: 'Atkinson Hyperlegible, built for low-vision reading.'
}, {
  title: 'High-contrast captions',
  body: 'White on near-black with a Beam highlight on the live phrase.'
}, {
  title: 'One simple screen',
  body: 'No menus to learn. Tap once and read.'
}];
window.MarketingSite = MarketingSite;
(function () {
  const el = document.getElementById('site-root');
  if (el && window.MarketingSite) ReactDOM.createRoot(el).render(React.createElement(window.MarketingSite));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/MarketingSite.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AppBar = __ds_scope.AppBar;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.CaptionLine = __ds_scope.CaptionLine;

__ds_ns.LanguageToggle = __ds_scope.LanguageToggle;

__ds_ns.MicControl = __ds_scope.MicControl;

__ds_ns.TextSizeStepper = __ds_scope.TextSizeStepper;

})();
