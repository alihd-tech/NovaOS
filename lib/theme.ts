/**
 * Theme configuration for Q-OS: light/dark base theme and accent color.
 * Accent is persisted and applied to primary, ring, and highlight surfaces.
 */

export type ThemeMode = "light" | "dark"

export const ACCENT_COLORS = [
  "#0071e3",
  "#bf4fff",
  "#ff375f",
  "#ff9f0a",
  "#ffd60a",
  "#30d158",
  "#64d2ff",
  "#a2845e",
] as const

export type AccentColorId = (typeof ACCENT_COLORS)[number]

export const DEFAULT_ACCENT: AccentColorId = "#0071e3"

export const THEME_STORAGE_KEY = "qos-theme-accent"

/** Parse hex (#rrggbb) to HSL components for CSS var (H S% L%). Returns "H S% L%" */
export function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return "211 100% 50%" // fallback blue
  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lRounded = Math.round(l * 100)
  return `${h} ${s}% ${lRounded}%`
}
