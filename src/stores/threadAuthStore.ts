import { create } from "zustand/react"
import { persist } from "zustand/middleware"

interface ThreadAuthStore {
    // Indique si l'user est connect
    isAuthenticated: boolean

    // Méthode pour mettre a jour le store positivement
    setAuthenticate: () => void
    // Méthode pour mettre à jour le store négativement
    clearAuth: () => void
}

export const useThreadAuthStore = create<ThreadAuthStore>()(
    persist(
        (set) => ({
            threadData: null,

            isAuthenticated: false,
            setAuthenticate: () => {
                set({ isAuthenticated: true })
            },

            clearAuth: () => {
                set({ isAuthenticated: false })
            },
        }),
        { name: "auth" }
    )
)
