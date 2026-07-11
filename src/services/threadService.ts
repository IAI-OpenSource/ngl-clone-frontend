import type {
    ConnectToThreadResponse,
    GetAllThreadsResponse,
    GetConnectedThreadResponse,
    GetThreadResponse,
    ThreadLoginPayload,
} from "@/types/api/threadsSchemas.ts"
import { api, type ErrorStrategy } from "@/services/baseApi.ts"

export async function connectToThread(
    threadId: string,
    authData: ThreadLoginPayload
): Promise<ConnectToThreadResponse> {
    const res = await api.post<ConnectToThreadResponse>(
        `/v1/threads/${threadId}/auth`,
        authData,
        {
            errorStrategy: "do-nothing",
        }
    )
    return res.data
}

export async function getConnectedThread(): Promise<GetThreadResponse> {
    const res = await api.get<GetThreadResponse>("/v1/threads/actual", {
        errorStrategy: "global",
    })
    return res.data
}

export async function safeGetConnectedThread(): Promise<GetConnectedThreadResponse> {
    const res = await api.get<GetThreadResponse>("/v1/threads/actual", {
        errorStrategy: "do-nothing",
    })
    return res.data
}

export async function getThreadById(
    threadId: string
): Promise<GetThreadResponse> {
    const res = await api.get<GetThreadResponse>(`/v1/threads/${threadId}`)
    return res.data
}

export async function getThreadBySlug(
    slug: string,
    errorStrategy: ErrorStrategy
): Promise<GetThreadResponse> {
    const res = await api.get<GetThreadResponse>(`/v1/threads/slug/${slug}`, {
        errorStrategy: errorStrategy,
    })
    return res.data
}

export async function getAllThreads(): Promise<GetAllThreadsResponse> {
    const res = await api.get<GetAllThreadsResponse>("/v1/threads/")
    return res.data
}
