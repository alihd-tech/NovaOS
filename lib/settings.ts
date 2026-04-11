/**
 * Q-OS settings schema and persistence.
 * Encapsulated so new settings can be added via types and defaults.
 */

export const SETTINGS_STORAGE_KEY = "qos-settings"

// --- Dock ---
export type DockPosition = "bottom" | "left" | "right"
export type DockSize = "small" | "medium" | "large"

export interface DockSettings {
  size: DockSize
  position: DockPosition
  autoHide: boolean
  magnify: boolean
  alwaysOnTop: boolean
}

const defaultDock: DockSettings = {
  size: "medium",
  position: "bottom",
  autoHide: false,
  magnify: true,
  alwaysOnTop: true,
}

// --- Window ---
export type TrafficLightsPosition = "left" | "right"

export interface WindowSettings {
  trafficLightsPosition: TrafficLightsPosition
  showMaximizeSwitcher: boolean
}

const defaultWindow: WindowSettings = {
  trafficLightsPosition: "left",
  showMaximizeSwitcher: true,
}

// --- Shortcuts ---
export type ShortcutAction =
  | "appSwitcher"
  | "missionControl"
  | "lockScreen"
  | "spotlight"

export interface ShortcutBinding {
  key: string
  meta?: boolean
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
}

export type ShortcutsSettings = Record<ShortcutAction, ShortcutBinding>

const defaultShortcuts: ShortcutsSettings = {
  appSwitcher: { key: "Tab", meta: true },
  missionControl: { key: "ArrowUp", meta: true },
  lockScreen: { key: "q", meta: true, ctrl: true },
  spotlight: { key: " ", meta: true },
}

// --- Lock screen ---
export interface LockScreenSettings {
  idleTimeoutMinutes: number
  requirePasswordOnWake: boolean
}

const defaultLockScreen: LockScreenSettings = {
  idleTimeoutMinutes: 5,
  requirePasswordOnWake: false,
}

// --- Sound ---
export type AlertSoundType = "default" | "glass" | "pop" | "submarine" | "none"

export interface SoundSettings {
  volume: number
  /** 0–100 */
  alertVolume: number
  soundEffects: boolean
  alertSound: AlertSoundType
  /** Play sound when UI feedback (e.g. lock, notification) */
  playFeedbackSounds: boolean
}

const defaultSound: SoundSettings = {
  volume: 80,
  alertVolume: 100,
  soundEffects: true,
  alertSound: "default",
  playFeedbackSounds: true,
}

// --- Notifications ---
export interface NotificationSettings {
  enabled: boolean
  /** Show environment alert (e.g. system notifications in Q-OS) */
  environmentAlert: boolean
  /** Play sound for notifications */
  soundEnabled: boolean
  /** Show notification preview in UI */
  showPreview: boolean
}

const defaultNotification: NotificationSettings = {
  enabled: true,
  environmentAlert: true,
  soundEnabled: true,
  showPreview: true,
}

// --- Full settings ---
export interface QOSSettings {
  dock: DockSettings
  window: WindowSettings
  shortcuts: ShortcutsSettings
  lockScreen: LockScreenSettings
  sound: SoundSettings
  notifications: NotificationSettings
}

const defaultSettings: QOSSettings = {
  dock: defaultDock,
  window: defaultWindow,
  shortcuts: defaultShortcuts,
  lockScreen: defaultLockScreen,
  sound: defaultSound,
  notifications: defaultNotification,
}

export function getDefaultSettings(): QOSSettings {
  return JSON.parse(JSON.stringify(defaultSettings))
}

export function loadSettings(): QOSSettings {
  if (typeof window === "undefined") return getDefaultSettings()
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return getDefaultSettings()
    const parsed = JSON.parse(raw) as Partial<QOSSettings>
    return mergeSettings(getDefaultSettings(), parsed)
  } catch {
    return getDefaultSettings()
  }
}

function mergeSettings(
  base: QOSSettings,
  partial: Partial<QOSSettings>
): QOSSettings {
  return {
    dock: { ...base.dock, ...partial.dock },
    window: { ...base.window, ...partial.window },
    shortcuts: { ...base.shortcuts, ...partial.shortcuts },
    lockScreen: { ...base.lockScreen, ...partial.lockScreen },
    sound: { ...base.sound, ...partial.sound },
    notifications: { ...base.notifications, ...partial.notifications },
  }
}

export function saveSettings(settings: QOSSettings): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  } catch { }
}

/** Format shortcut for display (e.g. "⌘ Tab") */
export function formatShortcut(binding: ShortcutBinding): string {
  const parts: string[] = []
  if (binding.meta) parts.push("⌘")
  if (binding.ctrl) parts.push("⌃")
  if (binding.alt) parts.push("⌥")
  if (binding.shift) parts.push("⇧")
  parts.push(binding.key)
  return parts.join(" ")
}
