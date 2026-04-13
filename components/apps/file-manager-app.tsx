"use client"

import React from "react"

import { useState } from "react"
import {
  Folder,
  File,
  ImageIcon,
  Music,
  Video,
  FileText,
  ChevronRight,
  Home,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react"

interface FileItem {
  name: string
  type: "folder" | "file" | "image" | "music" | "video" | "document"
  size?: string
  modified?: string
  children?: FileItem[]
}

const fileSystem: FileItem[] = [
  {
    name: "Desktop",
    type: "folder",
    modified: "Today",
    children: [
      { name: "screenshot.png", type: "image", size: "2.4 MB", modified: "Today" },
      { name: "notes.txt", type: "document", size: "1 KB", modified: "Yesterday" },
    ],
  },
  {
    name: "Documents",
    type: "folder",
    modified: "Today",
    children: [
      { name: "resume.pdf", type: "document", size: "240 KB", modified: "Jan 15" },
      { name: "project.md", type: "document", size: "8 KB", modified: "Feb 2" },
      {
        name: "Work",
        type: "folder",
        modified: "Feb 1",
        children: [
          { name: "report.pdf", type: "document", size: "1.2 MB", modified: "Feb 1" },
        ],
      },
    ],
  },
  {
    name: "Downloads",
    type: "folder",
    modified: "Today",
    children: [
      { name: "app-installer.dmg", type: "file", size: "85 MB", modified: "Today" },
      { name: "wallpaper.jpg", type: "image", size: "4.2 MB", modified: "Yesterday" },
    ],
  },
  {
    name: "Music",
    type: "folder",
    modified: "Last week",
    children: [
      { name: "track01.mp3", type: "music", size: "5.3 MB", modified: "Jan 20" },
      { name: "track02.mp3", type: "music", size: "4.8 MB", modified: "Jan 20" },
    ],
  },
  {
    name: "Pictures",
    type: "folder",
    modified: "Yesterday",
    children: [
      { name: "vacation.jpg", type: "image", size: "3.1 MB", modified: "Dec 25" },
      { name: "avatar.png", type: "image", size: "512 KB", modified: "Nov 10" },
    ],
  },
  {
    name: "Videos",
    type: "folder",
    modified: "Last month",
    children: [
      { name: "recording.mp4", type: "video", size: "125 MB", modified: "Dec 1" },
    ],
  },
]

const iconMap: Record<string, React.ReactNode> = {
  folder: <Folder className="h-5 w-5 text-primary" />,
  file: <File className="h-5 w-5 text-muted-foreground" />,
  image: <ImageIcon className="h-5 w-5 text-emerald-400" />,
  music: <Music className="h-5 w-5 text-pink-400" />,
  video: <Video className="h-5 w-5 text-amber-400" />,
  document: <FileText className="h-5 w-5 text-sky-400" />,
}

export function FileManagerApp() {
  const [path, setPath] = useState<string[]>(["Home"])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const getCurrentFiles = (): FileItem[] => {
    if (path.length === 1) return fileSystem
    let items = fileSystem
    for (let i = 1; i < path.length; i++) {
      const folder = items.find((f) => f.name === path[i])
      if (folder?.children) {
        items = folder.children
      } else {
        return []
      }
    }
    return items
  }

  const navigateTo = (item: FileItem) => {
    if (item.type === "folder" && item.children) {
      setPath((prev) => [...prev, item.name])
    }
  }

  const goBack = () => {
    if (path.length > 1) setPath((prev) => prev.slice(0, -1))
  }

  const goHome = () => setPath(["Home"])

  const currentFiles = getCurrentFiles()

  return (
    <div className="flex h-full flex-col" role="application" aria-label="File Manager">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-border/30 bg-secondary/30 px-3 py-1.5">
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
          onClick={goBack}
          disabled={path.length <= 1}
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground opacity-30"
          disabled
          aria-label="Go forward"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={goHome}
          aria-label="Go home"
        >
          <Home className="h-4 w-4" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex flex-1 items-center gap-1 text-xs" aria-label="Path">
          {path.map((segment, i) => (
            <span key={`${segment}-${i}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              <button
                type="button"
                className={`rounded px-1 py-0.5 transition-colors hover:bg-muted ${
                  i === path.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setPath(path.slice(0, i + 1))}
              >
                {segment}
              </button>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`rounded p-1 transition-colors ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={`rounded p-1 transition-colors ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {viewMode === "list" ? (
          <table className="w-full text-xs" role="grid">
            <thead>
              <tr className="border-b border-border/30 text-left text-muted-foreground">
                <th className="pb-2 pl-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Size</th>
                <th className="pb-2 font-medium">Modified</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((item) => (
                <tr
                  key={item.name}
                  className="cursor-pointer border-b border-border/10 transition-colors hover:bg-muted/30"
                  onDoubleClick={() => navigateTo(item)}
                  role="row"
                >
                  <td className="flex items-center gap-2 py-1.5 pl-2">
                    {iconMap[item.type]}
                    <span className="text-foreground">{item.name}</span>
                  </td>
                  <td className="py-1.5 text-muted-foreground">
                    {item.size || "--"}
                  </td>
                  <td className="py-1.5 text-muted-foreground">
                    {item.modified || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {currentFiles.map((item) => (
              <button
                key={item.name}
                type="button"
                className="flex flex-col items-center gap-1.5 rounded-lg p-3 transition-colors hover:bg-muted/30"
                onDoubleClick={() => navigateTo(item)}
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  {iconMap[item.type]}
                </div>
                <span className="w-full truncate text-center text-xs text-foreground">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="border-t border-border/30 bg-secondary/20 px-3 py-1">
        <span className="text-[10px] text-muted-foreground">
          {currentFiles.length} items
        </span>
      </div>
    </div>
  )
}
