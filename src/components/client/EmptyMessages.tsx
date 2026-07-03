import EmptyPageContent from "@/components/client/EmptyPageContent.tsx"
import { MessageCircleDashed } from "lucide-react"
import Button from "@/components/ui/button";
import { motion } from "motion/react"

function EmptyMessages({refetchFunc}: Readonly<{ refetchFunc: () => void }>) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.3, 0.7, 0.4, 1] }}
        >
            <EmptyPageContent
                refetchFunc={refetchFunc}
                emptyTitleMessage="Aucun Message Disponible"
                emptyDescriptionMessage="Aucun message disponible pour l'instant."
                emptyIcon={<MessageCircleDashed className="h-10 w-10" />}
                additionalContent={(
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                    >
                        <Button>Ajouter un message</Button>
                    </motion.div>
                )}
            />
        </motion.div>
    )
}

export default EmptyMessages
