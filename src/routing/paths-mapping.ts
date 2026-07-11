/**
 * Chemins des routes de l'application
 * Définitions centralisées des chemins pour éviter les strings hardcodées
 */

export const PATHS_MAPPING = {
    // Routes principales
    HOME: "/",

    THREAD: "threads",

    NOT_CONNECTED: "/not-connected",

} as const

export const getClientRoute = (path: string): string => {
    return `${PATHS_MAPPING.HOME}${path}`
}

const SLUG_ALIAS_IN_ROUTES = ':threadSlug'

export const genarateMessageRoute = (threadSlug: string): string => {
    return `${getClientRoute(PATHS_MAPPING.THREAD)}/${threadSlug}/messages`
}
export const genarateNewMessageRoute = (threadSlug: string): string => {
    return `${getClientRoute(PATHS_MAPPING.THREAD)}/${threadSlug}/new-message`
}
export const CLIENT_ROUTES_MAPPING = {
    HOME: PATHS_MAPPING.HOME,
    THREADS: getClientRoute(PATHS_MAPPING.THREAD),
    THREADS_MESSAGES: genarateMessageRoute(SLUG_ALIAS_IN_ROUTES),
    NEW_MESSAGE: genarateNewMessageRoute(SLUG_ALIAS_IN_ROUTES),
    NOT_CONNECTED: PATHS_MAPPING.NOT_CONNECTED,
} as const
