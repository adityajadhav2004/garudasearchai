"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { themes } from "@/lib/themes"

export function ThemeToggle() {
  const { themeName, setTheme } = useTheme()

  // Ensure we have a valid theme name and fallback to vscode-dark if not
  const currentThemeName = themeName && themes[themeName] ? themeName : "vscode-dark"
  const currentTheme = themes[currentThemeName]

  // If no theme is found, use vscode-dark as fallback
  if (!currentTheme) {
    console.warn(`Theme "${themeName}" not found, falling back to vscode-dark`)
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 backdrop-blur-xl border"
          style={{
            backgroundColor: "var(--glass)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <Palette className="w-4 h-4" />
          {currentTheme.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="backdrop-blur-xl border"
        style={{
          backgroundColor: "var(--glass)",
          borderColor: "var(--border)",
        }}
      >
        {Object.entries(themes).map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key)}
            className={`${currentThemeName === key ? "bg-accent" : ""} hover:bg-muted`}
            style={{
              color: "var(--foreground)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border"
                style={{
                  backgroundColor: theme.colors.primary,
                  borderColor: "var(--border)",
                }}
              />
              {theme.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
