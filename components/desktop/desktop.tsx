"use client"

import { useEffect } from "react"
import {
  Terminal,
  Calculator,
  StickyNote,
  FolderOpen,
  Settings,
  Globe,
} from "lucide-react"
import {
  WindowManagerProvider,
  useWindowManager,
} from "@/lib/window-manager"
import { TopBar } from "./top-bar"
import { Dock } from "./dock"
import { AppWindow } from "./app-window"
import { TerminalApp } from "@/components/apps/terminal-app"
import { CalculatorApp } from "@/components/apps/calculator-app"
import { NotesApp } from "@/components/apps/notes-app"
import { FileManagerApp } from "@/components/apps/file-manager-app"
import { SettingsApp } from "@/components/apps/settings-app"
import { BrowserApp } from "@/components/apps/browser-app"

function DesktopContent() {
  const { registerApp, windows, apps, openApp } = useWindowManager()

  useEffect(() => {
    registerApp({
      id: "terminal",
      name: "Terminal",
      icon: <Terminal className="h-6 w-6 text-foreground" />,
      color: "#1a1a2e",
      defaultWidth: 680,
      defaultHeight: 440,
      component: TerminalApp,
    })
    registerApp({
      id: "calculator",
      name: "Calculator",
      icon: <Calculator className="h-6 w-6 text-[#1c1c1e]" />,
      color: "#f5a623",
      defaultWidth: 280,
      defaultHeight: 440,
      component: CalculatorApp,
    })
    registerApp({
      id: "notes",
      name: "Notes",
      icon: <StickyNote className="h-6 w-6 text-foreground" />,
      color: "#f0c929",
      defaultWidth: 720,
      defaultHeight: 480,
      component: NotesApp,
    })
    registerApp({
      id: "files",
      name: "Files",
      icon: <FolderOpen className="h-6 w-6 text-foreground" />,
      color: "#3b82f6",
      defaultWidth: 760,
      defaultHeight: 480,
      component: FileManagerApp,
    })
    registerApp({
      id: "settings",
      name: "Settings",
      icon: <Settings className="h-6 w-6 text-foreground" />,
      color: "#6b7280",
      defaultWidth: 720,
      defaultHeight: 520,
      component: SettingsApp,
    })
    registerApp({
      id: "browser",
      name: "Browser",
      icon: <Globe className="h-6 w-6 text-foreground" />,
      color: "#3b82f6",
      defaultWidth: 900,
      defaultHeight: 560,
      component: BrowserApp,
    })
  }, [registerApp])

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/wallpaper.jpg')" }}
        aria-hidden="true"
      />

      {/* Top Bar */}
      <TopBar />

      {/* Windows */}
      {windows.map((win) => {
        const app = apps.find((a) => a.id === win.appId)
        if (!app) return null
        const AppComponent = app.component
        return (
          <AppWindow key={win.id} window={win}>
            <AppComponent windowId={win.id} />
          </AppWindow>
        )
      })}

      {/* Desktop double-click area */}
      <div className="absolute inset-0 -z-0" aria-hidden="true" />

      {/* Dock */}
      <Dock />
    </div>
  )
}

export function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopContent />
    </WindowManagerProvider>
  )
}
