"use client"

import { useState } from "react"
import { Plus, Trash2, Search } from "lucide-react"

interface Note {
  id: number
  title: string
  content: string
  date: Date
}

let noteId = 0

const defaultNotes: Note[] = [
  {
    id: noteId++,
    title: "Welcome to NovaOS",
    content:
      "Welcome to NovaOS Notes. This is your personal note-taking app. Click the + button to create a new note.",
    date: new Date(),
  },
  {
    id: noteId++,
    title: "Keyboard shortcuts",
    content:
      "Here are some useful shortcuts:\n\n- Double-click title bar to maximize\n- Drag title bar to move window\n- Drag bottom-right corner to resize",
    date: new Date(Date.now() - 86400000),
  },
]

export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes)
  const [selectedId, setSelectedId] = useState<number>(notes[0]?.id ?? -1)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedNote = notes.find((n) => n.id === selectedId)

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addNote = () => {
    const newNote: Note = {
      id: noteId++,
      title: "Untitled",
      content: "",
      date: new Date(),
    }
    setNotes((prev) => [newNote, ...prev])
    setSelectedId(newNote.id)
  }

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (selectedId === id) {
      setSelectedId(notes.find((n) => n.id !== id)?.id ?? -1)
    }
  }

  const updateNote = (field: "title" | "content", value: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedId ? { ...n, [field]: value, date: new Date() } : n
      )
    )
  }

  return (
    <div className="flex h-full" role="application" aria-label="Notes">
      {/* Sidebar */}
      <div className="flex w-56 flex-shrink-0 flex-col border-r border-border/30 bg-secondary/50">
        <div className="flex items-center gap-2 border-b border-border/30 p-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md bg-muted/50 py-1.5 pl-7 pr-2 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notes"
            />
          </div>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={addNote}
            aria-label="Create new note"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-auto" role="listbox" aria-label="Notes list">
          {filteredNotes.map((note) => (
            <button
              type="button"
              key={note.id}
              className={`flex w-full flex-col gap-0.5 border-b border-border/20 px-3 py-2.5 text-left transition-colors ${
                selectedId === note.id
                  ? "bg-primary/20"
                  : "hover:bg-muted/40"
              }`}
              onClick={() => setSelectedId(note.id)}
              role="option"
              aria-selected={selectedId === note.id}
            >
              <span className="truncate text-xs font-medium text-foreground">
                {note.title || "Untitled"}
              </span>
              <span className="truncate text-[10px] text-muted-foreground">
                {note.date.toLocaleDateString()} - {note.content.slice(0, 40) || "No content"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      {selectedNote ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-2">
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => updateNote("title", e.target.value)}
              className="bg-transparent text-sm font-semibold text-foreground outline-none"
              aria-label="Note title"
            />
            <button
              type="button"
              className="text-muted-foreground transition-colors hover:text-destructive"
              onClick={() => deleteNote(selectedNote.id)}
              aria-label="Delete note"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <textarea
            className="flex-1 resize-none bg-transparent p-4 text-sm leading-relaxed text-foreground outline-none"
            value={selectedNote.content}
            onChange={(e) => updateNote("content", e.target.value)}
            placeholder="Start typing..."
            aria-label="Note content"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          <p className="text-sm">Select a note or create a new one</p>
        </div>
      )}
    </div>
  )
}
