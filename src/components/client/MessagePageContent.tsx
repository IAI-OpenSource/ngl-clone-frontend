import MessagesCarousselDialog from "@/components/client/MessagesCarousselDialog.tsx"
import EmptyMessages from "@/components/client/EmptyMessages.tsx"
import { useCallback, useMemo, useState } from "react"
import { useMessages } from "@/hooks/queries/useMessages.ts"
import MessageCard from "@/components/client/MessageCard.tsx"
import PageLoader from "@/components/client/PageLoader.tsx"
import { useConnectedThread } from "@/hooks/queries/useConnectedThread.ts"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll.ts"
import { Spinner } from "@/components/ui/spinner.tsx"
import { motion, AnimatePresence } from "motion/react"

function MessagePageContent() {
    const [activeMessageIndex, setActiveMessageIndex] = useState<number>(-1)
    const { threadQueryResult } = useConnectedThread()

    const threadName = threadQueryResult?.result?.name

    // useCallback : référence stable — évite un re-render de MessagesCarousselDialog à chaque render
    const closeDialog = useCallback(() => setActiveMessageIndex(-1), [])

    const {
        messagesQueryResult,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useMessages()

    const loadMoreRef = useInfiniteScroll({
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    })

    const messages = useMemo(() => {
        return (
            messagesQueryResult?.pages.flatMap(
                (page) => page.result?.messages
            ) ?? []
        )
    }, [messagesQueryResult])

    const hasNext = messages ? activeMessageIndex < messages.length - 1 : false
    const hasPrev = activeMessageIndex > 0

    // useCallback : référence stable sur les handlers de navigation
    const goToNext = useCallback(() => {
        setActiveMessageIndex((prev) => {
            const max = (messages?.length ?? 0) - 1
            return prev < max ? prev + 1 : prev
        })
    }, [messages?.length])

    const goToPrev = useCallback(() => {
        setActiveMessageIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }, [])

    // useMemo : le mapping des cartes n'est recalculé que si messages ou threadName change
    const messageCards = useMemo(() => {
        if (!messages || messages.length === 0) return null
        return messages.map((message, index) => (
            <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.3, 0.7, 0.4, 1] 
                }}
                layout
                className="w-11/12 text-left md:w-5/12"
                key={message?.id}
                onClick={() => setActiveMessageIndex(index)}
            >
                {message && <MessageCard message={message} threadName={threadName} />}
            </motion.button>
        ))
    }, [messages, threadName])

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.3, 0.7, 0.4, 1] }}
                className="flex w-full flex-1 items-center justify-center"
            >
                <PageLoader
                    message="Chargement des messages en cours"
                    hamster
                />
            </motion.div>
        )
    }

    return (
        <>
            <MessagesCarousselDialog
                activeMessage={
                    activeMessageIndex === -1 || !messages
                        ? null
                        : messages[activeMessageIndex]
                }
                threadName={threadName}
                closeDialog={closeDialog}
                hasNext={hasNext}
                hasPrev={hasPrev}
                goToNext={goToNext}
                goToPrev={goToPrev}
            />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.3, 0.7, 0.4, 1] }}
                className="flex w-full flex-1 flex-col items-center gap-5 md:gap-10"
            >
                <motion.div
                    layout
                    className="flex w-full flex-wrap items-center justify-center gap-5 md:gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {messageCards ?? <EmptyMessages refetchFunc={refetch} />}
                    </AnimatePresence>
                </motion.div>
                {hasNextPage && (
                    <motion.div
                        ref={loadMoreRef}
                        aria-hidden
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.3, 0.7, 0.4, 1] }}
                        className="flex w-full justify-center py-6"
                    >
                        {isFetchingNextPage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                            >
                                <Spinner className="size-6 text-muted-foreground animate-spin" />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </>
    )
}

export default MessagePageContent
