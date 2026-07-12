import { create } from "zustand/react"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
export interface ErrorDialogData {
    title: string
    message: string
    errorIcon?: LucideIcon
    errorCode?: string
    variant?: "destructive" | "warning" | "info" | "glitch"
    actions?: ReactNode
    onClose?: () => void
}

interface AppErrorDialogStore {
    errorData: ErrorDialogData | null

    showError: (errorData: ErrorDialogData) => void

    hideError: () => void
}

export const useAppErrorDialogStore = create<AppErrorDialogStore>()((set) => ({
    errorData: null,

    showError: (errorData) => {
        set({ errorData })
    },

    hideError: () => {
        set({ errorData: null })
    },
}))
