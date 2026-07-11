
export type RedirectCause = 'wantConnect' | 'reconnect' | 'inexistantThread' |'unknow'
export interface RedirectToNotConnectedPageData {
    cause: RedirectCause,
    threadSlug: string,
    isConnected?: boolean,
}