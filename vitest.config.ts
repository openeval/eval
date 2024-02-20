import path from "path";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { configDefaults, defineConfig } from "vitest/config";

// Read from default ".env" file.
dotenv.config();

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, "e2e/*"],
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
