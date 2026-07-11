import type { GetConnectedThreadResponse } from "@/types/api/threadsSchemas.ts"
import type {
    AuthErrorResponse,
    CommonApiBaseResponse,
    CommonApiBaseResponseWithAuth,
} from "@/types/api/baseApiSchemas.ts"

export function isAuthErrorResponse(
    response: GetConnectedThreadResponse | null | undefined
): response is AuthErrorResponse {
    return (
        response !== null &&
        typeof response === "object" &&
        "detail" in response
    )
}

export function isSuccessResponse<T>(
    response: CommonApiBaseResponseWithAuth<T> | null | undefined
): response is CommonApiBaseResponse<T> {
    return (
        response !== null &&
        typeof response === "object" &&
        "success" in response
    )
}
