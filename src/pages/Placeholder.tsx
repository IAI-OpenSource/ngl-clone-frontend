import Button from "@/components/ui/button.tsx";
import {useLocation} from "react-router";
import useTheme from "@/hooks/useTheme.ts";
import { PATHS_MAPPING, CLIENT_ROUTES_MAPPING} from "@/routing/paths-mapping.ts";

const pathnameMapping: Record<string, string> = {
    [PATHS_MAPPING.HOME]: 'Home',
    [CLIENT_ROUTES_MAPPING.THREADS]: 'Threads',
    [CLIENT_ROUTES_MAPPING.THREADS_MESSAGES]: 'Thread Messages',
}
function Placeholder() {
    const {pathname} = useLocation()
    const {toggleTheme} = useTheme()
    return (
        <div className={"w-full flex-col h-full flex items-center justify-center"}>
            <span>Placeholder {pathnameMapping[pathname]}</span>
            <Button onClick={toggleTheme}>
                Changer le theme
            </Button>
        </div>
    )
}

export default Placeholder;