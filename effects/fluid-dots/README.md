# Fluid Dots

Interactive particle grid with water-like physics, GPU-accelerated rendering, and cursor-reactive behavior.

## Features

- **Dual-layer parallax** — front (70×70) and back (40×40) dot grids at different speeds and opacities for perceived depth
- **Fluid simulation** — CPU-driven curl-noise flow fields with spring-damper physics per dot
- **Cursor-reveal masking** — dots are invisible by default and bloom into view around the cursor
- **Velocity-scaled wake** — fast cursor movement creates wider, stronger displacement; slow hover is gentle
- **Scroll-reactive flow** — page scrolling creates a vertical current through the field
- **Color temperature shift** — dots near the cursor tint cooler (blue shift)
- **Organic sizing** — moving dots swell slightly; resting dots stay baseline
- **Cursor brightness** — dots directly under the cursor flare brighter

## Dependencies

```
react >= 18
three >= 0.160
@react-three/fiber >= 8
@react-three/drei >= 9
next-themes (optional — falls back to dark theme if not installed)
```

## Usage

```tsx
import { FluidDotsBackground } from './fluid-dots'

export default function Hero() {
  return (
    <section className="relative h-screen">
      <FluidDotsBackground />
      <div className="relative z-10">
        {/* your content */}
      </div>
    </section>
  )
}
```

### Custom themes

```tsx
<FluidDotsBackground
  themes={{
    dark:  { dotColor: '#00FF88', bgColor: '#0A0A0A', dotOpacity: 0.04 },
    light: { dotColor: '#1A1A2E', bgColor: '#FAFAFA', dotOpacity: 0.30 },
  }}
/>
```

## Configuration

All tuning constants live at the top of `fluid-dots.tsx`:

| Constant | Default | Description |
|---|---|---|
| `DOT_GRID_SIZE` | 70 | Front layer grid density |
| `DOT_GRID_SIZE_BACK` | 40 | Back layer grid density |
| `DOT_ROTATION` | 0 | Grid rotation angle (radians) |

Physics constants are inside the `useFrame` loop — search for `pushForce`, `springK`, `flowFollow`, `gridRadius`, `hoverSwirlStrength`, and `dampFactor`.

## How it works

Each frame, a JavaScript loop runs spring-damper physics for every dot in both layers:

1. **Ambient flow** — curl-noise velocity field sampled at each dot's current position gives continuous, non-oscillatory motion
2. **Wind stream** — a second, slower traveling wave adds subtle resting movement
3. **Cursor interaction** — radial repulsion + tangential swirl with time-evolving rotation creates fluid parting
4. **Scroll bias** — window scroll velocity feeds into vertical flow
5. **Spring return** — dots are pulled back to their home positions
6. **Velocity damping** — exponential decay prevents runaway energy

The per-dot state (displacement, influence, speed) is packed into a `Float32Array` and uploaded as a `DataTexture` each frame. The fragment shader reads this texture in a 3×3 neighbor search to render displaced, organically-sized dots with cursor-proximity reveal and color tinting.

## License

MIT — use it, sell it, ship it.
