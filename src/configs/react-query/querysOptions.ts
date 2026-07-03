import { TANSTACK_QUERY_KEYS } from "@/configs/react-query/queryKeys.ts"
import {
    getAllThreads,
    getConnectedThread,
    safeGetConnectedThread,
} from "@/services/threadService.ts"
import { getMessagesPaginated } from "@/services/messageService.ts"
import type { GetMessagesPaginatedResponse } from "@/types/api/messagesApiSchemas.ts"

export const allThreadsQueryOptions = {
    queryKey: TANSTACK_QUERY_KEYS.THREAD_LIST,
    queryFn: async () => {
        return await getAllThreads()
    },
    staleTime: 1000 * 60 * 5, // La donnée est considérée fraîche pendant 5 minutes
    refetchInterval: 1000 * 60 * 15, // Polling : Rafraîchit silencieusement toutes les 15 minutes
    refetchIntervalInBackground: false, // Ne pas refresh si l'utilisateur a changé d'onglet (économie CPU/Réseau)

}
export const connectedThreadQueryOptions = {
    queryKey: TANSTACK_QUERY_KEYS.CONNECTED_THREAD,
    queryFn: async () => {
        return await getConnectedThread()
    },
    staleTime: 1000 * 60 * 5, // La donnée est considérée fraîche pendant 5 minutes
    refetchInterval: 1000 * 60 * 5, // Polling : Rafraîchit silencieusement toutes les 5 minutes
    refetchIntervalInBackground: false, // Ne pas refresh si l'utilisateur a changé d'onglet (économie CPU/Réseau)
}

export const safeConnectedThreadQueryOptions = {
    queryKey: TANSTACK_QUERY_KEYS.CONNECTED_THREAD,
    queryFn: async () => {
        return await safeGetConnectedThread()
    },
    retry: false
}

export const messagesPaginatedQueryOptions = {
    queryKey: TANSTACK_QUERY_KEYS.MESSAGES_PAGINATED,
    initialPageParam: null as string | null,
    staleTime: 1000 * 60 * 2, // Données fraîches pendant 2 minutes — évite un refetch à chaque montage

    queryFn: ({ pageParam }: {pageParam: string|null|undefined}) => getMessagesPaginated(pageParam),

    getNextPageParam: (lastPage: GetMessagesPaginatedResponse) =>
        lastPage.result?.has_next_page ? lastPage.result.next_cursor : undefined,
}