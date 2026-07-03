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

// Composant factorisé — évite la duplication des boutons desktop/mobile
const NavButton = ({
    direction,
    disabled,
    onClick,
    className,
}: {
    direction: "prev" | "next"
    disabled: boolean
    onClick: () => void
    className?: string
}) => (
    <Button className={className} disabled={disabled} onClick={onClick}>
        {direction === "prev" && <ArrowLeft />}
        <span>{direction === "prev" ? "Précedent" : "Suivant"}</span>
        {direction === "next" && <ArrowRight />}
    </Button>
)

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
                    {/* Boutons desktop */}
                    <NavButton className="hidden md:flex" direction="prev" disabled={!hasPrev} onClick={goToPrev} />

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

                    <NavButton className="hidden md:flex" direction="next" disabled={!hasNext} onClick={goToNext} />

                    {/* Boutons mobile */}
                    <div className="w-full flex-row justify-around flex md:hidden">
                        <NavButton direction="prev" disabled={!hasPrev} onClick={goToPrev} />
                        <NavButton direction="next" disabled={!hasNext} onClick={goToNext} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MessagesCarousselDialog
