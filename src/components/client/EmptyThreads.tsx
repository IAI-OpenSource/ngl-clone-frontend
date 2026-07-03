import { AudioWaveform } from "lucide-react"
import EmptyPage from "@/components/client/EmptyPage.tsx"

function EmptyThreads({ refetchFunc }: Readonly<{ refetchFunc: () => void }>) {
    return (
        <EmptyPage
            refetchFunc={refetchFunc}
            emptyTitleMessage="Aucun Thread Disponible"
            emptyDescriptionMessage="Aucun thread disponible pour l'instant."
            emptyIcon={<AudioWaveform />}
        />
    )
}

export default EmptyThreads
