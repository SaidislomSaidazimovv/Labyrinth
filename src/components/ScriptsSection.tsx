import SectionWrapper from "./SectionWrapper";
import CodeBlock from "./CodeBlock";
import { mazeGeneratorCode, playerControllerCode, enemyAICode } from "@/data/gameContent";

const ScriptsSection = () => {
  return (
    <SectionWrapper 
      id="scripts" 
      title="Unity Scripts" 
      subtitle="Technical Implementation"
      accent="primary"
    >
      <div className="grid gap-8">
        <p className="text-muted-foreground text-lg">
          Complete, production-ready Unity C# scripts for the core game systems. 
          These scripts are designed to work together and can be extended as needed.
        </p>

        <CodeBlock
          title="MazeGenerator.cs"
          language="C# / Unity"
          description="Procedural maze generation using Randomized Prim's Algorithm. Creates a unique maze layout each time the game starts. Supports runtime regeneration for the shift mechanic."
          code={mazeGeneratorCode}
        />

        <CodeBlock
          title="FirstPersonController.cs"
          language="C# / Unity"
          description="Complete first-person controller with walking, running, crouching, jumping, mouse look, and stamina system. Includes footstep audio events for enemy detection."
          code={playerControllerCode}
        />

        <CodeBlock
          title="EnemyAI.cs"
          language="C# / Unity"
          description="NavMesh-based enemy AI with multiple states: Idle, Patrol, Investigate, Chase, and Search. Responds to sight and sound, alerts nearby enemies, and includes debug visualization."
          code={enemyAICode}
        />

        {/* Implementation notes */}
        <div className="card-atmospheric rounded-lg p-8 border-l-4 border-primary">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Implementation Notes
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">NavMesh Setup:</strong> Bake NavMesh after maze generation using 
                <code className="mx-1 px-2 py-0.5 bg-muted rounded text-xs font-mono">NavMeshSurface.BuildNavMesh()</code>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Layer Setup:</strong> Create "Player" and "Obstruction" layers for the AI sight checks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Prefabs:</strong> Wall, Floor, and Ceiling prefabs should be scaled to match 
                <code className="mx-1 px-2 py-0.5 bg-muted rounded text-xs font-mono">cellSize</code> (default 4 units).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                <strong className="text-foreground">Audio:</strong> Implement <code className="mx-1 px-2 py-0.5 bg-muted rounded text-xs font-mono">GameEvents.OnPlayerFootstep</code> 
                 listener in your audio manager for spatial sound.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ScriptsSection;
