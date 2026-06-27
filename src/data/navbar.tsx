import type { NavBarMenuItemProps } from "@/types/navbar.ts"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"
import {
    CirclePlus,
    Eye,
    Home,
    MessageCircleCode,
    MessagesSquare,
    Rows4,
    SendHorizonal,
    SquarePlus,
} from "lucide-react"

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
        link: CLIENT_ROUTES_MAPPING.THREADS_MESSAGES,
        displayText: "Créer un nouveau message",
        icon: <CirclePlus />,
    },
]
export const mobileNavbarItems = (func: () => void) => [
    {
        icon: <Home size={18} />,
        label: "Home",
        onClick: () => alert("Home!"),
    },
    {
        icon: <Rows4 size={18} />,
        label: "Threads",
        onClick: () => alert("Archive!"),
    },
    {
        icon: <MessagesSquare size={18} />,
        label: "Messages",
        onClick: () => alert("Profile!"),
    },
    {
        icon: <SendHorizonal size={18} />,
        label: "Settings",
        onClick: () => alert("Settings!"),
    },
    {
        icon: <SquarePlus size={18} />,
        label: "Settings",
        onClick: () => func(),
    },
]