import { Toaster } from "react-hot-toast"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/configs/react-query/configs.ts"
import { RouterProvider } from "react-router"
import { router } from "@/routing/router.ts"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "./index.css"

function App() {
    return (
        <>
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
        </>
    )
}

export default App
