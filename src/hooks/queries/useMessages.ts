import { useInfiniteQuery } from "@tanstack/react-query"
import { messagesPaginatedQueryOptions } from "@/configs/react-query/querysOptions.ts"

export const useMessages = () => {
    const query = useInfiniteQuery({
        ...messagesPaginatedQueryOptions,
    })
    return {
        messagesQueryResult: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        error: query.error,
        refetch: query.refetch,
        fetchNextPage: query.fetchNextPage,
        hasNextPage: query.hasNextPage,
    }
}
