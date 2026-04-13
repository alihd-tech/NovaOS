"use client"

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react"

interface TerminalLine {
  id: number
  type: "input" | "output" | "error"
  content: string
}

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () =>
    `Available commands:
  help      - Show this help message
  echo      - Print text to terminal
  date      - Show current date and time
  clear     - Clear the terminal
  whoami    - Display current user
  uname     - System information
  ls        - List files
  pwd       - Print working directory
  neofetch  - System info display
  cat       - Print file contents`,
  echo: (args) => args.join(" "),
  date: () => new Date().toString(),
  whoami: () => "nova",
  uname: () => "NovaOS 1.0.0 WebKernel x86_64",
  pwd: () => "/home/nova",
  ls: () =>
    "Desktop  Documents  Downloads  Music  Pictures  Videos  .config",
  cat: (args) => {
    if (!args.length) return "cat: missing file operand"
    return `cat: ${args[0]}: No such file or directory`
  },
  neofetch: () =>
    `       .--.        nova@novaos
      |o_o |       -----------
      |:_/ |       OS: NovaOS 1.0
     //   \\ \\      Host: WebBrowser
    (|     | )     Kernel: Next.js 16
   /'\\_   _/\`\\     Shell: nova-sh 1.0
   \\___)=(___/                        Resolution: ${globalThis.innerWidth ?? "?"}x${globalThis.innerHeight ?? "?"}
                   Terminal: NovaTerminal
                   CPU: WebAssembly vCPU
                   Memory: Unlimited`,
}

let lineId = 0

export function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: lineId++,
      type: "output",
      content: "NovaOS Terminal v1.0 - Type 'help' for commands",
    },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [lines])

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      if (!trimmed) return

      const parts = trimmed.split(" ")
      const command = parts[0].toLowerCase()
      const args = parts.slice(1)

      const newLines: TerminalLine[] = [
        ...lines,
        { id: lineId++, type: "input", content: `nova@novaos:~$ ${trimmed}` },
      ]

      if (command === "clear") {
        setLines([])
        setInput("")
        setHistory((prev) => [...prev, trimmed])
        setHistoryIndex(-1)
        return
      }

      const handler = COMMANDS[command]
      if (handler) {
        const output = handler(args)
        newLines.push({ id: lineId++, type: "output", content: output })
      } else {
        newLines.push({
          id: lineId++,
          type: "error",
          content: `nova-sh: ${command}: command not found`,
        })
      }

      setLines(newLines)
      setInput("")
      setHistory((prev) => [...prev, trimmed])
      setHistoryIndex(-1)
    },
    [lines]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const newIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(history[newIndex])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= history.length) {
        setHistoryIndex(-1)
        setInput("")
      } else {
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    }
  }

  return (
    <div
      className="flex h-full w-full flex-col bg-[#0d1117] font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
      role="application"
      aria-label="Terminal"
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-3">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-[#58a6ff]"
                : line.type === "error"
                  ? "text-[#f85149]"
                  : "text-[#c9d1d9]"
            }`}
          >
            {line.content}
          </div>
        ))}
        <div className="flex items-center text-[#58a6ff]">
          <span>{"nova@novaos:~$ "}</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border-none bg-transparent text-[#c9d1d9] outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
