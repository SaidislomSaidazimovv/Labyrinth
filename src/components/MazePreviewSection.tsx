import SectionWrapper from "./SectionWrapper";
import Maze3DPreview from "./Maze3DPreview";
import { motion } from "framer-motion";
import { Box, Cpu, Shuffle } from "lucide-react";

const MazePreviewSection = () => {
  return (
    <SectionWrapper 
      id="maze-preview" 
      title="3D Maze Preview" 
      subtitle="Interactive Demo"
      accent="primary"
    >
      <div className="grid gap-8">
        <p className="text-muted-foreground text-lg max-w-3xl">
          Experience the procedural maze generation algorithm in real-time. Each maze is uniquely 
          generated using Randomized Prim's Algorithm—the same technique used in the game.
        </p>

        <Maze3DPreview mazeSize={15} />

        {/* Algorithm explanation */}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="card-atmospheric rounded-lg p-6"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary">
              <Box className="w-5 h-5" />
            </div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-2">
              Grid-Based
            </h4>
            <p className="text-sm text-muted-foreground">
              The maze is built on a uniform grid where each cell can be a wall or passage. 
              This enables efficient collision detection and AI pathfinding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="card-atmospheric rounded-lg p-6"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-4 text-secondary">
              <Shuffle className="w-5 h-5" />
            </div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-2">
              Perfect Maze
            </h4>
            <p className="text-sm text-muted-foreground">
              Prim's Algorithm guarantees a "perfect" maze—exactly one path between any 
              two points, with no loops or isolated sections.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="card-atmospheric rounded-lg p-6"
          >
            <div className="w-10 h-10 rounded-lg bg-danger/10 border border-danger/30 flex items-center justify-center mb-4 text-danger">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-2">
              Runtime Generation
            </h4>
            <p className="text-sm text-muted-foreground">
              Mazes are generated at runtime, not pre-designed. This ensures every playthrough 
              offers a unique experience with different routes and challenges.
            </p>
          </motion.div>
        </div>

        {/* Technical note */}
        <div className="card-atmospheric rounded-lg p-6 border-l-4 border-primary">
          <h4 className="font-display text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Technical Note
          </h4>
          <p className="text-muted-foreground text-sm">
            In the actual Unity game, NavMesh is baked after maze generation to enable AI pathfinding. 
            The maze structure shown here is identical to what the <code className="px-1.5 py-0.5 bg-muted rounded font-mono text-xs">MazeGenerator.cs</code> script produces.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MazePreviewSection;
