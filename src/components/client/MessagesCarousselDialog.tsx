import type { ReadMessage } from "@/types/api/threadsSchemas.ts"
import { Dialog } from "@/components/ui/dialog.tsx"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import MessageDialogCard from "@/components/client/MessageDialogCard.tsx"
import { formatCreatedDate } from "@/utils/globalUtils.ts"
import Button from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react"

interface MessagesCarousselDialogProps {
    threadName: string
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
                <div className="flex w-full flex-row items-center justify-between gap-4">
                    <Button variant="outline" disabled={!hasPrev} onClick={goToPrev}>
                        <ArrowLeft/>
                        <span className="hidden md:block">Précedent</span>
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
                    <Button variant="default" disabled={!hasNext} onClick={goToNext}>
                        <span className="hidden md:block">Suivant</span>
                        <ArrowRight />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MessagesCarousselDialog
