"use client"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Plus,
  Shield,
  Star,
  Globe // Import Globe icon
} from "lucide-react"

interface Tab {
  id: number
  title: string
  url: string
}

let tabId = 0

export function BrowserApp() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: tabId++, title: "New Tab", url: "" },
  ])
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)
  const [addressInput, setAddressInput] = useState("")
  const [bookmarks] = useState([
    { name: "NovaOS", url: "https://novaos.dev" },
    { name: "GitHub", url: "https://github.com" },
    { name: "Next.js", url: "https://nextjs.org" },
    { name: "Vercel", url: "https://vercel.com" },
  ])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const activeTab = tabs.find((t) => t.id === activeTabId)

  const navigate = (url: string) => {
    let fullUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (url.includes(".")) {
        fullUrl = `https://${url}`
      } else {
        fullUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(url)}`
      }
    }
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId ? { ...t, url: fullUrl, title: url } : t
      )
    )
    setAddressInput(fullUrl)
  }

  const addTab = () => {
    const newTab = { id: tabId++, title: "New Tab", url: "" }
    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
    setAddressInput("")
  }

  const closeTab = (id: number) => {
    if (tabs.length === 1) return
    const newTabs = tabs.filter((t) => t.id !== id)
    setTabs(newTabs)
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id)
    }
  }

  return (
    <div className="flex h-full flex-col bg-card" role="application" aria-label="Browser">
      {/* Tab bar */}
      <div className="flex items-center gap-0.5 border-b border-border/30 bg-secondary/50 px-2 pt-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`group flex max-w-[180px] items-center gap-1 rounded-t-lg px-3 py-1.5 text-xs transition-colors ${
              activeTabId === tab.id
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:bg-muted/30"
            }`}
          >
            <button
              type="button"
              className="flex-1 truncate text-left"
              onClick={() => {
                setActiveTabId(tab.id)
                setAddressInput(tab.url)
              }}
            >
              {tab.title || "New Tab"}
            </button>
            {tabs.length > 1 && (
              <button
                type="button"
                className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.id)
                }}
                aria-label={`Close ${tab.title} tab`}
              >
                <svg viewBox="0 0 8 8" className="h-2.5 w-2.5" stroke="currentColor" strokeWidth="1.5">
                  <line x1="1" y1="1" x2="7" y2="7" />
                  <line x1="7" y1="1" x2="1" y2="7" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
          onClick={addTab}
          aria-label="New tab"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* URL bar */}
      <div className="flex items-center gap-2 border-b border-border/30 bg-secondary/30 px-2 py-1.5">
        <button type="button" className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground" aria-label="Back">
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground" aria-label="Forward">
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => iframeRef.current?.contentWindow?.location.reload()}
          aria-label="Reload"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => navigate("")}
          aria-label="Home"
        >
          <Home className="h-3.5 w-3.5" />
        </button>

        <div className="relative flex-1">
          <Shield className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            className="w-full rounded-md bg-muted/50 py-1 pl-7 pr-8 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50"
            placeholder="Search or enter URL"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(addressInput)
            }}
            aria-label="Address bar"
          />
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Bookmark">
            <Star className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Bookmarks bar */}
      <div className="flex items-center gap-1 border-b border-border/30 bg-secondary/20 px-3 py-1">
        {bookmarks.map((bm) => (
          <button
            key={bm.name}
            type="button"
            className="rounded px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
            onClick={() => navigate(bm.url)}
          >
            {bm.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-[#f8f9fa]">
        {activeTab?.url ? (
          <iframe
            ref={iframeRef}
            src={activeTab.url}
            className="h-full w-full border-none"
            title="Browser content"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-[#1a1a2e]">Nova Browser</h2>
            <p className="text-sm text-[#6b7280]">Search the web or enter a URL</p>
            <div className="grid grid-cols-4 gap-4 pt-4">
              {bookmarks.map((bm) => (
                <button
                  key={bm.name}
                  type="button"
                  className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-[#e5e7eb]"
                  onClick={() => navigate(bm.url)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-[#374151]">{bm.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
