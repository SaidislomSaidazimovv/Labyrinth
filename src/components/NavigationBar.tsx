import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "story", label: "Story" },
  { id: "mechanics", label: "Mechanics" },
  { id: "maze-preview", label: "3D Demo" },
  { id: "enemies", label: "Enemies" },
  { id: "progression", label: "Progression" },
  { id: "atmosphere", label: "Atmosphere" },
  { id: "scripts", label: "Scripts" },
];

const NavigationBar = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-primary glow-text">
            THE LABYRINTH
          </span>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  activeSection === section.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="h-0.5 bg-primary mt-1"
                  />
                )}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-muted-foreground">
            GDD v1.0
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
