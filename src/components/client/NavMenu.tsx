import { NavLink } from "react-router"
import type { NavBarMenuItemProps } from "@/types/navbar.ts"
import { Button } from "@/components/ui/button.tsx"

function NavMenuItem(props : Readonly<NavBarMenuItemProps>) {
    return (
        <NavLink to={props.link}>
            <Button className="rounded-lg" variant="outline">
                <div className="flex items-center gap-2">
                    {props.icon}
                    <span className="text-lg">{props.displayText}</span>
                </div>
            </Button>
        </NavLink>
    )
}

function NavMenu({
    items,
}: Readonly<{ items: Readonly<NavBarMenuItemProps[]> }>) {
    return (
        <div className="items-center gap-3 hidden xl:flex">
            {items.map((i) => (
                <NavMenuItem
                    key={i.displayText}
                    icon={i.icon}
                    link={i.link}
                    displayText={i.displayText}
                />
            ))}
        </div>
    )
}

export default NavMenu
