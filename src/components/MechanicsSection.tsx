import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { 
  Footprints, 
  Eye, 
  Battery, 
  Volume2, 
  Flashlight, 
  Heart,
  Package,
  Map,
  Timer
} from "lucide-react";

const mechanics = [
  {
    icon: <Footprints className="w-6 h-6" />,
    title: "Movement System",
    description: "Walk, run, crouch, and lean around corners. Each action has trade-offs.",
    details: [
      "Walking is quiet but slow",
      "Running drains stamina and creates noise",
      "Crouching reduces detection radius",
      "Leaning allows peeking without exposure"
    ]
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "Stamina Management",
    description: "Physical actions consume stamina, which regenerates slowly over time.",
    details: [
      "Running, jumping, and melee drain stamina",
      "Exhaustion causes blurred vision and slow movement",
      "Rest in safe zones for faster recovery",
      "Certain items provide temporary stamina boosts"
    ]
  },
  {
    icon: <Flashlight className="w-6 h-6" />,
    title: "Light & Darkness",
    description: "Your flashlight is your lifeline—but it's also a beacon for enemies.",
    details: [
      "Limited battery life requires conservation",
      "Some enemies are attracted to light",
      "Others are repelled by darkness",
      "UV light reveals hidden messages"
    ]
  },
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: "Sound Propagation",
    description: "Every sound you make can be heard by nearby enemies.",
    details: [
      "Footsteps, interactions, and breathing create noise",
      "Noise travels further in corridors",
      "Throw objects to create distractions",
      "Some surfaces are louder than others"
    ]
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Detection System",
    description: "Enemies use sight, sound, and smell to hunt you.",
    details: [
      "Stay out of direct line of sight",
      "Move slowly to reduce noise",
      "Certain items mask your scent",
      "Environmental hazards trigger alerts"
    ]
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Sanity System",
    description: "Prolonged stress deteriorates your mental state.",
    details: [
      "Darkness, proximity to enemies, and isolation lower sanity",
      "Low sanity causes hallucinations",
      "Extreme cases may reveal false enemies or hide real ones",
      "Rest, light, and Echo memories restore sanity"
    ]
  },
];

const craftingItems = [
  { name: "Flare", ingredients: "Chemicals + Metal", effect: "Temporary bright light, scares some enemies" },
  { name: "Noise Maker", ingredients: "Electronics + Battery", effect: "Creates distraction at thrown location" },
  { name: "Bandage", ingredients: "Cloth + Alcohol", effect: "Heals minor wounds" },
  { name: "Lock Pick", ingredients: "Wire + Tools", effect: "Opens locked doors (consumable)" },
  { name: "Battery Pack", ingredients: "Copper + Acid", effect: "Recharges flashlight" },
  { name: "Adrenaline Shot", ingredients: "Chemicals + Syringe", effect: "Temporary stamina boost" },
];

const MechanicsSection = () => {
  return (
    <SectionWrapper 
      id="mechanics" 
      title="Gameplay Mechanics" 
      subtitle="Core Systems"
      accent="primary"
    >
      <div className="grid gap-12">
        {/* Core mechanics grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mechanics.map((mechanic, index) => (
            <motion.div
              key={mechanic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-atmospheric rounded-lg p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary">
                {mechanic.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {mechanic.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {mechanic.description}
              </p>
              <ul className="space-y-1">
                {mechanic.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Crafting system */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Package className="w-6 h-6 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Crafting System
            </h3>
          </div>
          <div className="card-atmospheric rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-mono text-xs text-primary uppercase tracking-wider">Item</th>
                  <th className="text-left p-4 font-mono text-xs text-primary uppercase tracking-wider">Ingredients</th>
                  <th className="text-left p-4 font-mono text-xs text-primary uppercase tracking-wider">Effect</th>
                </tr>
              </thead>
              <tbody>
                {craftingItems.map((item, index) => (
                  <tr key={item.name} className={index !== craftingItems.length - 1 ? "border-b border-border/50" : ""}>
                    <td className="p-4 font-display font-semibold text-foreground">{item.name}</td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">{item.ingredients}</td>
                    <td className="p-4 text-sm text-muted-foreground">{item.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Maze shift mechanic */}
        <div className="card-atmospheric rounded-lg p-8 border-l-4 border-danger">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-danger/10 border border-danger/30 flex items-center justify-center text-danger flex-shrink-0">
              <Timer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                The Shift
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every 30 real-world minutes, the maze reconfigures. Walls slide, passages seal, 
                and new routes open. A 5-minute warning alarm sounds, giving players time to 
                reach designated safe rooms. Being caught in a shifting corridor means death.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-danger/10 border border-danger/30 rounded-full text-xs text-danger font-mono">
                  5 MIN WARNING
                </span>
                <span className="px-3 py-1 bg-warning/10 border border-warning/30 rounded-full text-xs text-warning font-mono">
                  2 MIN WARNING
                </span>
                <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary font-mono">
                  SAFE ROOM REQUIRED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MechanicsSection;
