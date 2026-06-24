import { Outlet } from "react-router"
import Navbar from "@/components/client/Navbar.tsx"

function ClientLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-16 w-full flex items-center px-6 sticky top-0 bg-background z-50">
                <Navbar />
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            {/*<Footer />*/}
        </div>
    )
}

export default ClientLayout
