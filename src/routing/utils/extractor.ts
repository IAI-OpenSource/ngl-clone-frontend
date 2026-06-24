export const extractThreadInitials = (threadName: string | undefined): string => {
    if (!threadName) return 'XX';
    const parts = threadName.split(' ').map(value => value[0]?.toUpperCase())
    return parts.join('')
}