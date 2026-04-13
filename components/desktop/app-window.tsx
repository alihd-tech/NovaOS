"use client"

import React from "react"

import { useRef, useCallback, useState, useEffect } from "react"
import { useWindowManager, type WindowState } from "@/lib/window-manager"

interface AppWindowProps {
  window: WindowState
  children: React.ReactNode
}

export function AppWindow({ window: win, children }: AppWindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindowManager()

  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })

  const isActive = activeWindowId === win.id

  const handleMouseDownTitlebar = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return
      e.preventDefault()
      focusWindow(win.id)
      setIsDragging(true)
      dragOffset.current = {
        x: e.clientX - win.x,
        y: e.clientY - win.y,
      }
    },
    [win.id, win.x, win.y, win.isMaximized, focusWindow]
  )

  const handleMouseDownResize = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return
      e.preventDefault()
      e.stopPropagation()
      focusWindow(win.id)
      setIsResizing(true)
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        w: win.width,
        h: win.height,
      }
    },
    [win.id, win.width, win.height, win.isMaximized, focusWindow]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.current.x
      const newY = Math.max(28, e.clientY - dragOffset.current.y)
      updateWindowPosition(win.id, newX, newY)
    }

    const handleMouseUp = () => setIsDragging(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, win.id, updateWindowPosition])

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const newW = Math.max(
        300,
        resizeStart.current.w + (e.clientX - resizeStart.current.x)
      )
      const newH = Math.max(
        200,
        resizeStart.current.h + (e.clientY - resizeStart.current.y)
      )
      updateWindowSize(win.id, newW, newH)
    }

    const handleMouseUp = () => setIsResizing(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, win.id, updateWindowSize])

  if (win.isMinimized) return null

  const windowStyle: React.CSSProperties = win.isMaximized
    ? {
        top: 28,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 28px - 76px)",
        zIndex: win.zIndex,
      }
    : {
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col overflow-hidden rounded-xl border shadow-2xl ${
        isActive ? "border-border/50" : "border-border/30"
      } ${
        win.isClosing
          ? "animate-window-close"
          : "animate-window-open"
      }`}
      style={{
        ...windowStyle,
        backgroundColor: "hsl(var(--card))",
      }}
      onMouseDown={() => focusWindow(win.id)}
      role="dialog"
      aria-label={win.title}
    >
      {/* Title bar */}
      <div
        className={`flex h-10 flex-shrink-0 items-center justify-between border-b px-3 ${
          isActive
            ? "border-border/40 bg-secondary/80"
            : "border-border/20 bg-secondary/50"
        }`}
        onMouseDown={handleMouseDownTitlebar}
        onDoubleClick={() => maximizeWindow(win.id)}
        role="toolbar"
        aria-label="Window controls"
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(win.id)
            }}
            aria-label="Close window"
          >
            <svg
              viewBox="0 0 8 8"
              className="h-2 w-2 opacity-0 group-hover:opacity-100"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1.5"
            >
              <line x1="1" y1="1" x2="7" y2="7" />
              <line x1="7" y1="1" x2="1" y2="7" />
            </svg>
          </button>
          <button
            type="button"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] transition-opacity hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(win.id)
            }}
            aria-label="Minimize window"
          >
            <svg
              viewBox="0 0 8 8"
              className="h-2 w-2 opacity-0 group-hover:opacity-100"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1.5"
            >
              <line x1="1" y1="4" x2="7" y2="4" />
            </svg>
          </button>
          <button
            type="button"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] transition-opacity hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation()
              maximizeWindow(win.id)
            }}
            aria-label="Maximize window"
          >
            <svg
              viewBox="0 0 8 8"
              className="h-1.5 w-1.5 opacity-0 group-hover:opacity-100"
              fill="rgba(0,0,0,0.5)"
            >
              <path d="M1 1h6v6H1z" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
          {win.title}
        </span>

        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="relative flex-1 overflow-hidden">{children}</div>

      {/* Resize handle */}
      {!win.isMaximized && (
        <div
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          onMouseDown={handleMouseDownResize}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
