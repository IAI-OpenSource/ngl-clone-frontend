import { Dialog } from "@/components/ui/dialog.tsx"
import { DialogContent } from "@/components/ui/dialog"
import MessageDialogCard from "@/components/client/MessageDialogCard.tsx"
import { formatCreatedDate } from "@/utils/globalUtils.ts"
import Button from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ReadMessage } from "@/types/api/messagesApiSchemas.ts"

interface MessagesCarousselDialogProps {
    threadName: string | null | undefined
    activeMessage: ReadMessage | null | undefined
    closeDialog: () => void
    hasNext: boolean
    hasPrev: boolean
    goToNext: () => void
    goToPrev: () => void
}
const findDirection = (direction: 'prev' | 'next') => {
    return direction === 'prev' ? "Précédent" : "Suivant"
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
        <span>{disabled ? "Y'a plus rien poto" : findDirection(direction)}</span>
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
            <DialogContent className="w-full ring-0 bg-transparent sm:max-w-7xl">
                <div className="flex w-full flex-col flex-wrap items-center justify-center md:flex-row md:justify-between gap-4">

                    <NavButton className="hidden md:flex" direction="prev" disabled={!hasPrev} onClick={goToPrev} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMessage ? activeMessage.created_at : "empty"}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                            transition={{ duration: 0.1 }}
                            className="flex w-full md:flex-1 justify-center"
                        >
                            {activeMessage === null || activeMessage === undefined ? (
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
                        </motion.div>
                    </AnimatePresence>

                    <NavButton className="hidden md:flex" direction="next" disabled={!hasNext} onClick={goToNext} />

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
