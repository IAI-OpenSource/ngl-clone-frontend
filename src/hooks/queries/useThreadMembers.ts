import { useQuery } from "@tanstack/react-query"
import {
    threadMembersQueryOption,
} from "@/configs/react-query/querysOptions.ts"

export function useThreadMembers() {
    const query = useQuery({
        ...threadMembersQueryOption,
    })

    return {
        threadMembers: query.data,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        error: query.error,
        refetch: query.refetch,
    }
}
