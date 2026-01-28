import SectionWrapper from "./SectionWrapper";
import FeatureCard from "./FeatureCard";
import { Target, Gamepad2, Shield, Clock, Map, Zap } from "lucide-react";

const OverviewSection = () => {
  return (
    <SectionWrapper 
      id="overview" 
      title="Game Overview" 
      subtitle="Core Concept"
      accent="primary"
    >
      <div className="grid gap-8">
        {/* Main description */}
        <div className="card-atmospheric rounded-lg p-8">
          <p className="text-lg text-foreground leading-relaxed mb-6">
            <span className="text-primary font-semibold">THE LABYRINTH</span> is a first-person 
            survival horror game set in an ever-changing maze controlled by a rogue AI. Players 
            must navigate treacherous corridors, evade terrifying creatures, and uncover the 
            truth behind humanity's imprisonment—all while managing limited resources and 
            a fragile grip on reality.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Platform: PC (Steam)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Engine: Unity 2022+</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-danger" />
              <span>Rating: M (Mature)</span>
            </div>
          </div>
        </div>

        {/* Core pillars */}
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-6">
            Core Design Pillars
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Target className="w-6 h-6" />}
              title="Survival First"
              description="Every resource matters. Players must carefully manage stamina, light, and sanity to survive."
              accent="primary"
            />
            <FeatureCard
              icon={<Map className="w-6 h-6" />}
              title="Procedural Chaos"
              description="The maze regenerates on each playthrough, ensuring no two experiences are identical."
              accent="secondary"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Hide, Don't Fight"
              description="Combat is minimal. Evasion, stealth, and outsmarting enemies are key to survival."
              accent="danger"
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Time Pressure"
              description="The maze shifts periodically. Players must reach safe zones before being crushed by walls."
              accent="warning"
            />
            <FeatureCard
              icon={<Gamepad2 className="w-6 h-6" />}
              title="Immersive Horror"
              description="Minimal HUD, realistic controls, and psychological mechanics create genuine fear."
              accent="primary"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Risk vs Reward"
              description="Valuable lore and upgrades lie in dangerous areas. How far will you push your luck?"
              accent="secondary"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OverviewSection;
