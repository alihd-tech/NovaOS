"use client"

import React from "react"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export interface WindowState {
  id: string
  appId: string
  title: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  isClosing: boolean
}

export interface AppDefinition {
  id: string
  name: string
  icon: ReactNode
  color: string
  defaultWidth: number
  defaultHeight: number
  component: React.ComponentType<{ windowId: string }>
}

interface WindowManagerContextValue {
  windows: WindowState[]
  activeWindowId: string | null
  apps: AppDefinition[]
  openApp: (appId: string) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  maximizeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  updateWindowPosition: (windowId: string, x: number, y: number) => void
  updateWindowSize: (
    windowId: string,
    width: number,
    height: number
  ) => void
  registerApp: (app: AppDefinition) => void
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null)

let nextZIndex = 100
let windowCounter = 0

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [apps, setApps] = useState<AppDefinition[]>([])

  const registerApp = useCallback((app: AppDefinition) => {
    setApps((prev) => {
      if (prev.find((a) => a.id === app.id)) return prev
      return [...prev, app]
    })
  }, [])

  const openApp = useCallback(
    (appId: string) => {
      const existing = windows.find(
        (w) => w.appId === appId && w.isMinimized
      )
      if (existing) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: ++nextZIndex }
              : w
          )
        )
        setActiveWindowId(existing.id)
        return
      }

      const app = apps.find((a) => a.id === appId)
      if (!app) return

      const id = `window-${++windowCounter}`
      const offsetX = (windowCounter % 5) * 30
      const offsetY = (windowCounter % 5) * 30

      const newWindow: WindowState = {
        id,
        appId,
        title: app.name,
        x: 120 + offsetX,
        y: 60 + offsetY,
        width: app.defaultWidth,
        height: app.defaultHeight,
        isMinimized: false,
        isMaximized: false,
        zIndex: ++nextZIndex,
        isClosing: false,
      }

      setWindows((prev) => [...prev, newWindow])
      setActiveWindowId(id)
    },
    [apps, windows]
  )

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isClosing: true } : w
      )
    )
    setTimeout(() => {
      setWindows((prev) => prev.filter((w) => w.id !== windowId))
      setActiveWindowId((prev) => (prev === windowId ? null : prev))
    }, 150)
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      )
    )
    setActiveWindowId((prev) => (prev === windowId ? null : prev))
  }, [])

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    )
  }, [])

  const focusWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: ++nextZIndex } : w
      )
    )
    setActiveWindowId(windowId)
  }, [])

  const updateWindowPosition = useCallback(
    (windowId: string, x: number, y: number) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, x, y } : w))
      )
    },
    []
  )

  const updateWindowSize = useCallback(
    (windowId: string, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, width, height } : w))
      )
    },
    []
  )

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        apps,
        openApp,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        registerApp,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  )
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) throw new Error("useWindowManager must be inside WindowManagerProvider")
  return ctx
}
