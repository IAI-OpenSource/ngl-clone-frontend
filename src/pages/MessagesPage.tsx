import MessagesPageHeader from "@/components/client/MessagesPageHeader.tsx"
import MessagePageContent from "@/components/client/MessagePageContent.tsx"

function MessagesPage() {
    return (
        <div className="flex min-h-full w-full flex-col self-stretch gap-5 px-4 pt-8 pb-24 xl:pt-10 ">
            <div className="flex w-full justify-center">
                <MessagesPageHeader />
            </div>
            <div className="flex min-h-0 flex-1 w-full flex-col">
                <MessagePageContent />
            </div>
        </div>
    )
}

export default MessagesPage
