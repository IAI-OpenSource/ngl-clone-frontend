import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group.tsx"
import {
    MessageSquare,
    RotateCcw,
    SendHorizonal,
    UserRoundPlus,
    X,
} from "lucide-react"
import { type Dispatch, type SetStateAction, useState } from "react"
import { useToast } from "@/hooks/useToasts.tsx"
import Button from "@/components/ui/button.tsx"
const MAX_MESSAGE_CHARS_LENGTH = 500


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
import { ScrollBar } from "@/components/ui/scroll-area.tsx"
import { isAxiosError } from "axios"
import type { ConnectToThreadResponse } from "@/types/api/threadsSchemas.ts"

function NewMessagePageContent() {
    const [message, setMessage] = useState("")
    const [selectedMembers, setSelectedMembers] = useState<ReadMember[]>([])

    const [isSending, setIsSending] = useState(false)
    const [formError, setFormError] = useState("test")
    const {errorToast, successToast} = useToast()
    const resetMessage = () => setMessage("")
    const currentLength = message.length
    const canSend =
        !isSending &&
        formError === ""
    const updateMessage = (newVal: string) => {
        if (newVal.length > MAX_MESSAGE_CHARS_LENGTH) {
            errorToast(`Le message ne peut pas dépasser ${MAX_MESSAGE_CHARS_LENGTH} caractères.`)
            return
        }
        if (formError) {
            setFormError("")
        }

        setMessage(newVal)
    }

    const handleMessageSend = async (msgData: CreateMessageInput) => {
        console.log(msgData)
        setIsSending(true)
        const validationResult = messageSchema.safeParse(msgData)

        if (validationResult.error){
            setFormError(validationResult.error.message)
        }else {
            try {
                const sendRes = await sendMessage(msgData)

                if (!sendRes.success) {
                    setIsSending(false)
                    setFormError(sendRes.error?.error_message || "Erreur inconnue lors de l'envoi du message.")
                    errorToast(`Erreur lors de l'envoi du message: ${sendRes.error?.error_message || "Erreur inconnue"}`)
                } else {
                    successToast("Message envoyé avec succès !")
                }
            }catch (err) {
                if (isAxiosError<ConnectToThreadResponse>(err)) {
                    const sendError =
                        err.response?.data.error?.error_message ||
                        "Erreur inconnue lors de l'envoi du message."
                    setFormError(sendError)
                    errorToast(sendError)
                }
            }


        }
        setIsSending(false)
    }

    return (
        <div className="grid w-full max-w-md gap-4 px-4">
            <InputGroup>
                <InputGroupTextarea
                    placeholder="Ecris un truc d'intéressant"
                    className="max-h-50 min-h-50 overflow-y-auto"
                    aria-invalid={formError ? "true" : "false"}
                    value={message}
                    onChange={(e) => updateMessage(e.target.value)}
                    onPaste={(e) => {
                        const newVal = message + e.clipboardData.getData("text")
                        updateMessage(newVal.slice(0, MAX_MESSAGE_CHARS_LENGTH))
                    }}
                >
                    <ScrollBar/>
                </InputGroupTextarea>
                <InputGroupAddon align="block-end">
                    <InputGroupText>
                        {currentLength}/{MAX_MESSAGE_CHARS_LENGTH}
                    </InputGroupText>
                </InputGroupAddon>

                {formError && (
                    <InputGroupAddon align="block-end" className="border-t">
                        <InputGroupText className="font-mono font-medium text-destructive">
                            <X className="h-3 w-3 shrink-0" />
                            {formError}
                        </InputGroupText>
                    </InputGroupAddon>
                )}

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
                        onClick={resetMessage}
                        className="ml-auto"
                        size="icon-xs"
                    >
                        <RotateCcw />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>

            <Button
                disabled={!canSend}
                onClick={async () => {
                    const mentionnedMembers = selectedMembers.map((m) => m.id)
                    await handleMessageSend({
                        content: message,
                        mentionned_member_ids: mentionnedMembers,
                    })
                }}
            >
                {
                    isSending ? <Spinner/>: (
                        <div className="flex items-center gap-2 justify-center">
                            Envoyer le message
                            <SendHorizonal />
                        </div>

                    )
                }
            </Button>
        </div>
    )
}


const MentionnedMembersComboAddon = (
    {selectedMembers, setSelectedMembers}: {
        selectedMembers: ReadMember[]
        setSelectedMembers:  Dispatch<SetStateAction<ReadMember[]>>
    }
) => {
    const anchor = useComboboxAnchor()

    const { threadMembers, isLoading } = useThreadMembers()


    if (isLoading) {
        return <Spinner />
    }

    const members = threadMembers?.result || []
    if (!threadMembers?.success || !threadMembers?.result || members.length === 0) {
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
                                            {item.display_name || item.phone_number}
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
