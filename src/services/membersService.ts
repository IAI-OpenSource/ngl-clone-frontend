import type { GetThreadMembersResponse } from "@/types/api/threadsSchemas.ts"
import { api } from "@/services/baseApi.ts"

export async function getThreadMembers(): Promise<GetThreadMembersResponse> {
    const res = await api.get<GetThreadMembersResponse>(
        "/v1/threads/actual/members",
        {
            errorStrategy: "global"
        }
    )
    return res.data
}
