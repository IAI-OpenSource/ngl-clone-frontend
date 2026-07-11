import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

export default function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem(STORAGE_KEY) as Theme) || "system"
    })

    useEffect(() => {
        const root = document.documentElement
        const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)")

        const applyTheme = () => {
            const isDark = theme === "dark" || (theme === "system" && mediaQuery.matches)
            root.classList.toggle("dark", isDark)
        }

        applyTheme()

        if (theme === "system") {
            mediaQuery.addEventListener("change", applyTheme)
            return () => {
                mediaQuery.removeEventListener("change", applyTheme)
            }
        }
    }, [theme])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    return {
        theme,
        setTheme,
        toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    }
}