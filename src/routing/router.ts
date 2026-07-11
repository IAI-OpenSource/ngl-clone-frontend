import { createBrowserRouter } from "react-router"


import { CLIENT_ROUTES_MAPPING, PATHS_MAPPING } from "./paths-mapping.ts"
import ClientLayout from "@/layouts/ClientLayout.tsx"
import Index from "@/pages/Index.tsx"
import ThreadsPage from "@/pages/ThreadsPage.tsx"
import MessagesPage from "@/pages/MessagesPage.tsx"
import TestPage from "@/pages/TestPage.tsx"
import threadAuthLoader from "@/loaders/threadAuthLoader.ts"
import FullPageLoader from "@/components/client/FullPageLoader.tsx"
import NewMessagePage from "@/pages/NewMessagePage.tsx"
import NotConnectedPage from "@/pages/NotConnectedPage.tsx"

export const router = createBrowserRouter([
    {
        path: PATHS_MAPPING.HOME,
        Component: ClientLayout,
        children: [
            {
                index: true,
                Component: Index,
            },
            {
                path: CLIENT_ROUTES_MAPPING.THREADS,
                Component: ThreadsPage,
            },
            {
                path: CLIENT_ROUTES_MAPPING.THREADS_MESSAGES,
                Component: MessagesPage,
                loader: threadAuthLoader,
                HydrateFallback: FullPageLoader,
            },
            {
                path: CLIENT_ROUTES_MAPPING.NEW_MESSAGE,
                Component: NewMessagePage,
                loader: threadAuthLoader,
                HydrateFallback: FullPageLoader,
            },
            {
                path: CLIENT_ROUTES_MAPPING.NOT_CONNECTED,
                Component: NotConnectedPage,
            },

            {
                path: "/test",
                Component: TestPage,
            },
        ],
    },
])
