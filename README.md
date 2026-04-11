# 🚀 NovaOS

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://reactjs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.x-24c8db?logo=tauri)](https://tauri.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![Solana](https://img.shields.io/badge/Solana-Web3.js-14f195?logo=solana)](https://solana.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Community-7c3aed?logo=radix-ui)](https://www.radix-ui.com/)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)

**NovaOS** is a modern, web‑based operating system experience that runs in your browser – and optionally as a native desktop app via [Tauri](https://tauri.app/). It features a desktop‑like environment, built‑in apps, Solana wallet integration, and full theming support.

![NovaOS Screenshot](/screenshot.jpg)

---

## ✨ Features

- 🖥️ **Desktop environment** – windows, dock, top bar, and multi‑window management
- 📦 **Built‑in apps** – Browser, Calculator, File Manager, Notes, Settings, Terminal
- 🎨 **Dark / Light mode** – seamless theming with `next-themes`
- 🧩 **Rich UI components** – built with Radix UI + shadcn/ui
- 🌐 **Solana blockchain** – wallet adapter and Web3.js ready
- ⚡ **High performance** – Next.js 16 + React 19
- 🪟 **Native desktop** – Tauri builds for Windows, macOS, Linux
- 🔒 **Type‑safe** – full TypeScript support

---

## 🧰 Tech Stack

| Category         | Technologies |
|------------------|--------------|
| Framework        | Next.js 16, React 19 |
| Styling          | Tailwind CSS, `tailwindcss-animate`, CVA |
| UI Components    | Radix UI (30+ primitives), shadcn/ui, Lucide icons |
| Forms            | React Hook Form + Zod |
| Desktop Runtime  | Tauri (Rust backend) |
| Web3             | Solana Web3.js, Solana Wallet Adapter |
| Fonts            | Inter, JetBrains Mono |

---

## 📦 Getting Started

### Prerequisites

- Node.js **22+** (LTS)
- `pnpm` (recommended) or `npm` / `yarn`
- For Tauri desktop builds: [Rust + system dependencies](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

```bash
git clone https://github.com/alihd-tech/nova-os.git
cd nova-os
pnpm install
```

### Development (Web only)

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Development (Desktop with Tauri)

```bash
pnpm tauri:dev
```

### Production Builds

- **Web:** `pnpm build && pnpm start`
- **Desktop:** `pnpm tauri:build` → executables in `src-tauri/target/release/`

---

## 📁 Project Structure

```
nova-os/
├── app/                     # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx           # Root layout, metadata, fonts
│   └── page.tsx             # Main desktop entry
├── components/
│   ├── apps/                # Built‑in applications
│   │   ├── browser-app.tsx
│   │   ├── calculator-app.tsx
│   │   ├── file-manager-app.tsx
│   │   ├── notes-app.tsx
│   │   ├── settings-app.tsx
│   │   └── terminal-app.tsx
│   ├── desktop/             # Desktop UI parts
│   │   ├── desktop.tsx
│   │   ├── dock.tsx
│   │   ├── top-bar.tsx
│   │   └── app-window.tsx
│   ├── settings/            # Settings panel components
│   │   └── section.tsx
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.tsx
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities, helpers
├── public/                  # Static assets (screenshot.jpg, favicon, og-image.png)
├── src-tauri/               # Tauri backend (Rust)
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── src/
├── styles/                  # Additional style files
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

---

## ⚙️ Configuration

### Metadata & SEO

Edit `app/layout.tsx`:
- Replace `metadataBase` with your domain.
- Update `icons`, `openGraph.images`, and `twitter.images` paths.

### Environment Variables

No required variables by default. For custom Solana RPC, create `.env.local`:

```
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
```

### Tauri Settings

Adjust window size, permissions, and build options in `src-tauri/tauri.conf.json`.

---

## 🧪 Available Scripts

| Script             | Description                              |
|--------------------|------------------------------------------|
| `pnpm dev`         | Start Next.js dev server (web)           |
| `pnpm build`       | Build Next.js web production             |
| `pnpm start`       | Serve built web app                      |
| `pnpm lint`        | Run ESLint                               |
| `pnpm tauri`       | Show Tauri CLI help                      |
| `pnpm tauri:dev`   | Run Tauri desktop in development mode    |
| `pnpm tauri:build` | Build production desktop app             |

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Follow existing code style (Prettier + ESLint).

---

## 👤 Author

**AliHD** – [GitHub](https://github.com/alihd-tech)

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tauri](https://tauri.app/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Solana Labs](https://solana.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

> Built with ☕ and 🦀
