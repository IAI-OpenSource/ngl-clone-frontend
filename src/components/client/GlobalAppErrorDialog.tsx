import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useAppErrorDialogStore } from "@/stores/appErrorDialogStore.ts"
import { AlertCircle } from "lucide-react"

function GlobalAppErrorDialog() {
    const { errorData, hideError } = useAppErrorDialogStore()

    const handleOpenChange = (open: boolean) => {
        if (open) return

        const callback = errorData?.onClose

        hideError()
        callback?.()
    }

    if (errorData === null) return null

    const ErrorIcon = errorData.errorIcon
    const SelectedIcon = ErrorIcon ?? AlertCircle

    const variantGradients = {
        glitch: "from-[#FF6F59] to-[#FFC857] text-[#1B2340]",
        destructive: "from-[#FF4FA3] to-[#DE0E68] text-white",
        warning: "from-[#FFA63D] to-[#FF7A1A] text-[#1B2340]",
        info: "from-[#9163F7] to-[#A47BFF] text-white",
    }

    const activeVariant = errorData.variant ?? "glitch"
    const gradientClass = variantGradients[activeVariant]

    return (
        <Dialog open={true} onOpenChange={handleOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="w-5/6 md:w-full max-w-sm overflow-hidden rounded-3xl border-4 border-[#1B2340] bg-[#FBF8F0] p-6 shadow-[8px_8px_0px_#1B2340] sm:max-w-md sm:p-8 dark:border-[#F3EFE4] dark:bg-[#151A2E] dark:shadow-[8px_8px_0px_#F3EFE4]"
            >
                {/* CSS Dot grid background pattern */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(27,35,64,0.15)_1.5px,transparent_1.5px)] bg-size-[12px_12px] opacity-40 dark:bg-[radial-gradient(rgba(243,239,228,0.15)_1.5px,transparent_1.5px)]" />

                <div className="relative z-10 flex flex-col gap-6">
                    {/* Header bar / Window-style status */}
                    <div className="flex items-center justify-between border-b-2 border-[#1B2340]/10 pb-3 dark:border-[#F3EFE4]/10">
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FF6F59]" />
                            <span className="font-jetbrains-mono text-[10px] font-bold tracking-wider text-[#1B2340]/60 uppercase dark:text-[#F3EFE4]/60">
                                {errorData.errorCode
                                    ? `system_status // ${errorData.errorCode}`
                                    : "system_status // GLITCH"}
                            </span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-[#1B2340]/20 dark:bg-[#F3EFE4]/20" />
                            <div className="h-2 w-2 rounded-full bg-[#1B2340]/20 dark:bg-[#F3EFE4]/20" />
                        </div>
                    </div>

                    <div className="relative flex justify-center py-2">
                        <div className="pointer-events-none absolute inset-0 bg-radial from-[#1B2340]/5 to-transparent dark:from-white/5" />
                        <div className="group relative rotate-[-4deg] cursor-help transition-transform duration-300 ease-out hover:scale-105 hover:rotate-3 active:scale-95">
                            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-[#1B2340] dark:bg-[#F3EFE4]" />
                            <div
                                className={`relative bg-linear-to-tr ${gradientClass} flex items-center justify-center rounded-2xl border-4 border-[#1B2340] p-5 dark:border-[#F3EFE4]`}
                            >
                                <SelectedIcon className="size-10 md:size-12" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-center font-syne text-xl font-extrabold tracking-tight text-[#1B2340] uppercase md:text-2xl dark:text-[#F3EFE4]">
                            {errorData.title || "Quelque chose a buggé"}
                        </h2>
                        <p className="text-center font-plus-jakarta-sans text-sm leading-relaxed font-medium text-[#1B2340]/80 md:text-base dark:text-[#F3EFE4]/80">
                            {errorData.message}
                        </p>
                    </div>

                    <div className="mt-2 flex flex-col gap-3">
                        {errorData.actions ? (
                            <div className="flex w-full flex-col gap-2">
                                {errorData.actions}
                            </div>
                        ) : (
                            <button
                                onClick={() => handleOpenChange(false)}
                                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-[#1B2340] bg-[#1B2340] font-syne font-bold text-white shadow-[4px_4px_0px_#FF6F59] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#1B2340]/90 hover:shadow-[6px_6px_0px_#FF6F59] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#FF6F59] dark:border-[#F3EFE4] dark:bg-[#F3EFE4] dark:text-[#151A2E] dark:shadow-[4px_4px_0px_#FFC857] dark:hover:bg-[#F3EFE4]/90 dark:hover:shadow-[6px_6px_0px_#FFC857] dark:active:shadow-[2px_2px_0px_#FFC857]"
                            >
                                Fermer
                            </button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GlobalAppErrorDialog
