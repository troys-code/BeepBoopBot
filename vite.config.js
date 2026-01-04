import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'webpage',
    emptyOutDir: true,
    copyPublicDir: true,
  }
})
