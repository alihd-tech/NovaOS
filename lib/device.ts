/**
 * Device detection and info for Q-OS settings (About / General).
 * Uses navigator, screen, and userAgent to infer platform and capabilities.
 */

export interface DeviceInfo {
  /** e.g. "Chrome 120", "Safari 17", "Firefox 121" */
  browser: string
  /** e.g. "Windows", "macOS", "Linux", "Android", "iOS" */
  platform: string
  /** e.g. "Windows 10", "Mac Intel" */
  platformVersion: string
  /** Device type: desktop, mobile, tablet */
  deviceType: "desktop" | "mobile" | "tablet"
  /** Screen width x height */
  screenResolution: string
  /** Pixel ratio (e.g. 1, 2, 3) */
  pixelRatio: number
  /** Preferred language code */
  language: string
  /** Number of logical cores (if available) */
  cores: number | null
  /** Device memory in GB (Chrome only; null otherwise) */
  deviceMemoryGB: number | null
  /** Whether touch is the primary input */
  touchPrimary: boolean
  /** User agent string (truncated for display) */
  userAgentShort: string
}

function getBrowser(): string {
  if (typeof navigator === "undefined") return "Unknown"
  const ua = navigator.userAgent
  let name = "Unknown"
  let version = ""
  if (ua.includes("Edg/")) {
    name = "Edge"
    version = ua.match(/Edg\/(\d+)/)?.[1] ?? ""
  } else if (ua.includes("Chrome/") && !ua.includes("Chromium")) {
    name = "Chrome"
    version = ua.match(/Chrome\/(\d+)/)?.[1] ?? ""
  } else if (ua.includes("Firefox/")) {
    name = "Firefox"
    version = ua.match(/Firefox\/(\d+)/)?.[1] ?? ""
  } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
    name = "Safari"
    version = ua.match(/Version\/(\d+)/)?.[1] ?? ""
  }
  return version ? `${name} ${version}` : name
}

function getPlatform(): { platform: string; platformVersion: string } {
  if (typeof navigator === "undefined") return { platform: "Unknown", platformVersion: "" }
  const ua = navigator.userAgent
  const plat = navigator.platform ?? ""
  if (ua.includes("Windows NT 10")) return { platform: "Windows", platformVersion: "10/11" }
  if (ua.includes("Windows")) return { platform: "Windows", platformVersion: "" }
  if (ua.includes("Mac OS X") || ua.includes("Macintosh")) return { platform: "macOS", platformVersion: "Intel/Apple Silicon" }
  if (ua.includes("Linux")) return { platform: "Linux", platformVersion: "" }
  if (ua.includes("Android")) return { platform: "Android", platformVersion: "" }
  if (ua.includes("iPhone") || ua.includes("iPad")) return { platform: "iOS", platformVersion: "" }
  if (plat.includes("Win")) return { platform: "Windows", platformVersion: "" }
  if (plat.includes("Mac")) return { platform: "macOS", platformVersion: "" }
  if (plat.includes("Linux")) return { platform: "Linux", platformVersion: "" }
  return { platform: "Unknown", platformVersion: "" }
}

function getDeviceType(): "desktop" | "mobile" | "tablet" {
  if (typeof navigator === "undefined") return "desktop"
  if (navigator.maxTouchPoints > 0 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return /iPad|Android.*Tablet|Tablet/i.test(navigator.userAgent) ? "tablet" : "mobile"
  }
  return "desktop"
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof navigator === "undefined" || typeof screen === "undefined") {
    return {
      browser: "Unknown",
      platform: "Unknown",
      platformVersion: "",
      deviceType: "desktop",
      screenResolution: "—",
      pixelRatio: 1,
      language: "en",
      cores: null,
      deviceMemoryGB: null,
      touchPrimary: false,
      userAgentShort: "",
    }
  }
  const { platform, platformVersion } = getPlatform()
  const ua = navigator.userAgent
  const short = ua.length > 60 ? ua.slice(0, 57) + "…" : ua
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number }
  return {
    browser: getBrowser(),
    platform,
    platformVersion,
    deviceType: getDeviceType(),
    screenResolution: `${screen.width} × ${screen.height}`,
    pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1,
    language: navigator.language || "en",
    cores: typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : null,
    deviceMemoryGB: typeof nav.deviceMemory === "number" ? nav.deviceMemory : null,
    touchPrimary: navigator.maxTouchPoints > 0,
    userAgentShort: short,
  }
}
