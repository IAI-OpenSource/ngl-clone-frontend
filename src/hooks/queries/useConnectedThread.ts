import { useQuery } from "@tanstack/react-query"
import {
    connectedThreadQueryOptions,
} from "@/configs/react-query/querysOptions.ts"

export function useConnectedThread() {
    const query = useQuery({
        ...connectedThreadQueryOptions,
    })

    return {
        threadQueryResult: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching, // Utile si on veux montrer un spinner discret lors du background refresh
        error: query.error,
        refetch: query.refetch,
    }
}
