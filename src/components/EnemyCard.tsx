import { motion } from "framer-motion";

interface EnemyCardProps {
  name: string;
  threat: "Low" | "Medium" | "High" | "Extreme";
  description: string;
  behavior: string[];
  weaknesses: string[];
}

const EnemyCard = ({ name, threat, description, behavior, weaknesses }: EnemyCardProps) => {
  const threatColors = {
    Low: "bg-safe/20 text-safe border-safe/30",
    Medium: "bg-warning/20 text-warning border-warning/30",
    High: "bg-secondary/20 text-secondary border-secondary/30",
    Extreme: "bg-danger/20 text-danger border-danger/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card-atmospheric rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-2xl font-bold text-foreground">
            {name}
          </h3>
          <span className={`px-3 py-1 rounded-full font-mono text-xs border ${threatColors[threat]}`}>
            {threat} Threat
          </span>
        </div>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Details */}
      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-display text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Behavior Patterns
          </h4>
          <ul className="space-y-2">
            {behavior.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-safe uppercase tracking-wider mb-3">
            Weaknesses
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-safe mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default EnemyCard;
