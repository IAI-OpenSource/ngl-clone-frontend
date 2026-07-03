import MessageDialogCard from "@/components/client/MessageDialogCard.tsx"

function TestPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full">
            <MessageDialogCard threadName="Test Thread" text="Hello, this is a test message!" timestamp="Jeuss" />
        </div>
    )
}

export default TestPage
