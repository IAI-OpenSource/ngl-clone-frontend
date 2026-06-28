import { ThreadCard } from "@/components/client/ThreadCard.tsx"
import EmptyThreads from "@/components/client/EmptyThreads.tsx"
import { useAllThreads } from "@/hooks/useAllThreads.ts"
import PageLoader from "@/components/client/PageLoader.tsx"

function ThreadsPage() {
    const { threadsQueryResult, isLoading } = useAllThreads()

    if (isLoading) {
        return <PageLoader message="Chargement des threads en cours" />
    }
    const threads = threadsQueryResult?.result

    if (!threads || threads.length === 0) {
        return <EmptyThreads />
    }
    return (
        <div className="flex w-full pt-8 pb-24 xl:pt-0 xl:pb-0 justify-center px-4">
            <div className="flex w-full flex-wrap items-center justify-center gap-3">
                {threads.map((thread) => (
                    <ThreadCard key={thread.id} thread={thread} />
                ))}
            </div>
        </div>
    )
}

export default ThreadsPage
