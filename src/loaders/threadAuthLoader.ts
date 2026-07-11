import type {
    ReadThread,
} from "@/types/api/threadsSchemas.ts"
import { queryClient } from "@/configs/react-query/configs.ts"
import { connectedThreadQueryOptions } from "@/configs/react-query/querysOptions.ts"
import { sleep } from "@/utils/globalUtils.ts"
import { type LoaderFunctionArgs, redirect } from "react-router"
import {
    CLIENT_ROUTES_MAPPING, genarateMessageRoute,
} from "@/routing/paths-mapping.ts"
import { appToast } from "@/hooks/useToasts.tsx"

export default async function threadAuthLoader({
    params,
}: LoaderFunctionArgs): Promise<ReadThread> {
    const connectedThread = await queryClient.ensureQueryData(connectedThreadQueryOptions)
    const connectedThreadData = connectedThread.result

    if (!connectedThread.success || !connectedThreadData) {
        triggerUnauthorizedToast()
        throw redirect(CLIENT_ROUTES_MAPPING.HOME)
    }
    // Juste pour test le rendu
    await sleep(0.3)

    const threadSlug = params.threadSlug

    if (!threadSlug) {
        throw new Error(`threadSlug ${threadSlug} not found`)
    }

    if (threadSlug !== connectedThreadData.slug) {
        appToast.errorToast("Tu n'es pas connecté à ce thread poto")
        throw redirect(genarateMessageRoute(connectedThreadData.slug))
    }


    return connectedThreadData
}

function triggerUnauthorizedToast() {
    appToast.errorToast("Tu n'es pas autorisé petit")
}
