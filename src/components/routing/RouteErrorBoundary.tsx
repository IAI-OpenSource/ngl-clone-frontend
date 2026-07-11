import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router"
import NotFoundComp from "@/components/ui/NotFoundComp"

export default function RouteErrorBoundary() {
    const error = useRouteError()
    const navigate = useNavigate()

    let code = "404"
    let message = "NOT FOUND"
    let description = "Désolé, la page que vous recherchez n'existe pas."

    if (error) {
        if (isRouteErrorResponse(error)) {
            code = String(error.status)
            message = error.statusText || "NOT FOUND"
            
            if (error.status === 404) {
                description = "La page demandée est introuvable ou a été déplacée."
            } else if (error.status === 401) {
                code = "401"
                message = "UNAUTHORIZED"
                description = "Vous n'avez pas l'autorisation d'accéder à cette ressource."
            } else if (error.status === 403) {
                code = "403"
                message = "FORBIDDEN"
                description = "L'accès à cette page est interdit."
            } else if (error.status === 500) {
                code = "500"
                message = "SERVER ERR"
                description = "Une erreur interne du serveur est survenue."
            } else if (error.status === 503) {
                code = "503"
                message = "UNAVAILABLE"
                description = "Le service est temporairement indisponible."
            } else {
                description = "Une erreur réseau ou de routage est survenue."
            }
        } else if (error instanceof Error) {
            code = "500"
            message = "APP ERROR"
            description = error.message || "Une erreur inattendue de l'application est survenue."
        } else {
            code = "ERR"
            message = "UNKNOWN"
            description = "Une erreur inconnue s'est produite."
        }
    }

    return (
        <NotFoundComp
            code={code}
            message={message}
            description={description}
            actionLabel="Retourner à l'accueil"
            onAction={() => navigate("/")}
        />
    )
}
