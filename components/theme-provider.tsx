"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { themes, type Theme } from "@/lib/themes"

interface ThemeContextType {
  theme: Theme
  setTheme: (themeName: string) => void
  themeName: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState("vscode-dark")
  const [theme, setTheme] = useState(themes["vscode-dark"])

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("garuda-theme")
      if (savedTheme && themes[savedTheme]) {
        setThemeName(savedTheme)
        setTheme(themes[savedTheme])
      } else {
        // Set default theme if no saved theme or invalid theme
        setThemeName("vscode-dark")
        setTheme(themes["vscode-dark"])
      }
    }
  }, [])

  useEffect(() => {
    // Only update CSS variables on client side
    if (typeof window !== "undefined" && theme?.colors) {
      const root = document.documentElement
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value)
      })
    }
  }, [theme])

  const handleSetTheme = (newThemeName: string) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName)
      setTheme(themes[newThemeName])
      if (typeof window !== "undefined") {
        localStorage.setItem("garuda-theme", newThemeName)
      }
    } else {
      console.warn(`Theme "${newThemeName}" not found`)
    }
  }

  // Ensure we always have a valid theme
  const currentTheme = theme || themes["vscode-dark"]
  const currentThemeName = themeName || "vscode-dark"

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: handleSetTheme, themeName: currentThemeName }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
