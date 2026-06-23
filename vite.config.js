import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to false for production to reduce bundle size
    // minify: 'terser', // Ensure code is minified
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react') || 
            id.includes('node_modules/react-dom') || 
            id.includes('node_modules/react-router-dom')
          ) {
            return 'vendor';
          }
        }
      },
    },
  },
});