import MessagesPageHeader from "@/components/client/MessagesPageHeader.tsx"
import MessagePageContent from "@/components/client/MessagePageContent.tsx"
import { motion } from "motion/react"

function MessagesPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.3, 0.7, 0.4, 1] }}
            className="flex min-h-full w-full flex-col self-stretch gap-5 px-4 pt-8 pb-24 xl:pt-10"
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.3, 0.7, 0.4, 1] }}
                className="flex w-full justify-center"
            >
                <MessagesPageHeader />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                className="flex min-h-0 flex-1 w-full flex-col"
            >
                <MessagePageContent />
            </motion.div>
        </motion.div>
    )
}

export default MessagesPage
