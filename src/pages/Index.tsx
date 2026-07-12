import toast from "react-hot-toast";

import useTheme from "@/hooks/useTheme.ts";
import {useNavigate} from "react-router";
import { PATHS_MAPPING } from "@/routing/paths-mapping.ts"; //mport PATHS_MAPPING
import { CircleIcon, CircleXIcon } from "lucide-react"
import Button from "@/components/ui/button";
import { useAppErrorDialogStore } from "@/stores/appErrorDialogStore.ts"

function Index() {
    const {toggleTheme} = useTheme();
    const navigate = useNavigate();
    const {showError} = useAppErrorDialogStore()
    return (
        <div className="flex-col items-center  justify-center gap-3">
            <Button
                variant="default"
                onClick={() => {
                    toast("Navigation vers le page Admin", {
                        duration: 1500,
                        position: "top-right",
                        icon: <CircleIcon />,
                    })
                    //navigation vers PATHS_MAPPING.APP
                    navigate(PATHS_MAPPING.APP)
                }}
            >
                Test Vers Admin
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    toast(`Changement de thème`, {
                        duration: 1000,
                        position: "top-right",
                        icon: <CircleIcon />,
                    })
                    toggleTheme()
                }}
            >
                Test Theme (Actuel: jsp)
            </Button>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => {
                        showError({
                            title: "Bug Détecté !",
                            errorCode: "",
                            message: "Une perturbation dans la matrice empêche l'envoi de ton message anonyme. L'équipe a été notifiée.",
                            errorIcon: CircleXIcon,
                            variant: "info"
                        })
                    }}
                >
                    Test Error Glitch
                </Button>
                <Button
                    variant="outline"
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                    onClick={() => {
                        showError({
                            title: "Action Interdite",
                            message: "Oups ! Tu as tenté de franchir les frontières secrètes du serveur sans invitation.",
                            errorIcon: CircleXIcon,
                            errorCode: "403_FORBIDDEN",
                            variant: "destructive"
                        })
                    }}
                >
                    Test Error Destructive
                </Button>
            </div>
            {/*<Toaster />*/}
            {/*<CardFt message="Premier test" />*/}
        </div>
    )

}

export default Index
