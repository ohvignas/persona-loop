# Test report: iteration 1, persona Kenzo

- Date 2026-10-14, 20:54:54 -> 20:59:15 (horloge machine, logs du script).
- Viewports: 1440x900 puis 375x812. Locale fr-FR.
- **Browser context: isolé.** Le Playwright MCP partagé était déjà sur `/moments` d'une autre session (onglet non créé par le testeur) et le Browser pane aussi : non utilisés. Test joué avec un Chromium headless lancé par script, nouveau contexte, compte de test jetable (hôte local).
- Méthode exécutée à la main par l'orchestrateur avec les gabarits du plugin (plugin non installé dans cette session).

## Timeline
| Time | Action | What I see | How I feel |
|---|---|---|---|
| 20:54:54 | Landing `/` | Promesse claire : "ClipRadar regarde votre live et vous rend des shorts prêts à poster" | Compris en 5 s |
| 20:54:56 | Clic "Essayer gratuitement 15 jours" | `/sign-up`, 4 champs | OK |
| 20:55:12 | Remplit et valide 1 s après le chargement | La page recharge sur `/sign-up?`, champs vides, aucun message | Perdu, "ça a planté ?" |
| 20:56:01 | Réessaie après chargement complet | `POST /api/auth/sign-up/email 200`, `/moments` en 548 ms puis `/welcome` | OK |
| 20:56:07 | F5 sur `/welcome` | Session conservée | Rassuré |
| 20:56:21 | Colle twitch.tv/darkviperau, coche, "Suivre" | "Cette chaîne a déjà bénéficié d'un essai. Choisissez une offre pour la suivre." | Message clair (chaîne déjà testée ailleurs) |
| 20:56:42 | Colle twitch.tv/xqc | Étape 2 sur 2 : alertes | OK, rapide |
| 20:56:55 | F5 sur étape 2 | Revient à "Étape 1 sur 2" alors que la chaîne est ajoutée | Confus |
| 20:57:11 | `/moments` | "xqc est hors ligne · Nous surveillerons votre prochain live" | Rien à voir, j'attends |
| 20:57:18-20:58:14 | `/channels`, `/shorts`, `/settings` 1440 et 375, F5 sur chacun | Session conservée partout, pas de scroll horizontal | Stable |
| 20:59:13 | `/sign-up` en 375 px | Bannière cookies couvre le bouton "Créer mon compte" | Je tape, rien ne se passe |

## Journey steps
| Step | Result | Evidence |
|---|---|---|
| 1 Landing | done | screenshots/01-landing-1440.png, 09-landing-375.png |
| 2 Sign-up | done au 2e essai | 1er: `GET /sign-up? 200` (soumission native avant hydratation) ; 2e: `POST /api/auth/sign-up/email 200` ; 03/04-after-signup*.png |
| 3 Chaîne | done | console `ConvexError: TRIAL_ALREADY_USED` (1er essai) ; 07-welcome-step2-1440.png ; `/channels` liste xqc après F5 (08-channels-*.png) |
| 4 Alertes | done (non activées) | 07-welcome-step2-1440.png |
| 5 Moment | NOT TESTED (chaîne hors ligne) | 08-moments-1440.png |
| 6 Short | NOT TESTED (needs owner: chaîne en direct ou vidéo de test autorisée) | — |

## Frustrations
| ID | Severity | Where | What | Evidence |
|---|---|---|---|---|
| F-1 | major | `/sign-up` | Soumission avant hydratation : rechargement silencieux, champs vidés, aucune requête d'auth | log `GET /sign-up? 200` à 20:55:12, pas de POST |
| F-2 | major | `/sign-up` 375 px | Bannière cookies (y=599, h=213) recouvre le CTA (y=579, h=44) et intercepte les clics | 10-signup-cookie-banner-covers-cta-375.png ; Playwright "section aria-label=Cookies intercepts pointer events" |
| F-3 | minor | `/welcome` | F5 en étape 2 renvoie à l'étape 1 | log 20:56:55 |
| F-4 | minor | `/moments` | Chaîne hors ligne : aucune estimation, aucun exemple, aucune voie vers "Importer une vidéo" | 08-moments-1440.png |

## Misunderstood words
| String | Where | What I thought |
|---|---|---|
| "Option payante : 4 $US/mois · Fish Audio" | `/settings` | "Fish Audio ?" Nom de fournisseur sans explication, prix en $ dans une app FR |

## Console errors / failed requests (raw)
```
[CONVEX M(channels:add)] [Request ID: 83eeafd2b77d028a] Server Error
Uncaught ConvexError: TRIAL_ALREADY_USED
    at assertCanAddChannel (../../convex/lib/entitlements.ts:169:2)
```
(l'interface affiche un message traduit ; erreur visible seulement en console)

## Verdict
- Grade: 6/10. Inscription et branchement rapides et stables, mais deux pièges d'inscription et je n'ai vu aucun moment ni short.
- Paierais-je 19 €/mois ? Peut-être : seulement après avoir vu un vrai short de mon live.
- First blocking point: aucun bloquant total ; premier point majeur F-1.
