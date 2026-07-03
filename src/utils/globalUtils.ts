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

/**
 * Calcule dynamiquement la taille de police du message en fonction de sa longueur.
 *
 * Breakpoints responsive :
 * - Mobile (default): de 16px (500 chars) à 24px (court)
 * - SM (640px+): de 20px (500 chars) à 32px (court)
 * - MD (768px+): de 32px (500 chars) à 44px (court)
 *
 * @param textLength - Nombre de caractères du message (0-500)
 * @returns Objet avec les classes Tailwind responsives pour la taille
 */
export function calculateMessageFontSize(textLength: number) {
    // Clamper à [0, 500]
    const length = Math.max(0, Math.min(500, textLength));

    // Interpolation linéaire pour chaque breakpoint
    // Plus le texte est long, plus la taille est petite
    const mobileMin = 16;
    const mobileMax = 24;
    const mobileFontSize = mobileMax - (length / 500) * (mobileMax - mobileMin);

    const smMin = 20;
    const smMax = 32;
    const smFontSize = smMax - (length / 500) * (smMax - smMin);

    const mdMin = 32;
    const mdMax = 44;
    const mdFontSize = mdMax - (length / 500) * (mdMax - mdMin);

    return {
        /** Classe Tailwind dynamique pour appliquer les font-sizes responsives */
        className: `text-[${mobileFontSize.toFixed(1)}px] sm:text-[${smFontSize.toFixed(1)}px] md:text-[${mdFontSize.toFixed(1)}px]`,

        /** Valeurs brutes (px) pour chaque breakpoint, au cas où on veux les utiliser ailleurs */
        mobile: Math.round(mobileFontSize),
        sm: Math.round(smFontSize),
        md: Math.round(mdFontSize),
    };
}