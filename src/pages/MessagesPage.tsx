import MessagesPageHeader from "@/components/client/MessagesPageHeader.tsx"
import MessagePageContent from "@/components/client/MessagePageContent.tsx"
import { useLoaderData } from "react-router"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import SafeDivWrapper from "@/components/client/SafeDivWrapper.tsx"

function MessagesPage() {
    const connectedThread = useLoaderData() as ReadThread
    return (
        <SafeDivWrapper>
            <div className="flex w-full justify-center">
                <MessagesPageHeader
                    threadName={connectedThread.name}
                    threadSlug={connectedThread.slug}
                />
            </div>
            <div className="flex min-h-0 w-full flex-1 flex-col">
                <MessagePageContent threadName={connectedThread.name} />
            </div>
        </SafeDivWrapper>
    )
}

export default MessagesPage
