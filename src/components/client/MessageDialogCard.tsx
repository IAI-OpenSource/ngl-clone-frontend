import SVGa from "@/assets/svg/lb.svg?react"
import SVGb from "@/assets/svg/lt.svg?react"
import SVGc from "@/assets/svg/rt.svg?react"
import SVGd from "@/assets/svg/rb.svg?react"
import { calculateMessageFontSize } from "@/utils/globalUtils.ts"

export interface ThreadMessageCardProps {
    threadName: string
    text: string
    timestamp: string
    mentionedNames?: string[]
    className?: string
}

export function MessageDialogCard({
    threadName,
    text,
    timestamp,
    mentionedNames,
}: Readonly<ThreadMessageCardProps>) {
    const hasMentions = !!mentionedNames?.length
    const {mobile} = calculateMessageFontSize(text.length)
    return (
        <div
            className={[
                "relative isolate flex flex-col justify-between overflow-hidden",
                "aspect-square w-full max-w-[320px] sm:max-w-105 md:max-w-150",
                "rounded-[24px] sm:rounded-[28px] md:rounded-[36px]",
                "p-6 sm:p-8 md:p-15",
                "bg-(--dia-msg-card-surface)",
                "font-(family-name:--dia-msg-card-font-sans)",
                "shadow-[0_0_0_1px_var(--dia-msg-card-shadow-ring),0_24px_50px_-16px_var(--dia-msg-card-shadow-purple),0_10px_22px_-8px_var(--dia-msg-card-shadow-pink)]",
            ].join(" ")}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -left-9 z-0 h-28 w-28 rounded-full bg-(--dia-msg-card-lav) opacity-[0.55] blur-[50px] sm:-top-[55px] sm:-left-[49px] sm:h-[154px] sm:w-[154px] md:-top-[100px] md:-left-[90px] md:h-[280px] md:w-[280px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -bottom-11 z-0 h-[104px] w-[104px] rounded-full bg-[var(--dia-msg-card-peach)] opacity-[0.55] blur-[50px] sm:-right-[44px] sm:-bottom-[60px] sm:h-[143px] sm:w-[143px] md:-right-[80px] md:-bottom-[110px] md:h-[260px] md:w-[260px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-[24px] -left-[24px] z-0 h-[80px] w-[80px] rounded-full bg-[var(--dia-msg-card-rose)] opacity-[0.45] blur-[50px] sm:bottom-[33px] sm:-left-[33px] sm:h-[110px] sm:w-[110px] md:bottom-[60px] md:-left-[60px] md:h-[200px] md:w-[200px]"
            />

            <div className="absolute -top-3 -left-3 z-1 flex h-11 w-11 rotate-[-10deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-purple)_0%,var(--dia-msg-card-purple-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-purple-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-purple-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-purple-3)] sm:-top-4 sm:-left-4 sm:h-14 sm:w-14 md:-top-[22px] md:-left-[22px] md:h-[76px] md:w-[76px]">
                <SVGa />
            </div>

            <div className="absolute -top-3 -right-3 z-[1] flex h-11 w-11 rotate-[9deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-pink)_0%,var(--dia-msg-card-pink-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-pink-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-pink-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-pink-3)] sm:-top-4 sm:-right-4 sm:h-14 sm:w-14 md:-top-[22px] md:-right-[22px] md:h-[76px] md:w-[76px]">
                <SVGb />
            </div>

            <div className="absolute -bottom-3 -left-3 z-[1] flex h-11 w-11 -rotate-[8deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-pink)_0%,var(--dia-msg-card-pink-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-pink-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-pink-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-pink-3)] sm:-bottom-4 sm:-left-4 sm:h-14 sm:w-14 md:-bottom-[22px] md:-left-[22px] md:h-[76px] md:w-[76px]">
                <SVGc />
            </div>

            <div className="absolute -right-3 -bottom-3 z-[1] flex h-11 w-11 rotate-[10deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-amber)_0%,var(--dia-msg-card-amber-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-amber-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-amber-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-amber-3)] sm:-right-4 sm:-bottom-4 sm:h-14 sm:w-14 md:-right-[22px] md:-bottom-[22px] md:h-[76px] md:w-[76px]">
                <SVGd />
            </div>

            <div className="relative z-[2] flex items-center justify-between gap-2">
                <div className="truncate rounded-full border-[2.5px] border-(--dia-msg-card-ink) bg-(--dia-msg-card-badge-bg) px-3 py-1.5 font-[family-name:var(--dia-msg-card-font-display)] text-[13px] font-extrabold tracking-[0.2px] text-[var(--dia-msg-card-ink)] uppercase shadow-[3px_3px_0_var(--dia-msg-card-ink)] sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-2.5 md:text-[21px]">
                    {threadName}
                </div>
                <div className="shrink-0 rounded-full bg-(--dia-msg-card-ink) px-3 py-1.5 text-[10px] font-bold tracking-[1.2px] text-[var(--dia-msg-card-cream)] uppercase sm:px-4 sm:py-2 sm:text-xs md:text-sm">
                    Anonyme
                </div>
            </div>

            <div className="relative z-[2] flex flex-1 items-center justify-center py-4 sm:py-6 md:py-7.5">
                <div className="text-center">
                    {hasMentions && (
                        <div className="mb-3 inline-block rounded-full bg-[linear-gradient(135deg,var(--dia-msg-card-purple-deep),var(--dia-msg-card-pink-deep))] px-4 py-2 text-sm font-bold text-[var(--dia-msg-card-cream)] sm:mb-4 sm:px-5 sm:py-2.5 sm:text-base md:mb-[22px] md:text-lg">
                            @ {mentionedNames!.join(", ")}
                        </div>
                    )}
                    <div
                        className="rounded-xl bg-(--dia-msg-card-ink) px-5 py-4 leading-[1.4] font-semibold tracking-[-0.3px] wrap-break-word text-(--dia-msg-card-cream) sm:px-6 sm:py-6 md:p-8"
                        style={{fontSize: `${mobile}px`}}
                    >
                        {text}
                    </div>
                </div>
            </div>

            <div className="relative z-2 flex items-center justify-between gap-2">
                <div className="truncate text-[11px] font-semibold text-(--dia-msg-card-ink-soft) sm:text-xs md:text-sm">
                    Plateforme Anonyme IAI
                </div>
                <div className="shrink-0 text-[11px] font-medium text-(--dia-msg-card-ink-faint) sm:text-xs md:text-sm">
                    {timestamp}
                </div>
            </div>
        </div>
    )
}

export default MessageDialogCard
