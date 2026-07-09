import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { buildThetaMaze } from "@/utils/thetaMaze";

/**
 * The Maze, reconstructed.
 *
 * No blueprint was ever published — not by Dashner, not by the studio, not by
 * Method Studios. Wes Ball drew the whole thing himself and had it built as a
 * twig model for the Map Room set; that drawing has never been released. What
 * follows is assembled from what *is* documented, and nothing beyond it:
 *
 *   · The novel's maze is square. The film's was redesigned as a circle —
 *     Ball's own concept was a clock, counting down.
 *   · Read off the film's aerial shot: a circular footprint of three
 *     concentric bands. The innermost carries the densest corridors; the
 *     outer bands are progressively more open; the outermost is divided
 *     into eight sections.
 *   · The Glade at the centre is square, with one giant door centred in
 *     each of its four walls.
 *   · Corridors are tight against the Glade and widen outward. The surface
 *     goes from ivy-choked concrete, to metal, to bare machine at the edge.
 *     Ball again.
 *   · Walls read ~100 ft over a ~20 ft corridor, and grind along a grid at
 *     night. Ball's analogy for the shift was Plinko.
 *   · The Cliff sits at the outer edge of one section: an edge onto nothing.
 *
 * The three-band reading is a fan reconstruction of the aerial shot, not a
 * filmmaker document. The caption in MazePreview says so.
 */

const WALL_H = 5.4; // ~100 ft of wall over a ~20 ft corridor
const WALL_T = 0.36;
const IVY_H = 0.2;

const CONCRETE = new THREE.Color("#6C716D");
const METAL = new THREE.Color("#4A5155");
const MACHINE = new THREE.Color("#37414A"); // the edges stop pretending
const IVY = "#5F7350";
const GLADE_GRASS = "#4C5F3C";
const DEADHEADS = "#2F3D2A";
const TIMBER = "#3B3026";
const GROUND = "#23282A";
const HAZE = "#31383A";
const STEEL = "#565C5E";

const TAU = Math.PI * 2;
const DOOR_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

/** Deterministic 0..1, so weathering survives a re-render. */
const noise = (a: number, b: number, seed: number) =>
  ((Math.imul((a * 73856093) ^ (b * 19349663) ^ (seed * 83492791), 2654435761) >>> 0) % 10000) /
  10000;

interface Slab {
  x: number;
  z: number;
  angle: number;
  length: number;
  /** 0 at the Glade, 1 at the perimeter. Drives colour and ivy. */
  radial: number;
}

interface Layout {
  slabs: Slab[];
  ivy: Slab[];
  gladeHalf: number;
  innerRadius: number;
  outerRadius: number;
}

function buildLayout(ringCount: number, seed: number): Layout {
  const gladeHalf = 3.4;
  const innerRadius = (gladeHalf + 0.5) * 1.5;

  const maze = buildThetaMaze({
    ringCount,
    innerRadius,
    baseWidth: 1.25,
    growth: 0.05,
    seed,
    doorAngles: DOOR_ANGLES,
  });

  const outerRadius = maze.radii[ringCount];
  const span = outerRadius - innerRadius;
  const slabs: Slab[] = [];

  const push = (slab: Slab) => slabs.push(slab);

  // An arc, chopped into chords short enough that the curve reads as a curve.
  const arc = (radius: number, from: number, to: number, radial: number) => {
    const pieces = Math.max(1, Math.round(((to - from) * radius) / 0.85));

    for (let p = 0; p < pieces; p++) {
      const a0 = from + ((to - from) * p) / pieces;
      const a1 = from + ((to - from) * (p + 1)) / pieces;
      const mid = (a0 + a1) / 2;
      const chord = 2 * radius * Math.sin((a1 - a0) / 2);

      push({
        x: Math.cos(mid) * radius,
        z: Math.sin(mid) * radius,
        angle: -mid,
        length: chord + 0.06,
        radial,
      });
    }
  };

  for (let i = 0; i < ringCount; i++) {
    const n = maze.cells[i];
    const step = TAU / n;
    const r0 = maze.radii[i];
    const r1 = maze.radii[i + 1];
    const radial = (r0 - innerRadius) / span;

    for (let j = 0; j < n; j++) {
      if (maze.inward[i][j]) arc(r0, j * step, (j + 1) * step, radial);

      if (maze.cw[i][j]) {
        // A radial wall: a spoke across the ring at the cell's clockwise edge.
        const angle = (j + 1) * step;
        const mid = (r0 + r1) / 2;
        push({
          x: Math.cos(angle) * mid,
          z: Math.sin(angle) * mid,
          angle: -angle + Math.PI / 2,
          length: r1 - r0 + WALL_T,
          radial,
        });
      }
    }
  }

  // The perimeter holds, except where it doesn't. One span of it is the Cliff.
  const cliffFrom = TAU * 0.24;
  const cliffTo = TAU * 0.31;
  arc(outerRadius, cliffTo, cliffFrom + TAU, 1);

  // The Glade's own wall: square, with a door centred in each side.
  const w = gladeHalf + 0.5;
  const doorHalf = 0.85;
  for (const sign of [-1, 1]) {
    for (const axis of ["x", "z"] as const) {
      for (const side of [-1, 1]) {
        const from = side === -1 ? -w : doorHalf;
        const to = side === -1 ? -doorHalf : w;
        const mid = (from + to) / 2;
        const length = to - from;

        push(
          axis === "x"
            ? { x: mid, z: sign * w, angle: 0, length, radial: 0 }
            : { x: sign * w, z: mid, angle: Math.PI / 2, length, radial: 0 },
        );
      }
    }
  }

  // Ivy is thick on the walls the boys can see, and gone by the edges.
  const ivy = slabs.filter(
    (slab, i) => noise(Math.round(slab.x * 8), Math.round(slab.z * 8), seed + i) < 1.1 - slab.radial * 1.5,
  );

  return { slabs, ivy, gladeHalf, innerRadius, outerRadius };
}

/** Every wall in one instanced draw call, every ivy cap in a second. */
const Walls = ({ slabs, ivy }: { slabs: Slab[]; ivy: Slab[] }) => {
  const wallRef = useRef<THREE.InstancedMesh>(null);
  const ivyRef = useRef<THREE.InstancedMesh>(null);

  const place = (
    mesh: THREE.InstancedMesh,
    list: Slab[],
    y: number,
    height: number,
    pad: number,
    colour: ((slab: Slab, i: number) => THREE.Color) | null,
  ) => {
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);

    list.forEach((slab, i) => {
      position.set(slab.x, y, slab.z);
      quaternion.setFromAxisAngle(up, slab.angle);
      scale.set(slab.length, height, WALL_T + pad);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
      if (colour) mesh.setColorAt(i, colour(slab, i));
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (colour && mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  };

  useLayoutEffect(() => {
    const mesh = wallRef.current;
    if (!mesh) return;

    const scratch = new THREE.Color();
    place(mesh, slabs, WALL_H / 2, WALL_H, 0, (slab, i) => {
      // Organic concrete near the Glade, metal in the middle, machine at the edge.
      scratch.copy(CONCRETE).lerp(METAL, Math.min(1, slab.radial * 1.7));
      if (slab.radial > 0.6) scratch.lerp(MACHINE, (slab.radial - 0.6) / 0.4);
      // A century of rain does not fall evenly.
      return scratch.multiplyScalar(0.86 + noise(i, 1, 7) * 0.26);
    });
  }, [slabs]);

  useLayoutEffect(() => {
    const mesh = ivyRef.current;
    if (!mesh) return;
    place(mesh, ivy, WALL_H + IVY_H / 2 - 0.02, IVY_H, 0.06, null);
  }, [ivy]);

  return (
    <>
      {/* Remount on a count change so the instance buffer is resized, not overrun. */}
      <instancedMesh key={`w${slabs.length}`} ref={wallRef} args={[null, null, slabs.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.96} metalness={0.08} />
      </instancedMesh>

      <instancedMesh key={`i${ivy.length}`} ref={ivyRef} args={[null, null, ivy.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={IVY} roughness={1} />
      </instancedMesh>
    </>
  );
};

/**
 * Each door is two slabs that mesh shut with interlocking teeth. Shown open,
 * because it is daylight and the Runners are still out there.
 */
const Door = ({ angle, radius }: { angle: number; radius: number }) => {
  const teeth = [0.8, 2.0, 3.2, 4.4];

  return (
    <group position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[0, -angle, 0]}>
      {[1, -1].map((side) => (
        <group key={side} position={[0, 0, side * 1.0]}>
          <mesh position={[0, WALL_H / 2, 0]}>
            <boxGeometry args={[WALL_T + 0.6, WALL_H, 0.44]} />
            <meshStandardMaterial color={STEEL} roughness={0.9} metalness={0.12} />
          </mesh>

          {teeth.map((height, i) => {
            // Alternate, so the two halves comb into one another.
            if ((i % 2 === 0) !== (side === 1)) return null;
            return (
              <mesh key={height} position={[0, height, -side * 0.3]}>
                <boxGeometry args={[WALL_T + 0.4, 0.72, 0.36]} />
                <meshStandardMaterial color={STEEL} roughness={0.9} metalness={0.12} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};

/**
 * The Glade, quartered as the novel describes it: Homestead north-west,
 * Gardens north-east, Deadheads south-west, Blood House south-east, the Box
 * dead centre with the Map Room beside it. Here -z is north.
 */
const Glade = ({ half }: { half: number }) => {
  const q = half * 0.5;
  const trees = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = noise(i, 3, 11);
        const b = noise(i, 7, 23);
        return [-q - 1.0 + a * 2.1, q - 1.0 + b * 2.1] as const;
      }),
    [q],
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[half * 2, half * 2]} />
        <meshStandardMaterial color={GLADE_GRASS} roughness={1} />
      </mesh>

      {/* Deadheads — the woods, and the graves in them. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-q, 0.03, q]}>
        <planeGeometry args={[half * 0.85, half * 0.85]} />
        <meshStandardMaterial color={DEADHEADS} roughness={1} />
      </mesh>
      {trees.map(([tx, tz], i) => (
        <mesh key={i} position={[tx, 0.35, tz]}>
          <coneGeometry args={[0.15, 0.7, 6]} />
          <meshStandardMaterial color="#2A3826" roughness={1} />
        </mesh>
      ))}

      {/* Homestead. Two storeys of salvage. */}
      <mesh position={[-q, 0.32, -q]}>
        <boxGeometry args={[half * 0.75, 0.62, half * 0.5]} />
        <meshStandardMaterial color={TIMBER} roughness={0.95} />
      </mesh>

      {/* Gardens, and the pump. */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[q - 0.65 + i * 0.44, 0.06, -q]}>
          <boxGeometry args={[0.2, 0.1, half * 0.8]} />
          <meshStandardMaterial color="#3E4A31" roughness={1} />
        </mesh>
      ))}

      {/* Blood House. */}
      <mesh position={[q, 0.22, q]}>
        <boxGeometry args={[half * 0.45, 0.42, half * 0.45]} />
        <meshStandardMaterial color="#33291F" roughness={0.95} />
      </mesh>

      {/* The Box, dead centre. It comes up once every thirty days. */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial color="#4A4F52" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* The Map Room. Eight boxes of maps, one per section. */}
      <mesh position={[1.35, 0.16, 0.25]}>
        <boxGeometry args={[0.8, 0.32, 0.8]} />
        <meshStandardMaterial color="#5A5F5C" roughness={0.95} />
      </mesh>
    </group>
  );
};

/** The eight sector boundaries, drawn only when the reader asks for them. */
const SectionLines = ({ inner, outer }: { inner: number; outer: number }) => {
  const geometry = useMemo(() => {
    const points: number[] = [];
    for (let k = 0; k < 8; k++) {
      const a = (k * TAU) / 8;
      points.push(Math.cos(a) * inner, 0.06, Math.sin(a) * inner);
      points.push(Math.cos(a) * (outer + 0.6), 0.06, Math.sin(a) * (outer + 0.6));
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return g;
  }, [inner, outer]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#8FA97A" transparent opacity={0.6} />
    </lineSegments>
  );
};

interface MazeSceneProps {
  rings: number;
  seed: number;
  showSections: boolean;
}

const MazeScene = ({ rings, seed, showSections }: MazeSceneProps) => {
  const { slabs, ivy, gladeHalf, innerRadius, outerRadius } = useMemo(
    () => buildLayout(rings, seed),
    [rings, seed],
  );

  const reach = outerRadius * 2;

  return (
    // frameloop="demand" — the scene renders on interaction and on prop change,
    // not sixty times a second while the reader is looking at something else.
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      {/* The aerial reveal: the franchise's signature frame. */}
      <PerspectiveCamera makeDefault position={[0, reach * 0.82, reach * 0.6]} fov={38} />
      <OrbitControls
        enablePan={false}
        // Damping needs a frame every tick to settle, which defeats
        // frameloop="demand". Without it, `change` events drive the renders.
        enableDamping={false}
        minDistance={outerRadius * 0.8}
        maxDistance={outerRadius * 3}
        maxPolarAngle={Math.PI / 2.3}
      />

      <color attach="background" args={[HAZE]} />
      {/* Overcast, and the corridors go grey before they go dark. */}
      <fog attach="fog" args={[HAZE, outerRadius, outerRadius * 3.4]} />

      {/* Flat, shadowless, from a sky you cannot see. */}
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#A9B6A4", "#191D1C", 0.75]} />
      <directionalLight position={[outerRadius, outerRadius * 2, outerRadius * 0.6]} intensity={0.7} />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[outerRadius + 6, 64]} />
        <meshStandardMaterial color={GROUND} roughness={1} />
      </mesh>

      <Glade half={gladeHalf} />
      <Walls slabs={slabs} ivy={ivy} />

      {DOOR_ANGLES.map((angle) => (
        <Door key={angle} angle={angle} radius={gladeHalf + 0.5} />
      ))}

      {showSections && <SectionLines inner={innerRadius} outer={outerRadius} />}
    </Canvas>
  );
};

export default MazeScene;
