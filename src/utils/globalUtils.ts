/**
 * Formate une date ISO en chaîne de caractères en français.
 * * @param createdAtIso - La date au format ISO
 * @param createdAtIso - La date au format ISO
 * @param withHours - Si vrai, ajoute l'heure au format "à HH:mm"
 * @returns La date formatée
 */
export function formatCreatedDate(
    createdAtIso: string,
    withHours: boolean = false
): string {
    const date = new Date(createdAtIso)

    if (Number.isNaN(date.getTime())) {
        throw new TypeError("Format de date invalide")
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }

    let formattedDate = date.toLocaleDateString("fr-FR", dateOptions)
    formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

    if (withHours) {
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }
        const formattedTime = date.toLocaleTimeString("fr-FR", timeOptions)
        return `${formattedDate} à ${formattedTime}`
    }

    return formattedDate
}

/**
 * Retourne une chaîne de caractères représentant le temps écoulé depuis une date ISO donnée.
 * @param dateIso - La date au format ISO
 * @returns Une chaîne de caractères représentant le temps écoulé (ex: "il y a 5 min", "il y a 2 h", "il y a 3 j")
 */
export function timeAgo(dateIso: string) {
    if (!dateIso) return null
    const diffMin = Math.max(
        1,
        Math.round((Date.now() - new Date(dateIso).getTime()) / 60000)
    )
    if (diffMin < 60) return `il y a ${diffMin} min`
    const diffH = Math.round(diffMin / 60)
    if (diffH < 24) return `il y a ${diffH} h`
    return `il y a ${Math.round(diffH / 24)} j`
}
