import path from "path";
import { defineConfig } from "vitest/config";

// Same import aliases as jsconfig.json, so modules under test can use "@/...".
const r = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
  resolve: {
    alias: {
      "@/components": r("components"),
      "@/hooks": r("hooks"),
      "@/functions": r("functions"),
      "@/firebase": r("firebase"),
      "@/icons": r("components/icons"),
      "@/data": r("data"),
      "@/tables": r("components/tables"),
    },
  },
});
