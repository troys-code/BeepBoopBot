import { defineConfig, BuildEnvironment } from 'vite'
import react from '@vitejs/plugin-react'

NODE_ENV = process.env.NODE_ENV || 'production'

let devBuildOptions = {}

if (NODE_ENV === 'development') {
  devBuildOptions = {
    minify: false,
  }
}

export default defineConfig({
  mode: NODE_ENV,
  plugins: [
    react(),
  ],
  publicDir: 'public',
  build: {
    outDir: 'webpage',
    /* during dev we are serving from outDir - deleting files causes page to briefly go blank, */
    emptyOutDir: false, 
    copyPublicDir: true,
    ...devBuildOptions,
  }
})
