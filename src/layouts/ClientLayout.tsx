import { Outlet } from "react-router"
import Navbar from "@/components/client/Navbar.tsx"
import MobileNavMenu from "@/components/client/MobileNavMenu.tsx"

function ClientLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-background px-6">
                <Navbar />
            </header>
            <main>
                <div className="h-screen w-full ">
                    <Outlet />
                </div>
            </main>
            <div className="fixed right-0 bottom-0 left-0 z-50">
                <MobileNavMenu />
            </div>
            {/*<Footer />*/}
        </div>
    )
}

export default ClientLayout
