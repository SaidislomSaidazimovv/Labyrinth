/**
 * A theta maze — a labyrinth built on concentric rings rather than a square
 * grid, which is what the film's Maze actually is.
 *
 * The novel's Maze is a square. The film's was redesigned around Wes Ball's
 * "clock" idea: a circular footprint, three concentric bands, the innermost
 * dense with corridors and the outer bands progressively more open, with the
 * outermost divided into eight sections. Rings also widen outward, because
 * Ball's rule was tight against the Glade and opening up as you go.
 *
 * Carved with a recursive backtracker, seeded, so a layout is reproducible.
 */

export interface ThetaMaze {
  ringCount: number;
  /** Cells in each ring. Always a multiple of eight, so the sectors land cleanly. */
  cells: number[];
  /** radii[i] is the inner radius of ring i; radii[ringCount] is the perimeter. */
  radii: number[];
  /** Wall on the inner edge of cell (ring, index). */
  inward: boolean[][];
  /** Wall on the clockwise edge — between (ring, j) and (ring, j+1). */
  cw: boolean[][];
}

export interface ThetaOptions {
  ringCount: number;
  /** Where the rings begin. The Glade sits inside this. */
  innerRadius: number;
  /** Width of the first ring. Later rings grow. */
  baseWidth: number;
  /** Fractional widening per ring. */
  growth: number;
  seed: number;
  /** Angles, in radians, where a Glade door opens into the first ring. */
  doorAngles: number[];
}

/** mulberry32 — small, fast, seedable. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

export function buildThetaMaze(options: ThetaOptions): ThetaMaze {
  const { ringCount, innerRadius, baseWidth, growth, seed, doorAngles } = options;
  const random = rng(seed);

  const radii = [innerRadius];
  for (let i = 0; i < ringCount; i++) {
    radii.push(radii[i] + baseWidth * (1 + i * growth));
  }

  // Cells per ring. Ring 0 is a multiple of eight; every ring after either
  // keeps its parent's count or doubles it, so the count stays a multiple of
  // eight and the eight sector boundaries always fall on a cell edge.
  const cells: number[] = [];
  for (let i = 0; i < ringCount; i++) {
    const width = radii[i + 1] - radii[i];
    const mid = (radii[i] + radii[i + 1]) / 2;

    if (i === 0) {
      cells.push(8 * Math.max(2, Math.round((TAU * mid) / (width * 8))));
    } else {
      const previous = cells[i - 1];
      const arc = (TAU * mid) / previous;
      cells.push(arc > width * 1.85 ? previous * 2 : previous);
    }
  }

  const inward = cells.map((n) => new Array<boolean>(n).fill(true));
  const cw = cells.map((n) => new Array<boolean>(n).fill(true));
  const visited = cells.map((n) => new Array<boolean>(n).fill(false));

  /** Cells adjacent to (i, j), paired with the wall that separates them. */
  const neighbours = (i: number, j: number) => {
    const n = cells[i];
    const list: { i: number; j: number; drop: () => void }[] = [];

    list.push({ i, j: (j + 1) % n, drop: () => (cw[i][j] = false) });
    const back = (j - 1 + n) % n;
    list.push({ i, j: back, drop: () => (cw[i][back] = false) });

    if (i > 0) {
      const parent = Math.floor(j / (cells[i] / cells[i - 1]));
      list.push({ i: i - 1, j: parent, drop: () => (inward[i][j] = false) });
    }

    if (i < ringCount - 1) {
      const fanout = cells[i + 1] / cells[i];
      for (let k = 0; k < fanout; k++) {
        const child = j * fanout + k;
        list.push({ i: i + 1, j: child, drop: () => (inward[i + 1][child] = false) });
      }
    }

    return list;
  };

  const stack: [number, number][] = [[0, Math.floor(random() * cells[0])]];
  visited[0][stack[0][1]] = true;

  while (stack.length > 0) {
    const [i, j] = stack[stack.length - 1];
    const open = neighbours(i, j).filter((n) => !visited[n.i][n.j]);

    if (open.length === 0) {
      stack.pop();
      continue;
    }

    const next = open[Math.floor(random() * open.length)];
    next.drop();
    visited[next.i][next.j] = true;
    stack.push([next.i, next.j]);
  }

  // Bands. The inner one keeps every wall it was given; the outer two shed
  // some, so the corridors open up the further from home you get.
  const opennessFor = (ring: number) => {
    const band = Math.floor((ring * 3) / ringCount);
    return [0, 0.16, 0.34][band] ?? 0;
  };

  for (let i = 1; i < ringCount; i++) {
    const openness = opennessFor(i);
    if (openness === 0) continue;

    for (let j = 0; j < cells[i]; j++) {
      if (random() < openness) inward[i][j] = false;
      if (random() < openness) cw[i][j] = false;
    }
  }

  // Eight sections. Restore the radial walls that divide the outer band, so the
  // boundaries survive whatever the backtracker and the thinning did to them.
  const outerBandStart = Math.floor((ringCount * 2) / 3);
  for (let i = outerBandStart; i < ringCount; i++) {
    for (let k = 0; k < 8; k++) {
      const j = ((k * cells[i]) / 8 - 1 + cells[i]) % cells[i];
      cw[i][j] = true;
    }
  }

  // Four doors out of the Glade. Two cells wide, centred on each door's angle.
  const step = TAU / cells[0];
  for (const angle of doorAngles) {
    const centre = Math.round(angle / step) % cells[0];
    inward[0][centre] = false;
    inward[0][(centre - 1 + cells[0]) % cells[0]] = false;
  }

  return { ringCount, cells, radii, inward, cw };
}
