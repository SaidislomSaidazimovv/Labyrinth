import SectionWrapper from "./SectionWrapper";
import EnemyCard from "./EnemyCard";
import { enemies } from "@/data/gameContent";

const EnemiesSection = () => {
  return (
    <SectionWrapper 
      id="enemies" 
      title="Hostile Entities" 
      subtitle="Enemy Types"
      accent="danger"
    >
      <div className="grid gap-6">
        <p className="text-muted-foreground text-lg max-w-3xl">
          The Labyrinth is home to various threats, each requiring different strategies to survive. 
          Learning their patterns is essential—fighting is rarely an option.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {enemies.map((enemy) => (
            <EnemyCard
              key={enemy.name}
              name={enemy.name}
              threat={enemy.threat}
              description={enemy.description}
              behavior={enemy.behavior}
              weaknesses={enemy.weaknesses}
            />
          ))}
        </div>

        {/* Threat level legend */}
        <div className="card-atmospheric rounded-lg p-6 mt-4">
          <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Threat Level Guide
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-safe/20 text-safe border border-safe/30">
                Low
              </span>
              <span className="text-xs text-muted-foreground">Avoidable, non-lethal</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-warning/20 text-warning border border-warning/30">
                Medium
              </span>
              <span className="text-xs text-muted-foreground">Dangerous in groups</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-secondary/20 text-secondary border border-secondary/30">
                High
              </span>
              <span className="text-xs text-muted-foreground">Lethal, requires strategy</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs bg-danger/20 text-danger border border-danger/30">
                Extreme
              </span>
              <span className="text-xs text-muted-foreground">Run. Don't look back.</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default EnemiesSection;
