"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300",
        "bg-background hover:scale-105 active:scale-95",
        "shadow-sm hover:shadow-md"
      )}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100 text-yellow-500 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
        )}
      />

      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark
            ? "opacity-100 rotate-0 scale-100 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]"
            : "opacity-0 -rotate-90 scale-0"
        )}
      />
    </button>
  )
}