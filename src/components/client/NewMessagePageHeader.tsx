import GenericPageHeader from "@/components/client/GenericPageHeader.tsx"
import { MessageCirclePlus } from "lucide-react"
import { genarateMessageRoute } from "@/routing/paths-mapping.ts"

function NewMessagePageHeader({
    threadSlug,
}: Readonly<{ threadSlug: string }>) {
    return (
        <GenericPageHeader
            pageTitle="Nouveau message"
            pageDescription="Créer un nouveau message"
            PageIcon={MessageCirclePlus}
            ctaText="Voir les messages"
            ctaRedirectLink={genarateMessageRoute(threadSlug)}
        />
    )
}

export default NewMessagePageHeader
