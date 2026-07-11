import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group.tsx"
import {
    AtSign,
    CheckCircle2,
    Clock,
    MessageSquare,
    RotateCcw,
    SendHorizonal,
    Share2,
    Sparkles,
    UserRoundPlus,
    X,
    Zap,
} from "lucide-react"
import { type Dispatch, type SetStateAction, useCallback, useState } from "react"
import { useToast } from "@/hooks/useToasts.tsx"
import Button from "@/components/ui/button.tsx"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { useThreadMembers } from "@/hooks/queries/useThreadMembers.ts"
import { Spinner } from "@/components/ui/spinner.tsx"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item.tsx"
import type { ReadMember } from "@/types/api/membersSchema.ts"
import { sendMessage } from "@/services/messageService.ts"
import {
    type CreateMessageInput,
    messageSchema,
} from "@/types/api/messagesApiSchemas.ts"
import type { ReadMessage } from "@/types/api/messagesApiSchemas.ts"
import { ScrollBar } from "@/components/ui/scroll-area.tsx"
import { isAxiosError } from "axios"
import { invalidateMessagesPaginatedQuery } from "@/configs/react-query/utils.ts"
import type { ConnectToThreadResponse } from "@/types/api/threadsSchemas.ts"
import { getFirstZodErrorMessage, timeAgo } from "@/utils/globalUtils.ts"
import { motion, AnimatePresence } from "framer-motion"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer.tsx"
import { Link } from "react-router"
import { genarateMessageRoute } from "@/routing/paths-mapping.ts"

const MAX_MESSAGE_CHARS_LENGTH = 500

const STATUS_LABELS: Record<string, string> = {
    pending: "En attente d'envoi",
    queued: "En file d'attente",
    sent: "Envoyé sur WhatsApp",
    delivered: "Livré",
    failed: "Envoi échoué",
}

function NewMessagePageContent({
    connctedThreadSlug,
}: Readonly<{ connctedThreadSlug: string }>) {
    const [message, setMessage] = useState("")
    const [selectedMembers, setSelectedMembers] = useState<ReadMember[]>([])

    const [isSending, setIsSending] = useState(false)
    const [formError, setFormError] = useState("")
    const [sentMessage, setSentMessage] = useState<ReadMessage | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const { errorToast } = useToast()
    const currentLength = message.length

    const canSend = !isSending && formError === ""

    const resetForm = useCallback(() => {
        setMessage("")
        setSelectedMembers([])
        setFormError("")
    }, [])

    const updateMessage = useCallback(
        (newVal: string) => {
            if (newVal.length > MAX_MESSAGE_CHARS_LENGTH) {
                errorToast(
                    `Le message ne peut pas dépasser ${MAX_MESSAGE_CHARS_LENGTH} caractères.`
                )
                return
            }
            if (formError) setFormError("")
            setMessage(newVal)
        },
        [formError, errorToast]
    )

    const handleMessageSend = async (msgData: CreateMessageInput) => {
        setIsSending(true)
        const validationResult = messageSchema.safeParse(msgData)

        if (validationResult.error) {
            setFormError(getFirstZodErrorMessage(validationResult.error))
            setIsSending(false)
            return
        }

        try {
            const sendRes = await sendMessage(msgData)

            if (!sendRes.success) {
                const errMsg =
                    sendRes.error?.error_message ||
                    "Erreur inconnue lors de l'envoi du message."
                setFormError(errMsg)
                errorToast(`Erreur lors de l'envoi du message: ${errMsg}`)
            } else if (sendRes.result) {
                await invalidateMessagesPaginatedQuery()
                setSentMessage(sendRes.result)
                setDrawerOpen(true)
                resetForm()
            }
        } catch (err) {
            if (isAxiosError<ConnectToThreadResponse>(err)) {
                const sendError =
                    err.response?.data.error?.error_message ||
                    "Erreur inconnue lors de l'envoi du message."
                setFormError(sendError)
                errorToast(sendError)
            }
        }

        setIsSending(false)
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.4,
                    delay: 0.3,
                    ease: [0.3, 0.7, 0.4, 1],
                }}
                className="grid w-full max-w-xl gap-4 px-4"
            >
                <InputGroup>
                    <InputGroupTextarea
                        placeholder="Ecris un truc d'intéressant"
                        className="max-h-50 min-h-50 overflow-y-auto"
                        aria-invalid={formError ? "true" : "false"}
                        value={message}
                        onChange={(e) => updateMessage(e.target.value)}
                        onPaste={(e) => {
                            e.preventDefault()
                            const pasted = e.clipboardData.getData("text")
                            const newVal = (message + pasted).slice(
                                0,
                                MAX_MESSAGE_CHARS_LENGTH
                            )
                            updateMessage(newVal)
                        }}
                    >
                        <ScrollBar />
                    </InputGroupTextarea>
                    <InputGroupAddon align="block-end">
                        <InputGroupText
                            className={[
                                "ml-auto tabular-nums transition-colors",
                                currentLength >= MAX_MESSAGE_CHARS_LENGTH * 0.9
                                    ? "text-destructive"
                                    : currentLength >=
                                        MAX_MESSAGE_CHARS_LENGTH * 0.7
                                      ? "text-amber-500"
                                      : "",
                            ].join(" ")}
                        >
                            {currentLength}/{MAX_MESSAGE_CHARS_LENGTH}
                        </InputGroupText>
                    </InputGroupAddon>

                    <AnimatePresence>
                        {formError && (
                            <motion.div
                                key="form-error"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                <InputGroupAddon
                                    align="block-end"
                                    className="border-t"
                                >
                                    <InputGroupText className="font-mono font-medium text-destructive">
                                        <X className="h-3 w-3 shrink-0" />
                                        {formError}
                                    </InputGroupText>
                                </InputGroupAddon>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <MentionnedMembersComboAddon
                        selectedMembers={selectedMembers}
                        setSelectedMembers={setSelectedMembers}
                    />

                    <InputGroupAddon align="block-start" className="border-b">
                        <InputGroupText className="font-mono font-medium">
                            <MessageSquare />
                            Ton Message Anonyme
                        </InputGroupText>
                        <InputGroupButton
                            onClick={resetForm}
                            className="ml-auto"
                            size="icon-xs"
                            title="Réinitialiser le message"
                        >
                            <RotateCcw />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>

                <Button
                    disabled={!canSend}
                    onClick={async () => {
                        const mentionnedMembers = selectedMembers.map(
                            (m) => m.id
                        )
                        await handleMessageSend({
                            content: message,
                            mentionned_member_ids: mentionnedMembers,
                        })
                    }}
                >
                    {isSending ? (
                        <span className="flex items-center gap-2">
                            <Spinner />
                            Envoi en cours…
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Envoyer le message
                            <SendHorizonal />
                        </span>
                    )}
                </Button>
            </motion.div>

            <SuccessDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                message={sentMessage}
                connectedThreadSlug={connctedThreadSlug}
            />
        </>
    )
}


function SuccessDrawer({
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


const MentionnedMembersComboAddon = ({
    selectedMembers,
    setSelectedMembers,
}: {
    selectedMembers: ReadMember[]
    setSelectedMembers: Dispatch<SetStateAction<ReadMember[]>>
}) => {
    const anchor = useComboboxAnchor()
    const { threadMembers, isLoading } = useThreadMembers()

    if (isLoading) {
        return <Spinner />
    }

    const members = threadMembers?.result || []
    if (
        !threadMembers?.success ||
        !threadMembers?.result ||
        members.length === 0
    ) {
        return null
    }

    return (
        <InputGroupAddon align="block-end" className="flex-col border-t">
            <InputGroupText className="font-mono font-medium">
                <UserRoundPlus />
                Mentionner quelqu'un
            </InputGroupText>

            <Combobox
                multiple
                autoHighlight
                items={members}
                itemToStringValue={(i: ReadMember) => i.id}
                value={selectedMembers}
                onValueChange={setSelectedMembers}
            >
                <ComboboxChips ref={anchor} className="w-full max-w-xs">
                    <ComboboxValue>
                        {selectedMembers.map((m) => (
                            <ComboboxChip key={m.id}>
                                {m.display_name || m.phone_number}
                            </ComboboxChip>
                        ))}
                    </ComboboxValue>
                    <ComboboxChipsInput placeholder="Tag k1k1" />
                </ComboboxChips>
                <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>Auncune correspondance poto</ComboboxEmpty>
                    <ComboboxList>
                        {(item: ReadMember) => (
                            <ComboboxItem key={item.id} value={item}>
                                <Item size="xs" className="p-0">
                                    <ItemContent>
                                        <ItemTitle className="whitespace-nowrap">
                                            {item.display_name ||
                                                item.phone_number}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {item.wa_jid}
                                        </ItemDescription>
                                    </ItemContent>
                                </Item>
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </InputGroupAddon>
    )
}

export default NewMessagePageContent
