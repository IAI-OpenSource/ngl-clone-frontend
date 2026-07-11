import { useLoaderData } from "react-router"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import NewMessagePageHeader from "@/components/client/NewMessagePageHeader.tsx"
import NewMessagePageContent from "@/components/client/NewMessagePageContent.tsx"
import SafeDivWrapper from "@/components/client/SafeDivWrapper.tsx"

function NewMessagePage() {
    const connectedThread = useLoaderData() as ReadThread
    return (
        <SafeDivWrapper>
            <div className="flex w-full justify-center">
                <NewMessagePageHeader threadSlug={connectedThread.slug} />
            </div>
            <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
                <NewMessagePageContent
                    connctedThreadSlug={connectedThread.slug}
                />
            </div>
        </SafeDivWrapper>
    )
}

export default NewMessagePage
