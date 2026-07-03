import MessagesCarousselDialog from "@/components/client/MessagesCarousselDialog.tsx"
import EmptyMessages from "@/components/client/EmptyMessages.tsx"
import { useCallback, useMemo, useState } from "react"
import { useMessages } from "@/hooks/queries/useMessages.ts"
import MessageCard from "@/components/client/MessageCard.tsx"
import PageLoader from "@/components/client/PageLoader.tsx"
import { useConnectedThread } from "@/hooks/queries/useConnectedThread.ts"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll.ts"
import { Spinner } from "@/components/ui/spinner.tsx"

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
            <button
                className="w-11/12 text-left md:w-5/12"
                key={message?.id}
                onClick={() => setActiveMessageIndex(index)}
            >
                {message && <MessageCard message={message} threadName={threadName} />}
            </button>
        ))
    }, [messages, threadName])

    if (isLoading) {
        return (
            <div className="flex w-full flex-1 items-center justify-center">
                <PageLoader
                    message="Chargement des messages en cours"
                    hamster
                />
            </div>
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
            <div className="flex w-full flex-1 flex-col items-center gap-5 md:gap-10">
                <div className="flex w-full flex-wrap items-center justify-center gap-5 md:gap-10">
                    {messageCards ?? <EmptyMessages refetchFunc={refetch} />}
                </div>
                {hasNextPage && (
                    <div
                        ref={loadMoreRef}
                        aria-hidden         // Pour éviter que le div soit focusable par les lecteurs d'écran, car il n'a pas de contenu interactif
                        className="flex w-full justify-center py-6"
                    >
                        {isFetchingNextPage && (
                            <Spinner className="size-6 text-muted-foreground" />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default MessagePageContent
