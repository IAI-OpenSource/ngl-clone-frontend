import MessageCard from "@/components/client/MessageCard.tsx"
import MessagesPageHeader from "@/components/client/MessagesPageHeader.tsx"
import { useState } from "react"
import MessagesCarousselDialog from "@/components/client/MessagesCarousselDialog.tsx"
import { useMessages } from "@/hooks/queries/useMessages.ts"
import { Spinner } from "@/components/ui/spinner";
import EmptyMessages from "@/components/client/EmptyMessages.tsx"



function MessagesPage() {


    const [activeMessageIndex, setactiveMessageIndex] = useState<number>(-1)

    const closeDialog = () => setactiveMessageIndex(-1)

    const { messagesQueryResult, hasNextPage, isLoading } = useMessages()
    console.log(`Full infos : \n data: ${JSON.stringify(messagesQueryResult)} \n hasNextPage: ${hasNextPage} `)

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
    return (
        <>
            <MessagesCarousselDialog
                activeMessage={
                    activeMessageIndex === -1 || !messages
                        ? null
                        : messages[activeMessageIndex]
                }
                threadName="Thread de testtttttts"
                closeDialog={closeDialog}
                hasNext={hasNext}
                hasPrev={hasPrev}
                goToNext={goToNext}
                goToPrev={goToPrev}
            />
            <div className="flex flex-col items-center justify-center gap-5 px-4 pt-8 pb-24 xl:pt-10 xl:pb-0">
                <MessagesPageHeader threadName="Thread de testtttttts" />
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex flex-wrap items-stretch justify-center gap-5 md:gap-10">
                        {messages?.length === 0 || messages === undefined ? (
                            <EmptyMessages
                                refetchFunc={() => console.log("Refetch")}
                            />
                        ) : (
                            messages.map((message, index) => (
                                <button
                                    className="w-11/12 md:w-5/12 text-left"
                                    key={message.id}
                                    onClick={() => {
                                        setactiveMessageIndex(index)
                                    }}
                                >
                                    <MessageCard message={message} />
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default MessagesPage
