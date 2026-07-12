# 💬 NGL Clone Frontend
[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-orange?logo=pnpm&logoColor=white)](https://pnpm.io/)

> Interface utilisateur mobile-first au style **Néobrutaliste** clonant l'application de messagerie anonyme **NGL (Not Gonna Lie)**, connectée au backend de synchronisation et d'envoi WhatsApp.

Ce projet propose un design moderne et coloré orienté Gen-Z (stickers inclinés, bordures et ombres noires marquées, dégradés vibrants) facilitant l'accès aux fils de discussion WhatsApp et l'envoi de messages anonymes.

---

## 🚀 Fonctionnalités Clés

1. **Messagerie Anonyme et Mentions** : Envoi de messages anonymes vers un groupe WhatsApp avec possibilité de mentionner directement d'autres membres actifs de la discussion.
2. **Design Néobrutaliste & Stickers** : Identité visuelle forte reprenant les codes de l'application originale avec des fenêtres, boutons et vignettes imitant des autocollants physiques.
3. **Dialogue d'Erreur "Sticker" Intelligent** : Remplacement des toasts d'erreur d'API par une boîte de dialogue sticker personnalisée selon le type d'erreur (`AppErrorType` comme `LOCKED_CONTENT` ou `RATE_LIMIT_EXCEEDED`).
4. **Authentification par discussion** : Accès simplifié et sécurisé par mot de passe aux discussions privées directement via leur slug.
5. **Mode Sombre Adaptatif** : Gestion fine du thème reposant sur les variables OKLCH de Tailwind CSS v4 pour une transition harmonieuse.
6. **Compositeur de Message Réactif** : Indicateur de caractères dynamique (avec seuils de couleur orange/rouge) pour respecter la limite du serveur de 500 caractères.

---

## 🛠️ Stack Technique

* **Langage & Frameowrk** : React 19 / TypeScript 6 / Vite 8
* **Styles & Composants** : Tailwind CSS v4, styled-components, Radix UI (Dialog, Drawer, Combobox)
* **Animations** : motion (Framer Motion) & GSAP
* **Gestion du State** : Zustand (Zustand stores légers pour l'état d'authentification et les boîtes d'alertes)
* **Requêtes API & Cache** : TanStack Query v5 (React Query) & Axios

---

## 🎨 Écosystème du Projet

Ce repository contient **l'interface utilisateur (frontend) uniquement**. L'écosystème complet NGL Clone se compose de plusieurs repositories :

### 🔗 Repositories Connexes

| Repository | Description | Stack |
| :--- | :--- | :--- |
| **ngl-clone-frontend** (ce repo) | Client web, compositeur de messages anonymes et interface utilisateur | React 19, Tailwind CSS v4, Zustand |
| **[ngl-clone-backend](https://github.com/IAI-OpenSource/ngl-clone-backend)** | API backend, logique métier, file d'attente Celery, intégration WhatsApp | FastAPI, PostgreSQL, Redis, Celery |
| **[ngl-clone-docs](#)** | Documentation partagée, spécifications API et guides d'intégration | Markdown |

---

## 📁 Structure du Projet

```text
src/
├── components/
│   ├── client/       # Composants d'interface (Navbar, Success drawer, Compositeur)
│   ├── routing/      # Gestionnaires d'erreurs de routage
│   └── ui/           # Primitives du design system (Dialog, Button, Combobox)
├── configs/          # Configuration de React Query
├── hooks/            # Hooks personnalisés (requêtes, toasts, thèmes)
├── layouts/          # Modèles de mise en page globale (ClientLayout)
├── loaders/          # Chargeurs d'authentification pour les routes
├── pages/            # Vues de l'application (Accueil, Discussions, Nouveau Message)
├── routing/          # Configuration du routeur et des chemins
├── services/         # Clients HTTP Axios (BaseApi, messages, threads, membres)
├── stores/           # Stores Zustand (authentification de thread, dialogues d'erreurs)
├── types/            # Définitions TypeScript et schémas d'API (Zod)
└── utils/            # Utilitaires globaux de formatage
```

---

## ⚙️ Configuration (.env)

Créez un fichier `.env` à la racine en vous basant sur le fichier `.env.example` :

| Variable | Description | Exemple / Défaut |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL de connexion à l'API du serveur backend | `http://localhost:8000` |

---

## 🚀 Démarrage et Installation

### Démarrage local (Développement)

1. Assurez-vous d'avoir configuré le fichier `.env`.
2. Installez les dépendances du projet :
   ```bash
   pnpm install
   ```
3. Lancez le serveur de développement :
   ```bash
   pnpm dev
   ```
4. Ouvrez votre navigateur sur l'adresse indiquée (généralement `http://localhost:5173` ou `http://localhost:5174`).

### Commandes utiles

- `pnpm dev` : Lance le serveur de développement local.
- `pnpm build` : Compile TypeScript et génère l'application pour la production.
- `pnpm preview` : Permet de tester le build de production localement.
- `pnpm typecheck` : Exécute le compilateur TypeScript sans générer de fichiers (`tsc --noEmit`).
- `pnpm lint` : Lance l'analyseur de code ESLint.
- `pnpm format` : Formate tous les fichiers source avec Prettier.

---

## 📐 Règles d'Architecture du Projet

Le projet adhère à une charte de développement stricte pour maintenir la clarté et la qualité du code :

1. **Aucun `if` pour le mapping d'erreurs** : Le traitement visuel des erreurs retournées par l'API doit passer par l'objet de correspondance `ERROR_MAPPING` défini dans le compositeur de message, évitant ainsi les structures conditionnelles lourdes.
2. **Utilisation exclusive des boîtes de dialogue stickers pour les erreurs d'API** : Les notifications toasts standard de type avertissement sont réservées aux validations locales simples de l'interface (ex: dépassement de caractères).
3. **Ségrégation stricte des styles** : Toutes les règles de thèmes et couleurs personnalisées doivent exploiter les variables CSS du fichier `index.css` afin de garantir la compatibilité automatique des modes clair/sombre.
