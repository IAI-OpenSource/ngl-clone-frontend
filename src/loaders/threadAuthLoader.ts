import type {
    ReadThread,
    GetThreadResponse,
} from "@/types/api/threadsSchemas.ts"
import { queryClient } from "@/configs/react-query/configs.ts"
import {
    connectedThreadQueryOptions,
    threadBySlugQueryOptions,
} from "@/configs/react-query/querysOptions.ts"
import { withSearchParams } from "@/utils/globalUtils.ts"
import { type LoaderFunctionArgs, redirect } from "react-router"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"
import { type RedirectToNotConnectedPageData } from "@/types/notConnectedPage.ts"

/**
 * Tente de récupérer un thread par slug depuis le cache ou l'API.
 * Retourne null si le thread est introuvable (404) ou en cas d'erreur réseau,
 * sans faire crasher l'application.
 */
async function safeEnsureThreadBySlug(
    slug: string
): Promise<GetThreadResponse | null> {
    try {
        return await queryClient.ensureQueryData(threadBySlugQueryOptions(slug))
    } catch {
        return null
    }
}

export default async function threadAuthLoader({
    params,
}: LoaderFunctionArgs): Promise<ReadThread> {
    const threadSlug = params.threadSlug as string

    if (!threadSlug) {
        throw new Error(`threadSlug ${threadSlug} not found`)
    }

    const connectedThread = await queryClient.ensureQueryData(
        connectedThreadQueryOptions
    )
    const connectedThreadData = connectedThread.result

    if (connectedThread.success && threadSlug === connectedThreadData?.slug) {
        return connectedThreadData
    }

    const isConnected = !!(connectedThread.success && connectedThreadData)
    const threadData = await safeEnsureThreadBySlug(threadSlug)

    if (!threadData?.success || !threadData.result) {
        throw redirect(
            withSearchParams<RedirectToNotConnectedPageData>(
                CLIENT_ROUTES_MAPPING.NOT_CONNECTED,
                {
                    cause: "inexistantThread",
                    threadSlug,
                    isConnected,
                }
            )
        )
    }

    throw redirect(
        withSearchParams<RedirectToNotConnectedPageData>(
            CLIENT_ROUTES_MAPPING.NOT_CONNECTED,
            {
                cause: "wantConnect",
                threadSlug,
                isConnected,
            }
        )
    )
}
