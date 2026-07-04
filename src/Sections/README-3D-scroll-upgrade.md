# What changed

**New files** (drop into your project as-is):
- `src/components/ScrollReveal.tsx` — wraps any section, fades/slides it in the first time it scrolls into view. Respects `prefers-reduced-motion`.
- `src/components/FloatingShapes.tsx` — a fixed, full-page 3D background (torus knot, icosahedrons, a distorted sphere) that drifts and rotates as you scroll. Sits behind your content (`z-index: -1`), so it only shows in the transparent gaps between sections — that's intentional, it reads as ambient depth rather than clutter.

**Replaced files:**
- `src/Sections/Projects.tsx` — was just a heading. Now has real project cards with 3D tilt-on-hover (mouse-driven rotateX/rotateY, same technique your Experience.tsx already used), staggered scroll-reveal, and I finished the cursor-spotlight effect you'd started wiring up (the `--mx`/`--my` custom properties were being set but nothing used them — now there's a soft purple glow that follows your cursor across the panel).
- `src/Sections/Contact.tsx` — was just a heading with no way to actually contact you. Now has email/LinkedIn/GitHub links styled as glass pills with a hover lift.
- `src/App.tsx` — imports and renders `Contact` (it existed but was never mounted), wraps each section in `<ScrollReveal>`, and mounts `<FloatingShapes />`.
- `src/App.css` — appended styles for `.canvas-bg`, the `.project_spotlight` glow, and a reduced-motion fallback. Nothing existing was removed, just added to the bottom.

## Before you drop these in — two TODOs

1. **Projects.tsx**: the `projects` array at the top is placeholder data. Swap in your real project titles, descriptions, tech stacks, and links.
2. **Contact.tsx**: swap `CONTACT_EMAIL` and the LinkedIn/GitHub URLs for your real ones.

## Install what's needed

```bash
npm install framer-motion @react-three/fiber @react-three/drei three
```

You likely already have `@react-three/fiber`, `@react-three/drei`, and `three` since your `Hero.tsx` + `LoadingModel.tsx` setup implies you're already loading a 3D model there — if `npm install` says they're already present, that's expected. `framer-motion` is the one new dependency this adds.

## Where things go

```
src/
  App.tsx              ← replace
  App.css              ← replace
  components/
    ScrollReveal.tsx    ← new
    FloatingShapes.tsx  ← new
  Sections/
    Projects.tsx        ← replace
    Contact.tsx          ← replace
```

## Notes

- The 3D background is deliberately restrained — one signature effect (the floating shapes) rather than piling on multiple. Sections keep their own solid backgrounds where they had one (like the black Projects panel), so the 3D layer doesn't fight your existing dark-mode/glass aesthetic, just adds depth behind it.
- If the 3D layer feels like too much on lower-end devices, the easiest dial to turn down is `dpr={[1, 1.5]}` in `FloatingShapes.tsx` → change to a flat `dpr={1}`.
- Everything uses your existing color palette (`#a855f7`, `#3b82f6`, `#ec4899`, `#dda991`) so it matches the gradients already in `About.tsx` and the dots in `Experience.tsx`.
