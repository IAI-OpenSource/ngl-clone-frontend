import { useQuery } from "@tanstack/react-query"
import { threadBySlugQueryOptions } from "@/configs/react-query/querysOptions.ts"

export function useThreadBySlug(slug: string) {
    const query = useQuery({
        ...threadBySlugQueryOptions(slug),
        enabled: !!slug,
    })

    return {
        threadQueryResult: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        error: query.error,
    }
}
