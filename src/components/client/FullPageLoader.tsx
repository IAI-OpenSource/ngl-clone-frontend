import { Skeleton } from "@/components/ui/skeleton"
import AnimatedLoader from "@/components/ui/AnimatedLoader.tsx"

export default function FullPageLoader({ message }: Readonly<{ message?: string }>) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center gap-4 rounded-xl border bg-card p-6 shadow-lg md:gap-5">
                <div className="relative flex items-center justify-center">
                    <AnimatedLoader />
                    <Skeleton className="absolute h-8 w-8 animate-pulse rounded-full bg-primary/10 blur-xl" />
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-sm font-medium tracking-wide text-foreground">
                        Chargement de l'App
                    </p>
                    <p className="animate-pulse text-xs text-muted-foreground">
                        {message || 'blablablabla'}
                    </p>
                </div>
            </div>
        </div>
    )
}
