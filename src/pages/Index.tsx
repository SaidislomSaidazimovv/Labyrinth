import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import StorySection from "@/components/StorySection";
import MechanicsSection from "@/components/MechanicsSection";
import EnemiesSection from "@/components/EnemiesSection";
import ProgressionSection from "@/components/ProgressionSection";
import AtmosphereSection from "@/components/AtmosphereSection";
import ScriptsSection from "@/components/ScriptsSection";
import MazePreviewSection from "@/components/MazePreviewSection";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      <NavigationBar />
      <HeroSection />
      
      <main>
        <OverviewSection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <StorySection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        
        <MechanicsSection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <MazePreviewSection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        
        <EnemiesSection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-danger/30 to-transparent" />
        
        <ProgressionSection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        
        <AtmosphereSection />
        
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <ScriptsSection />
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-primary glow-text mb-4">
              THE LABYRINTH
            </h2>
            <p className="text-muted-foreground mb-8">
              Game Design Document v1.0 — Ready for Development
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Genre: Survival Horror
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Engine: Unity 2022+
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-danger" />
                Platform: PC
              </span>
            </div>
          </motion.div>
          
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="font-mono text-xs text-muted-foreground">
              © 2026 — Confidential Game Design Document
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
