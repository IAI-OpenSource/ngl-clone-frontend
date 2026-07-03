import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx"
import { RefreshCcwIcon } from "lucide-react"
import Button from "@/components/ui/button.tsx"
import { type ReactNode } from "react"
import { motion } from "motion/react"

interface EmptyPageProps {
    refetchFunc: () => void
    emptyTitleMessage: string
    emptyDescriptionMessage: string
    emptyIcon: ReactNode
    additionalContent?: ReactNode
}

function EmptyPageContent({
    refetchFunc,
    emptyTitleMessage,
    emptyDescriptionMessage,
    emptyIcon,
    additionalContent
}: Readonly<EmptyPageProps>) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, ease: [0.3, 0.7, 0.4, 1] }}
            whileHover={{ scale: 1.01 }}
            className="w-11/12 rounded-lg border border-border bg-sidebar md:w-1/2"
        >
            <Empty>
                <EmptyHeader>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.3, 0.7, 0.4, 1] }}
                    >
                        <EmptyMedia variant="icon">{emptyIcon}</EmptyMedia>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: [0.3, 0.7, 0.4, 1] }}
                    >
                        <EmptyTitle>{emptyTitleMessage}</EmptyTitle>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                    >
                        <EmptyDescription>
                            {emptyDescriptionMessage}
                        </EmptyDescription>
                    </motion.div>
                </EmptyHeader>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25, ease: [0.3, 0.7, 0.4, 1] }}
                    className="flex flex-col gap-3"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                    >
                        <Button variant="outline" onClick={refetchFunc}>
                            <RefreshCcwIcon className="transition-transform duration-300 group-hover:rotate-180" />
                            Recharger
                        </Button>
                    </motion.div>
                    {additionalContent && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3, ease: [0.3, 0.7, 0.4, 1] }}
                        >
                            {additionalContent}
                        </motion.div>
                    )}
                </motion.div>
            </Empty>
        </motion.div>
    )
}

export default EmptyPageContent
