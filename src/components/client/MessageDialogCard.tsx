import SVGa from "@/assets/svg/lb.svg?react"
import SVGb from "@/assets/svg/lt.svg?react"
import SVGc from "@/assets/svg/rt.svg?react"
import SVGd from "@/assets/svg/rb.svg?react"
import { useMemo } from "react"
import { calculateMessageFontSize } from "@/utils/globalUtils.ts"
import { motion } from "motion/react"

export interface ThreadMessageCardProps {
    threadName: string | null | undefined
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
    // Mémoïsé : calcul mathématique pur, ne dépend que de la longueur du texte
    const { fontSize } = useMemo(() => calculateMessageFontSize(text.length), [text.length])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.3, 0.7, 0.4, 1] }}
            className={[
                "@container relative isolate flex flex-col justify-between overflow-hidden",
                "w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px]",
                "min-h-[360px] sm:min-h-[480px] md:min-h-[640px]",
                "rounded-[24px] sm:rounded-[28px] md:rounded-[36px]",
                "p-6 sm:p-8 md:p-15",
                "bg-(--dia-msg-card-surface)",
                "font-(family-name:--dia-msg-card-font-sans)",
                "shadow-[0_0_0_1px_var(--dia-msg-card-shadow-ring),0_24px_50px_-16px_var(--dia-msg-card-shadow-purple),0_10px_22px_-8px_var(--dia-msg-card-shadow-pink)]",
            ].join(" ")}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.55, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.3, 0.7, 0.4, 1] }}
                aria-hidden
                className="pointer-events-none absolute -top-10 -left-9 z-0 h-28 w-28 rounded-full bg-(--dia-msg-card-lav) opacity-[0.55] blur-[50px] sm:-top-[55px] sm:-left-[49px] sm:h-[154px] sm:w-[154px] md:-top-[100px] md:-left-[90px] md:h-[280px] md:w-[280px]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.55, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.3, 0.7, 0.4, 1] }}
                aria-hidden
                className="pointer-events-none absolute -right-8 -bottom-11 z-0 h-[104px] w-[104px] rounded-full bg-[var(--dia-msg-card-peach)] opacity-[0.55] blur-[50px] sm:-right-[44px] sm:-bottom-[60px] sm:h-[143px] sm:w-[143px] md:-right-[80px] md:-bottom-[110px] md:h-[260px] md:w-[260px]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.45, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                aria-hidden
                className="pointer-events-none absolute bottom-[24px] -left-[24px] z-0 h-[80px] w-[80px] rounded-full bg-[var(--dia-msg-card-rose)] opacity-[0.45] blur-[50px] sm:bottom-[33px] sm:-left-[33px] sm:h-[110px] sm:w-[110px] md:bottom-[60px] md:-left-[60px] md:h-[200px] md:w-[200px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.3, 0.7, 0.4, 1] }}
                className="absolute -top-3 -left-3 z-1 flex h-11 w-11 rotate-[-10deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-purple)_0%,var(--dia-msg-card-purple-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-purple-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-purple-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-purple-3)] sm:-top-4 sm:-left-4 sm:h-14 sm:w-14 md:-top-[22px] md:-left-[22px] md:h-[76px] md:w-[76px]"
            >
                <SVGa />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 9 }}
                animate={{ opacity: 1, scale: 1, rotate: 9 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.3, 0.7, 0.4, 1] }}
                className="absolute -top-3 -right-3 z-[1] flex h-11 w-11 rotate-[9deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-pink)_0%,var(--dia-msg-card-pink-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-pink-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-pink-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-pink-3)] sm:-top-4 sm:-right-4 sm:h-14 sm:w-14 md:-top-[22px] md:-right-[22px] md:h-[76px] md:w-[76px]"
            >
                <SVGb />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.3, 0.7, 0.4, 1] }}
                className="absolute -bottom-3 -left-3 z-[1] flex h-11 w-11 -rotate-[8deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-pink)_0%,var(--dia-msg-card-pink-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-pink-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-pink-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-pink-3)] sm:-bottom-4 sm:-left-4 sm:h-14 sm:w-14 md:-bottom-[22px] md:-left-[22px] md:h-[76px] md:w-[76px]"
            >
                <SVGc />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 10 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.3, 0.7, 0.4, 1] }}
                className="absolute -right-3 -bottom-3 z-[1] flex h-11 w-11 rotate-[10deg] items-center justify-center rounded-3xl bg-[linear-gradient(155deg,var(--dia-msg-card-amber)_0%,var(--dia-msg-card-amber-deep)_100%)] shadow-[0_14px_26px_-8px_var(--dia-msg-card-shadow-bubble-amber-1),inset_0_-7px_12px_var(--dia-msg-card-shadow-bubble-amber-2),inset_0_5px_9px_var(--dia-msg-card-shadow-bubble-amber-3)] sm:-right-4 sm:-bottom-4 sm:h-14 sm:w-14 md:-right-[22px] md:-bottom-[22px] md:h-[76px] md:w-[76px]"
            >
                <SVGd />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.3, 0.7, 0.4, 1] }}
                className="relative z-[2] flex items-center justify-center gap-2"
            >
                <div className="truncate text-foreground rounded-full border-[2.5px] border-(--dia-msg-card-ink) bg-(--dia-msg-card-badge-bg) px-3 py-1.5 font-[family-name:var(--dia-msg-card-font-display)] text-xs font-extrabold tracking-[0.2px] text-[var(--dia-msg-card-ink)] uppercase shadow-[3px_3px_0_var(--dia-msg-card-ink)] sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-2.5 md:text-xl">
                    {threadName}
                </div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.3, 0.7, 0.4, 1] }}
                className="relative z-[2] flex flex-1 items-center justify-center py-4 sm:py-6 md:py-7.5"
            >
                <div className="text-center">
                    {hasMentions && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3, ease: [0.3, 0.7, 0.4, 1] }}
                            className="mb-3 inline-block rounded-full bg-[linear-gradient(135deg,var(--dia-msg-card-purple-deep),var(--dia-msg-card-pink-deep))] px-4 py-2 text-sm font-bold text-[var(--dia-msg-card-cream)] sm:mb-4 sm:px-5 sm:py-2.5 sm:text-base md:mb-[22px] md:text-lg"
                        >
                            @ {mentionedNames!.join(", ")}
                        </motion.div>
                    )}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.35, ease: [0.3, 0.7, 0.4, 1] }}
                        className="rounded-xl bg-(--dia-msg-card-ink) px-5 py-4 leading-[1.4] font-semibold tracking-[-0.3px] wrap-break-word text-(--dia-msg-card-cream) sm:px-6 sm:py-6 md:p-8"
                        style={{ fontSize }}
                    >
                        {text}
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.3, 0.7, 0.4, 1] }}
                className="relative z-2 flex items-center md:justify-between justify-center gap-2"
            >
                <div className=" hidden md:block truncate text-[11px] font-semibold text-(--dia-msg-card-ink-soft) sm:text-xl md:text-sm">
                    Plateforme Anonyme IAI
                </div>
                <div className="shrink-0 text-xs font-medium text-(--dia-msg-card-ink-faint) md:text-sm">
                    {timestamp}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default MessageDialogCard
