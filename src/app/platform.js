// Platform checks.
//
// iPhones/iPads can't run the on-device Whisper model — Safari kills the tab
// for memory the moment the model loads. So we disable Offline mode on iOS and
// keep those devices on the real-time engine, which needs no model.
export function isIOS() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const iOSUA = /iPad|iPhone|iPod/.test(ua)
  // iPadOS 13+ reports as desktop Safari, so also check for a touch Mac.
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return iOSUA || iPadOS
}
