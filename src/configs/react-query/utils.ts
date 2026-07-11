import { queryClient } from "@/configs/react-query/configs.ts"
import { QUERY_ENTITIES, TANSTACK_QUERY_KEYS } from "@/configs/react-query/queryKeys.ts"

export async function invalidThreadRelatedQueries() {
    await queryClient.invalidateQueries({
        queryKey: [QUERY_ENTITIES.THREAD],
    })
}

export async function invalidateMessagesPaginatedQuery() {
    await queryClient.invalidateQueries({
        queryKey: TANSTACK_QUERY_KEYS.MESSAGES_PAGINATED,
    })
}