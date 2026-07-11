import { useQuery } from "@tanstack/react-query"
import {
    safeConnectedThreadQueryOptions,
} from "@/configs/react-query/querysOptions.ts"

export function useSafeConnectedThread() {
    const query = useQuery({
        ...safeConnectedThreadQueryOptions,
    })

    return {
        threadQueryResult: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching, // Utile si on veux montrer un spinner discret lors du background refresh
        error: query.error,
        refetch: query.refetch,
    }
}
