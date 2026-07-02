import { MessageCircle } from "lucide-react"


function MessagesPageHeader({ threadName }: Readonly<{ threadName: string }>) {
    return (
        <div className="flex w-full items-center justify-between rounded-lg py-3 md:w-5/6 ">
            <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center p-1">
                    <MessageCircle className="h-full w-full" />
                </div>

                <div className="flex pl-4">
                    <div className="flex flex-col">
                        <span className="font-space-grotesk text-xl font-bold md:text-2xl">
                            Messages de {threadName}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Je sais pas encore quoi mettre ici nvm
                        </span>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex md:justify-end">
                <NewMessageButton />
            </div>
        </div>
    )
}

const NewMessageButton = () => {
    return (
        <button className="group relative cursor-pointer border-none bg-transparent p-0 font-mono text-base font-light uppercase outline-none">
            <span className="bg-opacity-25 absolute top-0 left-0 h-full w-full translate-y-0.5 transform rounded-lg bg-black transition duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-250 group-active:translate-y-px" />
            <span className="absolute top-0 left-0 h-full w-full rounded-lg bg-linear-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]" />
            <div className="relative flex -translate-y-1 transform items-center justify-between gap-3 rounded-lg bg-linear-to-r from-[#f27121] via-[#e94057] to-[#8a2387] px-6 py-3 text-lg text-white brightness-100 transition duration-600 ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:brightness-110 group-hover:duration-250 group-active:-translate-y-0.5">
                <span className="select-none font-jetbrains-mono">Ajouter un Message</span>
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="-mr-1 ml-2 h-5 w-5 transition duration-250 group-hover:translate-x-1"
                >
                    <path
                        clipRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        fillRule="evenodd"
                    />
                </svg>
            </div>
        </button>
    )
}

export default MessagesPageHeader
