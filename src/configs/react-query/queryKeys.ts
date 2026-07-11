export const QUERY_ENTITIES = {
    THREAD: "threads",
} as const

export const TANSTACK_QUERY_KEYS = {
    THREAD_LIST: [QUERY_ENTITIES.THREAD, "list"] as const,
    CONNECTED_THREAD: [QUERY_ENTITIES.THREAD, "connected"] as const,
    MESSAGES_PAGINATED: [QUERY_ENTITIES.THREAD, "messages", "paginated"] as const,
    THREAD_MEMBERS: [QUERY_ENTITIES.THREAD, "members"] as const,
    THREAD_BY_SLUG: (slug: string) => [QUERY_ENTITIES.THREAD, "slug", slug] as const,
}
