
import { useQuery } from "@tanstack/react-query"
import { allThreadsQueryOptions } from "@/configs/react-query/querysOptions.ts"

export function useAllThreads() {

    const query = useQuery({
        ...allThreadsQueryOptions,
    })

    return {
        threadsQueryResult: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching, // Utile si on veux montrer un spinner discret lors du background refresh
        error: query.error,
        refetch: query.refetch
    }
}
