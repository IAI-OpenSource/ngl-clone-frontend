import MessagesCarousselDialog from "@/components/client/MessagesCarousselDialog.tsx"
import EmptyMessages from "@/components/client/EmptyMessages.tsx"
import { useState } from "react"
import { useMessages } from "@/hooks/queries/useMessages.ts"
import MessageCard from "@/components/client/MessageCard.tsx"
import PageLoader from "@/components/client/PageLoader.tsx"
import { useConnectedThread } from "@/hooks/queries/useConnectedThread.ts"

function MessagePageContent() {
    const [activeMessageIndex, setactiveMessageIndex] = useState<number>(-1)
    const { threadQueryResult } = useConnectedThread()

    const threadName = threadQueryResult?.result?.name

    const closeDialog = () => setactiveMessageIndex(-1)

    const { messagesQueryResult, hasNextPage, isLoading } = useMessages()
    console.log(
        `Full infos : \n data: ${JSON.stringify(messagesQueryResult)} \n hasNextPage: ${hasNextPage} `
    )

    const messages = messagesQueryResult?.pages[0].result?.messages

    const hasNext = messages ? activeMessageIndex < messages.length - 1 : false
    const hasPrev = activeMessageIndex > 0

    const goToNext = () => {
        if (hasNext) {
            setactiveMessageIndex(activeMessageIndex + 1)
        }
    }

    const goToPrev = () => {
        if (hasPrev) {
            setactiveMessageIndex(activeMessageIndex - 1)
        }
    }
    const messagesOrEmptyOrLoader = () => {
        if (isLoading) {
            return <PageLoader message="Chargement des messages en cours" hamster/>
        }
        const hasNMessages = messages?.length === 0 || messages === undefined

        if (hasNMessages) {
            return (
                <EmptyMessages
                    refetchFunc={() => console.log("Refetch")}
                />
            )
        } else {
            return messages.map((message, index) => (
                <button
                    className="w-11/12 md:w-5/12 text-left"
                    key={message.id}
                    onClick={() => {
                        setactiveMessageIndex(index)
                    }}
                >
                    <MessageCard message={message} threadName={threadName}/>
                </button>
            ))
        }


    }
    const comp = messagesOrEmptyOrLoader()

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
                <div className="flex flex-1 w-full flex-wrap items-center justify-center gap-5 md:gap-10">
                    {comp}
                </div>
        </>
    )
}

export default MessagePageContent
