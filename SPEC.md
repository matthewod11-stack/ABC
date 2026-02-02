# Princess Paws Tracing - Product Specification

## Overview

**Princess Paws Tracing** is a mobile-first educational web app designed for toddlers (ages 2-4) to practice letter, number, and shape tracing. The app combines a princess/puppy aesthetic with simple, rewarding interactions to help young children develop pre-writing motor skills.

---

## Purpose & Goals

### Educational Goals
- **Fine Motor Development**: Build hand-eye coordination through guided tracing
- **Letter Recognition**: Familiarize children with uppercase alphabet shapes
- **Number Recognition**: Introduce digits 0-9 through tactile practice
- **Shape Awareness**: Teach basic geometric shapes (circle, square, triangle, star, heart)

### User Experience Goals
- **Toddler-Friendly**: Large touch targets, forgiving input detection, no frustrating precision requirements
- **Positive Reinforcement**: Celebrate every completion with confetti, sounds, and animations
- **Parent-Friendly**: No ads, no in-app purchases, no external links, works offline

---

## Target Users

| User | Age | Needs |
|------|-----|-------|
| Primary | 2-4 years | Large buttons, immediate feedback, bright colors, fun animations |
| Secondary | Parents | Safe content, no distractions, easy to hand over device |

---

## Core Features

### 1. Tracing Canvas

#### Visual Layers (Bottom to Top)
1. **Ghost Letter (SVG)**: Faded/filled shape as background reference
2. **Guide Dots (SVG)**: Prominent dots overlaid showing the tracing path
3. **Drawing Layer (Canvas)**: User strokes rendered in real-time

#### Coordinate System
- All paths and dots use **normalized coordinates** (0-1 range)
- ViewBox equivalent: 0 0 100 100 (scaled to fit canvas)
- Both SVG and Canvas layers transform to the same coordinate space
- Guide dots: 8-15 per item, evenly distributed along stroke path

#### Touch/Pointer Input
- Use **Pointer Events** (not raw touch events) for cross-platform support
- Sample points at 12-16ms intervals during active stroke
- **Multi-stroke support**: Lifting finger continues the trace (doesn't reset)
- **Smooth colored line** rendering (pink/purple crayon-style, 8-12px width)

#### Completion Detection Algorithm
- **Hit radius**: 15-20px around each guide dot (or ~15% of normalized unit)
- **Coverage calculation**: (dots with ≥1 stroke point within radius) / total dots
- **Threshold**: 70% coverage = complete (not 70-80% range, single threshold)
- **Detection timing**: Check on `pointerup` (not continuously during stroke)
- **Scribble prevention**: Minimum of 3 dots must be hit in approximate forward sequence
  - "Forward" = within ±3 dots of expected next dot
  - Prevents scrubbing back-and-forth to game the system

#### Touch Event Hardening
- CSS: `touch-action: none; user-select: none;` on canvas container
- Prevent iOS "swipe back" gesture via `overscroll-behavior: contain`
- Single-touch only: ignore additional touch points (multi-touch rejected)
- Palm rejection: ignore touch points with large contact radius (>50px)
- Disable context menu (long press)
- Prevent pinch-zoom on the canvas area

### 2. Content Categories
- **Letters**: A-Z uppercase (26 items)
- **Numbers**: 0-9 (10 items)
- **Shapes**: Circle, Square, Triangle, Star, Heart (5 items)

### 3. Progression
- Sequential navigation (Next/Previous buttons)
- No "wrong" answers - all attempts are celebrated
- Clear button to retry current item
- **Category Complete Screen**: After finishing all items in a category, show celebration then return to home

### 4. Celebration System
- **Fireworks burst animation** on completion (burst from center of screen)
- (Future) Sound effects for positive reinforcement
- Floating decorative elements (stars, hearts, paw prints)

### 5. Visual Design
- **Theme**: Princess & Puppies
- **Color Palette**: Soft pinks, lavenders, and pastels
- **Typography**: Rounded, friendly fonts (Fredoka, Quicksand)
- **Decorations**: Floating animated elements (crowns, paw prints, sparkles)

---

## Technical Requirements

### Platform
- **Primary**: Mobile web (iOS Safari, Android Chrome)
- **Secondary**: Desktop browsers (for parent preview)
- **Minimum**: Touch-enabled device with 320px+ width
- **Orientation**: Portrait-only (locked via CSS/manifest)
  - Landscape shows "Please rotate your device" message

### Technology Stack
| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Language | TypeScript |
| Hosting | Vercel (static) |

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Bundle Size: < 250KB gzipped (use lightweight custom effects, not heavy libs)
- Works offline after first load (PWA-ready)

### State Persistence
- **No persistence for V1**: Fresh start each session
- Progress within session only (React state, no localStorage)
- No routing library: in-memory navigation only
- Browser back button returns to home screen

---

## Screen Flow

```
┌─────────────────┐
│   Home Screen   │
│  [Letters]      │
│  [Numbers]      │
│  [Shapes]       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Tracing View   │
│  ┌───────────┐  │
│  │  Dotted   │  │
│  │  Letter   │  │
│  │    A      │  │
│  └───────────┘  │
│  [←] [Clear] [→]│
└─────────────────┘
         │
         ▼ (on completion)
┌─────────────────┐
│   🎉 Confetti   │
│   Great Job!    │
│   [Next →]      │
└─────────────────┘
```

---

## UI Components

### TracingCanvas
Composed of three sub-components (see "Tracing Canvas" section for details):
- **GhostLetter**: SVG layer with faded filled shape
- **GuideDots**: SVG layer with interactive guide dots
- **DrawingLayer**: HTML Canvas for user strokes

State: owns stroke points array, completion percentage, isComplete flag

### Navigation
- Large arrow buttons (min 48x48px touch target)
- Category tabs or home button
- Clear/Redo button

### CuteDecor
- Floating animated decorations
- Non-interactive eye candy
- CSS animations (float, sparkle, bounce)

### Fireworks/Confetti
- **Lightweight custom implementation** (no heavy dependencies)
- Canvas-based particle system with ≤50 particles
- Burst animation from center of screen
- Duration: 2 seconds, then auto-dismiss
- GPU-accelerated via CSS transforms only

---

## Data Model

```typescript
interface TracingItem {
  id: string;
  category: 'letter' | 'number' | 'shape';
  label: string;           // Display name ("A", "1", "Circle")
  path: string;            // SVG path data for the ghost outline
  guideDots: Point[];      // Ordered points for tracing guidance (8-15 per item)
  difficulty: 1 | 2 | 3;   // Complexity level (affects dot count)
}

interface Point {
  x: number;  // Normalized 0-1 range
  y: number;  // Normalized 0-1 range
}

interface AppState {
  currentCategory: 'letter' | 'number' | 'shape' | null;
  currentIndex: number;
  isComplete: boolean;  // Current item completed
}
```

---

## Future Enhancements (V2+)

1. **Sound Effects**: Positive audio feedback on completion
2. **Lowercase Letters**: Expand alphabet content
3. **Custom Words**: Trace child's name
4. **Progress Tracking**: Stars/stickers for parents to review
5. **Themes**: Switch between Princess, Dinosaur, Space, etc.
6. **Offline PWA**: Full offline support with service worker

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Load time | < 2 seconds |
| Session length | 3-5 minutes (toddler attention span) |
| Items traced per session | 5-10 |
| Parent satisfaction | "I can hand this to my kid safely" |

---

## Design Principles

1. **Forgiveness over Precision**: Accept imperfect traces, celebrate effort
2. **Delight over Instruction**: Fun animations > tutorial text
3. **Safety over Features**: No external links, no accounts, no data collection
4. **Mobile-First**: Designed for small fingers on touchscreens

---

## Implementation Decisions (from Interview)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Completion Detection | Percentage Coverage (70-80%) | Forgiving, doesn't require stroke order |
| SVG Paths | Hand-crafted | Full control over aesthetics, no font dependency |
| Category End State | Celebration → Home | Clear completion signal, easy restart |
| Parent Controls | None | Maximum simplicity, no accidental menu access |
| Outline Style | Ghost Letter + Dots | Visual reference + clear tracing guidance |
| Drawing Style | Smooth Colored Line | Crayon-like feel, satisfying to draw |
| Celebration Style | Fireworks Burst | Dramatic, engaging for toddlers |
| Deployment | Vercel Static | Free, automatic deploys, great DX |
| Quality Bar | Polished | Smooth UX, good animations, feels complete |
| Persistence | None (V1) | Fresh start each session, simpler implementation |
| Orientation | Portrait-only | Most natural for phone handoff to toddler |
| Audio | V2 | Defer to avoid scope creep; add Web Speech API later |

---

## Recommended File Structure

```
src/
├── app/
│   ├── App.tsx                    # Root component, state management
│   └── main.tsx                   # Entry point
│
├── pages/
│   ├── HomePage.tsx               # Category selection
│   ├── TracingPage.tsx            # Main tracing experience
│   └── CategoryCompletePage.tsx   # Celebration screen
│
├── features/
│   └── tracing/
│       ├── components/
│       │   ├── TracingCanvas.tsx      # Composition of three layers
│       │   ├── GhostLetter.tsx        # SVG faded background
│       │   ├── GuideDots.tsx          # SVG interactive dots
│       │   └── DrawingLayer.tsx       # Canvas for user strokes
│       ├── hooks/
│       │   ├── usePointerInput.ts     # Pointer event handling
│       │   └── useCompletionDetection.ts
│       └── utils/
│           └── completionDetection.ts # Pure hit-testing functions
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx             # Large touch-friendly button
│   │   └── IconButton.tsx         # Nav arrows
│   └── decorative/
│       ├── Fireworks.tsx          # Celebration animation
│       ├── FloatingDecor.tsx      # Ambient sparkles
│       └── CuteBackground.tsx     # Pastel gradients
│
├── data/
│   ├── letters.ts                 # A-Z TracingItem definitions
│   ├── numbers.ts                 # 0-9 TracingItem definitions
│   ├── shapes.ts                  # Shape TracingItem definitions
│   └── index.ts                   # Combined exports + lookup
│
├── hooks/
│   └── useNavigation.ts           # In-memory navigation state
│
├── styles/
│   └── index.css                  # Tailwind + custom animations
│
└── types/
    └── index.ts                   # Shared types
```

---

## Developer Tools (Debug Mode)

For development and tuning the completion algorithm:

- **Debug Overlay**: Toggle-able view showing:
  - Guide dot positions with hit radius circles
  - Stroke points as they're captured
  - Completion percentage in real-time
  - Dots marked as "hit" highlighted
- **Activation**: Triple-tap in corner (not discoverable by toddler)
- **Purpose**: Essential for tuning hit detection on real devices
