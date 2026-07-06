import { MessageCircle } from "lucide-react"
import { genarateNewMessageRoute } from "@/routing/paths-mapping.ts"
import GenericPageHeader from "@/components/client/GenericPageHeader.tsx"

function MessagesPageHeader({
    threadName,
    threadSlug,
}: Readonly<{ threadName: string; threadSlug: string }>) {
    return (
        <GenericPageHeader
            pageTitle={`Messages de ${threadName}`}
            pageDescription="Je sais pas encore quoi mettre ici nvm"
            PageIcon={MessageCircle}
            ctaText="Nouveau message"
            ctaRedirectLink={genarateNewMessageRoute(threadSlug)}
        />
    )
}

export default MessagesPageHeader
