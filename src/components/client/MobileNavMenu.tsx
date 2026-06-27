import Dock from "@/components/Dock.tsx"
import { mobileNavbarItems } from "@/data/navbar.tsx"
import useTheme from "@/hooks/useTheme.ts"

function MobileNavMenu() {
    const {toggleTheme} = useTheme()
    return (
            <Dock
                items={mobileNavbarItems(toggleTheme)}
                baseItemSize={50}
                magnification={70}
            />
    )
}

export default MobileNavMenu
