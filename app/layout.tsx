import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://novaos.app"), // change to your domain

  title: {
    default: "NovaOS",
    template: "%s | NovaOS",
  },

  description: "NovaOS — A modern web‑based operating system experience in your browser.",

  applicationName: "NovaOS",

  keywords: [
    "NovaOS",
    "web operating system",
    "browser OS",
    "virtual desktop",
    "web desktop",
    "cloud OS",
  ],

  authors: [{ name: "AliHD" }],

  creator: "NovaOS",
  publisher: "NovaOS",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "NovaOS",
    description: "A modern operating system experience directly in your browser.",
    url: "https://novaos.app",
    siteName: "NovaOS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NovaOS Web Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NovaOS",
    description: "A web‑based operating system experience.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#141a24",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
