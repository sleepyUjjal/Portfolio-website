import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'GITHUB', 'LINKEDIN', 'EMAIL'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Groups all node_modules dependencies into a separate vendor chunk
          }
        }
      }
    }
  }
})
