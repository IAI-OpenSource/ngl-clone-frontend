import { Outlet } from "react-router"
import Navbar from "@/components/client/Navbar.tsx"
import MobileNavMenu from "@/components/client/MobileNavMenu.tsx"
import { DotPattern } from "@/components/ui/dot-pattern"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

function ClientLayout() {
    return (
        <TooltipProvider>
            <div className="relative flex min-h-dvh flex-col overflow-hidden">
                <DotPattern className="opacity-30 -z-10"/>
                <header className="top-0 z-50 flex h-16 w-full items-center ">
                    <Navbar />
                </header>
                <main className="flex-1 w-full flex justify-center items-center">
                    <Outlet />
                </main>
                <div className="fixed right-0 bottom-0 left-0 z-50">
                    <MobileNavMenu />
                </div>
            </div>
        </TooltipProvider>
    )
}

export default ClientLayout
