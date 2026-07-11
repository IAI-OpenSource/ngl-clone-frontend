import type { components } from "@/types/api/apiRawSchemas"
import type { CommonApiBaseResponse } from "@/types/api/baseApiSchemas.ts"
import { z } from "zod"
export const messageSchema = z.object({
    content: z
        .string()
        .min(1, { message: "Le contenu ne peut pas être vide" })
        .max(500, { message: "Le contenu ne doit pas dépasser 500 caractères" }),

    mentionned_member_ids: z
        .array(z.uuid({ message: "L'ID du membre doit être un UUID valide" }))
        .nullable()
        .optional(),
});

export type CreateMessageInput = z.infer<typeof messageSchema>;

export type GetMessagesPaginatedResponse = CommonApiBaseResponse<
    components["schemas"]["PaginatedMessagesResponse"]
>
export type ReadMessage = components["schemas"]["ReadMessage"]
export type ReadMessageResponse = CommonApiBaseResponse<ReadMessage>
export type WaSentStatus = ReadMessage["wa_status"]