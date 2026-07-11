import SafeDivWrapper from "@/components/client/SafeDivWrapper.tsx"
import ThreadsPageContent from "@/components/client/ThreadsPageContent.tsx"
import ThreadsPageHeader from "@/components/client/ThreadsPageHeader.tsx"
import { useAllThreads } from "@/hooks/queries/useAllThreads.ts"

function ThreadsPage() {
    const { threadsQueryResult } = useAllThreads()
    const threads = threadsQueryResult?.result
    const connectedThread = threads?.find((t) => t.is_connected)

    return (
        <SafeDivWrapper className="items-center">
            <div className="flex w-full justify-center">
                <ThreadsPageHeader connectedThread={connectedThread} />
            </div>
            <ThreadsPageContent />
        </SafeDivWrapper>
    )
}

export default ThreadsPage

