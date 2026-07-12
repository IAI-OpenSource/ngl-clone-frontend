import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group.tsx"
import {
    AlertCircle,
    AlertTriangle,
    FileQuestion,
    Flame,
    Lock,
    MessageSquare,
    RotateCcw,
    SendHorizonal,
    ShieldAlert,
    UserRoundPlus,
    X,
} from "lucide-react"
import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useState,
} from "react"
import { useToast } from "@/hooks/useToasts.tsx"
import Button from "@/components/ui/button.tsx"
import { useAppErrorDialogStore } from "@/stores/appErrorDialogStore.ts"
import type { AppError, AppErrorType } from "@/types/api/baseApiSchemas.ts"
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
    type ReadMessage,
} from "@/types/api/messagesApiSchemas.ts"
import { ScrollBar } from "@/components/ui/scroll-area.tsx"
import { isAxiosError } from "axios"
import { invalidateMessagesPaginatedQuery } from "@/configs/react-query/utils.ts"
import { getFirstZodErrorMessage } from "@/utils/globalUtils.ts"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSentSuccessDrawer } from "@/components/client/MessageSentSuccessDrawer.tsx"

interface ErrorDialogConfig {
    title: string
    variant: "destructive" | "warning" | "info" | "glitch"
    errorIcon: typeof AlertCircle
}

const ERROR_MAPPING: Record<AppErrorType, ErrorDialogConfig> = {
    LOCKED_CONTENT: {
        title: "Discussion verrouillée",
        variant: "warning",
        errorIcon: Lock,
    },
    NOT_FOUND: {
        title: "Discussion introuvable",
        variant: "destructive",
        errorIcon: FileQuestion,
    },
    UNKNOWN_ERROR: {
        title: "Erreur mystérieuse",
        variant: "glitch",
        errorIcon: AlertCircle,
    },
    BAD_REQUEST: {
        title: "Requête invalide",
        variant: "warning",
        errorIcon: AlertTriangle,
    },
    UNAUTHORIZED: {
        title: "Accès refusé",
        variant: "destructive",
        errorIcon: ShieldAlert,
    },
    RATE_LIMIT_EXCEEDED: {
        title: "Du calme poto !",
        variant: "glitch",
        errorIcon: Flame,
    },
}

const MAX_MESSAGE_CHARS_LENGTH = 500

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
    const { showError } = useAppErrorDialogStore()
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

                const apiError = sendRes.error ?? {
                    error_type: "UNKNOWN_ERROR" as const,
                    error_message: errMsg,
                }
                const errorType = apiError.error_type
                const config =
                    ERROR_MAPPING[errorType] ?? ERROR_MAPPING.UNKNOWN_ERROR

                showError({
                    title: config.title,
                    message: apiError.error_message,
                    errorIcon: config.errorIcon,
                    errorCode: errorType,
                    variant: config.variant,
                })
            } else if (sendRes.result) {
                await invalidateMessagesPaginatedQuery()
                setSentMessage(sendRes.result)
                setDrawerOpen(true)
                resetForm()
            }
        } catch (err) {
            if (isAxiosError<{ error?: AppError }>(err)) {
                const apiError = err.response?.data?.error ?? {
                    error_type: "UNKNOWN_ERROR" as const,
                    error_message:
                        "Une erreur inconnue s'est produite lors de l'envoi.",
                }
                const errorType = apiError.error_type
                const config =
                    ERROR_MAPPING[errorType] ?? ERROR_MAPPING.UNKNOWN_ERROR

                setFormError(apiError.error_message)
                showError({
                    title: config.title,
                    message: apiError.error_message,
                    errorIcon: config.errorIcon,
                    errorCode: errorType,
                    variant: config.variant,
                })
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

            <MessageSentSuccessDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                message={sentMessage}
                connectedThreadSlug={connctedThreadSlug}
            />
        </>
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
