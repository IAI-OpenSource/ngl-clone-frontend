import { ThreadCard } from "@/components/client/ThreadCard.tsx"
import EmptyThreads from "@/components/client/EmptyThreads.tsx"
import { useAllThreads } from "@/hooks/useAllThreads.ts"
import PageLoader from "@/components/client/PageLoader.tsx"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"

import ThreadConnectForm from "@/components/client/ThreadConnectForm.tsx"
import { useState } from "react"
import Button  from "@/components/ui/button.tsx"
import { RefreshCcwIcon } from "lucide-react"
import { useToast } from "@/hooks/useToasts.tsx"
import { rearrangeThreads } from "@/utils/threadsUtils.ts"

function ThreadsPage() {
    const { threadsQueryResult, isLoading, refetch } = useAllThreads()
    const [activeThread, setActiveThread] = useState<ReadThread | null>(null)
    const { loadingToast, infoToast } = useToast()

    if (isLoading) {
        return <PageLoader message="Chargement des threads en cours" />
    }

    const refatchThreads = async () => {
        const id = loadingToast("Actualisation des threads en cours")
        await refetch()
        infoToast("Threads actualisés avec succès", { id: id })
    }
    const threads = threadsQueryResult?.result
    const hasThreads = threads && threads.length > 0

    if (!hasThreads) {
        return <EmptyThreads refetchFunc={refatchThreads} />
    }
    const threadsToRender = rearrangeThreads(threads)

    return (
        <>
            <Dialog
                open={activeThread !== null}
                onOpenChange={(open) => {
                    if (!open) setActiveThread(null)
                }}
            >
                <DialogTrigger></DialogTrigger>
                <DialogContent className="bg-accent sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Thread Connexion
                        </DialogTitle>
                    </DialogHeader>
                    {activeThread && (
                        <ThreadConnectForm thread={activeThread} />
                    )}
                </DialogContent>
            </Dialog>

            <div className="flex w-full flex-col items-center justify-center px-4 pt-8 pb-24 xl:pt-0 xl:pb-0">
                <div className="flex w-full flex-wrap items-center justify-center gap-3">
                    {threadsToRender.map((thread) => {
                        const isConnected = thread.is_connected

                        const handleClick = () => {
                            if (isConnected) {
                                infoToast("T'es déja connecté à ce thread poto")
                                return
                            }
                            setActiveThread(thread)
                        }

                        return (
                            <button
                                className="w-11/12 md:w-5/12"
                                key={thread.id}
                                onClick={handleClick}
                            >
                                <ThreadCard thread={thread} />
                            </button>
                        )
                    })}
                </div>

                <Button
                    className="mt-4 w-11/12 md:w-5/12"
                    variant="outline"
                    onClick={() => refatchThreads()}
                >
                    <RefreshCcwIcon />
                    Recharger
                </Button>
            </div>
        </>
    )
}

export default ThreadsPage
