/**
 * Chemins des routes de l'application
 * Définitions centralisées des chemins pour éviter les strings hardcodées
 */

export const PATHS_MAPPING = {
    // Routes principales
    HOME: "/",

    THREAD: "/threads",

} as const

export const getClientRoute = (path: string): string => {
    return `${PATHS_MAPPING.HOME}${path}`
}


export const CLIENT_ROUTES_MAPPING = {
    HOME: getClientRoute(PATHS_MAPPING.HOME),
    THREADS: getClientRoute(PATHS_MAPPING.THREAD),
    THREADS_MESSAGES: getClientRoute(PATHS_MAPPING.THREAD) + '/messages',
} as const
