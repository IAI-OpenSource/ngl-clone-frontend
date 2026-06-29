export const QUERY_ENTITIES = {
    THREAD: "threads",
} as const

export const TANSTACK_QUERY_KEYS = {
    THREAD_LIST: [QUERY_ENTITIES.THREAD, "list"] as const,
    CONNECTED_THREAD: [QUERY_ENTITIES.THREAD, "connected"] as const,
}
