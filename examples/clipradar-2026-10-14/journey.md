# Target journey: Kenzo -> premier short de son live

## Steps
| # | Page / route | Why | Action | Expected signal | Max |
|---|---|---|---|---|---|
| 1 | `/` | Comprendre la promesse | Lire, cliquer "Essayer gratuitement 15 jours" | URL -> `/sign-up` | 30 s |
| 2 | `/sign-up` | Créer un compte | Remplir 4 champs, valider | `POST /api/auth/sign-up/email` 200, URL change | 1 min |
| 3 | `/welcome` étape 1 | Brancher sa chaîne | Coller le lien, cocher l'accord, "Suivre" | mutation `channels:add` (WebSocket Convex), étape 2 | 1 min |
| 4 | `/welcome` étape 2 | Être prévenu | Activer ou "Plus tard" | URL -> `/moments` | 15 s |
| 5 | `/moments` | Voir un moment repéré | Ouvrir un moment | moment listé | dépend du live |
| 6 | moment -> short | Obtenir la valeur | "Créer le short", télécharger | short `ready`, survit au F5 | <= 3 clics (C2) |

## Gaps
- Si la chaîne est hors ligne, l'étape 5 est une attente sans fin visible ; seule alternative : "Importer une vidéo" sur `/channels`.

## Predicted friction (hypotheses)
- H1: bannière cookies masque des CTA sur mobile.
- H2: chaîne déjà essayée -> blocage.

## Acceptance criteria
| ID | Criterion | Measure | Threshold |
|---|---|---|---|
| J-1 | Inscription | clic -> page suivante | < 5 s |
| J-2 | Session stable | F5 sur 4 routes x 2 viewports | 0 déconnexion |
| J-3 | Chaîne branchée | visible dans `/channels` après F5 | oui |
| J-4 | Premier short | moment -> short ready | <= 3 clics |
| J-5 | Mobile | 375 px sans scroll horizontal ni CTA masqué | 0 |
