import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-maze.jpg";

const HeroSection = () => {
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsTablet(w >= 640 && w < 1024);
      setIsLaptop(w >= 1024 && w <= 1280);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      {/* Fog effect layers */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Light source glow overlays */}
      {/* 1. Top center ceiling lamp */}
      <div
        className="hidden sm:block absolute rounded-full pointer-events-none z-[1]"
        style={{
          top: isLaptop ? "12%" : isTablet ? "13%" : "6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(50px, 8vw, 120px)",
          height: "clamp(50px, 8vw, 120px)",
          background:
            "radial-gradient(circle, rgba(200,230,255,0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
          animation: "flickerGlow1 3s ease-in-out infinite",
        }}
      />
      {/* 2. Back center ceiling lamp */}
      <div
        className="hidden sm:block absolute rounded-full pointer-events-none z-[1]"
        style={{
          top: isLaptop ? "30%" : isTablet ? "32%" : "28%",
          left: "50%",
          transform: "translateX(-50%) translateY(40%)",
          width: "clamp(30px, 4vw, 60px)",
          height: "clamp(30px, 4vw, 60px)",
          background:
            "radial-gradient(circle, rgba(200,230,255,0.25) 0%, transparent 100%)",
          filter: "blur(20px)",
          animation: "flickerGlow2 2.5s ease-in-out infinite",
          animationDelay: "0.8s",
        }}
      />
      {/* 3. Bottom left floor lamp */}
      <div
        className="hidden sm:block absolute pointer-events-none z-[1]"
        style={{
          bottom: isLaptop ? "12%" : isTablet ? "13%" : "8%",
          left: isLaptop ? "6%" : isTablet ? "-4%" : "13%",
          width: "clamp(60px, 10vw, 150px)",
          height: "clamp(12px, 2vw, 30px)",
          borderRadius: "6px",
          background:
            "radial-gradient(ellipse, rgba(200,230,255,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
          transform: "rotate(-30deg)",
          animation: "flickerGlow3 4s ease-in-out infinite",
          animationDelay: "0.3s",
        }}
      />
      {/* 4. Bottom right floor lamp */}
      <div
        className="hidden sm:block absolute pointer-events-none z-[1]"
        style={{
          bottom: isLaptop ? "12%" : isTablet ? "13%" : "8%",
          right: isLaptop ? "5%" : isTablet ? "-4%" : "12%",
          width: "clamp(60px, 10vw, 150px)",
          height: "clamp(12px, 2vw, 30px)",
          borderRadius: "6px",
          background:
            "radial-gradient(ellipse, rgba(200,230,255,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
          transform: "rotate(30deg)",
          animation: "flickerGlow3 4s ease-in-out infinite",
          animationDelay: "0.4s",
        }}
      />
      {/* 5a. Mid back left */}
      <div
        className="hidden sm:block absolute pointer-events-none z-[1]"
        style={{
          bottom: isLaptop ? "29%" : isTablet ? "29%" : "27%",
          left: isLaptop ? "27%" : isTablet ? "21%" : "31%",
          width: "clamp(35px, 6vw, 80px)",
          height: "clamp(12px, 2vw, 30px)",
          borderRadius: "6px",
          background:
            "radial-gradient(ellipse, rgba(200,230,255,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
          transform: "rotate(-30deg)",
          animation: "flickerGlow3 4s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      />
      {/* 5b. Mid back right */}
      <div
        className="hidden sm:block absolute pointer-events-none z-[1]"
        style={{
          bottom: isLaptop ? "29%" : isTablet ? "29%" : "27%",
          right: isLaptop ? "27%" : isTablet ? "20%" : "31%",
          width: "clamp(35px, 6vw, 80px)",
          height: "clamp(12px, 2vw, 30px)",
          borderRadius: "6px",
          background:
            "radial-gradient(ellipse, rgba(200,230,255,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
          transform: "rotate(30deg)",
          animation: "flickerGlow3 4s ease-in-out infinite",
          animationDelay: "0.6s",
        }}
      />

      <div
        className="hidden sm:block absolute pointer-events-none z-[1]"
        style={{
          bottom: isLaptop ? "40%" : isTablet ? "40%" : "38%",
          right: isLaptop ? "39%" : isTablet ? "35%" : "40.50%",
          width: "clamp(20px, 3vw, 40px)",
          height: "clamp(15px, 2vw, 30px)",
          borderRadius: "6px",
          background:
            "radial-gradient(ellipse, rgba(200,230,255,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
          transform: "rotate(30deg)",
          animation: "flickerGlow3 4s ease-in-out infinite",
          animationDelay: "0.7s",
        }}
      />

      <div
        className="hidden sm:block absolute pointer-events-none z-[1]"
        style={{
          bottom: isLaptop ? "39%" : isTablet ? "38%" : "36%",
          left: isLaptop ? "38%" : isTablet ? "35%" : "39.50%",
          width: "clamp(20px, 3vw, 40px)",
          height: "clamp(15px, 2vw, 30px)",
          borderRadius: "6px",
          background:
            "radial-gradient(ellipse, rgba(200,230,255,0.4) 0%, transparent 100%)",
          filter: "blur(20px)",
          transform: "rotate(30deg)",
          animation: "flickerGlow3 4s ease-in-out infinite",
          animationDelay: "0.8s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-mono text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Game Design Document
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text"
        >
          <span className="text-foreground">THE</span>{" "}
          <span className="text-primary">LABYRINTH</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          A first-person survival horror experience where every wall hides
          secrets, every shadow holds danger, and the maze itself is alive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full font-mono text-sm text-primary">
            3D Survival Horror
          </span>
          <span className="px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full font-mono text-sm text-secondary">
            Procedural Generation
          </span>
          <span className="px-4 py-2 bg-danger/10 border border-danger/30 rounded-full font-mono text-sm text-danger">
            AI-Driven Enemies
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 flex justify-center"
        >
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
};

export default HeroSection;
