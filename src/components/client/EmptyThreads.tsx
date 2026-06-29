import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty.tsx"
import { Button } from "../ui/button"
import { AudioWaveform, RefreshCcwIcon } from "lucide-react"

function EmptyThreads({ refetchFunc }: Readonly<{ refetchFunc: () => void }>) {
    return (
        <div className="w-11/12 rounded-lg border border-border bg-sidebar md:w-1/2">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <AudioWaveform />
                    </EmptyMedia>
                    <EmptyTitle>Aucun Thread Disponible</EmptyTitle>
                    <EmptyDescription>
                        Aucun thread disponible pour l'instant.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button
                        variant="outline"
                        onClick={refetchFunc}
                    >
                        <RefreshCcwIcon />
                        Recharger
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    )
}

export default EmptyThreads
