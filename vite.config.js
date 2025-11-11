import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber"],
  },
});
