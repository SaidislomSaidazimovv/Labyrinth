# The Maze Runner

An unofficial, single-page study of Wes Ball's Maze Runner trilogy — the films,
the Grievers, WCKD's files, the art direction — plus a design sketch for the
survival game the films imply.

**[saidislomsaidazimovv.github.io/Labyrinth](https://saidislomsaidazimovv.github.io/Labyrinth/)**

Not affiliated with the rights holders. Adapted from the novels of James Dashner.

## Running it

```sh
npm install
npm run dev        # dev server on port 8080
```

```sh
npm run build      # production build (base path /Labyrinth/)
npm run preview    # serve the built dist/
npm run lint       # eslint
npx tsc -b         # typecheck
```

## What's in it

- **A three-act colour system**, built on Ball's own description of the trilogy:
  cement and decay, sand and rust, glass and steel. Each section carries a
  `data-act`, so the palette turns over as you scroll.
- **The Maze in 3D.** The novel's maze is square; the film's is circular — Ball's
  concept for it was a clock counting down. `src/utils/thetaMaze.ts` carves a
  polar maze of three concentric bands: dense against the Glade, opening
  outward, the outer band divided into eight sections.
- **A Griever**, embedded from Sketchfab under CC BY 4.0. The film's own model
  has never been released.
- **The Flare, measured in people**, because the films never give it a clinical
  staging and inventing one would be inventing canon.
- **The Last City wall**, which is where the third film keeps its whole argument.

## Accuracy

Only Thomas (A2) and Teresa (A1) have on-screen WCKD subject designations. The
rest render as redaction bars rather than invented IDs. Where a detail comes
from the novels rather than the films, the page says so. No blueprint of the
Maze has ever been published; the reconstruction says that too.

## Credits

Cast portraits are freely-licensed photographs from Wikimedia Commons, credited
where they appear, as their licences require. Five of the twenty have no free
photograph anywhere; their cards say so.

Built with Vite, React, Tailwind, framer-motion and three.js.
