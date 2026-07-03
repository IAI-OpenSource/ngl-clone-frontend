import type { NavBarMenuItemProps } from "@/types/navbar.ts"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"
import {
    AudioWaveform,
    CirclePlus,
    Eye,
    FlaskConical,
    Home,
    MessageCircleCode,
    MessageCirclePlus,
    MessagesSquare,
} from "lucide-react"
import type { DockItemData } from "@/components/ui/Dock.tsx"

export const items: NavBarMenuItemProps[] = [
    {
        link: CLIENT_ROUTES_MAPPING.THREADS,
        displayText: "Threads",
        icon: <MessageCircleCode />,
    },
    {
        link: CLIENT_ROUTES_MAPPING.THREADS_MESSAGES,
        displayText: "Messages",
        icon: <Eye />,
    },
    {
        link: CLIENT_ROUTES_MAPPING.THREADS_MESSAGES,
        displayText: "Créer un nouveau message",
        icon: <CirclePlus />,
    },
]
export const mobileNavbarItems : DockItemData[] = [
    {
        icon: <Home size={18} />,
        label: "Home",
        link: CLIENT_ROUTES_MAPPING.HOME,
    },
    {
        icon: <AudioWaveform size={18} />,
        label: "Threads",
        link: CLIENT_ROUTES_MAPPING.THREADS,
    },
    {
        icon: <MessagesSquare size={18} />,
        label: "Messages",
        link: CLIENT_ROUTES_MAPPING.THREADS_MESSAGES,
    },
    {
        icon: <MessageCirclePlus size={18} />,
        label: "Nouveau Message",
        link: CLIENT_ROUTES_MAPPING.NEW_MESSAGE,
    },
    {
        icon: <FlaskConical size={18} />,
        label: "Test",
        link: "/test",
    },
]