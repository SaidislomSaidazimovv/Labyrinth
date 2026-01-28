import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  accent?: "primary" | "secondary" | "danger";
}

const SectionWrapper = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  accent = "primary" 
}: SectionWrapperProps) => {
  const accentColors = {
    primary: "text-primary border-primary/30",
    secondary: "text-secondary border-secondary/30",
    danger: "text-danger border-danger/30",
  };

  return (
    <section id={id} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className={`flex items-center gap-4 mb-4 ${accentColors[accent]}`}>
            <div className="w-12 h-[1px] bg-current opacity-50" />
            <span className="font-mono text-xs uppercase tracking-[0.3em]">
              {subtitle || id}
            </span>
          </div>
          <h2 className={`font-display text-4xl md:text-5xl font-bold ${accentColors[accent].split(' ')[0]}`}>
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper;
