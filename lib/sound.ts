/**
 * System sound and feedback for Q-OS.
 * Uses Web Audio API for in-browser beeps (no asset files required).
 */

import type { AlertSoundType } from "@/lib/settings"

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    } catch {
      return null
    }
  }
  return audioContext
}

/** Play a short system beep. volume 0–1. */
function playBeep(frequency: number, durationMs: number, volume: number = 0.3): void {
  const ctx = getContext()
  if (!ctx) return
  try {
    if (ctx.state === "suspended") ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = frequency
    osc.type = "sine"
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + durationMs / 1000)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + durationMs / 1000)
  } catch { }
}

/** Play alert sound by type (mapped to simple tones). */
export function playAlertSound(
  type: AlertSoundType,
  volumeNormalized: number = 1
): void {
  if (type === "none") return
  const v = Math.max(0, Math.min(1, volumeNormalized)) * 0.25
  switch (type) {
    case "default":
      playBeep(880, 80, v)
      break
    case "glass":
      playBeep(1320, 60, v)
      playBeep(1760, 80, v * 0.8)
      break
    case "pop":
      playBeep(440, 40, v)
      break
    case "submarine":
      playBeep(220, 120, v)
      break
    default:
      playBeep(880, 80, v)
  }
}

/** Play a short feedback sound (e.g. lock, click). */
export function playFeedbackSound(volumeNormalized: number = 1): void {
  const v = Math.max(0, Math.min(1, volumeNormalized)) * 0.15
  playBeep(600, 30, v)
}
