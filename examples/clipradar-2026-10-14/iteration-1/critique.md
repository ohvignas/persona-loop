# UX critique: iteration 1

- Skills: méthode appliquée par l'orchestrateur (ui-ux-pro-max, web-design-guidelines, page-cro disponibles dans l'environnement, non chargés formellement dans ce run).
- Lighthouse: not run (CLI non installée ; pas de téléchargement sans accord).
- Limite : critique faite par le même agent que le test (pas de contexte frais).

## Findings
| ID | Severity | Screen | Finding | Evidence | Criterion | Expected fix |
|---|---|---|---|---|---|---|
| UX-1 | major | `/sign-up` | Formulaire actif avant hydratation (= F-1) | log `GET /sign-up?` | C8 pas de bouton muet | Désactiver le submit jusqu'à hydratation, ou `method="post"` + `preventDefault` garanti |
| UX-2 | major | toutes pages 375 px | Bannière cookies 213 px de haut masque les CTA (= F-2) | 10-signup-cookie-banner-covers-cta-375.png | J-5 | Bannière compacte (1 ligne + bouton) ou `padding-bottom` du contenu égal à sa hauteur |
| UX-3 | minor | `/moments` | Titre H1 entouré d'un contour cyan au chargement (focus programmatique visible) | 08-moments-1440.png | cohérence visuelle | `:focus:not(:focus-visible)` sans contour sur le H1 |
| UX-4 | minor | `/moments` vide | État vide sans valeur : ni exemple, ni lien "Importer une vidéo" | 08-moments-1440.png | temps jusqu'à la valeur | Ajouter le lien d'import et un exemple de short |
| UX-5 | minor | `/welcome` | Étape non persistée au F5 (= F-3) | log 20:56:55 | J-2 | Déduire l'étape de l'état serveur (chaîne existante -> étape 2) |
| UX-6 | minor | global | Lien d'évitement "Aller au contenu" 32x24 px | mesure boundingBox | cible >= 44 px | Agrandir la zone cliquable |
| UX-7 | minor | `/settings` | "Fish Audio" et "4 $US" non expliqués | texte page | copy/i18n | "Voix IA réaliste, 4 €/mois" ou mention de la devise |

## Checks
| Check | Result | Evidence |
|---|---|---|
| Promise readable in 5 s | oui | 01-landing-1440.png |
| Empty / loading / error states | vide présent mais pauvre ; erreur chaîne traduite | 08-moments, 06-welcome-after-follow |
| Every interactive element gives a signal | non (UX-1) | log |
| Contrast (measured, landing 375) | min 4.72:1 ("En savoir plus sur les cookies") >= 4.5 | script contraste |
| Tap targets >= 44 px | 1 exception (UX-6) | mesure |
| 375 px: no horizontal scroll | 0 scroll sur 5 routes | `HSCROLL false` |
| Copy: no jargon | aucun mot de la liste interdite vu | textes dumpés |
