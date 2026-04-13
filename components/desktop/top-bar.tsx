"use client"

import { useState, useEffect } from "react"
import {
  Wifi,
  Battery,
  Volume2,
  Search,
  ChevronDown,
} from "lucide-react"
import { useWindowManager } from "@/lib/window-manager"

export function TopBar() {
  const [time, setTime] = useState(new Date())
  const [showAppleMenu, setShowAppleMenu] = useState(false)
  const { activeWindowId, windows } = useWindowManager()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const activeWindow = windows.find((w) => w.id === activeWindowId)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-4 backdrop-blur-2xl"
      style={{
        height: "var(--topbar-height)",
        backgroundColor: "hsl(var(--glass) / 0.8)",
        borderBottom: "1px solid hsl(var(--glass-border) / 0.5)",
      }}
      role="menubar"
      aria-label="System menu bar"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold text-foreground transition-colors hover:bg-foreground/10"
          onClick={() => setShowAppleMenu(!showAppleMenu)}
          aria-expanded={showAppleMenu}
          aria-haspopup="menu"
        >
          <img src="/nova.png" className="h-3.5 w-3.5" /> 
          <ChevronDown className="h-2.5 w-2.5 opacity-60" />
        </button>
        <span className="text-xs font-semibold text-foreground">
          {activeWindow?.title || "NovaOS"}
        </span>
        {activeWindow && (
          <nav className="flex items-center gap-3" aria-label="App menu">
            <button type="button" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              File
            </button>
            <button type="button" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Edit
            </button>
            <button type="button" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              View
            </button>
            <button type="button" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Window
            </button>
            <button type="button" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Help
            </button>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Search">
          <Search className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center gap-1 text-muted-foreground" aria-label="Volume">
          <Volume2 className="h-3.5 w-3.5" />
        </div>
        <div className="flex items-center gap-1 text-muted-foreground" aria-label="Wi-Fi connected">
          <Wifi className="h-3.5 w-3.5" />
        </div>
        <div className="flex items-center gap-1 text-muted-foreground" aria-label="Battery 100%">
          <Battery className="h-3.5 w-3.5" />
        </div>
        <time className="text-xs text-muted-foreground" dateTime={time.toISOString()}>
          {formatDate(time)} {formatTime(time)}
        </time>
      </div>

      {showAppleMenu && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setShowAppleMenu(false)}
            onKeyDown={(e) => e.key === "Escape" && setShowAppleMenu(false)}
            role="presentation"
          />
          <div
            className="absolute left-2 top-7 z-[9999] w-56 rounded-lg border border-border/50 py-1 shadow-2xl backdrop-blur-2xl"
            style={{ backgroundColor: "hsl(var(--glass) / 0.95)" }}
            role="menu"
            aria-label="System menu"
          >
            <button type="button" className="flex w-full items-center px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground" role="menuitem">
              About NovaOS
            </button>
            <div className="my-1 h-px bg-border/50" role="separator" />
            <button type="button" className="flex w-full items-center px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground" role="menuitem">
              System Settings...
            </button>
            <div className="my-1 h-px bg-border/50" role="separator" />
            <button type="button" className="flex w-full items-center px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground" role="menuitem">
              Sleep
            </button>
            <button type="button" className="flex w-full items-center px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground" role="menuitem">
              Restart...
            </button>
            <button type="button" className="flex w-full items-center px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-primary hover:text-primary-foreground" role="menuitem">
              Shut Down...
            </button>
          </div>
        </>
      )}
    </header>
  )
}
