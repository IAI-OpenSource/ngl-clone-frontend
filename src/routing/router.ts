import { createBrowserRouter } from "react-router"


import {
    PATHS_MAPPING,
    CLIENT_ROUTES_MAPPING,
} from "./paths-mapping.ts"
import ClientLayout from "@/layouts/ClientLayout.tsx"
import ThreadsPage from "@/pages/ThreadsPage.tsx"
import MessagesPage from "@/pages/MessagesPage.tsx"
import threadAuthLoader from "@/loaders/threadAuthLoader.ts"
import FullPageLoader from "@/components/client/FullPageLoader.tsx"
import NewMessagePage from "@/pages/NewMessagePage.tsx"
import NotConnectedPage from "@/pages/NotConnectedPage.tsx"


import LandingPage from "@/pages/LandingPage.tsx"
import RouteErrorBoundary from "@/components/routing/RouteErrorBoundary.tsx"
import TestPage from "@/pages/TestPage.tsx"

export const router = createBrowserRouter([
    //LandingPage à la racine "/"
    {
        path: PATHS_MAPPING.HOME,
        Component: LandingPage,
        ErrorBoundary: RouteErrorBoundary,
    },
    //les pages sont déplacées sous "/app"
    {
        path: PATHS_MAPPING.APP,
        Component: ClientLayout,
        ErrorBoundary: RouteErrorBoundary,
        children: [
            {
                //chemins relatifs
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
                path: "test",
                Component: TestPage,
                ErrorBoundary: RouteErrorBoundary,
            },
        ],
    },

    // Fallback pour toutes les autres routes (404)
    {
        path: "*",
        Component: RouteErrorBoundary,
    },
])