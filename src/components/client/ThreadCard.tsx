import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import { LockKeyhole, KeyRound } from "lucide-react"
import { extractThreadInitials } from "@/utils/extractor.ts"


export function ThreadCard({ thread }: Readonly<{ thread: ReadThread }>) {
    const { name, description, is_active, is_currently_locked, is_connected, has_password } = thread

    const initials = extractThreadInitials(name)

    return (
        <div
            className={[
                "group relative flex cursor-pointer items-center gap-4 overflow-hidden",
                "rounded-2xl px-5 py-4 transition-all duration-300",
                "border bg-card",
                is_active
                    ? "border-primary/25 shadow-[0_4px_24px_hsl(var(--primary)/0.1)]"
                    : "border-border shadow-sm hover:border-primary/20 hover:shadow-[0_4px_24px_hsl(var(--primary)/0.08)]",
                "hover:-translate-y-px",
            ].join(" ")}
        >
            {/* Avatar */}
            <div
                className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    "text-[15px] font-bold transition-transform duration-300 select-none group-hover:scale-105",
                    is_connected
                        ? "bg-linear-to-br from-chart-1 to-primary text-white shadow-[0_3px_12px_hsl(var(--primary)/0.3)]"
                        : "bg-primary/8 text-primary/60",
                ].join(" ")}
            >
                {initials}
            </div>

            {/* Texte */}
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px] leading-tight font-semibold text-foreground">
                    {name}
                </h3>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {description || "Pas de description"}
                </p>
            </div>

            {/* Indicateurs */}
            <div className="flex shrink-0 items-center gap-2">
                {has_password && (
                    <KeyRound
                        className="h-3.5 w-3.5 text-muted-foreground/40"
                        strokeWidth={2}
                    />
                )}
                {is_currently_locked && (
                    <LockKeyhole
                        className="h-3.5 w-3.5 text-muted-foreground/60"
                        strokeWidth={2.5}
                    />
                )}
                {is_connected ? (
                    <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 shadow-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            Connecté
                        </span>
                    </div>
                ) : (
                    is_active && (
                        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 shadow-sm">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
                            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                Actif
                            </span>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
