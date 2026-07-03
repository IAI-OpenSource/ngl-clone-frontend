import { Dialog } from "@/components/ui/dialog.tsx"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import MessageDialogCard from "@/components/client/MessageDialogCard.tsx"
import { formatCreatedDate } from "@/utils/globalUtils.ts"
import Button from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { ReadMessage } from "@/types/api/messagesApiSchemas.ts"

interface MessagesCarousselDialogProps {
    threadName: string | null | undefined
    activeMessage: ReadMessage | null
    closeDialog: () => void
    hasNext: boolean
    hasPrev: boolean
    goToNext: () => void
    goToPrev: () => void
}

function MessagesCarousselDialog({
    activeMessage,
    closeDialog,
    threadName,
    hasNext,
    hasPrev,
    goToNext,
    goToPrev
}: Readonly<MessagesCarousselDialogProps>) {
    return (
        <Dialog
            open={activeMessage !== null}
            onOpenChange={(open) => {
                if (!open) closeDialog()
            }}
        >
            <DialogTrigger></DialogTrigger>
            <DialogContent className="w-full sm:max-w-7xl">
                <div className="flex w-full flex-col flex-wrap items-center justify-center md:flex-row md:justify-between gap-4">
                    <Button
                        className="hidden md:flex"
                        disabled={!hasPrev}
                        onClick={goToPrev}
                    >
                        <ArrowLeft />
                        <span>Précedent</span>
                    </Button>
                    {activeMessage === null ? (
                        <div>Rien a afficher poto</div>
                    ) : (
                        <MessageDialogCard
                            threadName={threadName}
                            text={activeMessage.content}
                            timestamp={formatCreatedDate(
                                activeMessage.created_at,
                                true
                            )}
                        />
                    )}
                    <Button
                        className="hidden md:flex"
                        disabled={!hasNext}
                        onClick={goToNext}
                    >
                        <span>Suivant</span>
                        <ArrowRight />
                    </Button>
                    <div className="w-full flex-row justify-around flex md:hidden">
                        <Button
                            disabled={!hasPrev}
                            onClick={goToPrev}
                        >
                            <ArrowLeft />
                            <span>Précedent</span>
                        </Button>
                        <Button
                            disabled={!hasNext}
                            onClick={goToNext}
                        >
                            <span>Suivant</span>
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MessagesCarousselDialog
