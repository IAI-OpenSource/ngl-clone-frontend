import { ThreadCard } from "@/components/client/ThreadCard.tsx"
import EmptyThreads from "@/components/client/EmptyThreads.tsx"
import { useAllThreads } from "@/hooks/useAllThreads.ts"
import PageLoader from "@/components/client/PageLoader.tsx"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Dialog
} from "@/components/ui/dialog.tsx"

import ThreadConnectForm from "@/components/client/ThreadConnectForm.tsx"

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
        <div className="flex w-full justify-center px-4 pt-8 pb-24 xl:pt-0 xl:pb-0">
            <div className="flex w-full flex-wrap items-center justify-center gap-3">
                {threads.map((thread) => (
                    <ThreadWithDialog key={thread.id} thread={thread} />
                ))}
            </div>
        </div>
    )
}

function ThreadWithDialog({ thread }: Readonly<{ thread: ReadThread }>) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-11/12 md:w-5/12">
                    <ThreadCard thread={thread} />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-accent sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">Mon compte</DialogTitle>
                </DialogHeader>
                <ThreadConnectForm />
            </DialogContent>
        </Dialog>
    )
}
export default ThreadsPage
