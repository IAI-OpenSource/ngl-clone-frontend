import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping"
import axios, { AxiosError, type AxiosResponse } from "axios"
import { router } from "../routing/router"
import toast from "react-hot-toast"

import React from "react"
import { useThreadAuthStore } from "@/stores/threadAuthStore.ts"
import { CircleAlert } from "lucide-react"

export const API_BASE_URL = "http://localhost:8000/"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 60_000,
    withCredentials: true,
})

// Gestion globale des erreurs
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const redirectToLogin = () => {
            handleToast()
            handleLogout()
            router.navigate(CLIENT_ROUTES_MAPPING.HOME)
            return Promise.reject(
                new Error("Session expirée, veuillez vous reconnecter")
            )
        }

        if (
            error.response?.status &&
            [401, 403].includes(error.response?.status)
        ) {
            await redirectToLogin()
        }
    }
)

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
