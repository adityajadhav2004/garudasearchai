"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { themes } from "@/lib/themes"

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          {themes[themeName]?.name || "Theme"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(themes).map(([key, theme]) => (
          <DropdownMenuItem key={key} onClick={() => setTheme(key)} className={themeName === key ? "bg-accent" : ""}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.colors.primary }} />
              {theme.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
