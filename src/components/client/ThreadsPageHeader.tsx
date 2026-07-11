import { Compass } from "lucide-react"
import { CLIENT_ROUTES_MAPPING, genarateMessageRoute } from "@/routing/paths-mapping.ts"
import GenericPageHeader from "@/components/client/GenericPageHeader.tsx"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"

function ThreadsPageHeader({
    connectedThread,
}: Readonly<{ connectedThread?: ReadThread }>) {
    const ctaText = connectedThread ? "Mon thread" : "Accueil"
    const ctaRedirectLink = connectedThread
        ? genarateMessageRoute(connectedThread.slug)
        : CLIENT_ROUTES_MAPPING.HOME

    return (
        <GenericPageHeader
            pageTitle="Explore les threads"
            pageDescription="Choisis un canal de discussion pour envoyer et recevoir des messages anonymes"
            PageIcon={Compass}
            ctaText={ctaText}
            ctaRedirectLink={ctaRedirectLink}
        />
    )
}

export default ThreadsPageHeader
