import {Button} from "@/components/ui/button.tsx";
import toast from "react-hot-toast";

import useTheme from "@/hooks/useTheme.ts";
import {useNavigate} from "react-router";
import {CLIENT_ROUTES_MAPPING} from "@/routing/paths-mapping.ts";
import { CircleIcon } from "lucide-react"

function Index() {
    const {toggleTheme} = useTheme();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex gap-3 items-center justify-center bg-background">
            <Button variant="default" onClick={() => {
                toast("Navigation vers le page Admin", {
                    duration: 1500,
                    position: "top-right",
                    icon: <CircleIcon />,
                })
                navigate(CLIENT_ROUTES_MAPPING.HOME);
            }}>
                Test Vers Admin
            </Button>
            <Button variant="outline" onClick={() => {
                toast(`Changement de thème`, {
                    duration: 1000,
                    position: 'top-right',
                    icon: <CircleIcon/>,
                });
                toggleTheme()
            }}>
                Test Theme (Actuel: jsp)
            </Button>
            {/*<Toaster />*/}
        </div>
    )

}

export default Index
