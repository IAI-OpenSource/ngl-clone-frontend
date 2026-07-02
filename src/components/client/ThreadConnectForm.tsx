import {
    type ConnectToThreadResponse,
    type ReadThread,
    ThreadLoginPayloadZodSchema,
} from "@/types/api/threadsSchemas.ts"
import { AudioWaveform, Eye, EyeOff, Lock, X } from "lucide-react"
import { Spinner } from "@/components/ui/spinner.tsx"
import { useSafeConnectedThread } from "@/hooks/queries/useSafeConnectedThread.ts"
import { isSuccessResponse } from "@/utils/apiResponseExtractor.ts"
import Button from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { type Dispatch, type SetStateAction, useState } from "react"
import { cn } from "@/lib/utils.ts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { connectToThread } from "@/services/threadService.ts"
import { useToast } from "@/hooks/useToasts.tsx"
import { invalidThreadRelatedQueries } from "@/configs/react-query/utils.ts"
import DisconnectAlertDialog from "@/components/client/DisconnectAlertDialog.tsx"
import { isAxiosError } from "axios"
import { router } from "@/routing/router.ts"
import { CLIENT_ROUTES_MAPPING } from "@/routing/paths-mapping.ts"
import { useThreadAuthStore } from "@/stores/threadAuthStore.ts"

function ThreadConnectForm({ thread }: Readonly<{ thread: ReadThread }>) {

    const [connectFormError, setConnectFormError] = useState("Mot de passe requis")

    const [isConnecting, setIsConnecting] = useState(false)

    const [password, setPassword] = useState("")

    const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false)

    const { isLoading, threadQueryResult } = useSafeConnectedThread()

    const {setAuthenticate} = useThreadAuthStore()

    const {loadingToast, successToast, errorToast} = useToast()

    const handleConnection = async (threadId: string) => {
        setIsConnecting(true)

        let isSuccess = false

        const toastId = loadingToast("Connexion en cours")
        try {
            const res = await connectToThread(threadId, {
                password: password || "  ",
            }) // Fuck
            if (res.success) {
                successToast("Connexion réussi", { id: toastId })
                isSuccess = true
                await invalidThreadRelatedQueries()
            } else {
                const error =
                    res?.result?.error?.error_message ||
                    "Erreur lors de la connexion"
                errorToast(
                    error,
                    { id: toastId }
                )
                setConnectFormError(error)

            }
        }catch (err) {
            if (isAxiosError<ConnectToThreadResponse>(err)) {
                const error =
                    err.response?.data.error?.error_message ||
                    "Erreur lors de la connexion"
                errorToast(
                    error,
                    { id: toastId }
                )
                setConnectFormError(error)
            }

        }finally {
            setIsConnecting(false)
        }
        if (isSuccess){
            setAuthenticate()
            await router.navigate(CLIENT_ROUTES_MAPPING.THREADS_MESSAGES)
        }
    }

    const handleConnect = async (
        thread: ReadThread,
        connectedThread: ReadThread | undefined | null
    ) => {
        if (connectedThread) {
            setAlertDialogIsOpen(true)
        } else {
            await handleConnection(thread.id)
        }
    }

    if (isLoading)
        return (
            <div className="flex flex-col items-center justify-center">
                <Spinner />
            </div>
        )

    const { name, has_password } = thread

    if (!has_password && connectFormError !== "") setConnectFormError('')

    const canSubmit = connectFormError === "" && !isConnecting

    let connectedThread: ReadThread | undefined | null

    if (isSuccessResponse(threadQueryResult)) {
        connectedThread = threadQueryResult.result
    }

    return (
        <>
            {connectedThread && (
                <DisconnectAlertDialog
                    open={alertDialogIsOpen}
                    onOpenChange={(open) => {
                        if (!open) setAlertDialogIsOpen(false)
                    }}
                    connectedThreadName={connectedThread?.name}
                    handleDisconnect={async () => {
                        setAlertDialogIsOpen(false)
                        await handleConnection(thread.id)
                    }}
                />
            )}

            <div className="flex flex-col items-center justify-center gap-3">
                <div className="rounded-lg bg-background">
                    <AudioWaveform className="m-2 md:m-5" />
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                    <span className="text-xl font-bold">Connexion à</span>
                    <span className="font-zen-dots text-xl md:text-3xl font-bold">
                        {name}
                    </span>
                </div>
                {has_password && (
                    <ConnectForm
                        password={password}
                        setPassword={setPassword}
                        error={connectFormError}
                        setError={setConnectFormError}
                    />
                )}

                <Separator />

                <Button
                    type="submit"
                    className="h-10 w-full rounded-lg text-sm font-medium transition-all duration-200"
                    disabled={!canSubmit}
                    onClick={() => handleConnect(thread, connectedThread)}
                >
                    {isConnecting ? <Spinner /> : "Accéder au thread"}
                </Button>
            </div>
        </>
    )
}

function ConnectForm({
    error,
    setError,
    password,
    setPassword,
}: Readonly<{
    password: string
    error: string
    setError: Dispatch<SetStateAction<string>>
    setPassword: Dispatch<SetStateAction<string>>
}>) {
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordChange = (newValue: string) => {
        setPassword(newValue)
        const validationResult = ThreadLoginPayloadZodSchema.safeParse({
            password: newValue,
        })
        if (validationResult.success) {
            if (error) setError("")
        } else {
            setError("Valeur incompatible") // Pour le moment
        }
    }
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Card className="w-full max-w-sm rounded-2xl">
                <CardHeader>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <CardTitle className="text-[15px] font-semibold tracking-tight">
                        Thread protégé
                    </CardTitle>

                    <CardDescription className="text-sm hidden md:block leading-relaxed">
                        Ce thread est protégé par un mot de passe. Veuillez le
                        renseigner pour y accéder.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pb-2">
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="thread-password"
                            className="text-xs font-medium tracking-wide uppercase"
                        >
                            Mot de passe
                        </Label>

                        <div className="relative">
                            <Input
                                id="thread-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                    handlePasswordChange(e.target.value)
                                }
                                aria-label="Mot de passe du thread"
                                placeholder="Mot de passe du thread"
                                autoComplete="current-password"
                                className={cn(
                                    "h-10 rounded-xl pr-10 text-sm",
                                    "transition-all duration-150",
                                    error &&
                                        "border-red-400 focus-visible:ring-red-400 dark:border-red-600"
                                )}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                tabIndex={-1}
                                aria-label={
                                    showPassword
                                        ? "Masquer le mot de passe"
                                        : "Afficher le mot de passe"
                                }
                                className="absolute top-1/2 right-3 -translate-y-1/2"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        {error && (
                            <p className="flex items-center gap-1 text-xs text-destructive">
                                <X className="h-3 w-3 shrink-0" />
                                {error}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ThreadConnectForm
