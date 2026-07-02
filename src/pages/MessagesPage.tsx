import type { ReadMessage } from "@/types/api/threadsSchemas.ts"
import CardGlitch from "@/components/client/CardGlitch.tsx"


const MOCK_MESSAGES: ReadMessage[] = [
    {
        id: "1",
        thread_id: "t1",
        content:
            "Est-ce que quelqu'un a compris le TD de SGBD ? Je suis perdu depuis la partie sur les transactions imbriquées, j'ai l'impression d'avoir raté un cours entier.",
        wa_message_id: "wa_1",
        wa_status: "delivered",
        wa_forwarded_at: "2026-06-30T21:12:00Z",
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T21:10:00Z",
        mentionned_members: [
            {
                id: "m1",
                display_name: "Prof. Adjovi",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
        ],
    },
    {
        id: "2",
        thread_id: "t1",
        content:
            "Petit coup de cœur discret pour la personne qui répond toujours en premier sur le groupe, tu illumines mes révisions 🐝",
        wa_message_id: "wa_2",
        wa_status: "sent",
        wa_forwarded_at: null,
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T20:40:00Z",
        mentionned_members: [],
    },
    {
        id: "3",
        thread_id: "t1",
        content: "Message masqué par la modération.",
        wa_message_id: null,
        wa_status: "pending",
        wa_forwarded_at: null,
        is_hidden: true,
        hidden_reason: "Langage inapproprié signalé par 3 membres",
        created_at: "2026-06-30T19:05:00Z",
        mentionned_members: [],
    },
    {
        id: "4q",
        thread_id: "t1",
        content:
            "L'examen de Cloud Computing est reporté à jeudi, ça vient de tomber sur l'affichage du secrétariat.",
        wa_message_id: "wa_4",
        wa_status: "failed",
        wa_forwarded_at: null,
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T18:22:00Z",
        mentionned_members: [
            {
                id: "m2",
                display_name: "TC2-A",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
            {
                id: "m3",
                display_name: "Délégué",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
        ],
    },
    {
        id: "4x",
        thread_id: "t1",
        content:
            "L'examen de Cloud Computing est reporté à jeudi, ça vient de tomber sur l'affichage du secrétariat.",
        wa_message_id: "wa_4",
        wa_status: "failed",
        wa_forwarded_at: null,
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T18:22:00Z",
        mentionned_members: [
            {
                id: "m2",
                display_name: "TC2-A",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
            {
                id: "m3",
                display_name: "Délégué",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
        ],
    },
    {
        id: "4z",
        thread_id: "t1",
        content:
            "L'examen de Cloud Computing est reporté à jeudi, ça vient de tomber sur l'affichage du secrétariat.",
        wa_message_id: "wa_4",
        wa_status: "failed",
        wa_forwarded_at: null,
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T18:22:00Z",
        mentionned_members: [
            {
                id: "m2",
                display_name: "TC2-A",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
            {
                id: "m3",
                display_name: "Délégué",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
        ],
    },
    {
        id: "9",
        thread_id: "t1",
        content:
            "L'examen de Cloud Computing est reporté à jeudi, ça vient de tomber sur l'affichage du secrétariat.",
        wa_message_id: "wa_4",
        wa_status: "failed",
        wa_forwarded_at: null,
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T18:22:00Z",
        mentionned_members: [
            {
                id: "m2",
                display_name: "TC2-A",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
            {
                id: "m3",
                display_name: "Délégué",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
        ],
    },
    {
        id: "6",
        thread_id: "t1",
        content:
            "Bienvenue ! Je suis votre assistant virtuel spécialisé. Mon objectif est de vous accompagner au quotidien pour simplifier vos recherches et optimiser vos projets. Grâce à des réponses rapides et ciblées, je vous aide à gagner un temps précieux. N'hésitez pas à me soumettre vos demandes, qu'elles soient simples ou complexes. Ensemble, nous trouverons les solutions les plus adaptées à vos besoins pour garantir votre entière satisfaction. Testez mes capacités dès maintenant ! ",
        wa_message_id: "wa_6",
        wa_status: "failed",
        wa_forwarded_at: null,
        is_hidden: false,
        hidden_reason: null,
        created_at: "2026-06-30T18:22:00Z",
        mentionned_members: [
            {
                id: "m2",
                display_name: "TC2-A",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
            {
                id: "m3",
                display_name: "Délégué",
                wa_jid: "",
                wa_name: null,
                phone_number: null,
                avatar_url: null,
                is_active: false,
                created_at: "",
                updated_at: "",
            },
        ],
    },
]

function MessagesPage() {
    return (
        <div className="flex w-full flex-wrap items-stretch justify-center gap-5 md:gap-10 px-4 pt-8 pb-24 xl:pt-10 xl:pb-0">
            {MOCK_MESSAGES.map((message) => (
                <button
                    className="w-11/12 [all:unset] md:w-5/12"
                    key={message.id}
                    onClick={() => {console.log(`Click sur ${message.id}`)}}
                >
                    <CardGlitch message={message} />
                </button>
            ))}
        </div>
    )
}

export default MessagesPage
