# Princess Paws Tracing — Implementation Roadmap

**Quality Bar:** Polished
**Execution Mode:** SEQUENTIAL (single domain, no parallelization needed)
**Estimated Phases:** 6
**Total Features:** 23
**Validated By:** Claude, Codex, Gemini, Cursor-Agent (2026-02-01)

---

## Phase 0: Foundation
*Goal: Project scaffolding and core infrastructure*

### Features

| ID | Feature | Description | Est. Effort |
|----|---------|-------------|-------------|
| F001 | Project Setup | Vite + React 19 + TypeScript + Tailwind 4 scaffold | Small |
| F002 | Type Definitions | TracingItem, Point, AppState interfaces in `/types` | Small |
| F003 | App Shell | Basic App.tsx with navigation state + `popstate` handler | Small |
| F004 | Tailwind Config | Pastel color palette, Fredoka font, custom animations | Small |
| F018 | Button Components | Large touch-friendly Button + IconButton (≥48px targets) | Small |
| F019 | OrientationGate | Portrait lock with "Please rotate" message in landscape | Small |

### Exit Criteria
- [ ] `npm run dev` works
- [ ] TypeScript compiles without errors
- [ ] Tailwind styles apply correctly
- [ ] Can navigate between placeholder pages
- [ ] Browser back button returns to home (popstate handler)
- [ ] Landscape shows orientation message

### Technical Notes
- Use `create-vite` with React-TS template
- Add Tailwind via official Vite integration
- Self-host Fredoka font (no Google Fonts dependency)
- OrientationGate wraps entire app, uses CSS media query detection

---

## Phase 1: Core Tracing (Technical Risk Mitigation)
*Goal: Prove the tracing mechanic works before building anything else*

### Features

| ID | Feature | Description | Est. Effort |
|----|---------|-------------|-------------|
| F005 | DrawingLayer | Canvas component with pointer event handling | Medium |
| F006 | GhostLetter | SVG component rendering faded path | Small |
| F007 | GuideDots | SVG component rendering ordered dots | Small |
| F008 | TracingCanvas | Composition of three layers with coordinate alignment | Medium |
| F009 | Completion Detection | Hit testing algorithm with scribble prevention | Medium |
| F010 | Debug Overlay | Dev-only view showing hit radii and completion % | Small |

### Exit Criteria
- [ ] Can draw smooth lines on canvas
- [ ] Ghost letter + dots display correctly
- [ ] Completion triggers at 70% coverage
- [ ] Scribble detection prevents gaming
- [ ] Touch hardening works on iOS Safari
- [ ] Multi-stroke supported (lifting finger continues trace)

### Technical Notes
- **Test with ONE letter first** (letter "A" or "O")
- Validate on real iPhone/iPad before proceeding
- Debug overlay is essential — build it early
- This phase is the highest risk; expect iteration
- **Mid-phase checkpoint:** Test F005 on iOS Safari before F008 integration
- Define pointer capture behavior: cancel on `pointerleave` vs continue
- Handle `devicePixelRatio` in coordinate mapping

### Acceptance Test
```
Given: Letter "A" displayed with ghost + dots
When: User traces roughly following the shape
Then: Completion triggers when 70% of dots are hit
And: Scrubbing back-and-forth does NOT trigger completion
```

---

## Phase 2: Navigation & State
*Goal: Full app flow with placeholder content*

### Features

| ID | Feature | Description | Est. Effort |
|----|---------|-------------|-------------|
| F011 | HomePage | Category selection (Letters, Numbers, Shapes buttons) | Small |
| F012 | TracingPage | Full tracing view with nav controls | Medium |
| F013 | Navigation Controls | Prev/Next/Clear buttons, home button | Small |
| F014 | Category Complete | Celebration screen shown after last item | Small |

### Exit Criteria
- [ ] Can select category from home
- [ ] Can navigate forward/back through items
- [ ] Clear button resets current trace
- [ ] Category complete shows after final item
- [ ] Back button returns to home

### Technical Notes
- Use React Context for navigation state
- No react-router — purely in-memory
- Stub content: just letters A, B, C for testing flow

---

## Phase 3: Visual Polish
*Goal: Princess & Puppies aesthetic, celebrations*

### Features

| ID | Feature | Description | Est. Effort |
|----|---------|-------------|-------------|
| F015 | Fireworks | Custom canvas particle burst on completion | Medium |
| F016 | FloatingDecor | Ambient sparkles, paw prints, crowns (custom SVG assets) | Medium |
| F017 | CuteBackground | Pastel gradients per page | Small |

*Note: F018 (Button Styling) moved to Phase 0 after validation review*

### Exit Criteria
- [ ] Fireworks play on completion
- [ ] Floating decorations animate smoothly
- [ ] Backgrounds feel "princess-y"
- [ ] Buttons are ≥48px touch targets
- [ ] No jank on mid-range Android

### Technical Notes
- Fireworks: ≤50 particles, 2s duration
- Use CSS transforms only (GPU accelerated)
- Pause floating decor during active tracing
- Test on older devices for performance

---

## Phase 4: Content Creation
*Goal: All 41 tracing items with SVG paths and guide dots*

### Features

| ID | Feature | Description | Est. Effort |
|----|---------|-------------|-------------|
| F020 | Path Authoring Tool | Script/page to preview paths and auto-generate dots | Medium |
| F021 | Letters A-Z | 26 uppercase letter paths with guide dots | Large |
| F022 | Numbers 0-9 | 10 digit paths with guide dots | Medium |
| F023 | Shapes | 5 shape paths (circle, square, triangle, star, heart) | Small |

### Content Inventory

| Category | Items | Count |
|----------|-------|-------|
| Letters | A-Z uppercase | 26 |
| Numbers | 0-9 | 10 |
| Shapes | Circle, Square, Triangle, Star, Heart | 5 |
| **Total** | | **41** |

### Approach
1. **Build F020 first** — Path preview tool with dot generation
2. Generate guide dots from paths using `getPointAtLength()`
3. Store in `/data/letters.ts`, `/data/numbers.ts`, `/data/shapes.ts`
4. Validate all paths render correctly in debug overlay

### Exit Criteria
- [ ] Path authoring tool works and speeds up creation
- [x] All 41 items have SVG paths
- [x] All items have 8-15 guide dots each (auto-generated)
- [x] Validation confirms all items load and display correctly
- [x] Difficulty levels assigned (simple = fewer dots)

### Technical Notes
- **Realistic estimate: 8-12 hours total** (with tooling)
- Consider batching: do letters first, then numbers, then shapes
- Normalized coordinates (0-1 range)
- Test each category on device before moving on
- F020 pays for itself by letter "E"

---

## Phase 5: Device Testing & Bug Fixes
*Goal: Works flawlessly on target devices*

### Test Matrix

| Device | Browser | Priority |
|--------|---------|----------|
| iPhone 14 | Safari | P0 |
| iPhone SE | Safari | P0 |
| iPad | Safari | P1 |
| Pixel 7 | Chrome | P0 |
| Galaxy A53 | Chrome | P1 |
| Desktop | Chrome | P2 |

### Focus Areas
- Touch event handling on iOS Safari
- Coordinate alignment at different screen sizes
- Performance on mid-range Android
- Portrait orientation lock
- Swipe-back gesture prevention

### Exit Criteria
- [ ] All P0 devices tested and working
- [ ] No touch event bugs
- [ ] Performance acceptable (no visible jank)
- [ ] Orientation message shows in landscape

---

## Phase 6: Deployment
*Goal: Live on Vercel, shareable URL*

### Tasks
1. Configure Vercel project
2. Set up GitHub Actions for CI (optional)
3. Configure PWA manifest (portrait, theme color)
4. Test production build
5. Deploy and verify

### Exit Criteria
- [ ] App live at `princess-paws.vercel.app` (or similar)
- [ ] Basic browser caching works (not full PWA — that's V2)
- [ ] Lighthouse score ≥90 on mobile
- [ ] Bundle size < 250KB gzipped

### PWA Scope Clarification
- **V1:** Basic caching via Vercel CDN + browser cache headers
- **V2:** Full PWA with `vite-plugin-pwa` and service worker

---

## V2 Parking Lot

Items deferred from V1 for future consideration:

| Feature | Reason Deferred |
|---------|-----------------|
| Sound Effects | Avoid scope creep; add Web Speech API later |
| Lowercase Letters | Double the content work |
| Custom Words | Requires dynamic path generation |
| Progress Tracking | Needs localStorage, parent UI |
| Themes | Requires asset variants |
| Full PWA | Service worker complexity |
| Stroke Directionality | Pedagogical nice-to-have |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Touch handling on iOS Safari | High | Phase 1 focuses on this; test early and often |
| SVG path creation takes longer than expected | Medium | Start with 5 items, validate workflow before committing |
| Completion detection feels unfair/frustrating | High | Debug overlay + real toddler testing |
| Performance on old Android | Medium | Custom lightweight effects, no heavy libs |
| Coordinate alignment between SVG/Canvas | Medium | Use normalized coordinates from day 1 |

---

## Session Guidance

### Recommended Session Boundaries

| Session | Phases | Focus |
|---------|--------|-------|
| Session 1 | 0 | Project setup, all scaffolding |
| Session 2 | 1 (F005-F007) | Drawing layer + ghost + dots |
| Session 3 | 1 (F008-F010) | Integration + completion detection |
| Session 4 | 2 | Navigation + full app flow |
| Session 5 | 3 | Visual polish + celebrations |
| Session 6+ | 4 | Content creation (can be multiple) |
| Final | 5-6 | Testing + deployment |

### When to Test on Device
- After F005 (DrawingLayer) — verify touch input works
- After F008 (TracingCanvas) — verify coordinate alignment
- After F009 (Completion) — verify detection feels right
- After each category of content — verify paths render

---

*Roadmap version: 1.0 | Created: 2026-02-01*
*Based on: SPEC.md, CONSOLIDATED_FEEDBACK.md*
