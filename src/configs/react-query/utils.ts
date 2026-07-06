import { queryClient } from "@/configs/react-query/configs.ts"
import { QUERY_ENTITIES } from "@/configs/react-query/queryKeys.ts"

export async function invalidThreadRelatedQueries() {
    await queryClient.invalidateQueries({
        queryKey: [QUERY_ENTITIES.THREAD],
    })
}