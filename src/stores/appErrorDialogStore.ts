import { create } from "zustand/react"
import type { ReactNode } from "react"
export interface ErrorDialogData {
    title: string
    message: string
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
