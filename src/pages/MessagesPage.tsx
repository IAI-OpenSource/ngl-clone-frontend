import MessagesPageHeader from "@/components/client/MessagesPageHeader.tsx"
import MessagePageContent from "@/components/client/MessagePageContent.tsx"
import { useLoaderData } from "react-router"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"

function MessagesPage() {
    const connectedThread = useLoaderData() as ReadThread
    return (
        <div className="flex min-h-full w-full flex-col gap-5 self-stretch px-4 pt-8 pb-24 xl:pt-10">
            <div className="flex w-full justify-center">
                <MessagesPageHeader
                    threadName={connectedThread.name}
                    threadSlug={connectedThread.slug}
                />
            </div>
            <div className="flex min-h-0 w-full flex-1 flex-col">
                <MessagePageContent threadName={connectedThread.name} />
            </div>
        </div>
    )
}

export default MessagesPage
