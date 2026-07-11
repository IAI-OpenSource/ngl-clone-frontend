import { useState } from "react"
import { motion } from "motion/react"
import { RefreshCcwIcon } from "lucide-react"

import { useAllThreads } from "@/hooks/queries/useAllThreads.ts"
import { useToast } from "@/hooks/useToasts.tsx"
import { rearrangeThreads } from "@/utils/threadsUtils.ts"

import type { ReadThread } from "@/types/api/threadsSchemas.ts"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import Button from "@/components/ui/button.tsx"
import { ThreadCard } from "@/components/client/ThreadCard.tsx"
import EmptyThreads from "@/components/client/EmptyThreads.tsx"
import PageLoader from "@/components/client/PageLoader.tsx"
import ThreadConnectForm from "@/components/client/ThreadConnectForm.tsx"
import ThreadsPageHeader from "@/components/client/ThreadsPageHeader.tsx"

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.45,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.23, 1, 0.32, 1] as const,
        },
    },
}

const buttonVariants = {
    hidden: { opacity: 0, y: 5 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.65,
            duration: 0.35,
            ease: [0.23, 1, 0.32, 1] as const,
        },
    },
}

function ThreadsPageContent() {
    const { threadsQueryResult, isLoading, refetch } = useAllThreads()
    const [activeThread, setActiveThread] = useState<ReadThread | null>(null)
    const { loadingToast, infoToast } = useToast()

    if (isLoading) {
        return <PageLoader message="Chargement des threads en cours" />
    }

    const refetchThreads = async () => {
        const id = loadingToast("Actualisation des threads en cours")
        await refetch()
        infoToast("Threads actualisés avec succès", { id: id })
    }

    const threads = threadsQueryResult?.result
    const hasThreads = threads && threads.length > 0

    if (!hasThreads) {
        return <EmptyThreads refetchFunc={refetchThreads} />
    }

    const threadsToRender = rearrangeThreads(threads)
    const connectedThread = threads?.find((t) => t.is_connected)

    return (
        <>
            <Dialog
                open={activeThread !== null}
                onOpenChange={(open) => {
                    if (!open) setActiveThread(null)
                }}
            >
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

            <div className="flex w-full justify-center">
                <ThreadsPageHeader connectedThread={connectedThread} />
            </div>

            <motion.div
                className="flex w-full flex-wrap justify-center gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
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
                        <motion.button
                            className="w-[calc(50%-6px)] sm:w-fit"
                            key={thread.id}
                            onClick={handleClick}
                            variants={itemVariants}
                        >
                            <ThreadCard thread={thread} />
                        </motion.button>
                    )
                })}
            </motion.div>

            <motion.div
                className="mt-4 flex w-full justify-center"
                variants={buttonVariants}
                initial="hidden"
                animate="show"
            >
                <Button
                    className="w-11/12 md:w-5/12"
                    variant="outline"
                    onClick={() => refetchThreads()}
                >
                    <RefreshCcwIcon />
                    Recharger
                </Button>
            </motion.div>
        </>
    )
}

export default ThreadsPageContent
