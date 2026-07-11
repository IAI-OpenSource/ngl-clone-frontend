import type { ReadThread } from "@/types/api/threadsSchemas.ts"
import { KeyRound, LockKeyhole } from "lucide-react"
import { extractThreadInitials } from "@/utils/threadsUtils.ts"
import { cn } from "@/lib/utils.ts"
import { FlickeringGrid } from "@/components/ui/flickering-grid.tsx"

function getGridColor(isConnected: boolean): string {
    if (typeof window === "undefined") {
        return isConnected ? "white" : "black"
    }
    const varName = isConnected ? "--primary-foreground" : "--muted-foreground"
    return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
}

interface StatusIndicatorProps {
    isConnected: boolean
    isActive: boolean
}

function StatusIndicator({ isConnected, isActive }: Readonly<StatusIndicatorProps>) {
    if (isConnected) {
        return (
            <div className="flex items-center gap-1.5">
                <span className="h-1.75 w-1.75 animate-pulse rounded-full bg-green-300 shadow-[0_0_8px_rgba(134,239,172,0.9)]" />
                <span className="font-jetbrains-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/65">
                    live
                </span>
            </div>
        )
    }
    if (isActive) {
        return (
            <span className="font-jetbrains-mono text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/35">
                actif
            </span>
        )
    }
    return null
}

interface ConstraintIconsProps {
    hasPassword: boolean
    isLocked: boolean
    isConnected: boolean
}

function ConstraintIcons({ hasPassword, isLocked, isConnected }: Readonly<ConstraintIconsProps>) {
    if (!hasPassword && !isLocked) return null

    const iconClass = cn(
        "flex h-5.5 w-5.5 items-center justify-center rounded-full",
        isConnected ? "bg-white/22 text-white/80" : "bg-foreground/10 text-foreground/45"
    )

    return (
        <div className="absolute right-3 top-3 flex items-center gap-1">
            {hasPassword && (
                <span className={iconClass}>
                    <KeyRound className="h-2.75 w-2.75" strokeWidth={2} />
                </span>
            )}
            {isLocked && (
                <span className={iconClass}>
                    <LockKeyhole className="h-2.75 w-2.75" strokeWidth={2.5} />
                </span>
            )}
        </div>
    )
}

export function ThreadCard({ thread }: Readonly<{ thread: ReadThread }>) {
    const { name, description, is_active, is_currently_locked, is_connected, has_password } = thread
    const initials = extractThreadInitials(name)
    const gridColor = getGridColor(is_connected)

    return (
        <div
            className={cn(
                "group relative w-full cursor-pointer overflow-hidden rounded-[18px] border bg-card sm:w-49",
                "transition-all duration-300 hover:-translate-y-1.5",
                is_connected
                    ? "border-primary/40 shadow-[0_6px_28px_hsl(var(--primary)/0.22)]"
                    : "border-border shadow-md hover:border-primary/25 hover:shadow-[0_6px_20px_hsl(var(--primary)/0.1)]"
            )}
        >
            {/* Zone haute colorée — l'état s'encode ici */}
            <div
                className={cn(
                    "relative h-27 overflow-hidden",
                    is_connected
                        ? "bg-linear-to-br from-chart-1 via-chart-2 to-primary"
                        : "bg-muted"
                )}
                style={
                    !is_connected && is_active
                        ? {
                              backgroundImage:
                                  "repeating-linear-gradient(-45deg, transparent, transparent 6px, hsl(var(--border)) 6px, hsl(var(--border)) 7px)",
                          }
                        : undefined
                }
            >
                <FlickeringGrid
                    className="absolute inset-0 w-full h-full"
                    squareSize={3}
                    gridGap={5}
                    flickerChance={0.08}
                    color={gridColor}
                    maxOpacity={is_connected ? 0.52 : 0.14}
                />

                <span
                    aria-hidden
                    className={cn(
                        "pointer-events-none absolute -bottom-4 -right-3 select-none font-space-grotesk",
                        "text-[88px] font-black leading-none tracking-tighter",
                        is_connected ? "text-white/18" : "text-foreground/[0.07]"
                    )}
                >
                    {initials}
                </span>

                <ConstraintIcons
                    hasPassword={has_password}
                    isLocked={is_currently_locked}
                    isConnected={is_connected}
                />

                <div className="absolute bottom-3 left-3.5">
                    <StatusIndicator isConnected={is_connected} isActive={is_active} />
                </div>
            </div>

            {/* Séparateur perforé — évoque le ticket/keycard */}
            <div className="relative flex h-px items-center overflow-hidden">
                <div className="w-full border-t border-dashed border-border" />
                <span className="absolute -left-2 h-4 w-4 rounded-full bg-background ring-1 ring-border" />
                <span className="absolute -right-2 h-4 w-4 rounded-full bg-background ring-1 ring-border" />
            </div>

            {/* Zone info */}
            <div className="px-4 pb-4 pt-3.5">
                <p className="font-space-grotesk text-[13.5px] font-bold leading-snug tracking-[-0.01em] text-foreground">
                    {name}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                    {description || "Pas de description"}
                </p>
            </div>
        </div>
    )
}
