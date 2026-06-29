import toast, { type ToastOptions } from "react-hot-toast"
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Loader2 } from 'lucide-react';

// Configuration de base pour éviter la répétition
const defaultOptions: ToastOptions = {
    duration: 4000,
    position: "top-right",
    style: {
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: 500,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
}

export const appToast = {
    successToast: (message: string, options?: ToastOptions) =>
        toast.success(message, {
            ...defaultOptions,
            ...options,
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
        }),

    errorToast: (message: string, options?: ToastOptions) =>
        toast.error(message, {
            ...defaultOptions,
            ...options,
            icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
            // Un toast d'erreur peut rester un peu plus longtemps
            duration: 5000,
        }),

    dangerToast: (message: string, options?: ToastOptions) =>
        toast(message, {
            ...defaultOptions,
            ...options,
            icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
            style: {
                ...defaultOptions.style,
                borderLeft: '4px solid #f59e0b', // Petite touche visuelle de danger
            },
        }),

    infoToast: (message: string, options?: ToastOptions) =>
        toast(message, {
            ...defaultOptions,
            ...options,
            icon: <Info className="h-5 w-5 text-sky-400" />,
        }),

    loadingToast: (message: string, options?: ToastOptions) =>
        toast.loading(message, {
            ...defaultOptions,
            ...options,
            icon: <Loader2 className="h-5 w-5 text-indigo-400 animate-spin" />,
        }),

    // Permet de fermer un toast spécifique ou tous les toasts
    dismiss: (toastId?: string) => toast.dismiss(toastId),
};

// 2. Le Custom Hook (Pour respecter les conventions React et faciliter l'extension si besoin)
export const useToast = () => {
    return appToast;
};