# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

An unofficial, single-page study of Wes Ball's **Maze Runner** film trilogy, plus a design sketch for the survival game the films imply. It is *not* a game. Two interactive pieces: a seeded Three.js maze preview and the WCKD redaction bars.

The project began life as an unrelated original GDD called "The Labyrinth" (Kira Vance, Haven, 2157). That fiction is gone — do not reintroduce it. There is no source-code section; the Unity C# listings were removed on request, along with `react-syntax-highlighter`.

## Commands

```sh
npm run dev        # dev server on port 8080 (not 5173)
npm run build      # production build — base path /Labyrinth/
npm run build:dev  # build with development mode sourcemaps, base path /
npm run lint       # eslint over the repo
npm run preview    # serve the built dist/ (from /Labyrinth/, not /)
```

No test suite, no typecheck script. `npx tsc -b` works if you need type errors. `.github/workflows/ci.yml` runs lint, typecheck and build on every push, so **lint must stay at zero errors** — warnings are fine.

## Deployment

GitHub Pages, from `.github/workflows/pages.yml` on every push to `main`. The repo is served from `/Labyrinth/`, so:

- `vite.config.ts` sets `base` when `mode === "production"`. It is keyed on **`mode`, not `command`** — `vite preview` reports command `"serve"`, so a command check would serve the production bundle from `/` while its HTML asks for `/Labyrinth/`, and every asset would fall through to the SPA fallback.
- `BrowserRouter` takes `basename={import.meta.env.BASE_URL}`.
- The workflow copies `dist/index.html` to `dist/404.html`; Pages has no rewrite rules, so that is the SPA fallback.
- Open Graph tags in `index.html` need **absolute** URLs — crawlers don't resolve relative paths. If the repo is renamed, `BASE`, the OG URLs and the README link all move together.

## Architecture

**Content lives in `src/data/mazeRunnerContent.ts`, not in components.** Films, characters, Griever design, WCKD files, the glossary, art direction, game design. Section components import and render; they hold no prose. To change what the page *says*, edit this file.

**Subject photographs are drop-in, and licensed.** `src/lib/portraits.ts` globs `src/assets/subjects/*.{jpg,jpeg,png,webp,avif}` at build time and matches each file to a character by slugified name (`teresa-agnes.jpg`). Fifteen of twenty are present: freely-licensed *actor* portraits from Wikimedia Commons, not film stills — stills are copyrighted and cannot be redistributed. Blake Cooper, Dexter Darden, Alexander Flores, Chris Sheffield and Jacob Lofland have **no** freely-licensed photograph anywhere — Wikipedia lead images, Commons categories, Commons file search and Openverse were all checked and all came back empty. Their cards render WCKD's "no image on file" plate, which is a designed state, not a gap. Don't go looking again without a new source.

CC BY and CC BY-SA oblige us to name the photographer wherever the image appears. `src/assets/subjects/credits.json` carries author, licence and source per file, and `PhotoCredits.tsx` renders it at the foot of the Subjects section. **Adding or replacing an image means updating `credits.json`.** Requires `resolveJsonModule` (already set in `tsconfig.app.json`).

**Accuracy is a constraint, not a nicety.** Only Thomas (A2) and Teresa (A1) have on-screen WCKD designations, so `Character.designation` is `null` for everyone else and renders as a redaction bar rather than an invented ID. Where a detail is from Dashner's novels rather than the films (the six code words, the Changing), the data carries a `note` field saying so, and the UI renders it. Keep that discipline — an earlier pass invented an actor ("Dexton Fleming" for Frypan, who is Dexter Darden), which is exactly the failure mode this rule exists to prevent. Verify names against Wikipedia before adding them.

**The Maze is a circle, not a square.** Dashner's novel describes a square maze; Ball redesigned the film's as a circular one — his concept was a clock counting down. Reading the aerial shot, it is three concentric bands: densest corridors against the Glade, opening outward, the outer band divided into eight sections. `src/utils/thetaMaze.ts` builds exactly that (recursive backtracker on a polar grid, seeded, ring cell-counts always a multiple of eight so the sector boundaries land on cell edges). The Glade itself stays square, with one door centred in each wall, and the sector boundaries fall on the door axes — which is why two Runners leave by one door and take a section each.

**No blueprint of the Maze was ever published** — not by Dashner, the studio, or Method Studios. The three-band reading is a reconstruction of the film's aerial shot. `MazeScene.tsx`'s header cites each claim it implements, and the caption in `MazePreview.tsx` tells the reader it isn't a filmmaker's plan. Don't quietly upgrade it to "screen accurate".

**The Griever is a real model, embedded, not built here.** The film's asset was made by Method Studios and has never been released. `GrieverModel.tsx` embeds a CC-BY 4.0 sculpt (321k faces, rigged) from Sketchfab. The licence requires the credit rendered beneath it — leave it there. An earlier pass hand-built a procedural Griever from the anatomy brief; that was replaced, and self-modelling it again is not what's wanted.

**Section registry.** `src/lib/sections.ts` is the single list of the eight sections — id, label, act. It drives the nav, the `MazeRail`, and the active-section tracking. A new section needs an entry here *and* a rendered `<section>` with the matching DOM id. Eight is not arbitrary: the maze has eight numbered sections, which is why the page numbers 01–08.

**`PrologueTimeline` sits outside that eight on purpose** — it's what happened before there was a maze to number, so it gets no index and no nav entry. Don't add it to `sections.ts`; that would break the conceit and the numbering.

**Each film section carries one signature piece**, passed as `children` to `FilmSection` and rendered full-width below the slate: `MazeMechanics` + `MazePreview` for film I, `FlareProgression` for II, `LastCityWall` for III. Both new pieces are driven by a real `<input type="range">`, so a keyboard gets exactly what a pointer gets.

**Page composition.** `src/pages/Index.tsx` stacks the sections and hoists the active act onto `<html data-act>`, so nav, rail and scrollbar pick up the same accent as the section being read.

## The three-act colour system

Wes Ball: *"The first film with the maze, was all cement and decay. The second story was the sand and rust of the scorch, and this film, The Death Cure, is a world of glass and steel."* That sentence is the design.

Four acts — `maze` (ivy over concrete), `scorch` (amber and rust), `city` (steel blue and chrome), `wckd` (clinical white and one alert red) — defined as `[data-act="..."]` blocks in `src/index.css`. Each block re-scopes `--accent`, `--accent-ink`, `--accent-2`, `--tint`.

Every `<section>` sets its own `data-act`, so **the palette turns over as the reader descends**. Nesting works: `ArtSection` gives each palette panel its own `data-act`, so the panel describing *The Scorch Trials* is literally coloured by it.

Use `text-accent-c` / `bg-accent-c` / `border-accent-c` (utilities in `index.css`) or the Tailwind `accent` / `accent2` / `alert` colours. Never hardcode a hex outside the Three.js scene and the `artDirection` swatch data — those two need literals.

`ActBackdrop` cross-fades the page tint via framer-motion because CSS custom properties don't transition without `@property`.

## Typography

Three faces, loaded in `index.html` with preconnect (never a CSS `@import` — that's render-blocking):

- `font-display` — **Michroma**. Wide, squared, engineered; the Bank Gothic register of the films' title cards. Applied to `h1`/`h2` only. It does not work at body sizes; don't try.
- `font-body` — **Barlow**. Everything else.
- `font-mono` — **IBM Plex Mono**. Labels, data, subject codes, code blocks. The `.label` component class (mono, `0.28em` tracking, uppercase) is the standard eyebrow.

## Performance rules

These were fixed deliberately. Don't regress them:

- **No scroll handlers.** `useActiveSection` and `useScrolledPastHero` (`src/hooks/useActiveSection.ts`) are IntersectionObservers. The old nav read `offsetTop`/`offsetHeight` for every section on every scroll event, forcing a layout each tick.
- **The maze is two instanced draw calls** — walls and ivy caps. `MazeScene.tsx` shares one geometry and one material each. The old version mounted a mesh per wall (120 at the default grid, 400+ at maximum, each shadow-casting). It also runs `frameloop="demand"`: renders on interaction, not 60fps forever. That is why `OrbitControls` has `enableDamping={false}` — damping needs a frame per tick to settle.
- **`three` is lazy but pre-bundled.** `MazePreview` mounts `MazeScene` only once `useInViewOnce` says it's near the viewport, and `GrieverModel` gates its iframe the same way. But a lazy import means Vite's dep scanner never sees `three` at boot, discovers it on first mount, re-bundles, and **forces a full page reload mid-scroll**. `optimizeDeps.include` in `vite.config.ts` fixes that. Do not remove it. Initial JS ~423 kB; the scene is a separate ~827 kB chunk.
- **`MazeScene` runs `frameloop="demand"`** — no idle animation at all, renders on interaction only. That is also why `OrbitControls` has `enableDamping={false}`: damping needs a frame per tick to settle. Walls and ivy are one instanced draw call each (~1,300 slabs at 18 rings), positioned with `Matrix4.compose` so each instance carries its own rotation and length.
- **`prefers-reduced-motion` is honoured** globally in `index.css` and per-component via framer's `useReducedMotion`. The hero gate doesn't animate, the lamps don't flicker, the rail draws instantly, dust is not rendered.
- **The hero lamps are pure CSS.** `HeroLamps.tsx` positions eight glows over features in the photograph using four Tailwind breakpoint steps — not a resize listener, which is what it used to be. Each lamp picks one of five irregular `lamp-*` keyframes, an odd duration, and a negative delay, so no two dip together. Opacity only.
- Animate transform and opacity. Nothing else.

## Conventions

- `@/` aliases `src/`.
- `src/components/ui/` is stock shadcn — mostly unused, regenerable, don't hand-edit. The site's own components sit one level up.
- Panels are slabs: `.slab`, square corners (`--radius: 0.125rem`), a hairline border, no glow. Concrete has no drop shadow.
- Sections use `whileInView` with `viewport={{ once: true }}`. Follow that; don't add scroll listeners.
- TypeScript is deliberately loose: `strictNullChecks`, `noImplicitAny`, `noUnusedLocals` off, and eslint's `no-unused-vars` disabled. Strict-mode guarantees don't hold.
- `mazeGenerator.ts` is genuinely seeded (mulberry32). `seed` reproduces a layout; it is not just a memo cache-buster.
