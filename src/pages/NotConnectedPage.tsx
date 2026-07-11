import SafeDivWrapper from "@/components/client/SafeDivWrapper.tsx"
import EmptyPageContent from "@/components/client/EmptyPageContent.tsx"
import { House, SearchX, ZapOff } from "lucide-react"
import { router } from "@/routing/router.ts"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"
import Button from "@/components/ui/button.tsx"
import { Link, useSearchParams } from "react-router"
import type { RedirectCause, RedirectToNotConnectedPageData } from "@/types/notConnectedPage.ts"
import ThreadConnectForm from "@/components/client/ThreadConnectForm.tsx"
import { useThreadBySlug } from "@/hooks/queries/useThreadBySlug.ts"
import { Spinner } from "@/components/ui/spinner.tsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx"
import { type ReactNode, useState } from "react"
import { appToast } from "@/hooks/useToasts.tsx"

interface CauseConfig {
    title: string
    description: string
    icon: ReactNode
    showDialog: boolean
}

function NotConnectedPage() {
    const [searchParams] = useSearchParams()
    const [isDialogOpen, setIsDialogOpen] = useState<boolean | null>(null)

    const cause = (searchParams.get("cause") as RedirectToNotConnectedPageData["cause"] | null) ?? "unknow"
    const threadSlug = searchParams.get("threadSlug") ?? ""
    const isConnected = searchParams.get("isConnected") === "true"

    const { threadQueryResult, isLoading } = useThreadBySlug(
        cause === "wantConnect" ? threadSlug : ""
    )
    const thread = threadQueryResult?.result

    const defaultConfig: CauseConfig = {
        title: isConnected
            ? "T'es connecté au mauvais thread poto"
            : "T'es connecté à aucun thread poto",
        description: isConnected
            ? `T'es connecté un thread actu, mais pas à ${threadSlug}`
            : "Connecte toi à un thread pour pouvoir utiliser toutes les fonctionnalités",
        icon: <ZapOff />,
        showDialog: false,
    }

    const causeConfigMap: Record<RedirectCause, CauseConfig> = {
        wantConnect: {
            title: isConnected
                ? "T'es connecté au mauvais thread poto"
                : "T'es connecté à aucun thread poto",
            description: isConnected
                ? `T'es connecté un thread actu, mais pas à ${threadSlug}`
                : "Connecte toi à un thread pour pouvoir utiliser toutes les fonctionnalités",
            icon: <ZapOff />,
            showDialog: true,
        },
        inexistantThread: {
            title: "Thread introuvable poto",
            description: `Le thread "${threadSlug}" n'existe pas ou a été supprimé`,
            icon: <SearchX />,
            showDialog: false,
        },
        reconnect: defaultConfig,
        unknow: defaultConfig,
    }

    const config = causeConfigMap[cause] || defaultConfig
    const showDialog = isDialogOpen ?? config.showDialog

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setIsDialogOpen(false)
            appToast.errorToast("Tu pourras pas faire grand chose sans te connecter poto")
        }
    }

    return (
        <>
            <Dialog open={showDialog} onOpenChange={handleDialogClose}>
                <DialogContent className="bg-accent sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Thread Connexion
                        </DialogTitle>
                    </DialogHeader>
                    {isLoading && (
                        <div className="flex items-center justify-center py-6">
                            <Spinner />
                        </div>
                    )}
                    {!isLoading && thread && (
                        <ThreadConnectForm thread={thread} />
                    )}
                    {!isLoading && !thread && (
                        <p className="py-4 text-center text-sm text-muted-foreground">
                            Thread introuvable.
                        </p>
                    )}
                </DialogContent>
            </Dialog>

            <SafeDivWrapper className="items-center justify-center">
                <EmptyPageContent
                    refetchFunc={() =>
                        router.navigate(CLIENT_ROUTES_MAPPING.THREADS)
                    }
                    emptyTitleMessage={config.title}
                    emptyDescriptionMessage={config.description}
                    emptyIcon={config.icon}
                    additionalContent={
                        <Link to={CLIENT_ROUTES_MAPPING.HOME}>
                            <Button>
                                <House />
                                Aller à l'accueil
                            </Button>
                        </Link>
                    }
                />
            </SafeDivWrapper>
        </>
    )
}

export default NotConnectedPage
