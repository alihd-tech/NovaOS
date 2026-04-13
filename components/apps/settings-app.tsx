"use client"

import { useState, useEffect } from "react"
import {
  Monitor,
  Volume2,
  Sun,
  Bell,
  Wifi,
  HardDrive,
  Info,
  Palette,
  User,
} from "lucide-react"

const categories = [
  { id: "general", label: "General", icon: Info },
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "sound", label: "Sound", icon: Volume2 },
  { id: "display", label: "Display", icon: Monitor },
  { id: "network", label: "Network", icon: Wifi },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "accounts", label: "Accounts", icon: User },
  { id: "about", label: "About", icon: Palette },
]

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (val: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-muted-foreground/30"
      }`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-foreground transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function SliderInput({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
}: {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  label: string
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted-foreground/20 accent-primary"
      aria-label={label}
    />
  )
}

export function SettingsApp() {
  const [selected, setSelected] = useState("general")
  const [darkMode, setDarkMode] = useState(true)
  const [volume, setVolume] = useState(75)
  const [brightness, setBrightness] = useState(80)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [doNotDisturb, setDoNotDisturb] = useState(false)
  const [accentColor, setAccentColor] = useState("#3b82f6")
  const [resolution, setResolution] = useState("Loading...")

  useEffect(() => {
    setResolution(`${window.innerWidth} x ${window.innerHeight}`)
  }, [])

  const accentColors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
  ]

  return (
    <div
      className="flex h-full"
      role="application"
      aria-label="Settings"
    >
      {/* Sidebar */}
      <div className="flex w-48 flex-shrink-0 flex-col overflow-y-auto border-r border-border/30 bg-secondary/50 py-2">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              type="button"
              className={`mx-2 flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                selected === cat.id
                  ? "bg-primary/15 text-primary"
                  : "text-foreground hover:bg-muted/50"
              }`}
              onClick={() => setSelected(cat.id)}
            >
              <Icon className="h-4 w-4 opacity-70" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selected === "general" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              General
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  System
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Software Update
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Up to date
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Auto Updates
                    </span>
                    <Toggle
                      checked={true}
                      onChange={() => {}}
                      label="Auto updates"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Language</span>
                    <span className="text-xs text-muted-foreground">
                      English (US)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Date & Time
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Automatic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "appearance" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Appearance
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Theme
                </h3>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                      !darkMode
                        ? "border-primary bg-primary/10"
                        : "border-border/30 hover:border-border/50"
                    }`}
                    onClick={() => setDarkMode(false)}
                  >
                    <div className="h-12 w-16 rounded-lg bg-[#f5f5f7]" />
                    <span className="text-xs text-foreground">Light</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                      darkMode
                        ? "border-primary bg-primary/10"
                        : "border-border/30 hover:border-border/50"
                    }`}
                    onClick={() => setDarkMode(true)}
                  >
                    <div className="h-12 w-16 rounded-lg bg-[#1c1c1e]" />
                    <span className="text-xs text-foreground">Dark</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Accent Color
                </h3>
                <div className="flex gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
                        accentColor === color
                          ? "border-foreground ring-2 ring-foreground/20"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setAccentColor(color)}
                      aria-label={`Accent color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "sound" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Sound
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Output
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-foreground">Volume</span>
                      <span className="text-xs text-muted-foreground">
                        {volume}%
                      </span>
                    </div>
                    <SliderInput
                      value={volume}
                      onChange={setVolume}
                      label="Volume"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Output Device
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Built-in Speakers
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Alert Sounds
                    </span>
                    <Toggle
                      checked={true}
                      onChange={() => {}}
                      label="Alert sounds"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "display" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Display
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Brightness
                </h3>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Brightness
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {brightness}%
                    </span>
                  </div>
                  <SliderInput
                    value={brightness}
                    onChange={setBrightness}
                    label="Brightness"
                  />
                </div>
              </div>
              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Resolution
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Resolution
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {resolution}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Night Shift
                    </span>
                    <Toggle
                      checked={false}
                      onChange={() => {}}
                      label="Night shift"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "network" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Network
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">Wi-Fi</span>
                    </div>
                    <Toggle
                      checked={wifiEnabled}
                      onChange={setWifiEnabled}
                      label="Wi-Fi"
                    />
                  </div>
                  {wifiEnabled && (
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                        <span className="text-xs text-foreground">
                          NovaOS-Network
                        </span>
                        <span className="text-[10px] text-primary">
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/20">
                        <span className="text-xs text-muted-foreground">
                          Guest-WiFi
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/20">
                        <span className="text-xs text-muted-foreground">
                          Office-5G
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-foreground">Bluetooth</span>
                    <Toggle
                      checked={bluetoothEnabled}
                      onChange={setBluetoothEnabled}
                      label="Bluetooth"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "notifications" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Allow Notifications
                    </span>
                    <Toggle
                      checked={notificationsEnabled}
                      onChange={setNotificationsEnabled}
                      label="Notifications"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Do Not Disturb
                    </span>
                    <Toggle
                      checked={doNotDisturb}
                      onChange={setDoNotDisturb}
                      label="Do not disturb"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Show Previews
                    </span>
                    <span className="text-xs text-muted-foreground">
                      When Unlocked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "storage" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Storage
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <h3 className="mb-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Disk Usage
                </h3>
                <div className="mb-3 h-4 w-full overflow-hidden rounded-full bg-muted/50">
                  <div className="flex h-full">
                    <div
                      className="bg-primary"
                      style={{ width: "35%" }}
                    />
                    <div
                      className="bg-chart-2"
                      style={{ width: "20%" }}
                    />
                    <div
                      className="bg-chart-3"
                      style={{ width: "10%" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span className="text-xs text-foreground">Apps</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      35 GB
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-chart-2" />
                      <span className="text-xs text-foreground">
                        Documents
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      20 GB
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-chart-3" />
                      <span className="text-xs text-foreground">Media</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      10 GB
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/20">
                    <span className="text-xs font-medium text-foreground">
                      Available
                    </span>
                    <span className="text-xs text-muted-foreground">
                      35 GB of 100 GB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "accounts" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Accounts
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Nova User
                    </p>
                    <p className="text-xs text-muted-foreground">
                      nova@novaos.local
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Administrator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selected === "about" && (
          <div>
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              About NovaOS
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-secondary/30 p-4">
                <div className="flex flex-col items-center gap-3 py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/20"> 
                    <img src="/logo.png" className="h-8 w-8" /> 
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-foreground">
                      NovaOS
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Version 1.3.0
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-border/20">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      Kernel
                    </span>
                    <span className="text-xs text-foreground">
                      WebKernel 16.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      Runtime
                    </span>
                    <span className="text-xs text-foreground">Next.js 16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      Shell
                    </span>
                    <span className="text-xs text-foreground">Tauri 2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      Build
                    </span>
                    <span className="text-xs text-foreground">24A003</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
