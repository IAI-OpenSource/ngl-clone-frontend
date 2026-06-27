import { TANSTACK_QUERY_KEYS_MAPPING } from "@/configs/react-query/queryKeys.ts"
import { getAllThreads } from "@/services/threadService.ts"

export const allThreadsQueryOptions = {
    queryKey: TANSTACK_QUERY_KEYS_MAPPING.THREAD_LIST,
    queryFn: async () => {
        return await getAllThreads()
    },
    staleTime: 1000 * 60 * 5, // La donnée est considérée fraîche pendant 5 minutes
    refetchInterval: 1000 * 60 * 15, // Polling : Rafraîchit silencieusement toutes les 15 minutes
    refetchIntervalInBackground: false, // Ne pas refresh si l'utilisateur a changé d'onglet (économie CPU/Réseau)
}