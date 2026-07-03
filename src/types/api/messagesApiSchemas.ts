import type { components } from "@/types/api/apiRawSchemas"
import type { CommonApiBaseResponse } from "@/types/api/baseApiSchemas.ts"

export type GetMessagesPaginatedResponse = CommonApiBaseResponse<
    components["schemas"]["PaginatedMessagesResponse"]
>
export type ReadMessage = components["schemas"]["ReadMessage"]
export type WaSentStatus = ReadMessage["wa_status"]