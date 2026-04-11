"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

export interface AccentColor {
  name: string
  hsl: string // "H S% L%" format for CSS variables
  hex: string
}

export const ACCENT_COLORS: AccentColor[] = [
  { name: "Blue", hsl: "213 94% 56%", hex: "#3b82f6" },
  { name: "Violet", hsl: "258 90% 66%", hex: "#8b5cf6" },
  { name: "Pink", hsl: "330 81% 60%", hex: "#ec4899" },
  { name: "Red", hsl: "0 84% 60%", hex: "#ef4444" },
  { name: "Orange", hsl: "25 95% 53%", hex: "#f97316" },
  { name: "Yellow", hsl: "48 96% 53%", hex: "#eab308" },
  { name: "Green", hsl: "142 71% 45%", hex: "#22c55e" },
  { name: "Teal", hsl: "188 94% 43%", hex: "#06b6d4" },
]

export interface WallpaperOption {
  id: string
  name: string
  url: string
  thumbnail: string
}

export const WALLPAPERS: WallpaperOption[] = [
  { id: "default", name: "Nova", url: "/wallpaper.jpg", thumbnail: "/wallpaper.jpg" },
  { id: "gradient-ocean", name: "Ocean", url: "", thumbnail: "" },
  { id: "gradient-sunset", name: "Sunset", url: "", thumbnail: "" },
  { id: "gradient-forest", name: "Forest", url: "", thumbnail: "" },
  { id: "gradient-midnight", name: "Midnight", url: "", thumbnail: "" },
  { id: "gradient-aurora", name: "Aurora", url: "", thumbnail: "" },
]

// CSS gradient fallbacks for wallpapers without images
export const WALLPAPER_GRADIENTS: Record<string, string> = {
  "gradient-ocean": "linear-gradient(135deg, #0c2d48 0%, #145374 30%, #2e8bc0 70%, #00b4d8 100%)",
  "gradient-sunset": "linear-gradient(135deg, #1a0a2e 0%, #6b2fa0 25%, #e94560 60%, #f4a261 100%)",
  "gradient-forest": "linear-gradient(135deg, #0b1d0e 0%, #1a472a 30%, #2d6a4f 65%, #52b788 100%)",
  "gradient-midnight": "linear-gradient(135deg, #020024 0%, #090979 40%, #00d4ff 100%)",
  "gradient-aurora": "linear-gradient(135deg, #0f0c29 0%, #302b63 35%, #24243e 65%, #0f9b8e 100%)",
}

export type DockPosition = "bottom" | "left" | "right"
export type DockSize = "small" | "medium" | "large"

export interface OSTheme {
  mode: "dark" | "light"
  accentColor: AccentColor
  wallpaper: WallpaperOption
  dockPosition: DockPosition
  dockSize: DockSize
  dockAutoHide: boolean
  dockMagnification: boolean
  brightness: number
  volume: number
  wifiEnabled: boolean
  bluetoothEnabled: boolean
  notificationsEnabled: boolean
  doNotDisturb: boolean
  userName: string
  userEmail: string
}

const defaultTheme: OSTheme = {
  mode: "dark",
  accentColor: ACCENT_COLORS[0],
  wallpaper: WALLPAPERS[0],
  dockPosition: "bottom",
  dockSize: "medium",
  dockAutoHide: false,
  dockMagnification: true,
  brightness: 100,
  volume: 75,
  wifiEnabled: true,
  bluetoothEnabled: false,
  notificationsEnabled: true,
  doNotDisturb: false,
  userName: "Nova User",
  userEmail: "nova@novaos.local",
}

interface OSThemeContextValue {
  theme: OSTheme
  setMode: (mode: "dark" | "light") => void
  setAccentColor: (color: AccentColor) => void
  setWallpaper: (wallpaper: WallpaperOption) => void
  setDockPosition: (pos: DockPosition) => void
  setDockSize: (size: DockSize) => void
  setDockAutoHide: (val: boolean) => void
  setDockMagnification: (val: boolean) => void
  setBrightness: (val: number) => void
  setVolume: (val: number) => void
  setWifiEnabled: (val: boolean) => void
  setBluetoothEnabled: (val: boolean) => void
  setNotificationsEnabled: (val: boolean) => void
  setDoNotDisturb: (val: boolean) => void
  setUserName: (name: string) => void
  setUserEmail: (email: string) => void
}

const OSThemeContext = createContext<OSThemeContextValue | null>(null)

function applyThemeToDOM(theme: OSTheme) {
  const root = document.documentElement

  // Apply accent color to CSS variables
  root.style.setProperty("--primary", theme.accentColor.hsl)
  root.style.setProperty("--accent", theme.accentColor.hsl)
  root.style.setProperty("--ring", theme.accentColor.hsl)
  root.style.setProperty("--chart-1", theme.accentColor.hsl)
  root.style.setProperty("--sidebar-primary", theme.accentColor.hsl)
  root.style.setProperty("--sidebar-ring", theme.accentColor.hsl)

  // Apply light/dark mode
  if (theme.mode === "light") {
    root.style.setProperty("--background", "210 20% 98%")
    root.style.setProperty("--foreground", "220 20% 10%")
    root.style.setProperty("--card", "0 0% 100%")
    root.style.setProperty("--card-foreground", "220 20% 10%")
    root.style.setProperty("--popover", "0 0% 100%")
    root.style.setProperty("--popover-foreground", "220 20% 10%")
    root.style.setProperty("--secondary", "220 14% 92%")
    root.style.setProperty("--secondary-foreground", "220 20% 15%")
    root.style.setProperty("--muted", "220 14% 94%")
    root.style.setProperty("--muted-foreground", "215 15% 45%")
    root.style.setProperty("--border", "220 13% 87%")
    root.style.setProperty("--input", "220 13% 87%")
    root.style.setProperty("--glass", "210 20% 95%")
    root.style.setProperty("--glass-border", "220 14% 82%")
  } else {
    root.style.setProperty("--background", "220 20% 10%")
    root.style.setProperty("--foreground", "210 20% 95%")
    root.style.setProperty("--card", "220 18% 14%")
    root.style.setProperty("--card-foreground", "210 20% 95%")
    root.style.setProperty("--popover", "220 20% 12%")
    root.style.setProperty("--popover-foreground", "210 20% 95%")
    root.style.setProperty("--secondary", "220 16% 18%")
    root.style.setProperty("--secondary-foreground", "210 20% 90%")
    root.style.setProperty("--muted", "220 14% 16%")
    root.style.setProperty("--muted-foreground", "215 15% 55%")
    root.style.setProperty("--border", "220 14% 20%")
    root.style.setProperty("--input", "220 14% 20%")
    root.style.setProperty("--glass", "220 20% 10%")
    root.style.setProperty("--glass-border", "220 14% 24%")
  }

  // Apply brightness
  root.style.setProperty("filter", `brightness(${theme.brightness / 100})`)
}

export function OSThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<OSTheme>(defaultTheme)

  // Apply theme changes to the DOM
  useEffect(() => {
    applyThemeToDOM(theme)
  }, [theme])

  const update = useCallback(
    (partial: Partial<OSTheme>) => setTheme((prev) => ({ ...prev, ...partial })),
    []
  )

  const value: OSThemeContextValue = {
    theme,
    setMode: useCallback((mode) => update({ mode }), [update]),
    setAccentColor: useCallback((accentColor) => update({ accentColor }), [update]),
    setWallpaper: useCallback((wallpaper) => update({ wallpaper }), [update]),
    setDockPosition: useCallback((dockPosition) => update({ dockPosition }), [update]),
    setDockSize: useCallback((dockSize) => update({ dockSize }), [update]),
    setDockAutoHide: useCallback((dockAutoHide) => update({ dockAutoHide }), [update]),
    setDockMagnification: useCallback((dockMagnification) => update({ dockMagnification }), [update]),
    setBrightness: useCallback((brightness) => update({ brightness }), [update]),
    setVolume: useCallback((volume) => update({ volume }), [update]),
    setWifiEnabled: useCallback((wifiEnabled) => update({ wifiEnabled }), [update]),
    setBluetoothEnabled: useCallback((bluetoothEnabled) => update({ bluetoothEnabled }), [update]),
    setNotificationsEnabled: useCallback((notificationsEnabled) => update({ notificationsEnabled }), [update]),
    setDoNotDisturb: useCallback((doNotDisturb) => update({ doNotDisturb }), [update]),
    setUserName: useCallback((userName) => update({ userName }), [update]),
    setUserEmail: useCallback((userEmail) => update({ userEmail }), [update]),
  }

  return (
    <OSThemeContext.Provider value={value}>
      {children}
    </OSThemeContext.Provider>
  )
}

export function useOSTheme() {
  const ctx = useContext(OSThemeContext)
  if (!ctx) throw new Error("useOSTheme must be inside OSThemeProvider")
  return ctx
}
