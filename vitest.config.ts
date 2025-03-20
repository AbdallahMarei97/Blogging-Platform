import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  test: {
    globals: true, // Enable global test APIs like `describe`, `it`, etc.
    environment: "jsdom", // Use jsdom for testing React components
    setupFiles: "./vitest.setup.ts", // Path to setup file for test environment
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Map @/ to the src/ directory
    },
  },
  plugins: [react()],
});
