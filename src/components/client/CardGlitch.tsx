import {
    AlertTriangle,
    AtSign,
    CheckCheck,
    Clock,
    EyeOff,
    Zap,
} from "lucide-react"
import type { ReadMessage, WaSentStatus } from "@/types/api/threadsSchemas.ts"
import React from "react"
import "./MessageCard.css"

interface MapOpbject {
    label: string
    Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
    color: string
}
const STATUS_MAP: Record<WaSentStatus, MapOpbject>= {
    pending: { label: "En Attente", Icon: Clock, color: "var(--glitch-status-pending)" },
    delivered: { label: "Livré", Icon: CheckCheck, color: "var(--glitch-status-success)" },
    sent: { label: "Envoyé", Icon: CheckCheck, color: "var(--glitch-status-success)" },
    failed: { label: "Echec", Icon: AlertTriangle, color: "var(--glitch-status-error)" },
    queued: { label: "En cours", Icon: AlertTriangle, color: "var(--glitch-status-error)" },
}

import WhatsAppIcon from "@/assets/svg/whatsapp.svg?react"
import { timeAgo } from "@/utils/globalUtils.ts"



/* ============================================================
   VERSION A — "Glitch décalé"
   Ton idée : une carte à deux calques, l'un légèrement surélevé
   (translaté vers le haut-gauche, ton clair) et l'autre plus bas
   (translaté vers le bas-droite, ton contrasté), comme une image
   qu'on a mal recalée — un rayon d'angle asymétrique renforce le
   côté "fait main / cassé exprès" plutôt qu'un glitch numérique
   propre.
   ============================================================ */
export default function CardGlitch({ message }: Readonly<{ message: ReadMessage }>) {
    const status = STATUS_MAP[message.wa_status] ?? STATUS_MAP.pending
    const StatusIcon = status.Icon

    return (
        <div className="glitch-wrap cursor-pointer">
            <div className="glitch-back" aria-hidden="true" />
            <div className="glitch-front">
                <div className="glitch-top">
                    <span className="glitch-eyebrow">
                        <Zap size={12} strokeWidth={2.5} />
                        anonyme
                    </span>
                    <span
                        className="glitch-status"
                        style={{ color: status.color }}
                    >
                        <WhatsAppIcon
                            className="h-3 w-3"
                            strokeWidth={2.5}
                        />
                        <StatusIcon size={13} strokeWidth={2.5} />
                        {status.label}
                    </span>
                </div>

                {message.is_hidden ? (
                    <div className="glitch-hidden">
                        <EyeOff size={16} strokeWidth={2} />
                        <div>
                            <p className="glitch-hidden-title">
                                Contenu masqué
                            </p>
                            {message.hidden_reason && (
                                <p className="glitch-hidden-reason">
                                    {message.hidden_reason}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="glitch-content">{message.content}</p>
                )}

                {message?.mentionned_members &&
                    message.mentionned_members.length > 0 && (
                        <div className="glitch-mentions">
                            {message.mentionned_members.map((m) => (
                                <span key={m.id} className="glitch-chip">
                                    <AtSign size={10} strokeWidth={2.5} />
                                    {m.display_name ?? m.phone_number}
                                </span>
                            ))}
                        </div>
                    )}

                <div className="glitch-foot">
                    <span>{timeAgo(message.created_at)}</span>
                    <span className="glitch-id">#{message.id.slice(0, 8)}</span>
                </div>
            </div>
        </div>
    )
}
