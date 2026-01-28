import SectionWrapper from "./SectionWrapper";
import { atmosphereDesign } from "@/data/gameContent";
import { motion } from "framer-motion";
import { Lightbulb, Cloud, Volume2, Brain } from "lucide-react";

const icons: Record<string, JSX.Element> = {
  lighting: <Lightbulb className="w-6 h-6" />,
  fog: <Cloud className="w-6 h-6" />,
  audio: <Volume2 className="w-6 h-6" />,
  tension: <Brain className="w-6 h-6" />,
};

const AtmosphereSection = () => {
  return (
    <SectionWrapper 
      id="atmosphere" 
      title="Atmosphere Design" 
      subtitle="Visual & Audio"
      accent="primary"
    >
      <div className="grid gap-8">
        {Object.entries(atmosphereDesign).map(([key, section], sectionIndex) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            viewport={{ once: true }}
            className="card-atmospheric rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                {icons[key]}
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {section.description}
                </p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {section.elements.map((element, index) => (
                  <motion.div
                    key={element.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="p-4 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <h4 className="font-display text-sm font-semibold text-primary mb-2">
                      {element.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {element.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Visual reference palette */}
        <div className="card-atmospheric rounded-lg p-8">
          <h3 className="font-display text-xl font-semibold text-foreground mb-6">
            Color Palette Reference
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-background border border-border mb-2" />
              <span className="font-mono text-xs text-muted-foreground">Deep Black</span>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-card border border-border mb-2" />
              <span className="font-mono text-xs text-muted-foreground">Dark Charcoal</span>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-primary mb-2" />
              <span className="font-mono text-xs text-muted-foreground">Bioluminescent Teal</span>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-secondary mb-2" />
              <span className="font-mono text-xs text-muted-foreground">Warning Amber</span>
            </div>
            <div className="text-center">
              <div className="w-full aspect-square rounded-lg bg-danger mb-2" />
              <span className="font-mono text-xs text-muted-foreground">Emergency Red</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AtmosphereSection;
