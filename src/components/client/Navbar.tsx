import NavMenu from "@/components/client/NavMenu.tsx"
import { items } from "@/data/navbar.tsx"
import OnlineStatus from "@/components/client/OnlineStatus.tsx"
import nglLogo from "@/assets/images/ngl-logo.png"
import { useThreadAuthStore } from "@/stores/threadAuthStore.ts"

function Navbar() {
    return (
        <nav className="fixed inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background">
            <div className="mx-auto flex h-full items-center justify-between px-4">
                <Logo />
                <NavMenu items={items} />
                <ThreadInfo />
            </div>
        </nav>
    )
}

function ThreadInfo() {
    const {isAuthenticated} = useThreadAuthStore()

    return (
        <div className="flex items-center justify-around gap-3 rounded-full bg-foreground p-3">
            <OnlineStatus online={isAuthenticated} />
            <span className="text-accent hidden md:block">Thread connecté </span>
        </div>
    )
}

function Logo() {
    return (
        <div className="flex items-center gap-2 rounded-full border-2 border-dotted border-foreground bg-chart-3 py-1 px-5 md:px-10">
            <img src={nglLogo} alt="Marketflow" className="w-15 md:w-[85]" />
            <span className="font-zen-dots font-extrabold text-accent md:text-2xl">
                NGL IAI
            </span>
        </div>
    )
}
export default Navbar
