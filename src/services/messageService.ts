import { api } from "@/services/baseApi.ts"
import type {
    CreateMessageInput,
    GetMessagesPaginatedResponse, ReadMessageResponse,
} from "@/types/api/messagesApiSchemas.ts"

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
                limit: limit,
            },
        }
    )
    return res.data
}

export async function sendMessage(
    data: CreateMessageInput
): Promise<ReadMessageResponse> {
    const res = await api.post<ReadMessageResponse>("/v1/messages/", data, {
        errorStrategy: "global",
    })

    return res.data
}
