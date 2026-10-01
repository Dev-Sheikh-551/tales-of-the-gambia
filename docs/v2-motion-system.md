# Tales of The Gambia V2 — Motion & Animation Design System

## 1. Creative Direction & Philosophy

Motion in **Tales of The Gambia V2** serves one fundamental purpose: **to heighten immersion in traditional West African oral storytelling**.

We do **not** aim for a sterile, corporate SaaS interface with sparse 150ms opacity fades. Nor do we seek a noisy, hyperactive mobile game UI cluttered with flashing badges.

Instead, motion in Tales of The Gambia is:
* **Cinematic:** Evoking the pacing of an illuminated storybook, with sweeping horizon reveals and majestic camera glides.
* **Culturally Warm:** Echoing the organic rhythms of the kora, the Harmattan wind, and the crackle of communal village fires.
* **Expressive & Organic:** Rewarding curiosity with delightful character reveals and fluid layout continuity.
* **Story-Driven:** Every animation anchors the reader’s focus on the narrative rather than drawing attention to itself.
* **Intentional & Stable:** Characters are composed cultural illustrations. They **never** continuously pulse, breathe, bounce, float, or shake like video game sprites.

---

## 2. Technology Allocation Matrix

To balance high visual fidelity with 60fps performance on mobile devices, animations are distributed across four specialized technologies:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Animation Technology Matrix                     │
├─────────────────────┬──────────────────────────────────────────────────┤
│ Technology          │ Dedicated Responsibility                         │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Framer Motion       │ • Scene entrances and layout transitions         │
│                     │ • Ken Burns camera pans and zoom adjustments     │
│                     │ • Floating caption reveal/dismissal              │
│                     │ • Reader settings drawer and modals              │
│                     │ • Touch gesture tracking and scrubbing           │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Lottie / dotLottie  │ • Expressive storytelling moments (e.g. rain)    │
│                     │ • Cultural vignettes (Griot playing Kora)        │
│                     │ • Onboarding and reading completion celebrations │
│                     │ • High-charm loading and audio buffering states  │
│                     │ • Empty states and bookmark feedback             │
├─────────────────────┼──────────────────────────────────────────────────┤
│ Hardware CSS        │ • Lightweight atmospheric streaks (Harmattan wind│
│                     │ • Distant night stars twinkling                  │
│                     │ • Savanna heat shimmer and river water ripples   │
│                     │ • Ambient gradient shifts and golden glow auras  │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 2D Canvas / WebGL   │ • Reserved solely for dense particle systems if  │
│ (Restricted)        │   demanded by future high-end cinematic scenes   │
└─────────────────────┴──────────────────────────────────────────────────┘
```

---

## 3. Lottie & dotLottie Sourcing & Asset Governance

When sourcing or authoring Lottie animations for V2, the following rules are mandatory:

1. **Format:** Prefer `.lottie` (dotLottie) over raw `.json`. dotLottie uses deflate compression, reducing asset payloads by 60%–80% and bundling images/fonts internally.
2. **Offline First:** **Never load Lottie files from external CDNs or remote URLs**. All animation files must reside in `public/animations/` so they are fully packaged offline.
3. **Licensing & Attribution:**
   - Verify that all sourced assets are legally cleared for commercial and educational distribution (e.g. LottieFiles Simple License, Creative Commons with attribution, or bespoke studio creations).
   - Maintain a dedicated registry in `docs/animation-licenses.md` detailing the title, creator, source URL, license type, and modifications for every asset.
4. **Bundle Budgets:**
   - Micro-interaction Lottie: `< 25 KB`
   - Decorative storytelling Lottie: `< 150 KB`
   - Full-scene celebratory vignette: `< 350 KB`
5. **Clean Vector Structure:**
   - Avoid raster images embedded inside Lottie JSON files.
   - Restrict layer counts to `< 30` per animation to prevent GPU draw call saturation on budget Android devices.

---

## 4. Motion Design Tokens & Semantic Levels

Animations in V2 are parameterized using central design tokens (`lib/motion/tokens.ts`):

### 4.1 Durations
* **Instant (`0.1s`):** Immediate state acknowledgments (bookmark toggle, mute button).
* **Fast (`0.2s`):** Secondary controls, tooltips, playback rate pills.
* **Normal (`0.35s`):** Caption reveals, reader settings modal, drawer slide.
* **Smooth (`0.5s`):** Page transitions, character entrances on scene change.
* **Cinematic (`0.8s`):** Dramatic camera adjustments, theme shifts.
* **Panoramic (`1.5s`):** Ambient Ken Burns horizon drifts.
* **Ambient (`3.5s+`):** Environmental cycles (night stars, harmattan breeze).

### 4.2 Calibrated Easings
```ts
export const MOTION_EASINGS = {
  standard:  [0.20, 0.00, 0.00, 1.00], // Snappy UI actions
  enter:     [0.00, 0.00, 0.20, 1.00], // Smooth arrivals
  exit:      [0.40, 0.00, 1.00, 1.00], // Quick dismissals
  organic:   [0.25, 0.10, 0.25, 1.00], // Natural character entrances
  cinematic: [0.16, 1.00, 0.30, 1.00], // Majestic, high-inertia camera moves
};
```

---

## 5. Performance Baseline & Device Adaptation Rules

V2 must maintain fluid 60fps rendering across the full spectrum of mobile devices in the Senegambian and global markets.

### 5.1 Device Tiers
* **Tier 1 (Flagship iOS & Android):** Full blur (`backdrop-blur-md`), dynamic camera motion, atmospheric particle systems, and concurrent vector animations.
* **Tier 2 (Mid-range mobile):** Reduced particle count, simplified opacity fallbacks, Lottie animations restricted to 1 active instance at a time.
* **Tier 3 (Budget / Entry-level Android):**
  - Disable heavy CSS filters (`blur()`, `mix-blend-mode`). Replace translucent blur panels with solid high-opacity backgrounds (`bg-black/95`).
  - Restrict animations strictly to hardware-accelerated properties: `transform` (3D translated) and `opacity`.
  - Disable ambient infinite loops (wind, ripples) while narration is playing to maximize CPU availability for audio decoding.

### 5.2 Performance Rules of Law
1. **Never animate layout triggers:** Do not animate `width`, `height`, `margin`, `padding`, `top`, or `bottom`. Use `transform: translate3d()` and `scale()`.
2. **`will-change` hygiene:** Apply `will-change: transform` only during active camera or scene transitions; do not leave permanent `will-change` on every element.
3. **Lazy-load non-critical animations:** Dynamic components (`React.lazy` or `next/dynamic`) must load Lottie players only when the component mounts in viewport.
4. **Pause when hidden:** All animation loops must pause when the viewport is out of view, when the modal is closed, or when the story is paused.

---

## 6. Accessibility & Reduced Motion

Tales of The Gambia is strictly compliant with the **WCAG 2.1 Level AAA** standard for motion.

When `prefers-reduced-motion: reduce` is detected (via `lib/motion/reducedMotion.ts`):
* **Characters:** Appear instantly (`opacity: 1`, zero translation, zero scale).
* **Camera:** Stays strictly stationary (`preset === "still"`).
* **Atmosphere:** Disables wind streaks, river ripples, and particle pinging.
* **Scene Transitions:** Replaces spatial sliding with an instant or gentle crossfade (`0.15s`).
* **Usability:** Highlighting, playback controls, text selection, and audio cues remain 100% operational.
