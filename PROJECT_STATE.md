# PROJECT_STATE.md

> Cross-surface context document. Shared across Claude Chat, Claude Code, and Cowork.
> Last scanned: 2026-02-08

---

## Project Overview

Princess Paws Tracing is a mobile-first educational web app for toddlers (ages 2-4) to practice tracing uppercase letters (A-Z), numbers (0-9), and basic shapes (circle, square, triangle, star, heart). It uses a canvas-based drawing layer over SVG guide paths with hit-detection for completion. The app is deployed as a static SPA on Vercel at `https://abc-xi-six.vercel.app`. It has no backend, no authentication, no persistence, and no external API calls — it is a self-contained client-side app with a princess/puppy aesthetic designed to be handed to a child on a phone.

---

## Current Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.x |
| Build | Vite | 6.x |
| Language | TypeScript | 5.6 |
| Styling | Tailwind CSS (Vite plugin) | 4.x |
| Icons | Lucide React | 0.469 |
| Hosting | Vercel (static SPA) | — |
| Linting | ESLint 9 + react-hooks + react-refresh | — |

No database, no auth provider, no backend services, no state management library. Navigation is hash-based using `useSyncExternalStore`. Session state lives entirely in React — nothing is persisted to localStorage or cookies.

---

## Architecture

```
src/
├── main.tsx                          # Entry point → StrictMode → App
├── App.tsx                           # Root: OrientationGate → TracingStateProvider → AppContent
├── index.css                         # Tailwind import + custom theme + keyframe animations
│
├── types/index.ts                    # Point, TracingItem, Category, AppState
│
├── hooks/
│   ├── useNavigation.ts              # Hash-based nav via useSyncExternalStore + popstate
│   └── useTracingState.tsx           # Context for isTracing flag (pauses ambient effects)
│
├── pages/
│   ├── HomePage.tsx                  # Category picker (Letters / Numbers / Shapes)
│   ├── TracingPage.tsx               # Main tracing view with canvas + nav controls + fireworks
│   └── CategoryCompletePage.tsx      # Celebration screen after last item
│
├── features/tracing/
│   ├── index.ts                      # Barrel exports
│   ├── components/
│   │   ├── TracingCanvas.tsx         # Composition root: Ghost + Demo + Dots + Drawing + Debug
│   │   ├── GhostLetter.tsx           # SVG faded path guide (background layer)
│   │   ├── GuideDots.tsx             # SVG dots that light up when hit
│   │   ├── DrawingLayer.tsx          # HTML Canvas for user finger strokes
│   │   ├── DemoAnimation.tsx         # SVG stroke-dasharray animation (plays on load)
│   │   └── DebugOverlay.tsx          # Dev overlay: hit radii, coverage %, sequence status
│   ├── hooks/
│   │   └── useCompletionDetection.ts # Wraps completion utils into React state
│   └── utils/
│       └── completionDetection.ts    # Pure functions: hit testing, coverage calc, anti-scribble
│
├── data/
│   ├── letters.ts                    # 26 TracingItems (A-Z) with SVG paths + guide dots
│   ├── numbers.ts                    # 10 TracingItems (1-9, 0)
│   └── shapes.ts                     # 5 TracingItems (circle, square, triangle, star, heart)
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx                # Large touch-friendly button (48px targets)
│   │   └── IconButton.tsx            # Icon wrapper with touch sizing
│   ├── icons/
│   │   ├── SparkleIcon.tsx
│   │   ├── PawPrintIcon.tsx
│   │   ├── CrownIcon.tsx
│   │   └── index.ts
│   ├── effects/
│   │   ├── Fireworks.tsx             # Canvas particle burst on completion
│   │   ├── FloatingDecor.tsx         # Ambient sparkles, paw prints, crowns
│   │   ├── PageBackground.tsx        # Pastel gradient per page type
│   │   └── index.ts
│   └── OrientationGate.tsx           # CSS-only landscape blocker
```

**Data flow:** `App` renders a page based on hash state → `TracingPage` looks up the current `TracingItem` from `data/` by category + index → passes it to `TracingCanvas` → `DrawingLayer` captures pointer events and reports strokes → `useCompletionDetection` runs hit-testing against guide dots → on completion, fireworks trigger and auto-advance occurs after a short delay.

**Coordinate system:** All paths and dots use normalized 0-1 coordinates. Both SVG layers (viewBox `0 0 1 1`) and the Canvas layer transform to the same space via `size` (the smaller of container width/height from ResizeObserver).

---

## Current State

### Fully Working
- **Home page** — category selection (Letters, Numbers, Shapes)
- **Tracing canvas** — 5-layer composition (ghost, demo, dots, drawing, debug)
- **41 tracing items** — 26 letters, 10 numbers, 5 shapes, all with hand-crafted SVG paths and guide dots
- **Completion detection** — 99% dot coverage + anti-scribble sequence validation (min 2 forward progressions)
- **Celebration system** — canvas fireworks burst + "Good Job!" overlay + auto-advance
- **Navigation** — prev/next, clear, home; progress dots in footer; category complete screen
- **Visual polish** — floating decorations, page-specific pastel gradients, princess theme colors
- **Touch hardening** — `touch-action: none`, `user-select: none`, context menu disabled, iOS swipe-back blocked
- **Orientation gate** — CSS-only landscape detection with rotate prompt
- **Debug mode** — `?debug=true` URL param shows hit radii, coverage %, and sequence info
- **Deployment** — live on Vercel at `https://abc-xi-six.vercel.app`
- **PWA manifest** — portrait orientation, standalone display, princess pink theme

### Partially Built (WIP)
- **Demo animation** (F027) — stroke-dasharray drawing animation plays on letter load. Code is written and integrated but has uncommitted changes. Had a strobe-light bug (CSS keyframe `var()` defaulting to wrong value) that was fixed by using inline styles as the `from` value. Needs user verification on real device.

### Not Started
- **Phase 5: Device Testing** — no real-device testing has been done on iOS Safari or Android Chrome
- **Sound effects** — deferred to V2
- **Lowercase letters** — V2
- **Progress persistence** — V2 (currently fresh start each session)
- **Service worker / offline PWA** — manifest exists but no SW registered
- **Custom app icons** — manifest currently points to default `vite.svg`

---

## Recent Decisions

1. **Decision:** Completion threshold set to 99% (not 70%) — **Reason:** With the large hit radius (12% of canvas) and only 8-15 dots per item, 70% was too easy. 99% ensures kids actually trace the full shape.

2. **Decision:** Stroke width increased to 45px (spray-paint feel) — **Reason:** Original 8px strokes were too thin for toddler fingers; wider strokes provide more satisfying visual feedback and are easier to see.

3. **Decision:** No routing library; hash-based nav with `useSyncExternalStore` — **Reason:** Zero dependencies. The app has only 3 "pages" and no server-side rendering. Hash state enables browser back button for free.

4. **Decision:** Normalized 0-1 coordinate system for all paths/dots — **Reason:** Scale independence. The same path data works at any canvas size without remapping.

5. **Decision:** Demo animation uses inline `strokeDasharray`/`strokeDashoffset` with CSS keyframe `to` only — **Reason:** Using `var(--path-length)` in the CSS keyframe caused a strobe effect because the CSS variable defaulted to 100 while the actual path length was ~5. Inline styles as the starting value fixed it.

6. **Decision:** F020 (Path Authoring Tool) skipped — **Reason:** Hand-crafted paths were faster for 41 items than building tooling. Trade-off accepted.

7. **Decision:** Debug overlay behind `?debug=true` URL param — **Reason:** Originally a visible toggle; hidden to prevent toddler activation. Triple-tap was spec'd but URL param was simpler.

8. **Decision:** Deployed to Vercel (static) — **Reason:** Free tier, automatic deploys from GitHub, zero config for Vite SPAs.

9. **Decision:** No state persistence in V1 — **Reason:** Simplicity. No localStorage, no cookies, no accounts. Fresh start each session is acceptable for the target age group.

10. **Decision:** Anti-scribble validation requires min 2 forward progressions within ±3 dot tolerance — **Reason:** Prevents gaming by random scrubbing while remaining forgiving enough for imprecise toddler tracing.

---

## Known Issues & Debt

- **Demo animation unverified** — F027 strobe fix was applied but never tested on a real device. Uncommitted changes exist in working tree.
- **No real-device testing** — Phase 5 was skipped. Touch coordinate alignment, canvas performance on mid-range phones, and iOS Safari quirks are untested.
- **No tests** — zero unit tests, zero integration tests, zero E2E tests.
- **No custom app icon** — PWA manifest uses default `vite.svg` placeholder.
- **No service worker** — manifest exists but app doesn't work offline.
- **Completion fires twice** — `TracingCanvas` has both an `onStrokeEnd` callback and a `useEffect` watching `isComplete`, both of which can trigger `onComplete`. The `hasCompletedRef` guard prevents double-fire, but the dual-trigger pattern is redundant.
- **No error boundaries** — app will white-screen on uncaught errors.
- **No analytics** — no way to know if the deployed app is being used.
- **Fonts not self-hosted** — Fredoka and Quicksand are referenced in CSS theme but not imported; they rely on system fallback or external CDN if configured elsewhere.

---

## What's Next

1. **Verify demo animation** — test F027 on a real phone, confirm strobe fix works, then commit.
2. **Phase 5: Device Testing** — test on iOS Safari (iPhone 14, iPhone SE), Android Chrome (Pixel 7). Verify touch coordinates, canvas performance, orientation gate.
3. **Lighthouse audit** — run mobile Lighthouse on the Vercel deployment, target score ≥90.
4. **Custom app icon** — replace `vite.svg` in manifest with a real princess-themed icon.
5. **Font loading** — add Google Fonts import or self-host Fredoka + Quicksand.
6. **Sound effects** — V2 feature; Web Audio API for completion sounds.
7. **Service worker** — add offline support via Vite PWA plugin or manual SW.

---

## Cross-Surface Notes

- **Spec planned audio for V2** — this was a deliberate deferral during planning. Gemini's multi-model review pushed for MVP audio, but the decision was to skip it to avoid scope creep. Still V2.
- **Path Authoring Tool (F020) was in the roadmap but skipped** — hand-crafting was faster. If paths need editing in the future, this tooling gap will hurt.
- **Completion threshold diverged from spec** — SPEC.md says 70%, codebase uses 99%. The change happened during UX polish (Phase 3) after testing showed 70% was trivially easy.
- **Stroke width diverged from spec** — SPEC.md says 8-12px, codebase uses 45px. Changed during UX polish for better toddler experience.
- **File structure diverged from spec** — spec recommended `src/app/App.tsx` and `src/styles/index.css`; actual structure puts `App.tsx` at `src/App.tsx` and CSS at `src/index.css`. Functionally equivalent, just flatter.
- **Git history has early false starts** — commits before `3cf87ae` (chore: restart project from scratch) are from a prior attempt. The current codebase starts from `05ce90d` (Phase 0).
