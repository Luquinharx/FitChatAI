"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg transition-all duration-300 hover:scale-105"
      title={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-gray-600 hover:text-purple-600 transition-colors" />
      ) : (
        <Sun className="w-4 h-4 text-yellow-500 hover:text-yellow-400 transition-colors" />
      )}
    </Button>
  )
}
