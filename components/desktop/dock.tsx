"use client"

import { useState, useRef } from "react"
import { useWindowManager } from "@/lib/window-manager"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Dock() {
  const { apps, openApp, windows } = useWindowManager()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [bouncingApp, setBouncingApp] = useState<string | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  const handleOpenApp = (appId: string) => {
    setBouncingApp(appId)
    openApp(appId)
    setTimeout(() => setBouncingApp(null), 500)
  }

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.4
    if (distance === 1) return 1.2
    if (distance === 2) return 1.08
    return 1
  }

  const isAppOpen = (appId: string) => {
    return windows.some((w) => w.appId === appId && !w.isMinimized)
  }

  return (
    <nav
      className="fixed bottom-2 left-1/2 z-[9998] -translate-x-1/2"
      aria-label="Application dock"
    >
      <div
        ref={dockRef}
        className="flex items-end gap-1 rounded-2xl border border-border/30 px-2 pb-1.5 pt-1.5 backdrop-blur-2xl"
        style={{ backgroundColor: "hsl(var(--glass) / 0.7)" }}
        onMouseLeave={() => setHoveredIndex(null)}
        role="toolbar"
        aria-label="Dock applications"
      >
        <TooltipProvider delayDuration={0}>
          {apps.map((app, index) => (
            <Tooltip key={app.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="relative flex flex-col items-center transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${getScale(index)})`,
                    transformOrigin: "bottom center",
                  }}
                  onClick={() => handleOpenApp(app.id)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  aria-label={`Open ${app.name}`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-lg transition-all ${
                      bouncingApp === app.id ? "animate-dock-bounce" : ""
                    }`}
                    style={{ backgroundColor: app.color }}
                  >
                    {app.icon}
                  </div>
                  {isAppOpen(app.id) && (
                    <div
                      className="absolute -bottom-1 h-1 w-1 rounded-full bg-foreground/60"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-md border-border/30 px-2 py-1 text-xs font-medium backdrop-blur-xl"
                style={{ backgroundColor: "hsl(var(--glass) / 0.95)" }}
              >
                {app.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </nav>
  )
}
