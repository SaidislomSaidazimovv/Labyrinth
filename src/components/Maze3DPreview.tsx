import { useRef, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { useMaze, MazeCell } from "@/utils/mazeGenerator";
import * as THREE from "three";
import { motion } from "framer-motion";
import { RefreshCw, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface MazeWallProps {
  position: [number, number, number];
  isHighlighted?: boolean;
}

const MazeWall = ({ position, isHighlighted }: MazeWallProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[0.9, 1.5, 0.9]} />
      <meshStandardMaterial 
        color={isHighlighted ? "#14b8a6" : "#1e293b"}
        emissive={isHighlighted ? "#0d9488" : "#0f172a"}
        emissiveIntensity={isHighlighted ? 0.3 : 0.1}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

const MazeFloor = ({ width, height }: { width: number; height: number }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 - 0.5, -0.75, height / 2 - 0.5]} receiveShadow>
      <planeGeometry args={[width + 2, height + 2]} />
      <meshStandardMaterial 
        color="#0c1222"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
};

interface MazeVisualizerProps {
  maze: MazeCell[][];
  width: number;
  height: number;
}

const MazeVisualizer = ({ maze, width, height }: MazeVisualizerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const walls: [number, number, number][] = [];
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (maze[x][y].isWall) {
        walls.push([x, 0, y]);
      }
    }
  }

  return (
    <group ref={groupRef} position={[-width / 2 + 0.5, 0, -height / 2 + 0.5]}>
      <MazeFloor width={width} height={height} />
      {walls.map((pos, index) => (
        <MazeWall key={`${pos[0]}-${pos[2]}`} position={pos} />
      ))}
      
      {/* Glowing markers for entrance and exit */}
      <mesh position={[1, 0.1, 1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[1, 1, 1]} color="#22c55e" intensity={2} distance={3} />
      
      <mesh position={[width - 2, 0.1, height - 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
      </mesh>
      <pointLight position={[width - 2, 1, height - 2]} color="#ef4444" intensity={2} distance={3} />
    </group>
  );
};

const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-sm text-primary">Generating maze...</span>
    </div>
  </div>
);

interface Maze3DPreviewProps {
  mazeSize?: number;
}

const Maze3DPreview = ({ mazeSize = 15 }: Maze3DPreviewProps) => {
  const [seed, setSeed] = useState(0);
  const [size, setSize] = useState(mazeSize);
  const maze = useMaze(size, size, seed);
  const controlsRef = useRef<any>(null);

  const regenerate = useCallback(() => {
    setSeed(prev => prev + 1);
  }, []);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  const adjustSize = useCallback((delta: number) => {
    setSize(prev => Math.max(9, Math.min(25, prev + delta)));
    setSeed(prev => prev + 1);
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[500px] rounded-lg overflow-hidden card-atmospheric">
      {/* Controls overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={regenerate}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-lg text-primary text-xs sm:text-sm font-mono transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Regenerate</span>
        </motion.button>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => adjustSize(-2)}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-muted/50 hover:bg-muted border border-border rounded-lg text-muted-foreground transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => adjustSize(2)}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-muted/50 hover:bg-muted border border-border rounded-lg text-muted-foreground transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </motion.button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetCamera}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-muted-foreground text-xs sm:text-sm font-mono transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset View</span>
        </motion.button>
      </div>

      {/* Info overlay */}
      <div className="absolute top-4 right-4 z-10 text-right">
        <div className="px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
          <p className="font-mono text-xs text-muted-foreground">Grid Size</p>
          <p className="font-display text-lg text-primary">{size} × {size}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-safe" />
          <span className="font-mono text-xs text-muted-foreground">Start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger" />
          <span className="font-mono text-xs text-muted-foreground">Exit</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<LoadingFallback />}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 20, 20]} fov={50} />
          <OrbitControls 
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={40}
            maxPolarAngle={Math.PI / 2.2}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={0.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[0, 10, 0]} intensity={0.3} color="#14b8a6" />
          
          {/* Fog for atmosphere */}
          <fog attach="fog" args={["#0c1222", 20, 50]} />
          
          {/* Maze */}
          <MazeVisualizer maze={maze} width={size} height={size} />
        </Canvas>
      </Suspense>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10">
        <p className="font-mono text-xs text-muted-foreground">
          Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
};

export default Maze3DPreview;
