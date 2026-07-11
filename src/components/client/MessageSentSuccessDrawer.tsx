import type { ReadMessage } from "@/types/api/messagesApiSchemas.ts"
import { timeAgo } from "@/utils/globalUtils.ts"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer.tsx"
import { motion } from "framer-motion"
import {
    AtSign,
    CheckCircle2,
    Clock,
    MessageSquare,
    Share2,
    Sparkles,
    Zap,
} from "lucide-react"
import Button from "@/components/ui/button.tsx"
import { Link } from "react-router"
import { genarateMessageRoute } from "@/routing/paths-mapping.ts"

const STATUS_LABELS: Record<string, string> = {
    pending: "En attente d'envoi",
    queued: "En file d'attente",
    sent: "Envoyé sur WhatsApp",
    delivered: "Livré",
    failed: "Envoi échoué",
}

export function MessageSentSuccessDrawer({
    open,
    onOpenChange,
    message,
    connectedThreadSlug,
}: Readonly<{
    open: boolean
    onOpenChange: (open: boolean) => void
    message: ReadMessage | null
    connectedThreadSlug: string
}>) {
    if (!message) return null

    const statusLabel = STATUS_LABELS[message.wa_status] ?? "Statut inconnu"
    const sentAt = timeAgo(message.created_at) ?? "à l'instant"
    const hasMentions =
        message.mentionned_members && message.mentionned_members.length > 0

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="pt-2">
                    <div className="mb-3 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                                delay: 0.1,
                            }}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30"
                        >
                            <CheckCircle2
                                className="h-7 w-7 text-white"
                                strokeWidth={2.5}
                            />
                        </motion.div>
                    </div>
                    <DrawerTitle className="text-center text-lg font-bold">
                        Message envoyé
                    </DrawerTitle>
                    <DrawerDescription className="text-center">
                        Le message anonyme a bien été envoyé et en cours d'envoi
                        vers le group Whatsapp
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex flex-col gap-3 overflow-y-auto px-4 pb-2">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                        className="rounded-2xl border border-border bg-muted/60 p-4"
                    >
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            <MessageSquare className="h-3 w-3" />
                            Ton message
                        </p>
                        <p className="line-clamp-4 text-sm leading-relaxed wrap-break-word text-foreground">
                            {message.content}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.3 }}
                        className="grid grid-cols-2 gap-2"
                    >
                        <div className="flex flex-col gap-1 rounded-xl border border-border bg-muted/40 p-3">
                            <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                <Zap className="h-3 w-3" />
                                Statut WhatsApp
                            </span>
                            <span className="truncate text-sm font-medium text-foreground">
                                {statusLabel}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 rounded-xl border border-border bg-muted/40 p-3">
                            <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                <Clock className="h-3 w-3" />
                                Envoyé
                            </span>
                            <span className="text-sm font-medium text-foreground">
                                {sentAt}
                            </span>
                        </div>

                        {hasMentions && (
                            <div className="col-span-2 flex flex-col gap-1.5 rounded-xl border border-border bg-muted/40 p-3">
                                <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                    <AtSign className="h-3 w-3" />
                                    Personnes mentionnées
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {message.mentionned_members!.map((m) => (
                                        <span
                                            key={m.id}
                                            className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                                        >
                                            <AtSign className="h-2.5 w-2.5" />
                                            {m.display_name ?? m.phone_number}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="flex items-start gap-2.5 rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5"
                    >
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            <span className="font-semibold text-foreground">
                                100% anonyme.
                            </span>{" "}
                            Ton identité n'est jamais partagée. Le destinataire
                            ne sait pas qui a envoyé le message.
                        </p>
                    </motion.div>
                </div>

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button className="w-full gap-2" variant="outline">
                            <Share2 className="h-4 w-4" />
                            Envoyer un autre message
                        </Button>
                    </DrawerClose>
                    <Link to={genarateMessageRoute(connectedThreadSlug)}>
                        <Button className="w-full gap-2" variant="default">
                            <MessageSquare className="h-4 w-4" />
                            Voir les autres messages envoyés
                        </Button>
                    </Link>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
