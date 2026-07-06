import { useLoaderData } from "react-router"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import NewMessagePageHeader from "@/components/client/NewMessagePageHeader.tsx"

function NewMessagePage() {
    const connectedThread = useLoaderData() as ReadThread
    return (
        <div className="flex min-h-full w-full flex-col gap-5 self-stretch px-4 pt-8 pb-24 xl:pt-10">
            <div className="flex w-full justify-center">
                <NewMessagePageHeader threadSlug={connectedThread.slug} />
            </div>
            <div className="flex min-h-0 w-full flex-1 flex-col">
                <div>On verra</div>
            </div>
        </div>
    )
}

export default NewMessagePage
