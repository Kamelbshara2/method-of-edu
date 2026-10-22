import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { agentPlugin } from "./server/devPlugin";
export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id))
            return "react-vendor";
        },
      },
    },
  },
  plugins: [
    react(),
    agentPlugin({
      ...loadEnv(mode, process.cwd(), ""),
      ...process.env,
    } as Record<string, string>),
  ],
}));
