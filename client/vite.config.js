import { defineConfig } from "vite";
import {viteSingleFile} from "vite-plugin-singlefile"
import react from "@vitejs/plugin-react";
const { PORT = 3000} = process.env;
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    manifest: true,
    rollupOptions: {
      input: './index.html' //./src/main.jsx",
    },
    outDir: 'dist',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

