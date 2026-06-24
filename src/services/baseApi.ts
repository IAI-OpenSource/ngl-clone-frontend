// import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping"
// import axios, { AxiosError, type AxiosResponse } from "axios"
// import { router } from "../routing/router"
// import toast from "react-hot-toast"
//
// import React from "react"
// import { useThreadAuthStore } from "@/stores/threadAuthStore.ts"
//
//
// export const API_BASE_URL = "http://localhost:8000/"
//
// export const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: { "Content-Type": "application/json" },
//     timeout: 60_000,
//     withCredentials: true
// })
//
// // Gestion globale des erreurs
// api.interceptors.response.use(
//     (response: AxiosResponse) => response,
//     async (error: AxiosError) => {
//
//         const wasAuthenticated = useThreadAuthStore.getState().isAuthenticated;
//
//         const originalRequest = error.config
//
//         const redirectToLogin = () => {
//             handleLogout()
//             router.navigate(CLIENT_ROUTES_MAPPING.HOME)
//             return Promise.reject(
//                 new Error("Session expirée, veuillez vous reconnecter")
//             )
//         }
//
//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry &&
//             !originalRequest?.url?.includes("/auth/login")
//         ) {
//             originalRequest._retry = true
//
//             try {
//                 const currentRefreshToken = getCookie(REFRESH_TOKEN)
//
//                 if (!currentRefreshToken) {
//                     return redirectToLogin()
//                 }
//
//                 return api(originalRequest)
//             } catch {
//                 handleToast()
//                 return redirectToLogin()
//             }
//         }
//
//         // Toutes les autres erreurs
//         const message =
//             error.response?.data?.message ??
//             error.message ??
//             "Une erreur est survenue, veuillez réessayer"
//         handleToast(message)
//         throw new Error(message)
//     }
// )
//
// function handleLogout() {
//     useThreadAuthStore.getState().clearAuth()
// }
//
// export interface RefreshData {
//     accessToken: string
//     refreshToken: string
// }
//
// function handleToast(msg: string = "Votre requette n'a pas pu aboutir") {
//     toast(msg, {
//         duration: 3000,
//         position: "top-right",
//         icon: React.createElement(HugeiconsIcon, {
//             icon: SettingError03Icon,
//             primaryColor: "red",
//             secondaryColor: "red",
//         }),
//     })
// }
