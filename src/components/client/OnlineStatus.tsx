function OnlineStatus({ online }: Readonly<{ online: boolean }>) {
    return (
        <span className="relative flex h-2 w-2">
            {online && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
            )}

            <span
                className={`relative inline-flex h-2 w-2 rounded-full transition-colors duration-300 ${
                    online ? "bg-emerald-500" : "bg-gray-400"
                }`}
            ></span>
        </span>
    )
}

export default OnlineStatus
