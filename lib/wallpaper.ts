/**
 * Wallpaper configuration for the Q-OS environment.
 * Defaults: dark.jpg (dark theme), light.jpeg (light theme).
 * Categories: microsoft, apple, nature.
 */

export const WALLPAPER_DEFAULTS = {
  dark: "/wallpaper/dark.jpg",
  light: "/wallpaper/light.jpeg",
} as const

export type WallpaperTheme = keyof typeof WALLPAPER_DEFAULTS

export const WALLPAPER_CATEGORIES = {
  microsoft: [
    { id: "microsoft-1", path: "/wallpaper/microsoft/1.jpg", label: "Microsoft 1" },
    { id: "microsoft-2", path: "/wallpaper/microsoft/2.jpg", label: "Microsoft 2" },
    { id: "microsoft-3", path: "/wallpaper/microsoft/3.jpg", label: "Microsoft 3" },
    { id: "microsoft-4", path: "/wallpaper/microsoft/4.jpg", label: "Microsoft 4" },
    { id: "microsoft-5", path: "/wallpaper/microsoft/5.jpg", label: "Microsoft 5" },
  ],
  apple: [
    { id: "bigsur-dark", path: "/wallpaper/apple/bigsur-dark.jpg", label: "Big Sur (Dark)" },
    { id: "bigsur-light", path: "/wallpaper/apple/bigsur-light.jpg", label: "Big Sur (Light)" },
    { id: "catolina-dark", path: "/wallpaper/apple/catolina-dark.jpg", label: "Catalina (Dark)" },
    { id: "catolina-light", path: "/wallpaper/apple/catolina-light.jpg", label: "Catalina (Light)" },
    { id: "mountain-dark", path: "/wallpaper/apple/mountain-dark.jpg", label: "Mountain (Dark)" },
    { id: "mountain-light", path: "/wallpaper/apple/mountain-light.jpeg", label: "Mountain (Light)" },
  ],
  nature: [
    { id: "nature-primary", path: "/wallpaper/nature/primary.jpg", label: "Primary" },
    { id: "nature-secondary", path: "/wallpaper/nature/secondary.jpg", label: "Secondary" },
  ],
} as const

export const WALLPAPER_STORAGE_KEY = "qos-wallpaper"

export function getDefaultWallpaper(theme: "light" | "dark"): string {
  return theme === "dark" ? WALLPAPER_DEFAULTS.dark : WALLPAPER_DEFAULTS.light
}

/** Resolve wallpaper URL: custom selection or theme default. */
export function resolveWallpaperUrl(
  customUrl: string | null,
  theme: "light" | "dark"
): string {
  return customUrl ?? getDefaultWallpaper(theme)
}
