import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // MazeScene is lazy, so Vite never sees three/fiber/drei during its initial
    // dep scan. It discovers them the first time the canvas mounts, re-bundles,
    // and forces a full page reload mid-scroll. Pre-bundling them at boot is
    // the fix — the reload was the symptom, not the cost of lazy loading.
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
}));
