import type { ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

function SafeDivWrapper({
    children,
    className,
}: Readonly<{ children: ReactNode; className?: string }>) {
    return (
        <div
            className={cn(
                "flex min-h-full w-full flex-col gap-5 self-stretch px-4 pt-8 pb-24 xl:pt-10",
                className
            )}
        >
            {children}
        </div>
    )
}

export default SafeDivWrapper
