import { createBrowserRouter } from "react-router"


import { CLIENT_ROUTES_MAPPING, PATHS_MAPPING } from "./paths-mapping.ts"
import ClientLayout from "@/layouts/ClientLayout.tsx"
import Index from "@/pages/Index.tsx"
import ThreadsPage from "@/pages/ThreadsPage.tsx"
import { ExpandableCardExample } from "@/components/client/ExpandableCardExample.tsx"

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
                Component: ExpandableCardExample,
            },
        ],
    },
    // {
    //     id: LoaderIds.ADMIN_PROTECTED_ROUTES,
    //     HydrateFallback: FullPageLoader,
    //     loader: adminAuthLoader,
    //     path: PATHS_MAPPING.ADMIN,
    //     Component: AdminLayout,
    //     children: [
    //         {
    //             index: true,
    //             path: PATHS_MAPPING.ADMIN_DASHBOARD,
    //             Component: Placeholder,
    //         },
    //         {
    //             path: PATHS_MAPPING.ADMIN_PRODUCTS,
    //             Component: Placeholder,
    //         },
    //         {
    //             path: PATHS_MAPPING.ADMIN_ORDERS,
    //             Component: Placeholder,
    //         },
    //         {
    //             path: PATHS_MAPPING.ADMIN_CUSTOMERS,
    //             Component: Placeholder,
    //         },
    //         {
    //             path: PATHS_MAPPING.ADMIN_LOGS,
    //             Component: Placeholder,
    //         },
    //         {
    //             path: PATHS_MAPPING.ADMIN_SETTINGS,
    //             Component: Placeholder,
    //         },
    //     ],
    // },
])
