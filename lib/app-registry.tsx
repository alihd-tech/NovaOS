"use client"

import React from "react"
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { AppDefinition } from "./window-manager"

export interface StoreAppEntry {
  id: string
  name: string
  description: string
  category: string
  icon: ReactNode
  color: string
  defaultWidth: number
  defaultHeight: number
  component: React.ComponentType<{ windowId: string }>
  version: string
  author: string
  size: string
  rating: number
  reviews: number
  screenshots: string[]
  isCore: boolean // core apps cannot be uninstalled
}

interface AppRegistryContextValue {
  allApps: StoreAppEntry[]
  installedAppIds: Set<string>
  installApp: (appId: string) => void
  uninstallApp: (appId: string) => void
  isInstalled: (appId: string) => boolean
  getInstalledApps: () => StoreAppEntry[]
  getStoreApps: () => StoreAppEntry[]
  registerStoreApp: (app: StoreAppEntry) => void
}

const AppRegistryContext = createContext<AppRegistryContextValue | null>(null)

export function AppRegistryProvider({ children }: { children: ReactNode }) {
  const [allApps, setAllApps] = useState<StoreAppEntry[]>([])
  const [installedAppIds, setInstalledAppIds] = useState<Set<string>>(new Set())

  const registerStoreApp = useCallback((app: StoreAppEntry) => {
    setAllApps((prev) => {
      if (prev.find((a) => a.id === app.id)) return prev
      return [...prev, app]
    })
    // Auto-install core apps
    if (app.isCore) {
      setInstalledAppIds((prev) => new Set([...prev, app.id]))
    }
  }, [])

  const installApp = useCallback((appId: string) => {
    setInstalledAppIds((prev) => new Set([...prev, appId]))
  }, [])

  const uninstallApp = useCallback((appId: string) => {
    // Prevent uninstalling core apps
    setAllApps((prev) => {
      const app = prev.find((a) => a.id === appId)
      if (app?.isCore) return prev
      return prev
    })
    setInstalledAppIds((prev) => {
      const app = allApps.find((a) => a.id === appId)
      if (app?.isCore) return prev
      const next = new Set(prev)
      next.delete(appId)
      return next
    })
  }, [allApps])

  const isInstalled = useCallback(
    (appId: string) => installedAppIds.has(appId),
    [installedAppIds]
  )

  const getInstalledApps = useCallback(
    () => allApps.filter((a) => installedAppIds.has(a.id)),
    [allApps, installedAppIds]
  )

  const getStoreApps = useCallback(() => allApps, [allApps])

  return (
    <AppRegistryContext.Provider
      value={{
        allApps,
        installedAppIds,
        installApp,
        uninstallApp,
        isInstalled,
        getInstalledApps,
        getStoreApps,
        registerStoreApp,
      }}
    >
      {children}
    </AppRegistryContext.Provider>
  )
}

export function useAppRegistry() {
  const ctx = useContext(AppRegistryContext)
  if (!ctx) throw new Error("useAppRegistry must be inside AppRegistryProvider")
  return ctx
}
