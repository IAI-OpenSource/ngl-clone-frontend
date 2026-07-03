import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx"
import { RefreshCcwIcon } from "lucide-react"
import Button from "@/components/ui/button.tsx"
import { type ReactNode } from "react"

interface EmptyPageProps {
    refetchFunc: () => void
    emptyTitleMessage: string
    emptyDescriptionMessage: string
    emptyIcon: ReactNode
    additionalContent?: ReactNode
}

function EmptyPage({
    refetchFunc,
    emptyTitleMessage,
    emptyDescriptionMessage,
    emptyIcon,
    additionalContent
}: Readonly<EmptyPageProps>) {
    return (
        <div className="w-11/12 rounded-lg border border-border bg-sidebar md:w-1/2">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">{emptyIcon}</EmptyMedia>
                    <EmptyTitle>{emptyTitleMessage}</EmptyTitle>
                    <EmptyDescription>
                        {emptyDescriptionMessage}
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" onClick={refetchFunc}>
                        <RefreshCcwIcon />
                        Recharger
                    </Button>
                    {additionalContent}
                </EmptyContent>
            </Empty>
        </div>
    )
}

export default EmptyPage
