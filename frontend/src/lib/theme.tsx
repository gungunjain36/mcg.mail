import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

export type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyDocumentTheme(next: "light" | "dark") {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (next === "dark") root.classList.add("dark")
  else root.classList.remove("dark")
}

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "mcg.theme" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = window.localStorage.getItem(storageKey) as Theme | null
    return stored ?? defaultTheme
  })

  const resolvedTheme = useMemo<"light" | "dark">(() => {
    return theme === "system" ? getSystemTheme() : theme
  }, [theme])

  useEffect(() => {
    applyDocumentTheme(resolvedTheme)
    try {
      window.localStorage.setItem(storageKey, theme)
    } catch {}
  }, [resolvedTheme, theme, storageKey])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.matchMedia) return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (theme === "system") applyDocumentTheme(getSystemTheme())
    }
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme])

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme, resolvedTheme }), [theme, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}


