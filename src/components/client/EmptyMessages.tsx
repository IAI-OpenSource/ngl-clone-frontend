import EmptyPage from "@/components/client/EmptyPage.tsx"
import { MessageCircleDashed } from "lucide-react"
import Button from "@/components/ui/button";

function EmptyMessages({refetchFunc}: Readonly<{ refetchFunc: () => void }>) {
    return (
        <EmptyPage
            refetchFunc={refetchFunc}
            emptyTitleMessage="Aucun Message Disponible"
            emptyDescriptionMessage="Aucun message disponible pour l'instant."
            emptyIcon={<MessageCircleDashed />}
            additionalContent={(
                <Button>Ajouter un message</Button>
            )}
        />
    )
}

export default EmptyMessages
