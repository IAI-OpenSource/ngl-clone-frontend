import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping"
import axios, { AxiosError, type AxiosResponse } from "axios"
import { router } from "../routing/router"
import toast from "react-hot-toast"

import React from "react"
import { useThreadAuthStore } from "@/stores/threadAuthStore.ts"
import { CircleAlert } from "lucide-react"

// modal affiche une modale en cas d'erreur
// do-nothing pour ne rien fair du tout
// global leve une erreur et redirect vers home
export type ErrorStrategy = "global" | "modal" | "do-nothing"

// Ajout de la strategie à la config axios
declare module "axios" {
    interface AxiosRequestConfig {
        errorStrategy?: ErrorStrategy
    }
}
export const API_BASE_URL = import.meta.env.VITE_API_URL || ""

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 60_000,
    withCredentials: true,
})

function handleLogout() {
    useThreadAuthStore.getState().clearAuth()
}

function handleToast(msg: string = "Votre requette n'a pas pu aboutir") {
    toast(msg, {
        duration: 3000,
        position: "top-right",
        icon: React.createElement(CircleAlert),
    })
}

// Gestion globale des erreurs
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {

        const redirectToLogin = async () => {
            handleToast()
            handleLogout()
            await router.navigate(CLIENT_ROUTES_MAPPING.HOME)
            throw new Error("Session expirée, veuillez vous reconnecter")
        }

        if (
            error.response?.status &&
            [401, 403].includes(error.response?.status)
        ) {
            switch (error.config?.errorStrategy){
                case "global":
                    await redirectToLogin()
                    break
                case "modal":
                    throw new Error(
                        "Session expirée, veuillez vous reconnecter"
                    )
                case 'do-nothing':
                    throw error
                default:
                    await redirectToLogin()
                    break
            }
        }
        throw error
    }
)


