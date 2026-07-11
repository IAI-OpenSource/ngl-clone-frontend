import { AudioWaveform } from "lucide-react"
import EmptyPageContent from "@/components/client/EmptyPageContent.tsx"

function EmptyThreads({ refetchFunc }: Readonly<{ refetchFunc: () => void }>) {
    return (
        <EmptyPageContent
            refetchFunc={refetchFunc}
            emptyTitleMessage="Aucun Thread Disponible"
            emptyDescriptionMessage="Aucun thread disponible pour l'instant."
            emptyIcon={<AudioWaveform />}
        />
    )
}

export default EmptyThreads
