import { useEffect, useRef } from "react"

type UseInfiniteScrollOptions = {
    hasNextPage: boolean | undefined
    isFetchingNextPage: boolean
    fetchNextPage: () => void
    rootMargin?: string
}

export function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin = "100px",
}: UseInfiniteScrollOptions) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const fetchNextPageRef = useRef(fetchNextPage)

    useEffect(() => {
        fetchNextPageRef.current = fetchNextPage
    }, [fetchNextPage])

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel || !hasNextPage) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (!entry?.isIntersecting || isFetchingNextPage) return
                fetchNextPageRef.current()
            },
            { rootMargin, threshold: 0 },
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, rootMargin])

    return sentinelRef
}
