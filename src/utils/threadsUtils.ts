import type { ReadThread } from "@/types/api/threadsSchemas.ts"

export const extractThreadInitials = (threadName: string ): string => {

    return threadName
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
}

export const rearrangeThreads = (threads: ReadThread[]) => {
    const connected = threads.find((t) => t.is_connected)
    return connected
        ? [connected, ...threads.filter((t) => t !== connected)]
        : threads

}

