import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { router } from "@/routing/router.ts"
import { queryClient } from "@/configs/react-query/configs.ts"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Toaster
            toastOptions={{
                // On désactive le rendu de l'icône par défaut pour les méthodes success/error native
                success: { icon: null },
                error: { icon: null },
            }}
        />
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {import.meta.env.DEV && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    </StrictMode>
)
