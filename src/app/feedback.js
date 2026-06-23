// Small sound + haptic feedback for key actions. Sounds are synthesized with
// the Web Audio API (no asset files), and we also buzz the phone — vibration is
// valuable feedback for a Deaf / hard-of-hearing user who may not hear the tone.

let actx = null
function getCtx() {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!actx) actx = new Ctx()
  if (actx.state === 'suspended') actx.resume()
  return actx
}

function tone(freq, startAt, dur, peak = 0.07) {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  osc.connect(gain)
  gain.connect(c.destination)
  const t = c.currentTime + startAt
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(peak, t + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.start(t)
  osc.stop(t + dur + 0.03)
}

function buzz(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern) } catch { /* unsupported */ }
}

// kind: 'start' | 'stop' | 'save'. `sound` toggles the audio; haptics always fire.
export function playFeedback(kind, { sound = true } = {}) {
  if (sound) {
    try {
      if (kind === 'start') { tone(660, 0, 0.12); tone(880, 0.1, 0.16) }       // rising
      else if (kind === 'stop') { tone(523, 0, 0.14); tone(392, 0.1, 0.18) }   // falling
      else if (kind === 'save') { tone(784, 0, 0.1); tone(1047, 0.09, 0.18) }  // bright ding
    } catch { /* audio blocked until a gesture — ignore */ }
  }
  if (kind === 'start') buzz(30)
  else if (kind === 'stop') buzz(20)
  else if (kind === 'save') buzz([18, 40, 18])
}
