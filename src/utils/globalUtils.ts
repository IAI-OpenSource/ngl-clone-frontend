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
 * Fonction de pause pour les fonctions asynchrones
 * j'ai ajouté juste pour simuler des délais de réponse dans les tests pour voir comment l'application réagit
 * @param seconds le nombre de secondes à sleep
 */
export const sleep = (seconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

interface FontSizeResult {
    /** Valeur prête à être injectée dans style={{ fontSize }} */
    fontSize: string
    /** Taille min atteignable (px), pour debug/tests */
    min: number
    /** Taille max atteignable (px), pour debug/tests */
    max: number
}

const MAX_MESSAGE_LENGTH = 500

// Taille de police à une largeur de conteneur "petite" (~320px, mobile)
const FONT_SHORT_AT_SMALL = 26 // message très court
const FONT_LONG_AT_SMALL = 14 // message à 500 caractères

// Taille de police à une largeur de conteneur "grande" (~600px, desktop)
const FONT_SHORT_AT_LARGE = 40 // message très court
const FONT_LONG_AT_LARGE = 20 // message à 500 caractères

// Largeurs de conteneur de référence utilisées pour l'interpolation (px)
const CONTAINER_SMALL = 320
const CONTAINER_LARGE = 600

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
}

export function calculateMessageFontSize(textLength: number): FontSizeResult {
    const length = Math.max(0, Math.min(MAX_MESSAGE_LENGTH, textLength))
    const t = length / MAX_MESSAGE_LENGTH // 0 = court, 1 = 500 caractères

    // Taille cible aux deux largeurs de référence, selon la longueur du texte
    const fontAtSmall = lerp(FONT_SHORT_AT_SMALL, FONT_LONG_AT_SMALL, t)
    const fontAtLarge = lerp(FONT_SHORT_AT_LARGE, FONT_LONG_AT_LARGE, t)

    // Droite passant par (CONTAINER_SMALL, fontAtSmall) et (CONTAINER_LARGE, fontAtLarge)
    // exprimée en fonction de la largeur du conteneur (cqw = 1% de cette largeur)
    const slope =
        (fontAtLarge - fontAtSmall) / (CONTAINER_LARGE - CONTAINER_SMALL)
    const intercept = fontAtSmall - slope * CONTAINER_SMALL
    const cqwCoefficient = slope * 100

    const min = Math.min(fontAtSmall, fontAtLarge)
    const max = Math.max(fontAtSmall, fontAtLarge)

    const fluid = `calc(${intercept.toFixed(2)}px + ${cqwCoefficient.toFixed(4)}cqw)`

    return {
        fontSize: `clamp(${min.toFixed(2)}px, ${fluid}, ${max.toFixed(2)}px)`,
        min: Math.round(min),
        max: Math.round(max),
    }
}