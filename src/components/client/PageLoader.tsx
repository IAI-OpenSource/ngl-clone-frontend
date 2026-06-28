import AnimatedLoader from "@/components/ui/AnimatedLoader.tsx"

function PageLoader({ message }: Readonly<{ message: string }>) {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <AnimatedLoader/>
            <span className="text-sm text-muted-foreground animate-pulse">{message}</span>
        </div>
    )
}

export default PageLoader
