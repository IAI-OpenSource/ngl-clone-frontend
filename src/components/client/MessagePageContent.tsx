import MessagesCarousselDialog from "@/components/client/MessagesCarousselDialog.tsx"
import EmptyMessages from "@/components/client/EmptyMessages.tsx"
import { useCallback, useMemo, useState } from "react"
import { useMessages } from "@/hooks/queries/useMessages.ts"
import MessageCard from "@/components/client/MessageCard.tsx"
import PageLoader from "@/components/client/PageLoader.tsx"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll.ts"
import { motion, AnimatePresence } from "motion/react"
import HamsterAnimatedLoader from "@/components/ui/HamsterAnimatedLoader.tsx"

function MessagePageContent({ threadName }: Readonly<{ threadName: string }>) {
    const [activeMessageIndex, setActiveMessageIndex] = useState<number>(-1)

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

    const goToNext = useCallback(() => {
        setActiveMessageIndex((prev) => {
            const max = (messages?.length ?? 0) - 1
            return prev < max ? prev + 1 : prev
        })
    }, [messages?.length])

    const goToPrev = useCallback(() => {
        setActiveMessageIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }, [])

    const messageCards = useMemo(() => {
        if (!messages || messages.length === 0) return null
        return messages.map((message, index) => (
            <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                    duration: 0.1,
                    delay: index * 0.05,
                    ease: [0.3, 0.7, 0.4, 1],
                }}
                layout
                className="w-11/12 text-left md:w-5/12"
                key={message?.id}
                onClick={() => setActiveMessageIndex(index)}
            >
                {message && (
                    <MessageCard message={message} threadName={threadName} />
                )}
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
                transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: [0.3, 0.7, 0.4, 1],
                }}
                className="flex w-full flex-1 flex-col items-center justify-center gap-5 md:gap-10"
            >
                <div className="flex w-full flex-wrap items-center justify-center gap-5 md:gap-10">
                    <AnimatePresence mode="popLayout">
                        {messageCards ?? (
                            <EmptyMessages refetchFunc={refetch} />
                        )}
                    </AnimatePresence>
                </div>
                {hasNextPage && (
                    <div
                        ref={loadMoreRef}
                        aria-hidden
                        className="flex w-full justify-center py-6"
                    >
                        {isFetchingNextPage && (
                            <div>
                                <HamsterAnimatedLoader />
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </>
    )
}

export default MessagePageContent
