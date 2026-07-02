import { TANSTACK_QUERY_KEYS } from "@/configs/react-query/queryKeys.ts"
import {
    getAllThreads,
    getConnectedThread,
    safeGetConnectedThread,
} from "@/services/threadService.ts"

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