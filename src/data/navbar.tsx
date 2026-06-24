import type { NavBarMenuItemProps } from "@/types/navbar.ts"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"
import { CirclePlus, Eye, MessageCircleCode } from "lucide-react"

export const items: NavBarMenuItemProps[] = [
    {
        link: CLIENT_ROUTES_MAPPING.THREADS,
        displayText: "Threads",
        icon: <MessageCircleCode />,
    },
    {
        link: CLIENT_ROUTES_MAPPING.THREADS,
        displayText: "Messages",
        icon: <Eye />,
    },
    {
        link: CLIENT_ROUTES_MAPPING.THREADS,
        displayText: "Créer un nouveau message",
        icon: <CirclePlus/>,
    },
]
