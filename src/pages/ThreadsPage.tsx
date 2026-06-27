import { ThreadCard } from "@/components/client/ThreadCard.tsx"
import EmptyThreads from "@/components/client/EmptyThreads.tsx"
import { useAllThreads } from "@/hooks/useAllThreads.ts"
import { Spinner } from "@/components/ui/spinner.tsx"

function ThreadsPage() {

    const {threadsQueryResult, isLoading} = useAllThreads()

    if (isLoading) {
        return (
            <Spinner/>
        )
    }
    const threads = threadsQueryResult?.result

    if (!threads || threads.length === 0) {
        return (
                <EmptyThreads/>
        )
    }
    return (
        <div className="flex w-full justify-center px-4">
            <div className="flex w-full justify-center items-center flex-wrap gap-3">
                {threads.map((thread) => (
                    <ThreadCard
                        key={thread.id}
                        thread={thread}
                    />
                ))}
            </div>
        </div>
    )
}

export default ThreadsPage
