import type { NavBarMenuItemProps } from "@/types/navbar.ts"
import {
    CLIENT_ROUTES_MAPPING,
    genarateMessageRoute,
    genarateNewMessageRoute,
} from "@/routing/paths-mapping.ts"
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
import type { ReadThread } from "@/types/api/threadsSchemas.ts"

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
export const mobileNavbarItems  = (connectedThread?: ReadThread | undefined | null): DockItemData[] => [
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
        link: connectedThread ? genarateMessageRoute(connectedThread.slug) : CLIENT_ROUTES_MAPPING.NOT_CONNECTED,
    },
    {
        icon: <MessageCirclePlus size={18} />,
        label: "Nouveau Message",
        link: connectedThread ? genarateNewMessageRoute(connectedThread.slug) : CLIENT_ROUTES_MAPPING.NOT_CONNECTED,
    },
    {
        icon: <FlaskConical size={18} />,
        label: "Test",
        link: "/test",
    },
]