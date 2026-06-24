import Dock from "@/components/Dock.tsx"
import { mobileNavbarItems } from "@/data/navbar.tsx"

function MobileNavMenu() {
    return (
            <Dock
                items={mobileNavbarItems}
                baseItemSize={50}
                magnification={70}
            />
    )
}

export default MobileNavMenu
