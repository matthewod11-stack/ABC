# CLAUDE.md — Princess Paws Tracing

## Project Context

This is a mobile-first educational tracing app for toddlers (ages 2-4). The app runs entirely client-side (React 19 + Vite 6 + Tailwind 4) and is deployed as a static SPA on Vercel. There is no backend, no database, no auth.

## Key Commands

```bash
npm run dev      # Start dev server
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture Quick Reference

- **Navigation:** Hash-based via `useSyncExternalStore` in `src/hooks/useNavigation.ts` — no routing library
- **State:** React-only, no persistence, no external state library
- **Coordinates:** All SVG paths and guide dots use normalized 0-1 range
- **Tracing canvas:** 5-layer composition in `src/features/tracing/components/TracingCanvas.tsx`
- **Content:** 41 hand-crafted items in `src/data/` (letters.ts, numbers.ts, shapes.ts)
- **Debug mode:** Append `?debug=true` to URL

## PROJECT_STATE.md Maintenance

A PROJECT_STATE.md file exists at the project root. It serves as a cross-surface context sync document shared across Claude Chat, Claude Code (multiple machines), and Cowork.

Rules:
- Update PROJECT_STATE.md at the end of any session where meaningful changes were made
- Keep it under 300 lines — replace stale content, don't append indefinitely
- The "Recent Decisions" section should retain only the last 10 decisions; older ones can be archived or dropped
- The "Current State" section must reflect what actually exists in the codebase, not what was planned
- The "Cross-Surface Notes" section should flag any divergences from plans discussed outside this codebase
- When I say "update project state" or "sync state," regenerate PROJECT_STATE.md by scanning the current codebase
- Treat this file as the single source of truth about the project for external Claude sessions
