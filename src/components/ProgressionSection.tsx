import SectionWrapper from "./SectionWrapper";
import { progressionSystem } from "@/data/gameContent";
import { motion } from "framer-motion";
import { MapPin, Zap, Star } from "lucide-react";

const ProgressionSection = () => {
  const difficultyColors: Record<string, string> = {
    "Tutorial": "text-safe border-safe/30 bg-safe/10",
    "Easy": "text-primary border-primary/30 bg-primary/10",
    "Medium": "text-warning border-warning/30 bg-warning/10",
    "Hard": "text-secondary border-secondary/30 bg-secondary/10",
    "Extreme": "text-danger border-danger/30 bg-danger/10",
  };

  return (
    <SectionWrapper 
      id="progression" 
      title="Progression System" 
      subtitle="Player Growth"
      accent="secondary"
    >
      <div className="grid gap-12">
        {/* Maze levels */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="w-6 h-6 text-secondary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Maze Sectors
            </h3>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden md:block" />
            
            <div className="space-y-6">
              {progressionSystem.levels.map((level, index) => (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Node indicator */}
                  <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-card border-2 border-secondary hidden md:flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  
                  <div className="card-atmospheric rounded-lg p-6 md:ml-12">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground">
                          SECTOR {index + 1}
                        </span>
                        <h4 className="font-display text-2xl font-bold text-foreground">
                          {level.name}
                        </h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full font-mono text-xs border ${difficultyColors[level.difficulty]}`}>
                        {level.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {level.description}
                    </p>
                    
                    <div>
                      <span className="font-mono text-xs text-secondary uppercase tracking-wider">
                        Key Objectives
                      </span>
                      <ul className="mt-2 space-y-1">
                        {level.objectives.map((objective, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-secondary mt-1 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-6 h-6 text-secondary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Unlockable Skills
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressionSystem.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-atmospheric rounded-lg p-4 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill points info */}
        <div className="card-atmospheric rounded-lg p-6 border-l-4 border-secondary">
          <p className="text-muted-foreground">
            <span className="text-secondary font-semibold">Skill Points</span> are earned by 
            discovering Echo Memories, completing sector objectives, and reaching milestones. 
            Each skill has 3 upgrade levels, requiring 1, 2, and 3 points respectively.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProgressionSection;
