import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAppErrorDialogStore } from "@/stores/appErrorDialogStore.ts"

function GlobalAppErrorDialog() {

    const { errorData, hideError} = useAppErrorDialogStore()

    const handleOpenChange = (open: boolean) => {
        if (open) return

        const callback = errorData?.onClose

        hideError()
        callback?.()
    }

    return (
        <Dialog open={errorData !== null} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{errorData?.title}</DialogTitle>
                </DialogHeader>
                <p>{errorData?.message}</p>
                {errorData?.actions && (
                    <div className="flex justify-end gap-2 mt-4">
                        {errorData.actions}
                    </div>
                )}
            </DialogContent>

        </Dialog>
    )
}

export default GlobalAppErrorDialog
