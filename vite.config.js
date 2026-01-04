import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({gzipSize: true}),
  ],
  build: {
    outDir: 'webpage',
    emptyOutDir: true,
    copyPublicDir: true,
  }
})
