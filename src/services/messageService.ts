import { api } from "@/services/baseApi.ts"
import type { GetMessagesPaginatedResponse } from "@/types/api/messagesApiSchemas.ts"

export async function getMessagesPaginated(
    cursor: string | null = null,
    limit: number = 20
): Promise<GetMessagesPaginatedResponse> {
    const res = await api.get<GetMessagesPaginatedResponse>(
        "/v1/messages/thread/paginated/",
        {
            errorStrategy: "global",
            params: {
                cursor: cursor,
                limit: limit
            }
        }
    )
    return res.data
}