import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
import { LogOut } from "lucide-react"

interface DisconnectDialogProps {
    open: boolean
    onOpenChange(open: boolean): void
    connectedThreadName: string
    handleDisconnect():void
}
function DisconnectAlertDialog({
    open,
    onOpenChange,
    connectedThreadName,
    handleDisconnect,
}: Readonly<DisconnectDialogProps>) {
    return (
        <AlertDialog onOpenChange={onOpenChange} open={open}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <LogOut />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                        Confirmation de Connexion
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action vous déconnectera du thread
                        {" "}<span className="font-bold">
                            {connectedThreadName}
                        </span>{" "}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleDisconnect}
                    >
                        Se Connecter
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DisconnectAlertDialog
