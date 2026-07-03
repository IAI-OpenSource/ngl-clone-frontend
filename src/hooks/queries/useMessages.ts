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
        isFetchingNextPage: query.isFetchingNextPage,
        error: query.error,
        refetch: query.refetch,
        fetchNextPage: query.fetchNextPage,
        hasNextPage: query.hasNextPage,
    }
}
