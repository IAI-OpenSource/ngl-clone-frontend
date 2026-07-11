import type { components } from "@/types/api/apiRawSchemas"

export interface ApiBaseResponse<D, E> {
    /** Champ pour véreifier si la reequete à réussi, True si la requete a reussi, False sinon */
    success: boolean
    /** Champ pour véreifier le code de status HTTP de la réponse, 200 pour les succès, 400 pour les erreurs client, 500 pour les erreurs serveur, etc. */
    status_code: number
    /**
     * Champ de résultat
     * @description Présent seulement si la requet à réussi
     */
    result?: D | null
    /**
     * Champ des erreurs
     * @description Présent seulement si la requete à échouée ou si quelque chose s'est mal passé durant le traitement
     */
    error?: E | null
}
type AppErrorType =
    | "LOCKED_CONTENT"
    | "NOT_FOUND"
    | "UNKNOWN_ERROR"
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "RATE_LIMIT_EXCEEDED"

export interface AppError {
    /**
     * Type d'erreur métier
     * @description Le type d'erreur métier qui s'est produite, utilisé pour catégoriser les erreurs et faciliter la gestion des erreurs dans coté frontend
     */
    error_type: AppErrorType
    /**
     * Champ des erreurs affichable directement à l'utilisateur (Texte User friendly)
     * @description Présent seulement si la requete à échouée ou si quelque chose s'est mal passé durant le traitement
     */
    error_message: string
}
interface StringMessage {
    /**
     * Message
     * @description Le message de réponse relatif au résultat de l'opération, ce message là sera forcément pour un succès, si c'est echec ca sera dans le champ 'error'
     */
    message: string
}

export type CommonApiBaseResponse<T> = ApiBaseResponse<T, AppError>
export type AuthErrorResponse = components["schemas"]["AuthErrorMessage"]

export type CommonApiBaseResponseWithAuth<T> = AuthErrorResponse | ApiBaseResponse<T, AppError>

export type GlobalStringResponse = ApiBaseResponse<StringMessage, AppError>
