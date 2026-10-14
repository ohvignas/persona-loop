# Léo's story: from 3/10 to 8/10

ClipRadar turns Twitch lives into short videos. It is an internal project of ILLITH SAS and is **not public**. The facts below come from two real user tests run on 2026-10-14 (internal reports, in French). We did not invent any number.

## The persona

**Léo, 24, freelance clipper.** He cuts TikTok shorts from English-speaking GTA RP streamers. He has zero patience: if the app does not give him a clip fast, he leaves.

## v1: he gave up after 10 minutes. Grade 3/10

The tester played Léo in a real browser, with a real channel live on Twitch.

- Sign-up: the button stayed on "Creating..." for about 15 s, with no error shown.
- Every reload or direct link logged him out.
- The app asked him to confirm his email, but the email never came, and "Resend" failed too.
- The Sources page showed a crash screen with a raw stack trace.
- Adding a channel failed twice before it worked.
- He never saw a single moment or short. He quit at 10 minutes.

"Would you pay 19/month?" **No, not in this state.**

## What persona-loop did

1. **Found** 10 frustrations, each with a timestamp and a screenshot.
2. **Ranked** them: logouts first, then crash screens, then the email confirmation dead end.
3. **Fixed** them: the team traced the logouts to an overloaded local backend that cut functions at 1 s, then made sessions resilient, replaced stack traces with plain messages and removed the jargon Léo did not understand.
4. **Tested again** with the same persona.

## v2: a real short in under 5 minutes. Grade 8/10

- Sign-up was instant, with a 2-step welcome.
- No crash and no logout, even after several full reloads.
- From an imported video, the app spotted a moment in about 15 s and made a short in about 45 s.
- No blocking jargon left.

"Would you pay 19 $/month?" **"Yes, probably"**, if live detection reacts faster and the generated title becomes a real hook.

10 smaller frustrations remain (generic short title, a 2-3 s loading flash, live status refreshed every 2 min). The next loop starts there.

**Limit:** v2 did not test detection on a continuous live stream. The short came from an imported video.

## Files in this folder

A separate run of the full plugin on the same app, with persona Kenzo (iteration 1): [persona](persona.md), [journey](journey.md), [test report](iteration-1/test-report.md), [critique](iteration-1/critique.md), [scores](iteration-1/scores.md), [fix plan](iteration-1/iteration-report.md).
