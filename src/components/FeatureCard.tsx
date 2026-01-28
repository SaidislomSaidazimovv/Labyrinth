import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: "primary" | "secondary" | "danger" | "warning";
}

const FeatureCard = ({ icon, title, description, accent = "primary" }: FeatureCardProps) => {
  const accentStyles = {
    primary: "border-primary/20 hover:border-primary/40 bg-primary/5",
    secondary: "border-secondary/20 hover:border-secondary/40 bg-secondary/5",
    danger: "border-danger/20 hover:border-danger/40 bg-danger/5",
    warning: "border-warning/20 hover:border-warning/40 bg-warning/5",
  };

  const iconStyles = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    danger: "text-danger bg-danger/10",
    warning: "text-warning bg-warning/10",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg border transition-all duration-300 ${accentStyles[accent]}`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconStyles[accent]}`}>
        {icon}
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
