import Dock from "@/components/ui/Dock.tsx"
import { mobileNavbarItems } from "@/data/navbar.tsx"
import { useSafeConnectedThread } from "@/hooks/queries/useSafeConnectedThread.ts"
import { isSuccessResponse } from "@/utils/apiResponseExtractor.ts"
import type { ReadThread } from "@/types/api/threadsSchemas.ts"

function MobileNavMenu() {
    const {threadQueryResult} = useSafeConnectedThread()
    let connectedThread: ReadThread | undefined |null = undefined
    if (isSuccessResponse(threadQueryResult)) {
        connectedThread = threadQueryResult.result
    }
    return (
            <Dock
                items={mobileNavbarItems(connectedThread)}
                baseItemSize={50}
                magnification={70}
            />
    )
}

export default MobileNavMenu
