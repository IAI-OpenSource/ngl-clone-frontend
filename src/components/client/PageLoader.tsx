import AnimatedLoader from "@/components/ui/AnimatedLoader.tsx"
import HamsterAnimatedLoader from "@/components/ui/HamsterAnimatedLoader.tsx"

function PageLoader({ message, hamster }: Readonly<{ message: string, hamster?: boolean }>) {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            {hamster ? <HamsterAnimatedLoader/> : <AnimatedLoader/>}
            <span className="text-sm text-muted-foreground animate-pulse">{message}</span>
        </div>
    )
}

export default PageLoader
