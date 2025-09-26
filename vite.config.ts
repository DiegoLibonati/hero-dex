import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./tests"),
      },
    },
    build: {
      outDir: "dist",
    },
    server: {
      proxy: {
        "/superhero-api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
  };
});
