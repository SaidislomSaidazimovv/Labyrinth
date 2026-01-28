import SectionWrapper from "./SectionWrapper";
import { storyContent } from "@/data/gameContent";
import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <SectionWrapper 
      id="story" 
      title="Narrative" 
      subtitle="Story & Characters"
      accent="secondary"
    >
      <div className="grid gap-8">
        {/* Premise */}
        <div className="card-atmospheric rounded-lg p-8">
          <h3 className="font-display text-xl font-semibold text-secondary mb-4">
            The World
          </h3>
          <p className="text-foreground leading-relaxed text-lg">
            {storyContent.premise}
          </p>
        </div>

        {/* Protagonist */}
        <div className="card-atmospheric rounded-lg overflow-hidden">
          <div className="p-8 border-b border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-xs text-secondary uppercase tracking-wider">
                  Protagonist
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground mt-1">
                  {storyContent.protagonist.name}
                </h3>
                <span className="font-mono text-sm text-muted-foreground">
                  Age: {storyContent.protagonist.age}
                </span>
              </div>
              <div className="w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center">
                <span className="font-display text-2xl text-secondary">KV</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {storyContent.protagonist.background}
            </p>
          </div>
          <div className="p-6 bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {storyContent.protagonist.traits.map((trait, index) => (
                <motion.span
                  key={trait}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full text-sm text-secondary"
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Factions */}
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-6">
            Factions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {storyContent.factions.map((faction, index) => (
              <motion.div
                key={faction.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="card-atmospheric rounded-lg p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center mb-4">
                  <span className="font-display text-lg font-bold text-secondary">
                    {index + 1}
                  </span>
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {faction.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faction.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default StorySection;
